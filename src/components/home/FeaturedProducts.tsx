"use client";

import Link from "next/link";
import { useProducts } from "@/src/contexts/ProductsContext";
import { getFeaturedProducts } from "@/src/services/productService";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { ProductGridSkeleton } from "@/src/components/ui/Skeleton";
import { ProductGrid } from "@/src/components/product/ProductGrid";

export function FeaturedProducts() {
  const { products, isLoading } = useProducts();
  const featured = getFeaturedProducts(products).slice(0, 8);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle
        eyebrow="Destaques"
        title="Produtos em destaque"
        description="Os queridinhos da forja: peças mais pedidas e novidades selecionadas."
      />

      {isLoading ? (
        <ProductGridSkeleton count={4} />
      ) : (
        <ProductGrid products={featured} />
      )}

      <div className="mt-10 text-center">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-gold-500 px-8 py-3.5 font-semibold text-gold-600 transition-all hover:bg-gold-500/10 dark:text-gold-400"
        >
          Ver todos os produtos →
        </Link>
      </div>
    </section>
  );
}
