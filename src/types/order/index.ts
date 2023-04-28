import { ProductItem } from "../products";

export interface OrderItem {
  id: number;
  state: string;
  date: string;
}
export interface OrderDetails extends OrderItem {
  business: string;
  products: ProductItem[];
  store: string;
}
