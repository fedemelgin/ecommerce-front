type SortType =
  | "caracteristicas"
  | "alphabetic-asc"
  | "alphabetic-desc"
  | "price-asc"
  | "price-desc";

interface MenuDropDownProps {
  isOpen: boolean;
  setSortType: (type: SortType) => void;
}

export default function MenuDropDown({ isOpen, setSortType }: MenuDropDownProps) {
  return (
    <div
      className={`
        absolute top-full left-1/2 transform -translate-x-1/2  
        bg-white border border-gray-200 rounded-lg shadow-lg z-50 
        w-52 transition-all duration-300 ease-in-out origin-top
        ${isOpen ? "translate-y-0 opacity-100 scale-y-100 pointer-events-auto" : "-translate-y-2 opacity-0 scale-y-95 pointer-events-none"}
      `}
      // No uses role aquí; el role va en el <ul>
      // Evita aria-hidden dinámico. Controla visibilidad solo con CSS.
    >
      <ul role="menu" aria-label="Ordenar por" className="py-1 font-roboto">
        <li role="none">
          <button type="button" role="menuitem" onClick={() => setSortType("caracteristicas")} className="w-full text-left hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm transition-colors whitespace-nowrap">
            Características
          </button>
        </li>
        <li role="none">
          <button type="button" role="menuitem" onClick={() => setSortType("alphabetic-asc")} className="w-full text-left hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm transition-colors whitespace-nowrap">
            Alfabeticamente, A-Z
          </button>
        </li>
        <li role="none">
          <button type="button" role="menuitem" onClick={() => setSortType("alphabetic-desc")} className="w-full text-left hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm transition-colors whitespace-nowrap">
            Alfabeticamente, Z-A
          </button>
        </li>
        <li role="none">
          <button type="button" role="menuitem" onClick={() => setSortType("price-asc")} className="w-full text-left hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm transition-colors whitespace-nowrap">
            Precio menor a mayor
          </button>
        </li>
        <li role="none">
          <button type="button" role="menuitem" onClick={() => setSortType("price-desc")} className="w-full text-left hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm transition-colors whitespace-nowrap">
            Precio mayor a menor
          </button>
        </li>
      </ul>
    </div>
  );
}