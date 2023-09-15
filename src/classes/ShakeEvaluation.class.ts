/**
 * Simply evaluates logic and returns a result
 */

import { RulesLogic } from 'json-logic-js';
import { apply } from 'json-logic-js';
import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeEvaluationDefinition } from '../types/ShakeEvaluationDefinition.type';
import { ShakeVariableType } from '../types/ShakeVariableType.type';
import { ValueOf } from '../types/ValueOf.type';
import { TypedRecord } from '../types/TypedRecord';
import { getVariableReferencesInLogic } from '../functions/get-variables-references-in-logic.function';

export class ShakeEvaluation {
    constructor (
        def: ShakeEvaluationDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        this.logic = def.logic;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    label: string;
    logic: RulesLogic = '';

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
    }

    run(): ValueOf<ShakeVariableType> {
        const vars = getVariableReferencesInLogic(this.logic);
        return apply(this.logic, vars.reduce<TypedRecord<ValueOf<ShakeVariableType>>>((acc, cur) => {
            acc[cur] = this._parent.resolveVariable(cur);
            return acc;
        }, {}));
    }

    serializeAsJson(): ShakeEvaluationDefinition {
        return {
            label: this.label,
            logic: this.logic,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeEvaluationDefinition, closure: ShakeClosure): ShakeEvaluation {
        return new ShakeEvaluation(def, closure);
    }
}