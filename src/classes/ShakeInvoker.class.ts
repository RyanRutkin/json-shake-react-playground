import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeInvokerDefinition } from '../types/ShakeInvokerDefinition.type';
import { ShakeExecutionSequenceMemberType } from '../types/ShakeExecutionSequenceMemberBase.type';

export class ShakeInvoker {
    constructor (
        def: ShakeInvokerDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        this.closureName = def.closureName;
        this.parametersClosureNames = def.parametersClosureNames;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'invoker';
    label: string;
    closureName: string;
    parametersClosureNames: string[] = [];

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
    }

    run() {
        const closure = this._parent.resolveClosure(this.closureName);
        if (!closure) {
            throw new Error(`Invoker "${this.label}" for closure "${this.closureName}" failed. Unable to resolve target closure. \n${([this.label, ...this._parent.reportStack()]).join('\n')}`);;
        }
        const params: ShakeClosure[] = [];
        this.parametersClosureNames.forEach(target => {
            const paramClosure = this._parent.resolveClosure(target);
            if (!paramClosure) {
                throw new Error(`Invoker "${this.label}" for closure "${this.closureName}" failed. Unable to resolve closure "${target}" as parameter. \n${([this.label, ...this._parent.reportStack()]).join('\n')}`);;
            }
            params.push(paramClosure);
        });
        // TODO - async wait
        closure.run(params);
    }

    serializeAsJson(): ShakeInvokerDefinition {
        return {
            label: this.label,
            type: 'invoker',
            id: this.id,
            closureName: this.closureName,
            parametersClosureNames: this.parametersClosureNames,
            evaluation: null
        }
    }

    static deserializeFromJson(def: ShakeInvokerDefinition, closure: ShakeClosure): ShakeInvoker {
        return new ShakeInvoker(def, closure);
    }

    static defaultDefinition: ShakeInvokerDefinition = {
        label: 'New Method Invocation',
        type: 'invoker',
        id: null,
        closureName: '',
        parametersClosureNames: [],
        evaluation: null
    }
}