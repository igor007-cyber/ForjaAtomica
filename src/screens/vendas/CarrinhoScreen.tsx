"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCart } from "@/src/contexts/CartContext";
import { useProducts } from "@/src/contexts/ProductsContext";
import { useToast } from "@/src/contexts/ToastContext";
import { openWhatsAppOrder } from "@/src/utils/whatsapp";
import { CartItemRow } from "@/src/components/cart/CartItemRow";
import { CartSummary } from "@/src/components/cart/CartSummary";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { Button } from "@/src/components/ui/Button";
import { ConfirmModal } from "@/src/components/ui/ConfirmModal";
import { Input } from "@/src/components/ui/Input";

export function CarrinhoScreen() {
  const { user } = useAuth();
  const { items, total, totalItems, updateQuantity, removeItem, clearCart } =
    useCart();
  const { decreaseStock } = useProducts();
  const { showToast } = useToast();

  const [guestName, setGuestName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const customerName = user?.name ?? guestName.trim();

  function handleCheckout() {
    if (items.length === 0) return;

    if (!customerName) {
      setNameError("Informe seu nome para montar o pedido.");
      return;
    }
    setNameError("");
    setIsSubmitting(true);

    // pequeno atraso para feedback visual antes de abrir o WhatsApp
    window.setTimeout(() => {
      openWhatsAppOrder(customerName, items, total);
      items.forEach((item) => decreaseStock(item.product.id, item.quantity));
      clearCart();
      setIsSubmitting(false);
      showToast("Pedido enviado! Continue a conversa no WhatsApp 💬");
    }, 600);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-20">
        <EmptyState
          icon="🛒"
          title="Seu carrinho está vazio"
          description="Explore o catálogo e adicione produtos incríveis forjados em 3D."
          action={
            <Link href="/produtos">
              <Button size="lg">Ver produtos</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
            Meu <span className="text-gold-gradient">carrinho</span>
          </h1>
          <p className="mt-2 text-muted">
            {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirmClearOpen(true)}
          className="text-red-500 hover:bg-red-500/10"
        >
          🗑️ Esvaziar carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* Itens */}
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={(id) => {
                  removeItem(id);
                  showToast("Item removido do carrinho", "info");
                }}
              />
            ))}
          </AnimatePresence>

          {/* Nome para visitantes */}
          {!user && (
            <div className="rounded-2xl border border-dashed border-gold-500/40 bg-gold-500/5 p-5">
              <p className="mb-3 text-sm text-muted">
                👤 Você não está logado. Informe seu nome para o pedido — ou{" "}
                <Link
                  href="/login"
                  className="font-semibold text-gold-600 dark:text-gold-400"
                >
                  entre na sua conta
                </Link>
                .
              </p>
              <Input
                label="Seu nome"
                placeholder="Como devemos te chamar?"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                error={nameError}
                icon="👤"
              />
            </div>
          )}
        </div>

        {/* Resumo */}
        <CartSummary
          items={items}
          total={total}
          isSubmitting={isSubmitting}
          onCheckout={handleCheckout}
        />
      </div>

      <ConfirmModal
        isOpen={confirmClearOpen}
        title="Esvaziar carrinho?"
        message="Todos os itens serão removidos do seu carrinho. Essa ação não pode ser desfeita."
        confirmLabel="Esvaziar"
        danger
        onConfirm={() => {
          clearCart();
          setConfirmClearOpen(false);
          showToast("Carrinho esvaziado", "info");
        }}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  );
}
