import { IterableObject } from './IterableObject.type';
import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeTriggerDefinition } from './ShakeTriggerDefinition.type';
import { ShakeVariableDefinition } from './ShakeVariableDefinition.type';

export interface ShakeClosureDefinition {
    label: string;
    variables: IterableObject<ShakeVariableDefinition>;
    onStart: ShakeExecutionDefinition | null;
    onDestroy: ShakeExecutionDefinition | null;
    triggers: ShakeTriggerDefinition[];
    closures: ShakeClosureDefinition[];
    id: string | null;
}