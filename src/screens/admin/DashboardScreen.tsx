"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/src/contexts/ProductsContext";
import { getCategoryBySlug } from "@/src/data/categories";
import { formatCurrency } from "@/src/utils/format";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminHeader } from "@/src/components/admin/AdminHeader";
import { Badge } from "@/src/components/ui/Badge";
import { Skeleton } from "@/src/components/ui/Skeleton";

export function DashboardScreen() {
  const { products, isLoading } = useProducts();

  const available = products.filter((p) => p.status === "disponivel");
  const outOfStock = products.filter(
    (p) => p.stock === 0 || p.status === "indisponivel"
  );
  const lowStock = products.filter(
    (p) => p.status === "disponivel" && p.stock > 0 && p.stock <= 5
  );
  const stockValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const bestSellers = [...products]
    .sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
    .slice(0, 5);

  const stats = [
    { icon: "📦", label: "Produtos cadastrados", value: String(products.length) },
    { icon: "✅", label: "Disponíveis", value: String(available.length) },
    { icon: "⚠️", label: "Estoque baixo / esgotado", value: String(lowStock.length + outOfStock.length) },
    { icon: "💰", label: "Valor em estoque", value: formatCurrency(stockValue) },
  ];

  return (
    <AdminGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <AdminHeader
          title="Dashboard"
          description="Visão geral da sua loja de impressão 3D"
        />

        {/* Métricas */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-2xl" />
              ))
            : stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                >
                  <span className="text-2xl" aria-hidden>
                    {stat.icon}
                  </span>
                  <p className="mt-2 font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{stat.label}</p>
                </motion.div>
              ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Mais vendidos */}
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="font-display mb-4 text-lg font-bold uppercase tracking-wide text-foreground">
              🔥 Mais vendidos
            </h2>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : (
              <ol className="space-y-3">
                {bestSellers.map((product, index) => (
                  <li
                    key={product.id}
                    className="flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3"
                  >
                    <span className="font-display text-lg font-bold text-gold-500">
                      {index + 1}º
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted">
                        {getCategoryBySlug(product.category)?.name} ·{" "}
                        {formatCurrency(product.price)}
                      </p>
                    </div>
                    <Badge variant="gold">{product.sold ?? 0} vendas</Badge>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Alertas de estoque */}
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <h2 className="font-display mb-4 text-lg font-bold uppercase tracking-wide text-foreground">
              ⚠️ Atenção ao estoque
            </h2>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : lowStock.length + outOfStock.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">
                🎉 Tudo certo! Nenhum produto com estoque crítico.
              </p>
            ) : (
              <ul className="space-y-3">
                {[...outOfStock, ...lowStock].slice(0, 6).map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border/60 px-4 py-3"
                  >
                    <Link
                      href={`/admin/produtos/${product.id}/editar`}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-foreground transition-colors hover:text-gold-600"
                    >
                      {product.name}
                    </Link>
                    <Badge
                      variant={product.stock === 0 ? "danger" : "gold"}
                    >
                      {product.stock === 0
                        ? "Esgotado"
                        : `${product.stock} restantes`}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </AdminGuard>
  );
}
