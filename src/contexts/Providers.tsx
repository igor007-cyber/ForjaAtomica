"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesContext";
import { ProductsProvider } from "./ProductsContext";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";

/** Composição de todos os providers globais da aplicação. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <FavoritesProvider>{children}</FavoritesProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
