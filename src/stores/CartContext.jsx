import { createContext, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("outdoor-gear-cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (item, options = {}) => {
    setCart((current) => {
      const key = `${item.productId}-${item.colorId}-${item.size}`;
      const existing = current.find((cartItem) => cartItem.key === key);
      const mode = options.mode ?? "increment";

      if (existing) {
        return current.map((cartItem) =>
          cartItem.key === key
            ? {
                ...cartItem,
                ...item,
                key,
                quantity: Math.min(
                  mode === "replace"
                    ? item.quantity
                    : cartItem.quantity + item.quantity,
                  item.availableStock,
                ),
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

  const updateQuantity = (key, quantity) => {
    setCart((current) =>
      current.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: Math.min(Math.max(quantity, 1), item.availableStock),
            }
          : item,
      ),
    );
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
      updateQuantity,
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
