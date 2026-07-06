"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  footer: ReactNode;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, footer, children }: AuthCardProps) {
  return (
    <div className="hex-pattern flex flex-1 items-center justify-center bg-forge-950 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-gold-500/20 bg-surface p-8 shadow-2xl shadow-forge-950/50"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" aria-label="Voltar à página inicial">
            <Image
              src="/logo-perfil.jpg"
              alt="Logo Forja Atômica"
              width={72}
              height={72}
              className="rounded-full ring-4 ring-gold-500/40"
            />
          </Link>
          <h1 className="font-display mt-4 text-2xl font-bold uppercase tracking-wide text-foreground">
            {title}
          </h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>

        {children}

        <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted">
          {footer}
        </div>
      </motion.div>
    </div>
  );
}
