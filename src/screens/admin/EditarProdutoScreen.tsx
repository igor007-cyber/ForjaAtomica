"use client";

import Link from "next/link";
import { useProducts } from "@/src/contexts/ProductsContext";
import { AdminGuard } from "@/src/components/admin/AdminGuard";
import { AdminHeader } from "@/src/components/admin/AdminHeader";
import { ProductForm } from "@/src/components/admin/ProductForm";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { Button } from "@/src/components/ui/Button";
import { Skeleton } from "@/src/components/ui/Skeleton";

interface EditarProdutoScreenProps {
  productId: string;
}

export function EditarProdutoScreen({ productId }: EditarProdutoScreenProps) {
  const { products, isLoading } = useProducts();
  const product = products.find((p) => p.id === productId);

  return (
    <AdminGuard>
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <AdminHeader
          title="Editar produto"
          description={product ? product.name : "Carregando..."}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        ) : !product ? (
          <EmptyState
            icon="🫥"
            title="Produto não encontrado"
            description="Este produto pode ter sido excluído."
            action={
              <Link href="/admin/produtos">
                <Button>Voltar à listagem</Button>
              </Link>
            }
          />
        ) : (
          <ProductForm key={product.id} product={product} />
        )}
      </div>
    </AdminGuard>
  );
}
