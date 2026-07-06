/**
 * Helpers de acesso seguro ao localStorage (SSR-safe).
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage cheio ou indisponível — falha silenciosa no demo
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const STORAGE_KEYS = {
  session: "forja:session",
  users: "forja:users",
  products: "forja:products",
  cart: "forja:cart",
  favorites: "forja:favorites",
  theme: "forja:theme",
} as const;
