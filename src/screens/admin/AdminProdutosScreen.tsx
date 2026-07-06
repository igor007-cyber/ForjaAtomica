"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/src/types";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useToast } from "@/src/contexts/ToastContext";
import { getCategoryBySlug } from "@/src/data/categories";
import { formatCurrency } from "@/src/utils/format";
import { usePagination } from "@/src/hooks/usePagination";
import { useDebounce } from "@/src/hooks/useDebounce";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminHeader } from "@/src/components/admin/AdminHeader";
import { SearchBar } from "@/src/components/product/SearchBar";
import { ProductImage } from "@/src/components/product/ProductImage";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { ConfirmModal } from "@/src/components/ui/ConfirmModal";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { Pagination } from "@/src/components/ui/Pagination";
import { Skeleton } from "@/src/components/ui/Skeleton";

const PAGE_SIZE = 10;

export function AdminProdutosScreen() {
  const { products, isLoading, deleteProduct } = useProducts();
  const { showToast } = useToast();

  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => p.name.toLowerCase().includes(term));
  }, [products, debouncedSearch]);

  const { page, totalPages, pageItems, setPage } = usePagination(
    filtered,
    PAGE_SIZE
  );

  function handleDelete() {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id);
    showToast(`"${productToDelete.name}" excluído com sucesso`, "info");
    setProductToDelete(null);
  }

  return (
    <AdminGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <AdminHeader
          title="Produtos"
          description={`${products.length} produtos cadastrados`}
          action={
            <Link href="/admin/produtos/novo">
              <Button>➕ Novo produto</Button>
            </Link>
          }
        />

        <div className="mb-6 max-w-md">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Buscar por nome..."
          />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-2xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="📦"
            title="Nenhum produto encontrado"
            description={
              search
                ? "Nenhum produto corresponde à busca."
                : "Cadastre seu primeiro produto para começar a vender."
            }
            action={
              <Link href="/admin/produtos/novo">
                <Button>Cadastrar produto</Button>
              </Link>
            }
          />
        ) : (
          <>
            {/* Tabela responsiva */}
            <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-forge-950/5 text-xs uppercase tracking-wider text-muted dark:bg-white/5">
                    <th className="px-5 py-4 font-semibold">Produto</th>
                    <th className="px-5 py-4 font-semibold">Categoria</th>
                    <th className="px-5 py-4 font-semibold">Preço</th>
                    <th className="px-5 py-4 font-semibold">Estoque</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((product) => {
                    const category = getCategoryBySlug(product.category);
                    return (
                      <tr
                        key={product.id}
                        className="border-b border-border/60 transition-colors last:border-0 hover:bg-gold-500/5"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-forge-800">
                              <ProductImage
                                src={product.image}
                                alt={product.name}
                              />
                            </span>
                            <div className="min-w-0">
                              <p className="max-w-56 truncate font-medium text-foreground">
                                {product.name}
                              </p>
                              {product.featured && (
                                <span className="text-xs text-gold-600 dark:text-gold-400">
                                  ⭐ Destaque
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-muted">
                          {category?.icon} {category?.name}
                        </td>
                        <td className="px-5 py-3 font-semibold text-foreground tabular-nums">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className={`tabular-nums ${
                              product.stock === 0
                                ? "font-semibold text-red-500"
                                : product.stock <= 5
                                  ? "font-semibold text-gold-600"
                                  : "text-muted"
                            }`}
                          >
                            {product.stock} un.
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <Badge
                            variant={
                              product.status === "disponivel"
                                ? "success"
                                : "danger"
                            }
                          >
                            {product.status === "disponivel"
                              ? "Disponível"
                              : "Indisponível"}
                          </Badge>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex justify-end gap-1.5">
                            <Link
                              href={`/produto/${product.id}`}
                              className="rounded-lg p-2 transition-colors hover:bg-forge-500/10"
                              title="Visualizar na loja"
                              aria-label={`Visualizar ${product.name}`}
                            >
                              👁️
                            </Link>
                            <Link
                              href={`/admin/produtos/${product.id}/editar`}
                              className="rounded-lg p-2 transition-colors hover:bg-gold-500/15"
                              title="Editar"
                              aria-label={`Editar ${product.name}`}
                            >
                              ✏️
                            </Link>
                            <button
                              onClick={() => setProductToDelete(product)}
                              className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-red-500/10"
                              title="Excluir"
                              aria-label={`Excluir ${product.name}`}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}

        <ConfirmModal
          isOpen={productToDelete !== null}
          title="Excluir produto?"
          message={`"${productToDelete?.name}" será removido permanentemente do catálogo.`}
          confirmLabel="Excluir"
          danger
          onConfirm={handleDelete}
          onCancel={() => setProductToDelete(null)}
        />
      </div>
    </AdminGuard>
  );
}
