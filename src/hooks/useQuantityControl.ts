import { useCartContext } from "./useCartContext";
import { useState } from "react";
import type { CartItem } from "../context/cartContext";

export const useQuantityControl = (product: CartItem) => {
  const { cartItems, updateQuantityCart } = useCartContext();
  
  const [draftQty, setDraftQty] = useState<number>(1);

  // ✅ Lógica reutilizable
  const cartItem = cartItems.find(item => item.id === product.id);

  const isInCart = !!cartItem;

  const currentQuantity = cartItem ? cartItem.quantity : 1;

  const handleDecrease = () => {
    console.log("➖ Disminuyendo cantidad para:", product.title);
    if (currentQuantity <= 1) return;
    if (isInCart) {
      updateQuantityCart(product.id, currentQuantity - 1);
    } else {
      setDraftQty(q => Math.max(1, q - 1));
    }
  };

  const handleIncrease = () => {
    console.log("➕ Aumentando cantidad para:", product.title);
    const max = product.stock ?? Infinity;
    if (currentQuantity >= max) {
      alert(`Stock máximo disponible: ${product.stock ?? 0}`);
      return;
    }
    if (isInCart) {
      updateQuantityCart(product.id, currentQuantity + 1);
    } else {
      setDraftQty(q => q + 1);
    }
  };

  return {
    currentQuantity,
    handleDecrease,
    handleIncrease,
    cartItem,
    isAtMaxStock: product.stock && currentQuantity >= product.stock,
    isAtMinQuantity: currentQuantity <= 1
  };
};
// import { useEffect, useState } from "react";

// type Options = {
//   initial?: number;
//   min?: number;
//   max?: number; // stock disponible
// };

// export const useQuantityControl = ({ initial = 1, min = 1, max = Infinity }: Options) => {
//   const clamp = (v: number) => Math.max(min, Math.min(v, max));

//   const [qty, setQty] = useState<number>(clamp(initial));

//   // Si cambian los límites (p.ej. llega el stock), re-clampear
//   useEffect(() => {
//     setQty(q => clamp(q));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [min, max]);

//   const handleDecrease = () => setQty(q => Math.max(min, q - 1));
//   const handleIncrease = () => setQty(q => Math.min(max, q + 1));

//   return {
//     currentQuantity: qty,
//     handleDecrease,
//     handleIncrease,
//     isAtMaxStock: qty >= max,
//     isAtMinQuantity: qty <= min,
//     setQuantity: setQty,
//   };
// };