import type { Metadata } from "next";
import { FavoritosScreen } from "@/src/screens/vendas/FavoritosScreen";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Seus produtos favoritos da Forja Atômica.",
};

export default function FavoritosPage() {
  return <FavoritosScreen />;
}
