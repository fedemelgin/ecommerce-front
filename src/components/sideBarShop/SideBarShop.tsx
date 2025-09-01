import CartContext from "../../context/cartContext";
import { useCartContext } from "../../hooks/useCartContext";
import { CardBarShop } from "./CardBarShop";
import { Link,useNavigate } from "react-router";
import { useState } from "react";

interface SideBarShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideBarShop({ isOpen, onClose }: SideBarShopProps) {

  const { cartItems } = useCartContext();
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  let sum = 0;
  cartItems.forEach(item => {
    sum += item.price * item.quantity;
  });
  const TOTAL = sum.toFixed(2);

  const handlePagar = async () => {
    if (cartItems.length === 0) {
      alert("No tienes productos en el carrito");
      return;
    }

    console.log("💳 Iniciando proceso de pago...");
    setIsNavigating(true);
    
    onClose();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    navigate("/carrito");
    setIsNavigating(false);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0  z-[100]" 
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 z-[152] w-80 md:w-96 h-screen transform transition-transform duration-300 ease-in-out overflow-y-auto bg-white shadow-xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} aria-label="Shopping Cart">
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Carrito de Compras</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              title="Cerrar carrito"
              aria-label="Cerrar carrito" 
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Products Container */}
            
          <div className="flex-1 overflow-y-auto p-4">
            {/* Product Item */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CardBarShop key={item.id} product={item} />
              ))
            ) : (
              <p className="text-gray-500">No hay productos en el carrito.</p>
            )}

          </div>

          {/* Footer - Total and Checkout */}
          <div className="border-t border-gray-200 p-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-4xl">SUBTOTAL:</span>
              <span className="font-semibold">${TOTAL}</span>
            </div>
            
            {/* Shipping */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 text-xl">Envío:</span>
              <span className="text-green-600 font-medium">Gratis</span>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center mb-4 text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${TOTAL}</span>
            </div>

            {/* Checkout Button */}
            <Link to="/carrito" onClick={handlePagar}>
              <button
                disabled={isNavigating || cartItems.length === 0}
                className="w-full inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative px-5 w-full py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  {isNavigating ? 'Procesando...' : 'PAGAR'}
                </span>
              </button>
            </Link>
            
            {/* Continue Shopping */}
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-800 font-medium py-2 rounded-lg transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}