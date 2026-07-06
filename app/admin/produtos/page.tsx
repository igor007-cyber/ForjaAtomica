import type { Metadata } from "next";
import { AdminProdutosScreen } from "@/src/screens/admin/AdminProdutosScreen";

export const metadata: Metadata = {
  title: "Produtos | Admin",
};

export default function AdminProdutosPage() {
  return <AdminProdutosScreen />;
}
