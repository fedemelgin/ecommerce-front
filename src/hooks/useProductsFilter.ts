import { useMemo } from "react";
import type { Product } from "../types/Product";
import type { Categories } from "../types/categories";

export function useProductsFilter(
  products: Product[],
  { categories, priceRange }: { categories: Categories; priceRange: [number, number] }
): Product[] {
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return products.filter((product) => {
      const selectedCategories = Object.keys(categories).filter((cat) => (categories as any)[cat]) as string[];
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [products, categories, priceRange]);

  return filteredProducts;
}