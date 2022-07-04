
import { LemonadeType } from "./LemonadeType";
import { Size } from "./Size";

export type Product = {
    id: number,
    size: Size,
    lemonadeType: LemonadeType,
    amount: string,
};