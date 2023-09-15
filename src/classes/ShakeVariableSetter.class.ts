import { ShakeEvaluation } from './ShakeEvaluation.class';
import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeVariableSetterDefinition } from '../types/ShakeVariableSetterDefinition.type';
import { ShakeExecutionSequenceMemberType } from '../types/ShakeExecutionSequenceMemberBase.type';

export class ShakeVariableSetter {
    constructor (
        def: ShakeVariableSetterDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
        this.variableLabel = def.variableLabel;
        this.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation, _parent) : null;
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'setter';
    label: string;
    variableLabel: string | null = null;
    evaluation: ShakeEvaluation | null = null;

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
        if (this.evaluation) {
            this.evaluation.setParent(p);
        }
    }

    serializeAsJson(): ShakeVariableSetterDefinition {
        return {
            type: 'setter',
            label: this.label,
            variableLabel: this.variableLabel,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            id: this.id
        }
    }

    run() {
        if (!this.variableLabel) {
            throw new Error(`Setter "${this.label}" triggered without a variable target.`);
        }
        if (!this.evaluation) {
            throw new Error(`Setter "${this.label}" triggered without evaluation.`);
        }
        const varRef = this._parent.resolveVariable(this.variableLabel);
        if (!varRef) {
            throw new Error(`Failed to resolve variable reference "${this.variableLabel}".\n${([this.label, ...this._parent.reportStack()]).join('\n')}`);
        }
        varRef.setValue(this.evaluation.run());
    }

    static deserializeFromJson(def: ShakeVariableSetterDefinition, closure: ShakeClosure): ShakeVariableSetter {
        return new ShakeVariableSetter(def, closure);
    }

    static defaultDefinition: ShakeVariableSetterDefinition = {
        type: 'setter',
        label: 'New Variable Setter',
        variableLabel: '',
        evaluation: null,
        id: null
    }
}