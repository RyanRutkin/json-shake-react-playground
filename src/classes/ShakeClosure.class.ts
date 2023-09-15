
import { ShakeExecution } from './ShakeExecution.class';
import { ShakeTrigger } from './ShakeTrigger.class';
import { ShakeVariable } from './ShakeVariable.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeClosureDefinition } from '../types/ShakeClosureDefinition.type';
import { TypedRecord } from '../types/TypedRecord';
import { ShakeVariableType } from '../types/ShakeVariableType.type';
import { ShakeVariableDefinition } from '../types/ShakeVariableDefinition.type';
import { ValueOf } from '../types/ValueOf.type';

export class ShakeClosure {
    constructor(
        def: ShakeClosureDefinition,
        private _parent: ShakeClosure | null = null
    ) {
        Object.entries(def.variables).forEach(([key, value]) => {
            // Adds itself to closure
            this.addVariable(value);
        });
        this.onStart = def.onStart ? ShakeExecution.deserializeFromJson(def.onStart, this) : null;
        this.onDestroy = def.onDestroy ? ShakeExecution.deserializeFromJson(def.onDestroy, this) : null;
        this.triggers = def.triggers.map(trigger => ShakeTrigger.deserializeFromJson(trigger, this));
        def.closures.forEach(subClosure => ShakeClosure.deserializeFromJson(subClosure, this));
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
        if (_parent) {
            _parent.addClosure(this);
        }
    }

    readonly id: string;
    label: string = '';
    onStart: ShakeExecution | null = null;
    onDestroy: ShakeExecution | null = null;
    triggers: ShakeTrigger[] = [];
    private _variables: TypedRecord<ShakeVariable<ValueOf<ShakeVariableType>>> = {};
    private _closures: ShakeClosure[] = [];
    private _runParameters: ShakeClosure[] | null = null;

    run(params: ShakeClosure[] = []) {
        this._runParameters = params;
        if (this.onStart) {
            this.onStart.run();
        }
        this._closures.forEach(closure => closure.run());
        this._runParameters = null;
    }

    kill(params: ShakeClosure[] = []) {
        this._runParameters = params;
        this._closures.forEach(closure => closure.kill());
        if (this.onDestroy) {
            this.onDestroy.run();
        }
        this._runParameters = null;
    }

    getVariables(): TypedRecord<ShakeVariable<ValueOf<ShakeVariableType>>> {
        return this._variables;
    }
    addVariable(variable: ShakeVariableDefinition) {
        this._variables[variable.label] = ShakeVariable.deserializeFromJson(variable, this);
    }

    getClosures(): ShakeClosure[] {
        return this._closures;
    }
    addClosure(closure: ShakeClosure) {
        if (closure.getParent() !== this) {
            closure.setParent(this);
        } else {
            this._closures.push(closure);
        }
    }
    removeClosure(closure: ShakeClosure) {
        if (closure.getParent() === this) {
            closure.setParent(null);
        } else if (this._closures.indexOf(closure) > -1) {
            this._closures.splice(this._closures.indexOf(closure), 1);
        }
    }

    getParent(): ShakeClosure | null {
        return this._parent;
    }
    setParent(parent: ShakeClosure | null) {
        const oldParent = this._parent;
        this._parent = parent;
        if (oldParent) {
            oldParent.removeClosure(this);
            this._parent = parent;
        }
        if (this._parent) {
            this._parent.addClosure(this);
        }
    }

    resolveVariable(label: string): ShakeVariable<ValueOf<ShakeVariableType>> | undefined {
        if (this._runParameters) {
            const runVar = this._runParameters.find(runParam => runParam.resolveVariable(label));
            if (runVar) {
                return runVar.resolveVariable(label);
            }
        }
        if (this._variables.hasOwnProperty(label)) {
            return this._variables[label];
        }
        if (this._parent) {
            return this._parent.resolveVariable(label);
        }
        return undefined;
    }

    resolveClosure(label: string): ShakeClosure | undefined {
        if (this._runParameters) {
            const runClosure = this._runParameters.find(runParam => runParam.resolveClosure(label));
            if (runClosure) {
                return runClosure.resolveClosure(label);
            }
        }
        if (this.label === label) {
            return this;
        }
        let closure = this._closures.find(cClosure => cClosure.label === label);
        if (!closure && this._parent) {
            closure = this._parent.resolveClosure(label);
        }
        return closure;
    }

    reportStack(): string[] {
        return [this.label, ...(this._parent ? this._parent.reportStack() : [])];
    }

    serializeAsJson(): ShakeClosureDefinition {
        return {
            label: this.label,
            variables: Object.entries(this._variables).reduce<TypedRecord<ShakeVariableDefinition>>((coll, [key, value]) => {
                coll[key] = value.serializeAsJson();
                return coll;
            }, {}),
            closures: this._closures.map(closure => closure.serializeAsJson()),
            onStart: this.onStart ? this.onStart.serializeAsJson() : null,
            onDestroy: this.onDestroy ? this.onDestroy.serializeAsJson() : null,
            triggers: this.triggers.map(trigger => trigger.serializeAsJson()),
            id: this.id
        };
    }
    
    static deserializeFromJson(def: ShakeClosureDefinition, closure?: ShakeClosure) {
        return new ShakeClosure(def, closure);
    }
}