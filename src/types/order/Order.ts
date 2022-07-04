import { LineItem } from "../product/LineItem";

export type Order = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    lineItems: Array<LineItem>;
};