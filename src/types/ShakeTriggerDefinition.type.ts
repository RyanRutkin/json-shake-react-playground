import { ShakeExecutionDefinition } from './ShakeExecutionDefinition.type';

export interface ShakeTriggerWatchedVariableDefinition {
    label: string;
    on: 'before' | 'after';
}

export interface ShakeTriggerDefinition {
    label: string;
    watchedVariables: ShakeTriggerWatchedVariableDefinition[];
    onTrigger: ShakeExecutionDefinition | null;
    id: string | null;
}