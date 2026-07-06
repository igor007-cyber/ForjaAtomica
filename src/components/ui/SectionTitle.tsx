"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionTitleProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-10 flex flex-col gap-3 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-400">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-muted">{description}</p>
      )}
    </motion.div>
  );
}
