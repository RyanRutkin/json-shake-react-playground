import { ShakeVariableType } from './ShakeVariableType.type';

export type ShakeVariableDefinition = {
    label: string;
    value: string;
    type: keyof ShakeVariableType;
    id: string | null;
}