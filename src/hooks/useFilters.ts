import { useState, useCallback, useRef } from "react";
import type { Categories } from "../types/categories";

export type FilterToggles = {
  isPriceOpen: boolean;
  isCategoryOpen: boolean;
};

export function useFilters() {
  // Estados
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [minInputValue, setMinInputValue] = useState<string>("0");
  const [maxInputValue, setMaxInputValue] = useState<string>("2000");

  const [categories, setCategories] = useState<Categories>({
    beauty: false,
    fragrances: false,
    furniture: false,
    groceries: false,
  });

  const [filterToggles, setFilterToggles] = useState<FilterToggles>({
    isPriceOpen: false,
    isCategoryOpen: false,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSetPriceRange = useCallback((newRange: [number, number]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPriceRange(newRange);
      setMinInputValue(newRange[0].toString());
      setMaxInputValue(newRange[1].toString());
    }, 4000);
  }, []);

  // Funciones
  const togglePriceFilter = useCallback(() => {
    setFilterToggles((prev) => ({ ...prev, isPriceOpen: !prev.isPriceOpen }));
  }, []);

  const toggleCategoryFilter = useCallback(() => {
    setFilterToggles((prev) => ({ ...prev, isCategoryOpen: !prev.isCategoryOpen }));
  }, []);

  const toggleCategory = useCallback((categoryName: keyof Categories) => {
    setCategories((prev) => ({ ...prev, [categoryName]: !prev[categoryName] }));
  }, []);

  const handlePriceRangeChange = useCallback(
    (newValue: [number, number]) => {
      setPriceRange(newValue);
      setMinInputValue(newValue[0].toString());
      setMaxInputValue(newValue[1].toString());
      debouncedSetPriceRange(newValue);
    },
    [debouncedSetPriceRange]
  );

  const updateMinInput = useCallback(
    (value: string) => {
      setMinInputValue(value);
      if (value === "") {
        setPriceRange([0, priceRange[1]]);
      } else {
        const numValue = parseInt(value, 10);
        if (!Number.isNaN(numValue) && numValue >= 0) {
          setPriceRange([numValue, priceRange[1]]);
        }
      }
    },
    [priceRange]
  );

  const updateMaxInput = useCallback(
    (value: string) => {
      setMaxInputValue(value);
      if (value === "") {
        setPriceRange([priceRange[0], 0]);
      } else {
        const numValue = parseInt(value, 10);
        if (!Number.isNaN(numValue) && numValue >= 0) {
          setPriceRange([priceRange[0], numValue]);
        }
      }
    },
    [priceRange]
  );

  return {
    // Estados
    priceRange,
    minInputValue,
    maxInputValue,
    categories,
    filterToggles,
    // Acciones
    togglePriceFilter,
    toggleCategoryFilter,
    toggleCategory,
    handlePriceRangeChange,
    updateMinInput,
    updateMaxInput,
  };
}