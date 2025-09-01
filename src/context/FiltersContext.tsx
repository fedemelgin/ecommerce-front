import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useFilters } from "../hooks/useFilters";

const FiltersContext = createContext<ReturnType<typeof useFilters> | undefined>(undefined);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const filtersData = useFilters();
  return <FiltersContext.Provider value={filtersData}>{children}</FiltersContext.Provider>;
}

export function useFiltersContext() {
  const context = useContext(FiltersContext);
  if (!context) throw new Error("useFiltersContext must be used within a FiltersProvider");
  return context;
}