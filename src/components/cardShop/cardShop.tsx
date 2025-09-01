import { useQuantityControl } from "../../hooks/useQuantityControl";
import type { CartItem } from "../../context/cartContext";

interface CardShopProps {
  product: CartItem;
  removeFromCart: (id: string | number) => void;
  updateQuantityCart: (id: string | number, newQuantity: number) => void;
}

export default function CardShop({ product, removeFromCart, updateQuantityCart }: CardShopProps) {
    const {
        currentQuantity,
        handleDecrease,
        handleIncrease,
        isAtMaxStock,
        isAtMinQuantity
    } = useQuantityControl(product);

    return (
        <div className="rounded-lg p-4 shadow-sm border-gray-700 dark:bg-gray-800 md:p-6 relative">
                {/* CONTENIDO DENTRO DEL BOX
                 */}
                <div className="space-y-4 flex flex-col md:flex-row p-1 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 justify-center items-center ">
                  <a href="#" className="shrink-0 md:order-1">
                    <img className="hidden h-20 w-20 dark:block" src={product.images[0]} alt="imac image" />
                  </a>

                  {/* INPUT DE CANTIDAD DE ITEM  CON PRECIO */}
                  <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:justify-between md:order-3">
                    <div className="flex items-center">
                      {/* BOTON DECREMENTO */}
                      <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="cursor-pointer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      onClick={handleDecrease}
                      disabled={!!isAtMinQuantity}
                      title="Quitar uno"
                      >
                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                        </svg>
                      </button>
                      {/* CANTIDAD */}
                      <input type="text"
                      id="counter-input"
                      data-input-counter
                      className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                      value={currentQuantity}
                      title="cantidad"
                      readOnly/>
                      {/* BOTON INCREMENT */}
                      <button 
                      type="button" 
                      id="increment-button" 
                      data-input-counter-increment="counter-input" 
                      className="cursor-pointer inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                      onClick={handleIncrease}
                      disabled={!!isAtMaxStock}
                      title="Agregar uno"
                      >
                        <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>

                    {/* PRECIO */}
                    <div className="text-end md:order-4 md:w-32">
                      <p className="text-base font-bold text-gray-900 dark:text-white">${product.price}</p>
                    </div>
                  </div>

                  {/* TITULO CON BOTON DE ELIMINAR */}
                  <div className=" w-full min-w-0 flex flex-col gap-1 md:order-2 md:max-w-md h-24">

                    <a href="#" className="text-base font-mono font-bold text-gray-900 hover:underline dark:text-white">{product.title}
                    </a>
                    <span className="text-md font-medium text-white">{product.category}</span>
                    <span className="text-sm font-medium text-green-400">Stock: {product.stock}</span>

                  </div>
                </div>
                <button 
                  type="button" 
                  className="group cursor-pointer absolute right-3 top-3 p-2 rounded-full 
                            bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40
                            transform transition-all duration-300 ease-in-out
                            hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-red-500/25
                            active:scale-95 active:rotate-0
                            border border-red-200 hover:border-red-300 dark:border-red-800
                            focus:outline-none focus:ring-4 focus:ring-red-500/20"
                  title="Eliminar producto"
                    onClick={() => removeFromCart(product.id)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-trash-fill text-red-500 group-hover:text-red-600 dark:text-red-400 dark:group-hover:text-red-300
                              transform transition-all duration-300 ease-in-out
                              group-hover:scale-110 group-active:scale-90" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                  </svg>
                </button>
              </div>
    );
}