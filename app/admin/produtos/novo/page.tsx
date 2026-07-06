import type { Metadata } from "next";
import { NovoProdutoScreen } from "@/src/screens/admin/NovoProdutoScreen";

export const metadata: Metadata = {
  title: "Novo produto | Admin",
};

export default function NovoProdutoPage() {
  return <NovoProdutoScreen />;
}
