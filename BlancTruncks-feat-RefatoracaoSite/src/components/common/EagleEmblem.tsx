"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const rings = [
  { size: "size-[15rem]", duration: 36, dir: 1, dash: "border-dashed" },
  { size: "size-[20rem]", duration: 52, dir: -1, dash: "border-dotted" },
  { size: "size-[26rem]", duration: 70, dir: 1, dash: "border-dashed" },
];

/**
 * Emblema visual da marca: a águia (logo) cercada por anéis em órbita.
 * Construído com SVG/CSS — nenhuma foto genérica. Respeita reduced-motion
 * via MotionConfig global.
 */
export function EagleEmblem() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
      {/* Brilho dourado */}
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(60%_50%_at_50%_42%,rgba(200,184,154,0.14),transparent_70%)]"
      />
      <div aria-hidden className="texture-grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />

      {/* Anéis em órbita */}
      <div className="absolute inset-0 grid place-items-center">
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            aria-hidden
            className={`absolute ${ring.size} rounded-full border ${ring.dash} border-accent/20`}
            animate={{ rotate: 360 * ring.dir }}
            transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
          >
            {/* Ponto orbitando no anel */}
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70" />
          </motion.div>
        ))}

        {/* Águia (logo da marca) */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 scale-150 rounded-full bg-accent/10 blur-2xl"
          />
          <Image
            src="/img/diversos/BlanckTruncks.png"
            alt="Símbolo da águia — Black Trunks"
            width={176}
            height={176}
            className="h-40 w-40 object-contain sm:h-44 sm:w-44"
          />
        </motion.div>
      </div>

      {/* Selo / legenda */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-7">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent">
          O símbolo
        </p>
        <p className="mt-2 text-balance text-base font-medium leading-snug sm:text-lg">
          A águia que enxerga além do horizonte — visão e liberdade em cada costura.
        </p>
      </div>
    </div>
  );
}
