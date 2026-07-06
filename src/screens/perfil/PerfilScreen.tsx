"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/src/contexts/AuthContext";
import { useFavorites } from "@/src/contexts/FavoritesContext";
import { useCart } from "@/src/contexts/CartContext";
import { useToast } from "@/src/contexts/ToastContext";
import { formatDate } from "@/src/utils/format";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { EmptyState } from "@/src/components/ui/EmptyState";

export function PerfilScreen() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const { favorites } = useFavorites();
  const { totalItems } = useCart();
  const { showToast } = useToast();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-32">
        <span className="size-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          icon="🔐"
          title="Você não está logado"
          description="Entre na sua conta para ver seu perfil."
          action={
            <Link href="/login">
              <Button>Fazer login</Button>
            </Link>
          }
        />
      </div>
    );
  }

  function handleLogout() {
    logout();
    showToast("Você saiu da sua conta. Até logo! 👋", "info");
    router.push("/");
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-border bg-surface shadow-xl"
      >
        {/* Cabeçalho */}
        <div className="hex-pattern relative bg-forge-950 px-8 pb-16 pt-10 text-center text-white">
          <span className="mx-auto flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display text-4xl font-bold text-forge-950 ring-4 ring-gold-500/30">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <h1 className="font-display mt-4 text-2xl font-bold uppercase tracking-wide">
            {user.name}
          </h1>
          <p className="mt-1 text-sm text-white/70">{user.email}</p>
          <div className="mt-3 flex justify-center">
            <Badge variant={user.role === "admin" ? "gold" : "teal"}>
              {user.role === "admin" ? "⚙️ Administrador" : "👤 Cliente"}
            </Badge>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          <div className="px-4 py-6 text-center">
            <p className="font-display text-2xl font-bold text-gold-600 dark:text-gold-400">
              {favorites.length}
            </p>
            <p className="mt-1 text-xs text-muted">Favoritos</p>
          </div>
          <div className="px-4 py-6 text-center">
            <p className="font-display text-2xl font-bold text-gold-600 dark:text-gold-400">
              {totalItems}
            </p>
            <p className="mt-1 text-xs text-muted">Itens no carrinho</p>
          </div>
          <div className="px-4 py-6 text-center">
            <p className="font-display text-2xl font-bold text-gold-600 dark:text-gold-400">
              {formatDate(user.createdAt)}
            </p>
            <p className="mt-1 text-xs text-muted">Membro desde</p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3 p-8 sm:flex-row sm:justify-center">
          <Link href="/favoritos" className="sm:w-auto">
            <Button variant="outline" className="w-full">
              ❤️ Meus favoritos
            </Button>
          </Link>
          <Link href="/carrinho" className="sm:w-auto">
            <Button variant="secondary" className="w-full">
              🛒 Meu carrinho
            </Button>
          </Link>
          {user.role === "admin" && (
            <Link href="/admin" className="sm:w-auto">
              <Button className="w-full">⚙️ Painel admin</Button>
            </Link>
          )}
          <Button variant="danger" onClick={handleLogout}>
            Sair da conta
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
