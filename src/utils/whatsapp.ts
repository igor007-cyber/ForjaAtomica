import type { CartItem } from "@/src/types";
import { formatCurrency } from "./format";

/** Número do WhatsApp da loja no formato internacional (só dígitos): +55 88 99330-0587. */
export const WHATSAPP_NUMBER = "5588993300587";

/**
 * Base usada para MONTAR O PEDIDO. O formato `wa.me/<número>` é o único que
 * garante o texto pré-preenchido (produtos, quantidades e total) de forma
 * confiável em todos os dispositivos.
 */
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Link oficial curto da loja, usado nos botões simples de contato (rodapé,
 * página inicial). Abre a mesma conversa, mas NÃO aceita pedido pré-preenchido
 * — por isso o checkout usa `WHATSAPP_BASE_URL` acima.
 */
export const WHATSAPP_CONTACT_URL = "https://wa.me/message/5I52HAIMSCDDN1";

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
