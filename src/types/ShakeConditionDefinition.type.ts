import { ShakeClosureDefinition } from './ShakeClosureDefinition.type';
import { ShakeExecutionSequenceMemberBase } from './ShakeExecutionSequenceMemberBase.type';

export interface ShakeConditionDefinition extends ShakeExecutionSequenceMemberBase {
    type: 'condition';
    label: string;
    onTrue: ShakeClosureDefinition | null;
    onFalse: ShakeClosureDefinition | null;
    id: string | null;
}