import { useState, useCallback } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import ProductCard from "../../components/ProductCard/productCard";
import MenuDropDown from "../../components/MenuDropDown/MenuDropDown";

import { useProducts } from "../../hooks/useProducts";
import { useProductSorting } from "../../hooks/useProductSorting";
import { useProductsFilter } from "../../hooks/useProductsFilter";
import { useFiltersContext } from "../../context/FiltersContext";
import type { SortType } from "../../types/SortType";

export default function Products() {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [orderBy, setOrderBy] = useState<boolean>(false);
    const [sortType, setSortType] = useState<SortType>("caracteristicas");

    const { products, loading, error } = useProducts();
    const { categories, priceRange } = useFiltersContext();

    const filteredProducts = useProductsFilter(products, { categories, priceRange });
    const sortedProducts = useProductSorting(filteredProducts, sortType);

    const openSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);
    const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
    const toggleOrderBy = useCallback(() => setOrderBy(prev => !prev), []);

    if (loading) return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center p-4 mb-4">
                <h1 className="font-bold text-3xl">Productos</h1>
            </div>
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg">🛍️ Cargando productos...</div>
            </div>
        </div>
    );
    if (error) return <div>Error: {error}</div>;
 
    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div >
                <div className="container mx-auto">
                    <div className="flex justify-center items-center p-4">
                        <h1 className="font-roboto font-bold text-3xl">Productos</h1>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row justify-center items-center flex-wrap p-4 gap-4 relative">
                        <div className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded hover:bg-gray-50 w-fit sm:absolute sm:left-0" onClick={openSidebar}>
                            <span className="font-roboto font-medium">
                                Filtros
                            </span>
                            <svg className={`transition-transform duration-200 ${isSidebarOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 6l6 6l-6 6" />
                            </svg>
                        </div>
                        
                        <div className="flex justify-center items-center">
                            <h2 className="font-roboto font-medium">Resultados: {filteredProducts.length}</h2>
                        </div>
                        
                        <div className="relative sm:absolute sm:right-0">
                            <div className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-50 cursor-pointer" onClick={toggleOrderBy}>
                                <span className="font-roboto font-medium">Ordenar por</span> 
                                <svg className={`icon icon-tabler icons-tabler-outline icon-tabler-chevron-up transition-transform duration-300 ease-in-out ${orderBy ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 15l6 -6l6 6" />
                                </svg>
                            </div>

                            {/* Dropdown - Centrado */}
                            <MenuDropDown isOpen={orderBy} setSortType={setSortType} />
                        </div>
                    </div>
                
                {/* PRODUCTGRID */}
                <div className="flex flex-wrap justify-center gap-4 p-4" >

                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
            </div>
            
        </>
    );
};
