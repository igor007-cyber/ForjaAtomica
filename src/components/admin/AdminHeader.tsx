"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const adminLinks = [
  { href: "/admin", label: "📊 Dashboard" },
  { href: "/admin/produtos", label: "📦 Produtos" },
  { href: "/admin/produtos/novo", label: "➕ Novo produto" },
];

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  const pathname = usePathname();

  return (
    <div className="mb-8">
      {/* Navegação interna do admin */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              pathname === link.href
                ? "bg-gradient-to-r from-gold-400 to-gold-600 text-forge-950 shadow-lg shadow-gold-600/25"
                : "border border-border bg-surface text-foreground hover:border-gold-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-foreground">
            {title}
          </h1>
          {description && <p className="mt-1 text-muted">{description}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}
