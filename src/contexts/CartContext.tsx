"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/src/types";
import { useLocalStorageState } from "@/src/hooks/useLocalStorageState";
import { STORAGE_KEYS } from "@/src/utils/storage";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorageState<CartItem[]>(
    STORAGE_KEYS.cart,
    []
  );

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                }
              : item
          );
        }
        return [
          ...prev,
          { product, quantity: Math.min(quantity, product.stock) },
        ];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(quantity, item.product.stock)),
              }
            : item
        )
      );
    },
    [setItems]
  );

  const clearCart = useCallback(() => setItems([]), [setItems]);

  const { totalItems, total } = useMemo(
    () => ({
      totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
      total: items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      ),
    }),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}
