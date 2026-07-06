"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Peças entregues" },
  { value: "4.9★", label: "Avaliação média" },
  { value: "48h", label: "Prototipagem rápida" },
];

export function Hero() {
  return (
    <section className="hex-pattern relative overflow-hidden bg-forge-950 text-white">
      {/* Brilhos decorativos */}
      <div
        aria-hidden
        className="animate-glow absolute -left-32 top-10 size-96 rounded-full bg-gold-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="animate-glow absolute -right-32 bottom-0 size-96 rounded-full bg-forge-500/40 blur-[120px] [animation-delay:2.5s]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        {/* Texto */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400"
          >
            ⚛ Impressão 3D personalizada
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-6 text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl"
          >
            Sua ideia forjada
            <br />
            <span className="text-gold-gradient">átomo por átomo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            Da decoração ao protótipo funcional: produzimos peças únicas sob
            medida, com acabamento profissional e a qualidade que seu projeto
            merece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/produtos"
              className="rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-center text-base font-bold text-forge-950 shadow-xl shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500 hover:shadow-gold-500/40 active:scale-[0.98]"
            >
              🛒 Ver produtos
            </Link>
            <Link
              href="/#sobre"
              className="rounded-xl border-2 border-white/25 px-8 py-4 text-center text-base font-semibold text-white transition-all hover:border-gold-400 hover:text-gold-400 active:scale-[0.98]"
            >
              Conhecer a Forja
            </Link>
          </motion.div>

          {/* Estatísticas */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-gold-400 sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-white/60 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Logo em destaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            aria-hidden
            className="animate-glow absolute inset-0 rounded-full bg-gold-500/25 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/logo-perfil.jpg"
              alt="Logo Forja Atômica Impressão 3D"
              width={448}
              height={448}
              preload
              className="relative rounded-full shadow-2xl shadow-forge-950/60 ring-4 ring-gold-500/40"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Divisor ondulado */}
      <svg
        aria-hidden
        viewBox="0 0 1440 64"
        className="block w-full fill-background"
        preserveAspectRatio="none"
      >
        <path d="M0,32 C360,64 720,0 1080,24 C1260,36 1380,48 1440,40 L1440,64 L0,64 Z" />
      </svg>
    </section>
  );
}
