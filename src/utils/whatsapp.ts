import type { CartItem } from "@/src/types";
import { formatCurrency } from "./format";

/** Número do WhatsApp da loja no formato internacional (só dígitos): +55 88 93300-5871. */
export const WHATSAPP_NUMBER = "5588933005871";

/**
 * Link do WhatsApp da loja. O formato `wa.me/<número>` abre a conversa em
 * qualquer aparelho e é o único que garante o pedido pré-preenchido
 * (produtos, quantidades e total) no checkout.
 */
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildOrderMessage(
  customerName: string,
  items: CartItem[],
  total: number
): string {
  const lines: string[] = [
    "🔥 *Novo pedido — Forja Atômica Impressão 3D*",
    "",
    `👤 *Cliente:* ${customerName}`,
    "",
    "🛒 *Itens do pedido:*",
  ];

  items.forEach((item, index) => {
    const subtotal = item.product.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.product.name}`,
      `   Qtd: ${item.quantity} × ${formatCurrency(item.product.price)} = ${formatCurrency(subtotal)}`
    );
  });

  lines.push("", `💰 *Total do pedido:* ${formatCurrency(total)}`);
  lines.push("", "Aguardo confirmação. Obrigado! 🙌");

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppOrder(
  customerName: string,
  items: CartItem[],
  total: number
): void {
  const message = buildOrderMessage(customerName, items, total);
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
