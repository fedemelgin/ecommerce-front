
import RangeSlider from "../RangeSlider/RangeSlider";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import { useFiltersContext } from "../../context/FiltersContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const {
        priceRange,
        minInputValue,
        maxInputValue,
        categories,
        filterToggles,
        togglePriceFilter,
        toggleCategoryFilter,
        toggleCategory,
        handlePriceRangeChange,
        updateMinInput,
        updateMaxInput,
  } = useFiltersContext();

    return (
        <aside 
            className={`
                fixed top-0 left-0 z-40 w-72 h-screen 
                transform transition-transform duration-300 ease-in-out
                overflow-y-auto bg-gray-50 text-black shadow-lg
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
            aria-label="Sidebar"
        >
            <div className="flex flex-col h-full p-3">
                {/* Botón de cerrar */}
                <div className="self-end cursor-pointer mb-10 inline-block p-2 rounded hover:bg-gray-200 transition-colors" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </div>

                {/* Filtros */}
                <ul className="space-y-2 font-medium flex flex-col gap-4">
                    {/* Filtro de Precio */}
                    <li>
                        <div className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded" onClick={togglePriceFilter}>
                            <span className="font-roboto-condensed font-medium">Precio</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                fill="currentColor" 
                                className={`bi bi-arrow-up-short transition-transform duration-200 ${filterToggles.isPriceOpen ? 'rotate-180' : ''}`} 
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                            </svg>
                        </div>
                        
                        {/* Filtro de precio desplegable */}
                        {filterToggles.isPriceOpen && (
                            <div className="p-2">
                                <div className="space-y-3">
                                    {/* Inputs de rango de precio */}
                                    <div className="flex gap-2 items-center">
                                        <input 
                                            type="number" 
                                            value={minInputValue}
                                            onChange={(e) => {
                                                updateMinInput(e.target.value);
                                            }}
                                            placeholder="$0" 
                                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm font-roboto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="0"
                                        />
                                        <span className="text-gray-500">-</span>
                                        <input 
                                            type="number" 
                                            value={maxInputValue}
                                            onChange={(e) => {
                                                updateMaxInput(e.target.value);
                                            }}
                                            placeholder="$2000" 
                                            className="w-20 px-2 py-1 border border-gray-300 rounded text-sm font-roboto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="0"
                                        />
                                    </div>
                                    
                                    {/* Material UI Slider */}
                                    <div className="mt-4">
                                        <RangeSlider
                                            value={priceRange}
                                            onChange={handlePriceRangeChange}
                                            min={0}
                                            max={2000}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </li>

                    {/* Filtro de Categorías */}
                    <li>
                        <div className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded" onClick={toggleCategoryFilter}>
                            <span className="font-roboto-condensed font-medium">Categoría</span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                fill="currentColor" 
                                className={`bi bi-arrow-up-short transition-transform duration-200 ${filterToggles.isCategoryOpen ? 'rotate-180' : ''}`} 
                                viewBox="0 0 16 16"
                            >
                                <path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                            </svg>
                        </div>
                        
                        {/* Filtro de categorías desplegable */}
                        {filterToggles.isCategoryOpen && (
                            <div className="flex flex-col p-2">
                                <div className="space-y-2">
                                    {/* Checkboxes para categorías */}
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <CategoryCheckbox 
                                            checked={categories.beauty}
                                            onChange={(_e, _c) => toggleCategory("beauty")}
                                        />
                                        <span className="text-sm font-roboto">Beauty</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <CategoryCheckbox 
                                            checked={categories.fragrances}
                                            onChange={(_e, _c) => toggleCategory('fragrances')}
                                        />
                                        <span className="text-sm font-roboto">Fragrances</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <CategoryCheckbox 
                                            checked={categories.furniture}
                                            onChange={(_e, _c) => toggleCategory('furniture')}
                                        />
                                        <span className="text-sm font-roboto">Furniture</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <CategoryCheckbox 
                                            checked={categories.groceries}
                                            onChange={(_e, _c) => toggleCategory('groceries')}
                                        />
                                        <span className="text-sm font-roboto">Groceries</span>
                                    </label>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </aside>
    );
}
