import { ShakeExecutionSequenceMemberBase } from './ShakeExecutionSequenceMemberBase.type';

export interface ShakeVariableSetterDefinition extends ShakeExecutionSequenceMemberBase {
    type: 'setter';
    label: string;
    variableLabel: string | null;
    id: string | null;
}