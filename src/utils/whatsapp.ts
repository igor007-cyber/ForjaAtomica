import type { CartItem } from "@/src/types";
import { formatCurrency } from "./format";

/**
 * Link oficial do WhatsApp da loja.
 * Obs.: links do formato api.whatsapp.com/message/<código> não aceitam texto
 * pré-preenchido de forma garantida em todos os dispositivos; por isso o
 * parâmetro `text` é anexado como melhor esforço. Se possuir o número puro,
 * troque por `https://wa.me/55XXXXXXXXXXX` para prefill 100% confiável.
 */
export const WHATSAPP_BASE_URL =
  "https://api.whatsapp.com/message/5I52HAIMSCDDN1?autoload=1&app_absent=0&utm_source=ig";

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
  return `${WHATSAPP_BASE_URL}&text=${encodeURIComponent(message)}`;
}

export function openWhatsAppOrder(
  customerName: string,
  items: CartItem[],
  total: number
): void {
  const message = buildOrderMessage(customerName, items, total);
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}
