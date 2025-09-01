import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types/Product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    // useCallback para evitar re-renders innecesarios
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            

            const response = await fetch('https://dummyjson.com/products');
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();

            if (!data || !Array.isArray(data.products)) {
                throw new Error('Datos de productos inválidos');
            }
            
            setProducts(data.products);

        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setError(message);
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
        hasProducts: products.length > 0
    };
}