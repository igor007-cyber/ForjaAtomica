import type { Category } from "@/src/types";

export const categories: Category[] = [
  {
    slug: "decoracao",
    name: "Decoração",
    description: "Vasos, luminárias e peças que transformam ambientes",
    icon: "🏺",
  },
  {
    slug: "geek",
    name: "Geek",
    description: "Itens de games, filmes, séries e cultura pop",
    icon: "🎮",
  },
  {
    slug: "brinquedos",
    name: "Brinquedos",
    description: "Diversão impressa em 3D para todas as idades",
    icon: "🧸",
  },
  {
    slug: "utilidades",
    name: "Utilidades",
    description: "Soluções práticas para o dia a dia",
    icon: "🛠️",
  },
  {
    slug: "escritorio",
    name: "Escritório",
    description: "Organizadores e acessórios para seu workspace",
    icon: "🖇️",
  },
  {
    slug: "personalizados",
    name: "Personalizados",
    description: "Criações sob medida a partir da sua ideia",
    icon: "✨",
  },
  {
    slug: "miniaturas",
    name: "Miniaturas",
    description: "Modelos detalhados, colecionáveis e RPG",
    icon: "🏰",
  },
  {
    slug: "outros",
    name: "Outros",
    description: "Protótipos, peças técnicas e muito mais",
    icon: "📦",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
