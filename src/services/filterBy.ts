import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";

export function FilterByCategory({ category }: { category: string }): Product[] {
  const { products } = useProducts();
  return products.filter(product => product.category === category);
}
