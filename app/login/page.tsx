import type { Metadata } from "next";
import { LoginScreen } from "@/src/screens/login/LoginScreen";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta na Forja Atômica.",
};

export default function LoginPage() {
  return <LoginScreen />;
}
