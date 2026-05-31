"use client";

import { useRef } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Look } from "@/data/lookbook";

const genderLabel: Record<Look["gender"], string> = {
  masculino: "Masculino",
  feminino: "Feminino",
  unissex: "Unissex",
};

interface LookCardProps {
  look: Look;
  index: number;
  onOpen: (look: Look) => void;
  priority?: boolean;
  sizes?: string;
}

const MAX_TILT = 4;

/**
 * Card de peça no catálogo editorial. Diferencia fotos de arquivo (object-cover,
 * fundo escuro) de estampas recortadas (object-contain sobre papel claro),
 * tratando o material cru como prancha de design. Tilt e crossfade discretos.
 */
export function LookCard({
  look,
  index,
  onOpen,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: LookCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
  }
  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const isSwatch = look.kind === "swatch";

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group [transform-style:preserve-3d]"
    >
      <button
        type="button"
        onClick={() => onOpen(look)}
        aria-label={`Ampliar ${look.name}`}
        className={cn(
          "relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border text-left focus-visible:outline-none",
          isSwatch ? "bg-[#e7e1d6]" : "bg-card",
        )}
      >
        <Image
          src={look.image}
          alt={`${look.name}${look.colorway ? ` — ${look.colorway}` : ""}`}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-transform duration-700 ease-out group-hover:scale-[1.05]",
            isSwatch ? "object-contain p-6" : "object-cover",
            look.hoverImage && "group-hover:opacity-0",
          )}
        />
        {look.hoverImage && (
          <Image
            src={look.hoverImage}
            alt=""
            aria-hidden
            fill
            sizes={sizes}
            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        )}

        <div
          aria-hidden
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            isSwatch
              ? "bg-gradient-to-t from-black/15 to-transparent"
              : "bg-gradient-to-t from-background/70 via-transparent to-transparent",
          )}
        />

        {look.badge && <Badge className="absolute left-4 top-4">{look.badge}</Badge>}

        <span
          className={cn(
            "absolute right-4 top-4 font-mono text-xs",
            isSwatch ? "text-black/40" : "text-foreground/60",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>

        <span
          className={cn(
            "absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100",
            isSwatch
              ? "border-black/15 bg-white/60 text-black/70"
              : "border-foreground/20 bg-background/50 text-foreground/90",
          )}
        >
          Ampliar
          <Maximize2 className="size-3.5" aria-hidden />
        </span>
      </button>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-base font-medium tracking-tight">
          {look.name}
          {look.colorway && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">· {look.colorway}</span>
          )}
        </h3>
        <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground/70">
          {genderLabel[look.gender]}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground">
        {look.spec}
      </p>
    </motion.article>
  );
}
