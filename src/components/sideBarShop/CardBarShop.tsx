import CartContext from "../../context/cartContext";
import { useCartContext } from "../../hooks/useCartContext";
import { useQuantityControl } from "../../hooks/useQuantityControl";
import type { CartItem } from "../../context/cartContext";


export function CardBarShop({ product }: { product: CartItem }) {
    const {removeFromCart} = useCartContext();

    const {
        currentQuantity,
        handleDecrease,
        handleIncrease,
        isAtMaxStock,
        isAtMinQuantity
    } = useQuantityControl(product);

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-30 flex-shrink-0">
                  <img 
                    src={product.images && product.images[0] ? product.images[0] : '/placeholder-image.jpg'} 
                    alt="Campera Bomber Reversible" 
                    className="w-full h-full object-cover rounded-md" 
                  />   
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-between flex-grow gap-2">
                  {/* Product Name */}
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">
                    {product.title}
                  </h3>
                  
                  {/* Product Details */}
                  <div className="flex flex-col gap-1 text-xs text-gray-600 mb-2">
                    <p>{product.category}</p>
                    <p>{product.availabilityStatus}</p>
                    <p className="text-green-500">{product.stock}</p>
                  </div>

                  {/* Price and Controls */}
                  <div className="flex flex-col items-start md:flex-row gap-2 justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded">


                        {/* RESTA */}
                      <button 
                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 transition-colors"
                      onClick={handleDecrease}
                      disabled={!!isAtMinQuantity}
                      title="Quitar uno"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14" />
                        </svg>
                      </button>


                        {/* VALOR */}
                      <span className="px-3 py-1 text-sm font-medium">{currentQuantity}</span>



                        {/* SUMA */}
                      <button 
                      className="cursor-pointer px-2 py-1 hover:bg-gray-100 transition-colors"
                      onClick={handleIncrease}
                      disabled={!!isAtMaxStock}
                      title="Agregar más"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-bold text-gray-800">${product.price}</span>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="flex items-center justify-center">
                    <button  type="button" title="Eliminar producto" aria-label="Eliminar producto"  className=" cursor-pointer p-2 rounded-full bg-transparent hover:scale-105"
                    onClick={() => removeFromCart(product.id)}
                    >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor"
                        className="bi bi-trash-fill 
                                transform transition-all duration-300 ease-in-out
                                group-hover:scale-110 group-active:scale-90" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                    </button>
                </div>
              </div>
            </div>
  );
}