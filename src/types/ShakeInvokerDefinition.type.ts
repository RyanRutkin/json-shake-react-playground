import { ShakeExecutionSequenceMemberBase } from './ShakeExecutionSequenceMemberBase.type';

export interface ShakeInvokerDefinition extends ShakeExecutionSequenceMemberBase {
    label: string;
    type: 'invoker';
    id: string | null;
    closureName: string;
    parametersClosureNames: string[];
}