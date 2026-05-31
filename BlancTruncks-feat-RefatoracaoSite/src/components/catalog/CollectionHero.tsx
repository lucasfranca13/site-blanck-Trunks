"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BRAND_MARKS, heroImage, totalLooks } from "@/data/lookbook";

/**
 * Hero cinematográfico de abertura do catálogo. Imagem de arquivo da marca
 * (a Serra) com parallax extremamente sutil, grão e a águia desenhada à mão
 * como marca-d'água. Define tom e posicionamento antes do primeiro produto.
 */
export function CollectionHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <section
      ref={ref}
      aria-label="Apresentação da coleção"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20 scale-110">
        <Image
          src={heroImage}
          alt="Expedição Black Trunks na Serra da Moeda — a SUV da marca diante do vale"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Camadas de legibilidade */}
      <motion.div
        aria-hidden
        style={{ opacity: overlay }}
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/60 to-transparent"
      />
      <div aria-hidden className="texture-grain absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay" />

      {/* Águia desenhada à mão — marca-d'água */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[-2rem] top-24 w-56 sm:right-12 sm:w-72 lg:w-96"
      >
        <Image
          src={BRAND_MARKS.eagleSketch}
          alt=""
          width={384}
          height={384}
          className="h-auto w-full [filter:invert(1)]"
        />
      </motion.div>

      <Container width="wide" className="relative z-10 pb-16 pt-40 sm:pb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          Lookbook · Coleção de Arquivo
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-balance text-6xl font-semibold uppercase leading-[0.85] tracking-tighter sm:text-7xl lg:text-8xl"
        >
          Do solo
          <br />
          ao céu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg"
        >
          {totalLooks} peças organizadas em capítulos — do streetwear de rua ao
          equipamento de voo livre. Explore a coleção como quem explora uma rampa.
        </motion.p>

        <motion.a
          href="#colecao"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="group mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
        >
          <span className="grid size-10 place-items-center rounded-full border border-foreground/30 transition-colors group-hover:border-accent group-hover:text-accent">
            <ArrowDown className="size-4" aria-hidden />
          </span>
          Começar a explorar
        </motion.a>
      </Container>
    </section>
  );
}
