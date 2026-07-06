import type { Metadata } from "next";
import { PerfilScreen } from "@/src/screens/perfil/PerfilScreen";

export const metadata: Metadata = {
  title: "Meu perfil",
};

export default function PerfilPage() {
  return <PerfilScreen />;
}
