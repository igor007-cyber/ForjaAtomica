"use client";

import { categories } from "@/src/data/categories";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { CategoryCard } from "@/src/components/product/CategoryCard";

export function Categories() {
  return (
    <section className="bg-surface/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Categorias"
          title="Explore por categoria"
          description="Do item geek à solução prática para o dia a dia — tem de tudo na forja."
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
