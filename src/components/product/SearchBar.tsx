"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar produtos...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <span
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden
      >
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar produtos por nome"
        className="w-full rounded-xl border border-border bg-surface py-3 pl-11 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted/70 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/25"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted transition-colors hover:text-foreground"
          aria-label="Limpar busca"
        >
          ✕
        </button>
      )}
    </div>
  );
}
