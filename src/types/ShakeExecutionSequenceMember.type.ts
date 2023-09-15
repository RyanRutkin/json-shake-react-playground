import { ShakeCondition } from '../classes//ShakeCondition.class';
import { ShakeInvoker } from '../classes//ShakeInvoker.class';
import { ShakeVariableSetter } from '../classes//ShakeVariableSetter.class';
import { ShakeWhile } from '../classes//ShakeWhile.class';
import { ShakeConditionDefinition } from './ShakeConditionDefinition.type';
import { ShakeInvokerDefinition } from './ShakeInvokerDefinition.type';
import { ShakeVariableSetterDefinition } from './ShakeVariableSetterDefinition.type';
import { ShakeWhileDefinition } from './ShakeWhileDefinition.type';

export type ShakeExecutionSequenceMemberDefinition = ShakeConditionDefinition | ShakeVariableSetterDefinition | ShakeWhileDefinition | ShakeInvokerDefinition;
export type ShakeExecutionSequenceMember = ShakeCondition | ShakeVariableSetter | ShakeWhile | ShakeInvoker;