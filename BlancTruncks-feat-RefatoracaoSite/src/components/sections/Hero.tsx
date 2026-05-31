"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTAButton } from "@/components/common/CTAButton";
import { RevealText } from "@/components/common/RevealText";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease },
  }),
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-svh w-full overflow-hidden">
      {/* Brilho ambiente sutil */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(80%_60%_at_70%_15%,rgba(200,184,154,0.06),transparent_60%)]"
      />

      <Container
        width="wide"
        className="flex min-h-svh flex-col justify-center pt-32 pb-24 sm:pt-36"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Texto */}
          <div>
            <motion.span
              className="eyebrow inline-block"
              variants={fade}
              custom={0.2}
              initial="hidden"
              animate="visible"
            >
              Coleção 2026 · Voo Livre
            </motion.span>

            <RevealText
              as="h1"
              delay={0.35}
              className="mt-6 text-[3.5rem] font-semibold uppercase leading-[0.85] tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl"
              lines={["Eleve", "Seu", <span key="estilo" className="text-accent">Estilo</span>]}
            />

            <motion.p
              className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              variants={fade}
              custom={1.1}
              initial="hidden"
              animate="visible"
            >
              Moda premium com a precisão e a liberdade do voo livre. Conheça a marca e explore a
              coleção — peça por peça, do solo ao céu.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fade}
              custom={1.25}
              initial="hidden"
              animate="visible"
            >
              <CTAButton href="/produtos" variant="primary" size="lg">
                Ver Coleção
                <ArrowRight />
              </CTAButton>
              <CTAButton href="#sobre" variant="ghost" size="lg">
                Conheça a marca
                <ArrowUpRight />
              </CTAButton>
            </motion.div>
          </div>

          {/* Visual — peça em destaque */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:mx-0"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          >
            {/* Realce: halo dourado difuso que destaca o vídeo do fundo */}
            <div
              aria-hidden
              className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-accent/10 blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border ring-1 ring-white/5">
              <video
                className="h-full w-full object-cover"
                src="/videos/WhatsApp Video 2026-05-12 at 18.03.54.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Vídeo de voo livre da Black Trunks"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60">
                  Coleção 2026
                </p>
                <p className="text-sm font-medium">Voe acima da média</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        variants={fade}
        custom={1.6}
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-foreground/50">
          Role
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-foreground/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-accent"
            animate={{ y: ["-100%", "250%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
