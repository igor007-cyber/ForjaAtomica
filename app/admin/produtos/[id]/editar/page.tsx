import type { Metadata } from "next";
import { EditarProdutoScreen } from "@/src/screens/admin/EditarProdutoScreen";

export const metadata: Metadata = {
  title: "Editar produto | Admin",
};

// No Next 16, params é uma Promise e deve ser aguardado
export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditarProdutoScreen productId={id} />;
}
