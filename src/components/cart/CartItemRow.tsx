"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CartItem } from "@/src/types";
import { getCategoryBySlug } from "@/src/data/categories";
import { formatCurrency } from "@/src/utils/format";
import { QuantitySelector } from "@/src/components/ui/QuantitySelector";
import { ProductImage } from "@/src/components/product/ProductImage";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity } = item;
  const category = getCategoryBySlug(product.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
    >
      {/* Imagem */}
      <Link
        href={`/produto/${product.id}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-forge-800 sm:size-28"
      >
        <ProductImage src={product.image} alt={product.name} />
      </Link>

      {/* Detalhes */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-muted">
              {category?.icon} {category?.name}
            </p>
            <Link
              href={`/produto/${product.id}`}
              className="font-display font-semibold leading-snug text-foreground transition-colors hover:text-gold-600"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-sm text-muted">
              {formatCurrency(product.price)} cada
            </p>
          </div>
          <button
            onClick={() => onRemove(product.id)}
            className="cursor-pointer rounded-lg p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
            aria-label={`Remover ${product.name} do carrinho`}
            title="Remover item"
          >
            🗑️
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantitySelector
            quantity={quantity}
            max={product.stock}
            onChange={(q) => onQuantityChange(product.id, q)}
            size="sm"
          />
          <p className="font-bold text-gold-600 dark:text-gold-400">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
