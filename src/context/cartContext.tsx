import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
  sku: string;
  stock: number;
  // otros campos opcionales:
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string | number) => void;
  updateQuantityCart: (itemId: string | number, newQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


const STORAGE_KEY = "cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
      } catch {
        console.error("Error al guardar el carrito en localStorage");
      }
    }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const itemInCartIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (itemInCartIndex >= 0) {
      return;
    }
    setCartItems((prevItems) => [
      ...prevItems,
      { ...item, quantity: 1 }
    ]);
  };
  
  const updateQuantityCart = (itemId: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId: string | number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantityCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;