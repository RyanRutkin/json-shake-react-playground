import { ShakeConditionDefinition } from './ShakeConditionDefinition.type';
import { ShakeInvokerDefinition } from './ShakeInvokerDefinition.type';
import { ShakeVariableSetterDefinition } from './ShakeVariableSetterDefinition.type';
import { ShakeWhileDefinition } from './ShakeWhileDefinition.type';

export interface ShakeExecutionDefinition {
    label: string;
    sequence: (ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition)[];
    id: string | null;
}