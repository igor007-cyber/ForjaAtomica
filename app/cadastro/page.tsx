import type { Metadata } from "next";
import { CadastroScreen } from "@/src/screens/cadastro/CadastroScreen";

export const metadata: Metadata = {
  title: "Criar conta",
  description: "Cadastre-se para comprar produtos impressos em 3D.",
};

export default function CadastroPage() {
  return <CadastroScreen />;
}
