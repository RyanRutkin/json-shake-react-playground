import { ShakeEvaluation } from './ShakeEvaluation.class';
import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeConditionDefinition } from '../types/ShakeConditionDefinition.type';
import { ShakeExecutionSequenceMemberType } from '../types/ShakeExecutionSequenceMemberBase.type';

export class ShakeCondition {
    constructor (
        def: ShakeConditionDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        this.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation, _parent) : null;
        this.onTrue = def.onTrue ? ShakeClosure.deserializeFromJson(def.onTrue, _parent) : null;
        this.onFalse = def.onFalse ? ShakeClosure.deserializeFromJson(def.onFalse, _parent) : null;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'condition';
    label: string;
    evaluation: ShakeEvaluation | null = null;
    onTrue: ShakeClosure | null = null;
    onFalse: ShakeClosure | null = null;

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
        if (this.evaluation) {
            this.evaluation.setParent(p);
        }
    }

    run() {
        if (!this.evaluation) {
            throw new Error(`Condition "${this.label}" triggered without evaluation`);
        }
        if (!this.onTrue && !this.onFalse) {
            throw new Error(`Condition "${this.label}" triggered without conclusive action`);
        }
        const evalResult = this.evaluation.run();
        if (!!evalResult && this.onTrue) {
            this.onTrue.run();
        }
        if (!evalResult && this.onFalse) {
            this.onFalse.run();
        }
    }

    serializeAsJson(): ShakeConditionDefinition {
        return {
            type: 'condition',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            onTrue: this.onTrue ? this.onTrue.serializeAsJson() : null,
            onFalse: this.onFalse ? this.onFalse.serializeAsJson() : null,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeConditionDefinition, closure: ShakeClosure): ShakeCondition {
        return new ShakeCondition(def, closure);
    }

    static defaultDefinition: ShakeConditionDefinition = {
        type: 'condition',
        label: 'New Condition',
        onTrue: null,
        onFalse: null,
        id: null,
        evaluation: null
    }
}