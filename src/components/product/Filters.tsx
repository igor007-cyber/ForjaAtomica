"use client";

import type { CategorySlug, SortOption } from "@/src/types";
import { categories } from "@/src/data/categories";

interface FiltersProps {
  category: CategorySlug | "todas";
  sort: SortOption;
  onCategoryChange: (category: CategorySlug | "todas") => void;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "nome-asc", label: "Nome (A–Z)" },
  { value: "recentes", label: "Mais recentes" },
];

export function Filters({
  category,
  sort,
  onCategoryChange,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Ordenação */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">Filtrar e ordenar</p>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Ordenar produtos"
          className="cursor-pointer rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categorias em chips roláveis */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filtrar por categoria"
      >
        <button
          onClick={() => onCategoryChange("todas")}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
            category === "todas"
              ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
              : "border border-border bg-surface text-foreground hover:border-gold-500"
          }`}
        >
          Todas
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => onCategoryChange(c.slug)}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
              category === c.slug
                ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
                : "border border-border bg-surface text-foreground hover:border-gold-500"
            }`}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
