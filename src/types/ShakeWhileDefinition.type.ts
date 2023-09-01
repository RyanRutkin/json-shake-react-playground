import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeExecutionSequenceMemberBase } from './ShakeExecutionSequenceMemberBase.type';

export interface ShakeWhileDefinition extends ShakeExecutionSequenceMemberBase {
    type: 'while',
    label: string;
    execution: ShakeExecutionDefinition | null;
    id: string | null;
}