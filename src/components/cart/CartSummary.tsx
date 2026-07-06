"use client";

import type { CartItem } from "@/src/types";
import { formatCurrency } from "@/src/utils/format";
import { Button } from "@/src/components/ui/Button";

interface CartSummaryProps {
  items: CartItem[];
  total: number;
  isSubmitting: boolean;
  onCheckout: () => void;
}

export function CartSummary({
  items,
  total,
  isSubmitting,
  onCheckout,
}: CartSummaryProps) {
  return (
    <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-lg lg:sticky lg:top-24">
      <h2 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
        Resumo do pedido
      </h2>

      <ul className="mt-4 space-y-2 border-b border-border pb-4 text-sm">
        {items.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between gap-3 text-muted"
          >
            <span className="line-clamp-1">
              {item.quantity}× {item.product.name}
            </span>
            <span className="shrink-0 tabular-nums">
              {formatCurrency(item.product.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between text-sm text-muted">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatCurrency(total)}</span>
      </div>
      <div className="mt-1 flex justify-between text-sm text-muted">
        <span>Frete</span>
        <span>a combinar 💬</span>
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <span className="font-semibold text-foreground">Total</span>
        <span className="text-2xl font-bold text-gold-600 dark:text-gold-400 tabular-nums">
          {formatCurrency(total)}
        </span>
      </div>

      <Button
        size="lg"
        className="mt-6 w-full"
        onClick={onCheckout}
        isLoading={isSubmitting}
      >
        💬 Finalizar pelo WhatsApp
      </Button>

      <p className="mt-3 text-center text-xs text-muted">
        Você será redirecionado ao WhatsApp com o pedido montado — combinamos
        pagamento e entrega por lá.
      </p>
    </aside>
  );
}
