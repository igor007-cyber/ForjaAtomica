"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";

/**
 * Protege as rotas administrativas: redireciona visitantes para o login
 * e clientes comuns para a home.
 */
export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/");
    }
  }, [user, isAdmin, isLoading, router]);

  if (isLoading || !isAdmin) {
    return (
      <div className="flex flex-1 items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <span className="size-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
          <p className="text-sm text-muted">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
