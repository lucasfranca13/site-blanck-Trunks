"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { LookCard } from "@/components/catalog/LookCard";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { BRAND_MARKS, type Chapter, type Look } from "@/data/lookbook";

interface ChapterSectionProps {
  chapter: Chapter;
  onOpen: (look: Look) => void;
  /** Primeiro capítulo prioriza o carregamento da imagem de destaque. */
  priority?: boolean;
  sectionRef: (el: HTMLElement | null) => void;
}

/**
 * Capítulo do catálogo: cabeçalho editorial com índice grande, destaque em
 * spread de revista (peça + ficha) e o restante das peças em grid assimétrico.
 */
export function ChapterSection({ chapter, onOpen, priority, sectionRef }: ChapterSectionProps) {
  const [feature, ...rest] = chapter.looks;
  const featureIsSwatch = feature.kind === "swatch";

  return (
    <section
      id={chapter.slug}
      ref={sectionRef}
      aria-labelledby={`${chapter.slug}-title`}
      className="scroll-mt-36 py-20 sm:py-28"
    >
      <Container width="wide">
        {/* Cabeçalho */}
        <AnimatedReveal>
          <div className="flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-end gap-5">
              <span className="font-mono text-6xl font-semibold leading-[0.8] text-accent/25 sm:text-7xl">
                {chapter.index}
              </span>
              <div>
                <span className="eyebrow">{chapter.kicker}</span>
                <h2
                  id={`${chapter.slug}-title`}
                  className="mt-2 text-4xl font-semibold uppercase tracking-tighter sm:text-5xl lg:text-6xl"
                >
                  {chapter.title}
                </h2>
              </div>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground lg:text-right">
              {chapter.intro}
            </p>
          </div>
        </AnimatedReveal>

        {/* Destaque — spread editorial */}
        <AnimatedReveal delay={0.05}>
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <button
              type="button"
              onClick={() => onOpen(feature)}
              aria-label={`Ampliar ${feature.name}`}
              className={cn(
                "group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border focus-visible:outline-none lg:col-span-7 lg:aspect-[4/3]",
                featureIsSwatch ? "bg-[#e7e1d6]" : "bg-card",
              )}
            >
              <Image
                src={feature.image}
                alt={`${feature.name}${feature.colorway ? ` — ${feature.colorway}` : ""}`}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className={cn(
                  "transition-transform duration-700 ease-out group-hover:scale-[1.04]",
                  featureIsSwatch ? "object-contain p-10" : "object-cover",
                )}
              />
              {feature.badge && <Badge className="absolute left-5 top-5">{feature.badge}</Badge>}
              <span
                className={cn(
                  "absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100",
                  featureIsSwatch
                    ? "border-black/15 bg-white/60 text-black/70"
                    : "border-foreground/20 bg-background/50 text-foreground/90",
                )}
              >
                Ampliar
                <Maximize2 className="size-3.5" aria-hidden />
              </span>
            </button>

            <div className="relative lg:col-span-5">
              <Image
                src={BRAND_MARKS.eagleSketch}
                alt=""
                aria-hidden
                width={240}
                height={240}
                className="pointer-events-none absolute -right-4 -top-16 w-40 opacity-[0.06] [filter:invert(1)] sm:w-56"
              />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Destaque do capítulo
              </span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {feature.name}
                {feature.colorway && (
                  <span className="mt-1 block text-lg font-normal text-muted-foreground">
                    {feature.colorway}
                  </span>
                )}
              </h3>
              <p className="mt-5 max-w-md font-mono text-[0.8rem] uppercase tracking-[0.12em] text-muted-foreground">
                {feature.spec}
              </p>
              <button
                type="button"
                onClick={() => onOpen(feature)}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/30 px-7 font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Ver a peça
                <Maximize2 className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </AnimatedReveal>

        {/* Restante do capítulo */}
        {rest.length > 0 && (
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3">
            {rest.map((look, i) => (
              <AnimatedReveal as="li" key={look.id} delay={(i % 3) * 0.06}>
                <LookCard look={look} index={i + 2} onOpen={onOpen} />
              </AnimatedReveal>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
