import type { CartItem } from "../context/cartContext";

export async function useMP(
  cartItems: Array<CartItem>,

) {
  try {

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const payload = {
      items: cartItems.map(ci => ({
        id: ci.id,
        quantity: ci.quantity,
        title: ci.title,
        unit_price: ci.price,
        picture_url: ci.picture_url?.[0] ?? null, // evita el TypeError
        category: ci.category,
        description: ci.description,
      })),
    };
    console.log("Payload para MP:", payload);
    const response = await fetch("https://ecommerce-back-ofd9.onrender.com/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Error al crear el pago");
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error en useMP:", error);
    throw error;
  }
}
