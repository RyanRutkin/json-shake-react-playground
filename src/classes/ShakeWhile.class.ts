import { ShakeEvaluation } from './ShakeEvaluation.class';
import { ShakeExecution } from './ShakeExecution.class';
import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeWhileDefinition } from '../types/ShakeWhileDefinition.type';
import { ShakeExecutionSequenceMemberType } from '../types/ShakeExecutionSequenceMemberBase.type';

export class ShakeWhile {
    constructor (
        def: ShakeWhileDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
        this.evaluation = def.evaluation ? ShakeEvaluation.deserializeFromJson(def.evaluation, _parent) : null;
        this.execution = def.execution ? ShakeExecution.deserializeFromJson(def.execution, _parent) : null;
    }

    readonly id: string;
    type: ShakeExecutionSequenceMemberType = 'while';
    label: string;
    evaluation: ShakeEvaluation | null = null;
    execution: ShakeExecution | null = null;

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
        if (this.evaluation) {
            this.evaluation.setParent(p);
        }
    }

    serializeAsJson(): ShakeWhileDefinition {
        return {
            type: 'while',
            label: this.label,
            evaluation: this.evaluation ? this.evaluation.serializeAsJson() : null,
            execution: this.execution ? this.execution.serializeAsJson() : null,
            id: this.id
        }
    }

    run() {
        if (!this.evaluation) {
            throw new Error(`WhileLoop "${this.label}" triggered without evaluation.`);
        }
        if (!this.execution) {
            throw new Error(`WhileLoop "${this.label}" triggered without conclusive action.`);
        }
        while (!!this.evaluation.run()) {
            this.execution.run();
        }
    }
    
    static deserializeFromJson(def: ShakeWhileDefinition, closure: ShakeClosure) {
        return new ShakeWhile(def, closure);
    }

    static defaultDefinition: ShakeWhileDefinition = {
        type: 'while',
        label: 'New While Loop',
        evaluation: null,
        execution: null,
        id: null
    }
}