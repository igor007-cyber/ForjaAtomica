"use client";

import { useTheme } from "@/src/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-lg transition-all hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/10"
      aria-label={
        theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
      }
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
