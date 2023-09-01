import { ShakeConditionInstance } from '../classes/instance/ShakeConditionInstance.class';
import { ShakeInvokerInstance } from '../classes/instance/ShakeInvokerInstance.class';
import { ShakeVariableSetterInstance } from '../classes/instance/ShakeVariableSetterInstance.class';
import { ShakeWhileInstance } from '../classes/instance/ShakeWhileInstance.class';
import { ShakeConditionDefinition } from './ShakeConditionDefinition.type';
import { ShakeInvokerDefinition } from './ShakeInvokerDefinition.type';
import { ShakeVariableSetterDefinition } from './ShakeVariableSetterDefinition.type';
import { ShakeWhileDefinition } from './ShakeWhileDefinition.type';

export type ShakeExecutionSequenceMemberDefinition = ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition;
export type ShakeExecutionSequenceMemberInstance = ShakeConditionInstance | ShakeVariableSetterInstance | ShakeWhileInstance | ShakeInvokerInstance;