"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useCart } from "@/src/contexts/CartContext";
import { useToast } from "@/src/contexts/ToastContext";
import { getRelatedProducts } from "@/src/services/productService";
import { getCategoryBySlug } from "@/src/data/categories";
import { formatCurrency } from "@/src/utils/format";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { QuantitySelector } from "@/src/components/ui/QuantitySelector";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { ProductGrid } from "@/src/components/product/ProductGrid";
import { FavoriteButton } from "@/src/components/product/FavoriteButton";
import { ProductImage } from "@/src/components/product/ProductImage";

interface ProdutoDetalheScreenProps {
  productId: string;
}

export function ProdutoDetalheScreen({ productId }: ProdutoDetalheScreenProps) {
  const router = useRouter();
  const { products, isLoading } = useProducts();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          icon="🫥"
          title="Produto não encontrado"
          description="Este produto pode ter sido removido ou o link está incorreto."
          action={
            <Link href="/produtos">
              <Button>Ver todos os produtos</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const category = getCategoryBySlug(product.category);
  const available = product.status === "disponivel" && product.stock > 0;
  const related = getRelatedProducts(products, product, 4);

  function handleAddToCart(goToCart = false) {
    if (!product || !available) return;
    addItem(product, quantity);
    showToast(
      `${quantity}× ${product.name} adicionado ao carrinho 🛒`
    );
    if (goToCart) router.push("/carrinho");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted" aria-label="Navegação estrutural">
        <Link href="/" className="transition-colors hover:text-gold-600">
          Início
        </Link>
        <span aria-hidden>/</span>
        <Link href="/produtos" className="transition-colors hover:text-gold-600">
          Produtos
        </Link>
        <span aria-hidden>/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-forge-800 shadow-xl"
        >
          <ProductImage src={product.image} alt={product.name} />
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.featured && <Badge variant="gold">⭐ Destaque</Badge>}
            {!available && <Badge variant="danger">Indisponível</Badge>}
          </div>
          <FavoriteButton
            productId={product.id}
            productName={product.name}
            className="absolute right-4 top-4 size-11 text-lg"
          />
        </motion.div>

        {/* Informações */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <Badge variant="teal" className="self-start">
            {category?.icon} {category?.name ?? product.category}
          </Badge>

          <h1 className="font-display mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-4xl font-bold text-gold-600 dark:text-gold-400">
              {formatCurrency(product.price)}
            </p>
            <p className="pb-1.5 text-sm text-muted">à vista</p>
          </div>

          <p className="mt-2 text-sm text-muted">
            {available ? (
              product.stock <= 5 ? (
                <span className="font-medium text-red-500">
                  ⚠️ Apenas {product.stock} em estoque — garanta o seu!
                </span>
              ) : (
                <>✅ {product.stock} unidades em estoque</>
              )
            ) : (
              <span className="text-red-500">
                ❌ Produto temporariamente indisponível
              </span>
            )}
          </p>

          {available && (
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Quantidade:
              </span>
              <QuantitySelector
                quantity={quantity}
                max={product.stock}
                onChange={setQuantity}
              />
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              disabled={!available}
              onClick={() => handleAddToCart(true)}
              className="flex-1"
            >
              ⚡ Comprar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={!available}
              onClick={() => handleAddToCart(false)}
              className="flex-1"
            >
              🛒 Adicionar ao carrinho
            </Button>
          </div>

          {/* Garantias */}
          <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-border pt-6 text-sm text-muted sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <span aria-hidden>🚚</span> Envio para todo o Brasil
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>🛡️</span> Garantia de reimpressão
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden>💬</span> Suporte via WhatsApp
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <SectionTitle
            eyebrow="Você também pode gostar"
            title="Produtos relacionados"
            align="left"
          />
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
