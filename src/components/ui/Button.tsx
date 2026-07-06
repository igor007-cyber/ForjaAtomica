"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 font-semibold hover:from-gold-300 hover:to-gold-500 shadow-lg shadow-gold-600/20 hover:shadow-gold-500/30",
  secondary:
    "bg-forge-700 text-white hover:bg-forge-600 shadow-lg shadow-forge-900/30",
  outline:
    "border-2 border-gold-500 text-gold-600 dark:text-gold-400 hover:bg-gold-500/10",
  ghost:
    "text-foreground hover:bg-forge-700/10 dark:hover:bg-white/10",
  danger:
    "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
