"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { useToast } from "@/src/contexts/ToastContext";
import { AuthCard } from "@/src/components/auth/AuthCard";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

export function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    setIsSubmitting(true);
    // pequeno atraso para simular chamada de API e exibir o loading
    window.setTimeout(() => {
      try {
        const session = login(email, password);
        showToast(`Bem-vindo de volta, ${session.name.split(" ")[0]}! ⚛`);
        router.push(session.role === "admin" ? "/admin" : "/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao entrar.");
        setIsSubmitting(false);
      }
    }, 500);
  }

  return (
    <AuthCard
      title="Entrar na Forja"
      subtitle="Acesse sua conta para acompanhar seus pedidos"
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link
            href="/cadastro"
            className="font-semibold text-gold-600 transition-colors hover:text-gold-500 dark:text-gold-400"
          >
            Cadastre-se grátis
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon="✉️"
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Sua senha"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon="🔒"
        />

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </p>
        )}

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          Entrar
        </Button>
      </form>

      {/* Credenciais de demonstração */}
      <div className="mt-5 rounded-xl border border-dashed border-gold-500/40 bg-gold-500/5 p-4 text-xs leading-relaxed text-muted">
        <p className="mb-1 font-semibold text-gold-600 dark:text-gold-400">
          🔑 Contas de demonstração
        </p>
        <p>
          <strong>Admin:</strong> admin@forjaatomica.com — admin123
        </p>
        <p>
          <strong>Cliente:</strong> maria@email.com — 123456
        </p>
      </div>
    </AuthCard>
  );
}
