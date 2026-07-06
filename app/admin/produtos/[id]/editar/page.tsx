import type { Metadata } from "next";
import { EditarProdutoScreen } from "@/src/screens/admin/EditarProdutoScreen";
import { mockProducts } from "@/src/data/products";

export const metadata: Metadata = {
  title: "Editar produto | Admin",
};

// Export estático: gera a página de edição por produto conhecido.
export function generateStaticParams() {
  return mockProducts.map((product) => ({ id: product.id }));
}

// Ids fora da lista acima retornam 404 (não há servidor para renderizar sob demanda).
export const dynamicParams = false;

// No Next 16, params é uma Promise e deve ser aguardado
export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditarProdutoScreen productId={id} />;
}
