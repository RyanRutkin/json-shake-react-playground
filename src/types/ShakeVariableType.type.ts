/*export type ShakeVariableBaseType = boolean | number | object | string;
export type ShakeVariableUnionType = ShakeVariableBaseType[];
export type ShakeVariableType = ShakeVariableBaseType | ShakeVariableUnionType;

export type ShakeVariableBaseTypeString = 'boolean' | 'number' | 'object' | 'string';
export type ShakeVariableUnionTypeString = ShakeVariableBaseTypeString[];
export type ShakeVariableTypeString = ShakeVariableBaseTypeString | ShakeVariableUnionTypeString;*/

import { TypedRecord } from './TypedRecord';

export type ShakeVariableType = {
    'boolean': boolean;
    'number': number;
    'object': TypedRecord;
    'string': string;
    'any': any;
}