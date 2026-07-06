import type { Metadata } from "next";
import { ProdutoDetalheScreen } from "@/src/screens/vendas/ProdutoDetalheScreen";
import { mockProducts } from "@/src/data/products";

export const metadata: Metadata = {
  title: "Detalhes do produto",
};

// Export estático: gera uma página por produto conhecido.
export function generateStaticParams() {
  return mockProducts.map((product) => ({ id: product.id }));
}

// Ids fora da lista acima retornam 404 (não há servidor para renderizar sob demanda).
export const dynamicParams = false;

// No Next 16, params é uma Promise e deve ser aguardado
export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProdutoDetalheScreen productId={id} />;
}
