export interface ShakeBase<T> {
    serializeAsJson(): T;
}

export interface ShakeBaseStatic<T, P extends ShakeBase<T>> {
    new(label?: string): P;
    deserializeFromJson(def: T): P;
}