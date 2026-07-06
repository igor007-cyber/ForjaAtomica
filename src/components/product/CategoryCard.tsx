"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/src/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
    >
      <Link
        href={`/produtos?categoria=${category.slug}`}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-xl hover:shadow-gold-500/10"
      >
        <span
          className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-forge-700 to-forge-900 text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          aria-hidden
        >
          {category.icon}
        </span>
        <div>
          <h3 className="font-display font-semibold text-foreground transition-colors group-hover:text-gold-600 dark:group-hover:text-gold-400">
            {category.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted">
            {category.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
