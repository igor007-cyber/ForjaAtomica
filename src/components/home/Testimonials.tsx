"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/src/types";
import { testimonials } from "@/src/data/testimonials";
import { SectionTitle } from "@/src/components/ui/SectionTitle";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-sm"
      role="img"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < rating ? "text-gold-500" : "text-border"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.12 }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-gold-500/40 hover:shadow-lg"
    >
      <Stars rating={testimonial.rating} />
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
        “{testimonial.message}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-border pt-4">
        <span
          className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 font-display font-bold text-forge-950"
          aria-hidden
        >
          {testimonial.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </figcaption>
    </motion.figure>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <SectionTitle
        eyebrow="Depoimentos"
        title="Quem já forjou, recomenda"
        description="A opinião de quem transformou ideias em peças reais com a gente."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.slice(3).map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
