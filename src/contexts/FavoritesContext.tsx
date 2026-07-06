"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { useLocalStorageState } from "@/src/hooks/useLocalStorageState";
import { STORAGE_KEYS } from "@/src/utils/storage";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorageState<string[]>(
    STORAGE_KEYS.favorites,
    []
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites]
  );

  /** Retorna true se o produto foi adicionado, false se removido. */
  const toggleFavorite = useCallback(
    (productId: string) => {
      const added = !favorites.includes(productId);
      setFavorites((prev) =>
        added ? [...prev, productId] : prev.filter((id) => id !== productId)
      );
      return added;
    },
    [favorites, setFavorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites deve ser usado dentro de FavoritesProvider"
    );
  }
  return context;
}
