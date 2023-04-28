import { ProductItem } from "@/types/products";
import { OrderDetails } from "@/types/order";
export const products = (total: number): ProductItem[] =>
  new Array(total + 20).fill(0).map((item, index) => ({
    id: index,
    quantity: Math.floor(Math.random() * 100),
    name: "Taladro " + index,
  }));

export const incomeOrder: OrderDetails[] = new Array(3)
  .fill(0)
  .map((item, index) => ({
    state: "Completado",
    date: new Date().toISOString(),
    id: index + 100,
    business: "Homecenter",
    products: products(index),
    store: "Bogota",
  }));
