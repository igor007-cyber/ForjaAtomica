"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/src/types";
import { getCategoryBySlug } from "@/src/data/categories";
import { useCart } from "@/src/contexts/CartContext";
import { useToast } from "@/src/contexts/ToastContext";
import { formatCurrency } from "@/src/utils/format";
import { Badge } from "@/src/components/ui/Badge";
import { FavoriteButton } from "./FavoriteButton";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const category = getCategoryBySlug(product.category);
  const available = product.status === "disponivel" && product.stock > 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (!available) return;
    addItem(product);
    showToast(`${product.name} adicionado ao carrinho 🛒`);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.07 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/10"
    >
      <Link
        href={`/produto/${product.id}`}
        className="block"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        {/* Imagem */}
        <div className="relative aspect-square overflow-hidden bg-forge-800">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="transition-transform duration-500 group-hover:scale-108"
          />

          {/* Selos */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.featured && <Badge variant="gold">⭐ Destaque</Badge>}
            {!available && <Badge variant="danger">Indisponível</Badge>}
            {available && product.stock <= 5 && (
              <Badge variant="danger">Últimas unidades!</Badge>
            )}
          </div>

          <FavoriteButton
            productId={product.id}
            productName={product.name}
            className="absolute right-3 top-3"
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col gap-2 p-4">
          <Badge variant="teal" className="self-start">
            {category?.icon} {category?.name ?? product.category}
          </Badge>
          <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-gold-600 dark:text-gold-400">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={!available}
          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2.5 text-sm font-semibold text-forge-950 shadow-md shadow-gold-600/15 transition-all hover:from-gold-300 hover:to-gold-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-0"
        >
          {available ? "🛒 Comprar" : "Esgotado"}
        </button>
      </div>
    </motion.article>
  );
}
