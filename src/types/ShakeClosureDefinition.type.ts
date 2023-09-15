import { TypedRecord } from './TypedRecord';
import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';
import { ShakeTriggerDefinition } from './ShakeTriggerDefinition.type';
import { ShakeVariableDefinition } from './ShakeVariableDefinition.type';

export interface ShakeClosureDefinition {
    label: string;
    variables: TypedRecord<ShakeVariableDefinition>;
    onStart: ShakeExecutionDefinition | null;
    onDestroy: ShakeExecutionDefinition | null;
    triggers: ShakeTriggerDefinition[];
    closures: ShakeClosureDefinition[];
    id: string | null;
}