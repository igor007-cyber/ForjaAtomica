"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/SectionTitle";

const benefits = [
  {
    icon: "🎨",
    title: "100% Personalizado",
    description:
      "Cada peça é desenvolvida sob medida para a sua necessidade, do conceito à cor.",
  },
  {
    icon: "⚡",
    title: "Produção Rápida",
    description:
      "Protótipos em até 48h e pedidos comuns entregues em poucos dias úteis.",
  },
  {
    icon: "💎",
    title: "Acabamento Premium",
    description:
      "Impressão em alta resolução com pós-processamento cuidadoso em cada detalhe.",
  },
  {
    icon: "🌱",
    title: "Material Sustentável",
    description:
      "Trabalhamos com PLA biodegradável de fontes renováveis sempre que possível.",
  },
  {
    icon: "💬",
    title: "Atendimento Direto",
    description:
      "Fale direto com quem produz: orçamento, acompanhamento e suporte pelo WhatsApp.",
  },
  {
    icon: "🛡️",
    title: "Garantia de Qualidade",
    description:
      "Peça com defeito de impressão? Reimprimimos sem custo. Simples assim.",
  },
];

export function Benefits() {
  return (
    <section className="bg-surface/60 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Por que a Forja?"
          title="Benefícios de forjar com a gente"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
              className="group rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-xl hover:shadow-gold-500/10"
            >
              <span
                className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-forge-700 to-forge-900 text-2xl shadow-inner transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                {benefit.icon}
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
