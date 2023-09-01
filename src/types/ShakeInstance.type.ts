import { ShakeClosureInstance } from '../classes/instance/ShakeClosureInstance.class';
import { ShakeBase } from './ShakeBase.type';

export interface ShakeInstanceStatic<T, P extends ShakeBase<T>> {
    new(label?: string): P;
    deserializeFromJson(def: T, closure?: ShakeClosureInstance): P;
}