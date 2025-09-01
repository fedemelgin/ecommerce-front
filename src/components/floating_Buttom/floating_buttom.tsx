import { useCartContext } from "../../hooks/useCartContext";
import { useLocation } from "react-router-dom";

interface FloatingButtonProps {
  onOpenSidebar: () => void;
}

export function FloatingButton({ onOpenSidebar }: FloatingButtonProps) {
  const { cartItems } = useCartContext();
  const location = useLocation();

  if(location.pathname !== '/carrito'){
      return (
        
        <button className="cursor-pointer bg-white w-16 h-16 rounded-full  fixed bottom-4 right-4 flex items-center justify-center z-[150] shadow-[0px_0px_7px_1px_rgba(0,_0,_0,_0.35)] hover:scale-110 hover:shadow-lg transition-all duration-200" onClick={onOpenSidebar}>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center z-[151]">
              {cartItems.length > 99 ? '99+' : cartItems.length}
            </span>
          )}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20"
            fill="currentColor" 
            className="bi bi-bag-fill text-gray-700"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z"/>
          </svg>
        </button>
      );
  }
}