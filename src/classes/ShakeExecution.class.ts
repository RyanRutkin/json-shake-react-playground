import { ShakeCondition } from './ShakeCondition.class';
import { ShakeClosure } from './ShakeClosure.class';
import { ShakeVariableSetter } from './ShakeVariableSetter.class';
import { ShakeWhile } from './ShakeWhile.class';
import { v4 as uuidv4 } from 'uuid';
import { ShakeExecutionDefinition } from '../types/ShakeExecutionDefinition.type';
import { ShakeExecutionSequence } from '../types/ShakeExecutionSequence.type';
import { ShakeExecutionSequenceMember } from '../types/ShakeExecutionSequenceMember.type';
import { ShakeInvoker } from './ShakeInvoker.class';

export class ShakeExecution {
    constructor (
        def: ShakeExecutionDefinition,
        private _parent: ShakeClosure
    ) {
        this.label = def.label;
        this._sequence = def.sequence.map(entry => {
            if (entry.type === 'condition') {
                return ShakeCondition.deserializeFromJson(entry, _parent);
            }
            if (entry.type === 'setter') {
                return ShakeVariableSetter.deserializeFromJson(entry, _parent);
            }
            if (entry.type === 'while') {
                return ShakeWhile.deserializeFromJson(entry, _parent);
            }
            return ShakeInvoker.deserializeFromJson(entry, _parent);
        });
        if (!def.id) {
            this.id = uuidv4();
        } else {
            this.id = def.id;
        }
    }

    readonly id: string;
    label: string;
    private _sequence: ShakeExecutionSequence = [];

    getParent(): ShakeClosure {
        return this._parent;
    }
    setParent(p: ShakeClosure) {
        this._parent = p;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    getSequence(): ShakeExecutionSequence {
        return this._sequence;
    }
    addToSequence(member: ShakeExecutionSequenceMember) {
        this._sequence.push(member);
        member.setParent(this._parent);
    }
    removeFromSequence(member: ShakeExecutionSequenceMember) {
        const idx = this._sequence.indexOf(member);
        if (idx > -1) {
            this._sequence.splice(idx, 1);
        }
    }
    setSequence(seq: ShakeExecutionSequence) {
        this._sequence = seq;
        this._sequence.forEach(member => member.setParent(this._parent));
    }

    run() {
        this._sequence.forEach(member => member.run());
    }

    serializeAsJson(): ShakeExecutionDefinition {
        return {
            label: this.label,
            sequence: this._sequence.map(entry => entry.serializeAsJson()),
            id: this.id
        }
    }

    static deserializeFromJson(def: ShakeExecutionDefinition, closure: ShakeClosure): ShakeExecution {
        return new ShakeExecution(def, closure);
    }
}