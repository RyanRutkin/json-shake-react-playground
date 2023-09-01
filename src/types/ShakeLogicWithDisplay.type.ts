import { IterableObject } from './IterableObject.type';
import { ShakeDisplay } from './ShakeDisplay.type';
import { ShakeClosureDefinition } from './ShakeClosureDefinition.type';

export type ShakeLogicWithDisplay = {
    logic: ShakeClosureDefinition | undefined;
    display: IterableObject<ShakeDisplay>;
    createdOn: number;
    createdBy: string;
}