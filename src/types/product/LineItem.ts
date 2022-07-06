import { Product } from './Product';

export type LineItem = {
    productId: number,
    product?: Product,
    quantity: number,
    cost: number,
};