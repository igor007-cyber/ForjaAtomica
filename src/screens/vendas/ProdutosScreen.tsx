"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CategorySlug, SortOption } from "@/src/types";
import { useProducts } from "@/src/contexts/ProductsContext";
import { applyFilters } from "@/src/services/productService";
import { getCategoryBySlug } from "@/src/data/categories";
import { useDebounce } from "@/src/hooks/useDebounce";
import { usePagination } from "@/src/hooks/usePagination";
import { SearchBar } from "@/src/components/product/SearchBar";
import { Filters } from "@/src/components/product/Filters";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/src/components/ui/Skeleton";
import { Pagination } from "@/src/components/ui/Pagination";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { Button } from "@/src/components/ui/Button";

const PAGE_SIZE = 8;

export function ProdutosScreen() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria");

  const { products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategorySlug | "todas">(
    getCategoryBySlug(initialCategory ?? "")?.slug ?? "todas"
  );
  const [sort, setSort] = useState<SortOption>("relevancia");

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(
    () =>
      applyFilters(products, {
        search: debouncedSearch,
        category,
        sort,
      }),
    [products, debouncedSearch, category, sort]
  );

  const { page, totalPages, pageItems, setPage } = usePagination(
    filtered,
    PAGE_SIZE
  );

  function clearFilters() {
    setSearch("");
    setCategory("todas");
    setSort("relevancia");
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
          Nossos <span className="text-gold-gradient">produtos</span>
        </h1>
        <p className="mt-2 text-muted">
          {isLoading
            ? "Carregando catálogo..."
            : `${filtered.length} ${
                filtered.length === 1
                  ? "produto encontrado"
                  : "produtos encontrados"
              }`}
        </p>
      </div>

      {/* Busca e filtros */}
      <div className="mb-8 flex flex-col gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <Filters
          category={category}
          sort={sort}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />
      </div>

      {/* Lista */}
      {isLoading ? (
        <ProductGridSkeleton count={PAGE_SIZE} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Nenhum produto encontrado"
          description="Tente ajustar a busca ou remover os filtros aplicados."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          }
        />
      ) : (
        <>
          <ProductGrid products={pageItems} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}
