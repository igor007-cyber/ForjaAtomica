"use client";

import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminHeader } from "@/src/components/admin/AdminHeader";
import { ProductForm } from "@/src/components/admin/ProductForm";

export function NovoProdutoScreen() {
  return (
    <AdminGuard>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <AdminHeader
          title="Novo produto"
          description="Cadastre uma nova peça no catálogo da forja"
        />
        <ProductForm />
      </div>
    </AdminGuard>
  );
}
