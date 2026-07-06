"use client";

import { useState } from "react";
import { useProducts } from "@/src/contexts/ProductsContext";
import {
  getBestSellers,
  getRecentProducts,
} from "@/src/services/productService";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { ProductGridSkeleton } from "@/src/components/ui/Skeleton";
import { ProductGrid } from "@/src/components/product/ProductGrid";

type Tab = "vendidos" | "recentes";

export function BestSellersAndRecent() {
  const { products, isLoading } = useProducts();
  const [tab, setTab] = useState<Tab>("vendidos");

  const items =
    tab === "vendidos"
      ? getBestSellers(products, 4)
      : getRecentProducts(products, 4);

  return (
    <section className="bg-surface/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Vitrine"
          title="Mais vendidos & novidades"
        />

        {/* Abas */}
        <div
          className="mb-8 flex justify-center gap-2"
          role="tablist"
          aria-label="Vitrine de produtos"
        >
          <button
            role="tab"
            aria-selected={tab === "vendidos"}
            onClick={() => setTab("vendidos")}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              tab === "vendidos"
                ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
                : "border border-border bg-surface text-foreground hover:border-gold-500"
            }`}
          >
            🔥 Mais vendidos
          </button>
          <button
            role="tab"
            aria-selected={tab === "recentes"}
            onClick={() => setTab("recentes")}
            className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              tab === "recentes"
                ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
                : "border border-border bg-surface text-foreground hover:border-gold-500"
            }`}
          >
            ✨ Recém-chegados
          </button>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <ProductGrid key={tab} products={items} />
        )}
      </div>
    </section>
  );
}
