import { mockProducts } from "@/src/data/products";
import type { Product, ProductFilters } from "@/src/types";
import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "@/src/utils/storage";

/**
 * Serviço de produtos mockado.
 * Na primeira execução os produtos de demonstração são copiados para o
 * localStorage; a partir daí o CRUD do admin opera sobre essa cópia.
 */

export function getProducts(): Product[] {
  const stored = getStorageItem<Product[] | null>(STORAGE_KEYS.products, null);
  if (stored && stored.length > 0) return stored;
  setStorageItem(STORAGE_KEYS.products, mockProducts);
  return mockProducts;
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function createProduct(
  data: Omit<Product, "id" | "createdAt" | "sold">
): Product {
  const product: Product = {
    ...data,
    id: `p-${Date.now()}`,
    sold: 0,
    createdAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_KEYS.products, [product, ...getProducts()]);
  return product;
}

export function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id" | "createdAt">>
): Product {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Produto não encontrado.");

  const updated: Product = { ...products[index], ...data };
  const next = [...products];
  next[index] = updated;
  setStorageItem(STORAGE_KEYS.products, next);
  return updated;
}

export function deleteProduct(id: string): void {
  setStorageItem(
    STORAGE_KEYS.products,
    getProducts().filter((p) => p.id !== id)
  );
}

export function decreaseStock(id: string, quantity: number): void {
  const product = getProductById(id);
  if (!product) return;
  const stock = Math.max(0, product.stock - quantity);
  updateProduct(id, {
    stock,
    sold: (product.sold ?? 0) + quantity,
    status: stock === 0 ? "indisponivel" : product.status,
  });
}

/* ---------- Consultas derivadas ---------- */

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter((p) => p.featured && p.status === "disponivel");
}

export function getBestSellers(products: Product[], limit = 4): Product[] {
  return [...products]
    .filter((p) => p.status === "disponivel")
    .sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
    .slice(0, limit);
}

export function getRecentProducts(products: Product[], limit = 4): Product[] {
  return [...products]
    .filter((p) => p.status === "disponivel")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

export function getRelatedProducts(
  products: Product[],
  product: Product,
  limit = 4
): Product[] {
  const sameCategory = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category === product.category &&
      p.status === "disponivel"
  );
  const others = products.filter(
    (p) =>
      p.id !== product.id &&
      p.category !== product.category &&
      p.status === "disponivel"
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function applyFilters(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let result = [...products];

  if (filters.search.trim()) {
    const term = filters.search.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  if (filters.category !== "todas") {
    result = result.filter((p) => p.category === filters.category);
  }

  switch (filters.sort) {
    case "preco-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "preco-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "nome-asc":
      result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
      break;
    case "recentes":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    default:
      // relevância: destaques primeiro, depois mais vendidos
      result.sort((a, b) => {
        const feat = Number(b.featured ?? false) - Number(a.featured ?? false);
        if (feat !== 0) return feat;
        return (b.sold ?? 0) - (a.sold ?? 0);
      });
  }

  return result;
}
