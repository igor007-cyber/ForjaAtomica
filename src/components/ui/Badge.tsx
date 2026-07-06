import type { ReactNode } from "react";

type BadgeVariant = "gold" | "teal" | "success" | "danger" | "neutral";

const variants: Record<BadgeVariant, string> = {
  gold: "bg-gold-500/15 text-gold-700 dark:text-gold-400 border-gold-500/30",
  teal: "bg-forge-600/10 text-forge-600 dark:text-forge-500 dark:bg-forge-500/15 border-forge-600/25 dark:border-forge-500/40",
  success:
    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  danger: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30",
  neutral: "bg-muted/10 text-muted border-border",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
