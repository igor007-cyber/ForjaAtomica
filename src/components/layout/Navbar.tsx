"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCart } from "@/src/contexts/CartContext";
import { useToast } from "@/src/contexts/ToastContext";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/favoritos", label: "Favoritos" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const { totalItems } = useCart();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    showToast("Você saiu da sua conta. Até logo! 👋", "info");
    router.push("/");
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Forja Atômica — página inicial"
        >
          <Image
            src="/logo-perfil.jpg"
            alt="Logo Forja Atômica"
            width={40}
            height={40}
            className="rounded-full ring-2 ring-gold-500/50"
          />
          <span className="hidden font-display text-lg font-bold uppercase tracking-wider text-foreground sm:block">
            Forja <span className="text-gold-gradient">Atômica</span>
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-gold-500/15 text-gold-600 dark:text-gold-400"
                    : "text-foreground hover:bg-forge-700/10 dark:hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {isAdmin && (
            <li>
              <Link
                href="/admin"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive("/admin")
                    ? "bg-gold-500/15 text-gold-600 dark:text-gold-400"
                    : "text-foreground hover:bg-forge-700/10 dark:hover:bg-white/10"
                }`}
              >
                ⚙️ Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/carrinho"
            className="relative flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-lg transition-all hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/10"
            aria-label={`Carrinho com ${totalItems} itens`}
          >
            🛒
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-[10px] font-bold text-forge-950"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/perfil"
                className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-gold-500"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-forge-950">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-24 truncate">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:text-red-500"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-2 text-sm font-semibold text-forge-950 shadow-lg shadow-gold-600/20 transition-all hover:from-gold-300 hover:to-gold-500 md:block"
            >
              Entrar
            </Link>
          )}

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-foreground md:hidden"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-surface md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-gold-500/15 text-gold-600 dark:text-gold-400"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground"
                  >
                    ⚙️ Painel Admin
                  </Link>
                </li>
              )}
              <li className="mt-2 border-t border-border pt-3">
                {user ? (
                  <div className="flex items-center justify-between px-4">
                    <Link
                      href="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium text-foreground"
                    >
                      👤 {user.name.split(" ")[0]}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer text-sm text-red-500"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-4 py-3 text-center text-sm font-semibold text-forge-950"
                  >
                    Entrar / Cadastrar
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
