"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { useToast } from "@/src/contexts/ToastContext";
import { AuthCard } from "@/src/components/auth/AuthCard";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function CadastroScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (name.trim().length < 3) {
      next.name = "Informe seu nome completo (mínimo 3 caracteres).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Informe um e-mail válido.";
    }
    if (password.length < 6) {
      next.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "As senhas não conferem.";
    }
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      try {
        const session = register(name, email, password);
        showToast(
          `Conta criada com sucesso! Bem-vindo, ${session.name.split(" ")[0]} 🎉`
        );
        router.push("/");
      } catch (err) {
        setErrors({
          general:
            err instanceof Error ? err.message : "Erro ao criar a conta.",
        });
        setIsSubmitting(false);
      }
    }, 500);
  }

  return (
    <AuthCard
      title="Criar conta"
      subtitle="Cadastre-se para comprar e favoritar produtos"
      footer={
        <>
          Já tem conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-gold-600 transition-colors hover:text-gold-500 dark:text-gold-400"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          icon="👤"
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          icon="✉️"
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          icon="🔒"
        />
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          icon="🔒"
        />

        {errors.general && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400"
          >
            {errors.general}
          </p>
        )}

        <Button type="submit" size="lg" isLoading={isSubmitting}>
          Criar minha conta
        </Button>
      </form>
    </AuthCard>
  );
}
