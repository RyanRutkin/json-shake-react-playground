import { TypedRecord } from './TypedRecord';
import { ShakeDisplay } from './ShakeDisplay.type';
import { ShakeClosureDefinition } from './ShakeClosureDefinition.type';

export type ShakeLogicWithDisplay = {
    logic: ShakeClosureDefinition | undefined;
    display: TypedRecord<ShakeDisplay>;
    createdOn: number;
    createdBy: string;
}