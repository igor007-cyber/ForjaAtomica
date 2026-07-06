export type UserRole = "cliente" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  /** Somente para mock/demo — nunca armazene senha em texto plano em produção. */
  password: string;
  role: UserRole;
  createdAt: string;
}

export type SessionUser = Omit<User, "password">;

export type CategorySlug =
  | "decoracao"
  | "geek"
  | "brinquedos"
  | "utilidades"
  | "escritorio"
  | "personalizados"
  | "miniaturas"
  | "outros";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
}

export type ProductStatus = "disponivel" | "indisponivel";

export interface Product {
  id: string;
  name: string;
  category: CategorySlug;
  description: string;
  price: number;
  stock: number;
  image: string;
  status: ProductStatus;
  featured?: boolean;
  sold?: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
}

export type SortOption =
  | "relevancia"
  | "preco-asc"
  | "preco-desc"
  | "nome-asc"
  | "recentes";

export interface ProductFilters {
  search: string;
  category: CategorySlug | "todas";
  sort: SortOption;
}

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

export interface ProductFormData {
  name: string;
  category: CategorySlug;
  description: string;
  price: string;
  stock: string;
  image: string;
  status: ProductStatus;
  featured: boolean;
}
