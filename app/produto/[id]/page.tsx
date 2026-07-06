import type { Metadata } from "next";
import { ProdutoDetalheScreen } from "@/src/screens/vendas/ProdutoDetalheScreen";

export const metadata: Metadata = {
  title: "Detalhes do produto",
};

// No Next 16, params é uma Promise e deve ser aguardado
export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProdutoDetalheScreen productId={id} />;
}
