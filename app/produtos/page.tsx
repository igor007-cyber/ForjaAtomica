import { Suspense } from "react";
import type { Metadata } from "next";
import { ProdutosScreen } from "@/src/screens/vendas/ProdutosScreen";
import { ProductGridSkeleton } from "@/src/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo completo de peças impressas em 3D: decoração, geek, utilidades, miniaturas e muito mais.",
};

export default function ProdutosPage() {
  return (
    // Suspense exigido pelo uso de useSearchParams na screen
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <ProductGridSkeleton />
        </div>
      }
    >
      <ProdutosScreen />
    </Suspense>
  );
}
