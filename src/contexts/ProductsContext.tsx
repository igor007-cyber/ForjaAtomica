"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/src/types";
import * as productService from "@/src/services/productService";

interface ProductsContextValue {
  products: Product[];
  isLoading: boolean;
  refresh: () => void;
  createProduct: (
    data: Omit<Product, "id" | "createdAt" | "sold">
  ) => Product;
  updateProduct: (
    id: string,
    data: Partial<Omit<Product, "id" | "createdAt">>
  ) => Product;
  deleteProduct: (id: string) => void;
  decreaseStock: (id: string, quantity: number) => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setProducts(productService.getProducts());
  }, []);

  useEffect(() => {
    // pequeno atraso artificial para demonstrar skeleton loading
    const timer = window.setTimeout(() => {
      refresh();
      setIsLoading(false);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const createProduct = useCallback<ProductsContextValue["createProduct"]>(
    (data) => {
      const product = productService.createProduct(data);
      refresh();
      return product;
    },
    [refresh]
  );

  const updateProduct = useCallback<ProductsContextValue["updateProduct"]>(
    (id, data) => {
      const product = productService.updateProduct(id, data);
      refresh();
      return product;
    },
    [refresh]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      productService.deleteProduct(id);
      refresh();
    },
    [refresh]
  );

  const decreaseStock = useCallback(
    (id: string, quantity: number) => {
      productService.decreaseStock(id, quantity);
      refresh();
    },
    [refresh]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        refresh,
        createProduct,
        updateProduct,
        deleteProduct,
        decreaseStock,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }
  return context;
}
