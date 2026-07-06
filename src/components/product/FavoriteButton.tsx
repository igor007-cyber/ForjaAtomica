"use client";

import { motion } from "framer-motion";
import { useFavorites } from "@/src/contexts/FavoritesContext";
import { useToast } from "@/src/contexts/ToastContext";

interface FavoriteButtonProps {
  productId: string;
  productName: string;
  className?: string;
}

export function FavoriteButton({
  productId,
  productName,
  className = "",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const favorite = isFavorite(productId);

  function handleToggle() {
    const added = toggleFavorite(productId);
    showToast(
      added
        ? `${productName} adicionado aos favoritos ❤️`
        : `${productName} removido dos favoritos`,
      added ? "success" : "info"
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggle();
      }}
      className={`flex size-9 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all ${
        favorite
          ? "border-red-400/50 bg-red-500/15 text-red-500"
          : "border-white/20 bg-forge-950/40 text-white/80 hover:text-red-400"
      } ${className}`}
      aria-label={
        favorite
          ? `Remover ${productName} dos favoritos`
          : `Adicionar ${productName} aos favoritos`
      }
      aria-pressed={favorite}
    >
      {favorite ? "❤️" : "🤍"}
    </motion.button>
  );
}
