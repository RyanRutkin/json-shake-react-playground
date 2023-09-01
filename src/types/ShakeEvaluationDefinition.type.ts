import { RulesLogic } from 'json-logic-js';

export interface ShakeEvaluationDefinition {
    label: string;
    logic: RulesLogic;
    id: string | null;
}