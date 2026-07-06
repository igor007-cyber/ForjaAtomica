import type { Metadata } from "next";
import { CarrinhoScreen } from "@/src/screens/vendas/CarrinhoScreen";

export const metadata: Metadata = {
  title: "Carrinho",
  description: "Revise seus itens e finalize o pedido pelo WhatsApp.",
};

export default function CarrinhoPage() {
  return <CarrinhoScreen />;
}
