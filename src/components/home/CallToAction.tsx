"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { WHATSAPP_CONTACT_URL } from "@/src/utils/whatsapp";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="hex-pattern relative overflow-hidden rounded-3xl bg-forge-950 px-6 py-16 text-center text-white sm:px-12"
      >
        <div
          aria-hidden
          className="animate-glow absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-[100px]"
        />

        <div className="relative">
          <span className="text-4xl" aria-hidden>
            ⚛
          </span>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            Tem uma ideia?{" "}
            <span className="text-gold-gradient">Vamos forjar juntos!</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Envie seu projeto, desenho ou apenas a ideia — a gente cuida da
            modelagem, impressão e acabamento. Orçamento rápido e sem
            compromisso.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-4 text-base font-bold text-forge-950 shadow-xl shadow-gold-600/30 transition-all hover:from-gold-300 hover:to-gold-500 active:scale-[0.98]"
            >
              💬 Pedir orçamento no WhatsApp
            </a>
            <Link
              href="/produtos"
              className="rounded-xl border-2 border-white/25 px-8 py-4 text-base font-semibold text-white transition-all hover:border-gold-400 hover:text-gold-400 active:scale-[0.98]"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
