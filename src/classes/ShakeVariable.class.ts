import { ShakeClosure } from './ShakeClosure.class';
import { v4 as uuidv4 } from 'uuid';
import { ValueOf } from '../types/ValueOf.type';
import { ShakeVariableType } from '../types/ShakeVariableType.type';
import { ShakeVariableDefinition } from '../types/ShakeVariableDefinition.type';
import { TypedRecord } from '../types/TypedRecord';
import { Subject } from 'rxjs';

export class ShakeVariable<T extends ValueOf<ShakeVariableType>> {
    constructor (
        def: ShakeVariableDefinition,
        private _parent: ShakeClosure
    ) {
        switch (def.type) {
            case 'boolean':
                this._value = (String(def.value).toLowerCase() === 'true' ? true : false) as T;
                break;
            case 'number':
                this._value = parseFloat(String(def.value)) as T;
                break;
            case 'string':
                this._value = String(def.value) as T;
                break;
            case 'object':
                try {
                    this._value = JSON.parse(def.value) as T;
                } catch (e) {
                    this._value = String(def.value) as T;
                }
                break;
            default: 
                this._value = def.value as T;
        }
        this.label = def.label;
        this.type = def.type;
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
    }

    readonly id: string;
    readonly type: keyof ShakeVariableType;
    label: string;
    private _value: T;
    getValue(): T {
        if (this.type === 'object') {
            return {...(this._value as TypedRecord)} as T;
        }
        return this._value;
    }
    setValue(value: T) {
        this.beforeChange$.next(this.getValue());
        this._value = value;
        this.onChange$.next(this.getValue());
    }

    readonly beforeChange$: Subject<T> = new Subject();
    readonly onChange$: Subject<T> = new Subject();

    getStringifiedValue(): string {
        if (this._value && typeof this._value === 'object') {
            try {
                return JSON.stringify(this._value);
            } catch (e) {}
        }
        return String(this._value);
    }

    serializeAsJson(): ShakeVariableDefinition {
        return {
            label: this.label,
            value: this.getStringifiedValue(),
            type: this.type,
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeVariableDefinition, closure: ShakeClosure): ShakeVariable<ValueOf<ShakeVariableType>> {
        switch (def.type) {
            case 'boolean':
                return new ShakeVariable<boolean>(def, closure);
            case 'number':
                return new ShakeVariable<number>(def, closure);
            case 'string':
                return new ShakeVariable<string>(def, closure);
            case 'object':
                try {
                    return new ShakeVariable<object>(def, closure);
                } catch (e) {
                    return new ShakeVariable<string>(def, closure);
                }
            default: 
                return new ShakeVariable<any>(def, closure);
        }
    }
}