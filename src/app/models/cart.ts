import { Product } from "./product";

export interface ICart{
    id: number;
    product: Product;
    quantity: number
}