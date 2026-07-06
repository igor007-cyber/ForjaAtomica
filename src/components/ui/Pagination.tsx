"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Paginação"
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="cursor-pointer rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-gold-500 hover:text-gold-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Página anterior"
      >
        ←
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
            p === page
              ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
              : "border border-border text-foreground hover:border-gold-500 hover:text-gold-600"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="cursor-pointer rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-gold-500 hover:text-gold-600 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Próxima página"
      >
        →
      </button>
    </nav>
  );
}
