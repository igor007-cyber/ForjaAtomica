"use client";

import Link from "next/link";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useFavorites } from "@/src/contexts/FavoritesContext";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/src/components/ui/Skeleton";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { Button } from "@/src/components/ui/Button";

export function FavoritosScreen() {
  const { products, isLoading } = useProducts();
  const { favorites } = useFavorites();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
          Meus <span className="text-gold-gradient">favoritos</span>
        </h1>
        <p className="mt-2 text-muted">
          {favoriteProducts.length}{" "}
          {favoriteProducts.length === 1
            ? "produto favoritado"
            : "produtos favoritados"}
        </p>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : favoriteProducts.length === 0 ? (
        <EmptyState
          icon="❤️"
          title="Nenhum favorito ainda"
          description="Toque no coração dos produtos que você ama para salvá-los aqui."
          action={
            <Link href="/produtos">
              <Button>Explorar produtos</Button>
            </Link>
          }
        />
      ) : (
        <ProductGrid products={favoriteProducts} />
      )}
    </div>
  );
}
