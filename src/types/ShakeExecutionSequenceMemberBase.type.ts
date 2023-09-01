import { ShakeEvaluationDefinition } from './ShakeEvaluationDefinition.type';

export type ShakeExecutionSequenceMemberType = 'condition' | 'setter' | 'while' | 'invoker';

export interface ShakeExecutionSequenceMemberBase {
    type: ShakeExecutionSequenceMemberType;
    evaluation: ShakeEvaluationDefinition | null;
}