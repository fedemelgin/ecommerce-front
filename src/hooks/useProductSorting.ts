import { useMemo } from "react";
import type { Product } from "../types/Product";
import type { SortType } from "../types/SortType";

export function useProductSorting(products: Product[], sortType: SortType): Product[] {
  const sortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const compare = (a: Product, b: Product) => {
      switch (sortType) {
        case "caracteristicas":
          return 0;
        case "alphabetic-asc":
          return a.title.localeCompare(b.title);
        case "alphabetic-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    };

    return [...products].sort(compare);
  }, [products, sortType]);

  return sortedProducts;
}