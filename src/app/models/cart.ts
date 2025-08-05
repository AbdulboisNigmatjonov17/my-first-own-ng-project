import { Product } from "./product";

export interface ICart{
    id: string;
    product: Product;
    quantity: number
}