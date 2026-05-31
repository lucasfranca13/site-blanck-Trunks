"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { BRAND_MARKS, heritage } from "@/data/lookbook";

interface ManifestoInterludeProps {
  sectionRef: (el: HTMLElement | null) => void;
}

/**
 * Bloco institucional entre capítulos — narrativa de origem da marca.
 * Lifestyle puro, sem produto: o piloto desenhado à mão flutua como
 * marca-d'água com parallax discreto, reforçando o DNA de voo livre.
 */
export function ManifestoInterlude({ sectionRef }: ManifestoInterludeProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section
      id={heritage.slug}
      ref={(el) => {
        sectionRef(el);
        ref.current = el;
      }}
      aria-labelledby="serra-title"
      className="relative scroll-mt-36 overflow-hidden border-y border-border bg-card py-24 sm:py-32"
    >
      <div aria-hidden className="texture-grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(70%_60%_at_80%_30%,rgba(200,184,154,0.10),transparent_70%)]"
      />

      {/* Piloto desenhado à mão — marca-d'água com parallax */}
      <motion.div
        aria-hidden
        style={{ y }}
        className="pointer-events-none absolute -right-6 top-1/2 w-64 -translate-y-1/2 opacity-[0.08] sm:right-6 sm:w-80 lg:w-[28rem]"
      >
        <Image
          src={BRAND_MARKS.pilotSketch}
          alt=""
          width={448}
          height={448}
          className="h-auto w-full [filter:invert(1)]"
        />
      </motion.div>

      <Container className="relative">
        <AnimatedReveal>
          <span className="eyebrow">{heritage.kicker}</span>
          <h2
            id="serra-title"
            className="mt-5 max-w-2xl text-balance text-5xl font-semibold uppercase leading-[0.9] tracking-tighter sm:text-6xl lg:text-7xl"
          >
            {heritage.title}
          </h2>
        </AnimatedReveal>

        <div className="mt-8 max-w-xl space-y-5">
          {heritage.paragraphs.map((p, i) => (
            <AnimatedReveal key={i} delay={0.1 + i * 0.08}>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {p}
              </p>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
