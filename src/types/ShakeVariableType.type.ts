/*export type ShakeVariableBaseType = boolean | number | object | string;
export type ShakeVariableUnionType = ShakeVariableBaseType[];
export type ShakeVariableType = ShakeVariableBaseType | ShakeVariableUnionType;

export type ShakeVariableBaseTypeString = 'boolean' | 'number' | 'object' | 'string';
export type ShakeVariableUnionTypeString = ShakeVariableBaseTypeString[];
export type ShakeVariableTypeString = ShakeVariableBaseTypeString | ShakeVariableUnionTypeString;*/

import { IterableObject } from './IterableObject.type';

export type ShakeVariableType = {
    'boolean': boolean;
    'number': number;
    'object': IterableObject;
    'string': string;
    'any': any;
}