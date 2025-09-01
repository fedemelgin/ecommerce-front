import { useState } from "react";
import { FilterByCategory } from "../../services/filterBy";
import type { Product } from "../../types/Product";

function formatPrice(value?: number) {
  if (value == null) return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function Carousel({ category }: { category: string }) {
  const filteredProducts = FilterByCategory({ category }) as Product[];
  const productosByCategory = filteredProducts.slice(0, 3);

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? productosByCategory.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === productosByCategory.length - 1 ? 0 : prev + 1));
  };

  const handleIndicator = (idx: number) => {
    setCurrent(idx);
  };

  if (productosByCategory.length === 0) {
    return <div className="w-full h-64 bg-white flex items-center justify-center">No hay productos</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* data-carousel="slide" permite que Flowbite reconozca este carousel */}
      <div
        id="default-carousel"
        data-carousel="slide"
        className="shadow-[1px_1px_20px_rgba(0,0,0,0.1)]  rounded-md overflow-hidden bg-white w-full h-[440px] flex flex-col relative"
      >
        {/* SLIDE AREA */}
        <div className="relative flex-1 flex items-center justify-center p-4">
          {productosByCategory.map((product, index) => {
            const src = product.images && product.images.length > 0 ? product.images[0] : "";
            const isActive = index === current;
            return (
              // data-carousel-item para Flowbite; React controla la visibilidad también
              <div
                key={product.id}
                data-carousel-item
                className={`absolute inset-0 flex flex-col items-center justify-start p-4 transition-opacity duration-300 ${isActive ? "opacity-100 relative" : "opacity-0 pointer-events-none hidden"}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={src}
                    alt={product.title}
                    className="max-h-[300px] md:max-h-[320px] w-auto object-contain"
                  />
                </div>

                {/* Texto sólo para slide activo, debajo de la imagen */}
                <div className="w-full mt-3 text-center">
                  <p className="text-base font-semibold text-gray-900 truncate">{product.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{formatPrice(product.price)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BARRA INFERIOR: indicadores centrados */}
        <div className="h-20 flex items-center justify-center ">
          <div className="flex items-center gap-3" data-carousel-indicators>
            {productosByCategory.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-carousel-slide-to={idx}
                className={`w-3 h-3 rounded-full ${current === idx ? "bg-blue-500" : "bg-gray-300"}`}
                aria-current={current === idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => handleIndicator(idx)}
              />
            ))}
          </div>
        </div>

        {/* FLECHAS => posición vertical centrada (sobre el contenedor)
            data-carousel-prev / data-carousel-next permiten que Flowbite
            también reconozca los botones si su script está cargado */}
        <button
          type="button"
          data-carousel-prev
          onClick={handlePrev}
          aria-label="Previous"
          className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          data-carousel-next
          onClick={handleNext}
          aria-label="Next"
          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 border flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}