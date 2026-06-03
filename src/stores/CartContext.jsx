import { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("outdoor-gear-cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (item) => {
    setCart((current) => {
      const key = `${item.productId}-${item.colorId}-${item.size}`;
      const existing = current.find((cartItem) => cartItem.key === key);

      if (existing) {
        return current.map((cartItem) =>
          cartItem.key === key
            ? {
                ...cartItem,
                quantity: Math.min(item.quantity, item.availableStock),
              }
            : cartItem,
        );
      }

      return [...current, { ...item, key }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (key) => {
    setCart((current) => current.filter((item) => item.key !== key));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      addItem,
      cart,
      cartCount,
      cartTotal,
      isCartOpen,
      removeItem,
      setIsCartOpen,
    }),
    [cart, cartCount, cartTotal, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return value;
}
