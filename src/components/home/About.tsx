"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/SectionTitle";
import { asset } from "@/src/utils/asset";

const highlights = [
  "Peças de decoração e utilidades",
  "Brindes e itens personalizados",
  "Protótipos funcionais",
  "Miniaturas e colecionáveis",
  "Acessórios sob medida",
  "Projetos a partir da sua ideia",
];

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6">
      <SectionTitle
        eyebrow="Sobre mim"
        title="Quem forja suas ideias"
        align="center"
      />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div
            aria-hidden
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold-500/40 to-forge-500/40 blur-lg"
          />
          <Image
            src={asset("/logo-lettering.jpg")}
            alt="Forja Atômica — Impressão 3D"
            width={520}
            height={293}
            className="relative w-full rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg leading-relaxed text-foreground">
            Trabalho com <strong>impressão 3D personalizada</strong>,
            desenvolvendo produtos sob medida para cada cliente. Produzo
            diversos tipos de peças: decoração, utilidades, brindes,
            protótipos, acessórios, itens personalizados e muito mais.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Caso tenha uma ideia ou projeto específico, posso desenvolver
            exatamente conforme sua necessidade — do desenho à peça pronta.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground"
              >
                <span className="text-gold-500" aria-hidden>
                  ⚛
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
