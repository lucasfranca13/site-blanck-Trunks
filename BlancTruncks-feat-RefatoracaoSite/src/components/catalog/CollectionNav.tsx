"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface NavItem {
  slug: string;
  index: string;
  nav: string;
}

interface CollectionNavProps {
  items: NavItem[];
  activeSlug: string;
}

/**
 * Seletor de coleções — navegação visual em vez de filtros de ecommerce.
 * Cada item é um capítulo; rola até a seção e destaca o capítulo ativo
 * (via IntersectionObserver no orquestrador). Sticky abaixo da navbar.
 */
export function CollectionNav({ items, activeSlug }: CollectionNavProps) {
  return (
    <nav
      aria-label="Coleções"
      className="sticky top-20 z-40 border-y border-border bg-background/80 backdrop-blur-md"
    >
      <Container width="wide" className="!px-0">
        <ul className="flex snap-x gap-1 overflow-x-auto px-6 py-3 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <li key={item.slug} className="snap-start">
                <a
                  href={`#${item.slug}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300",
                    active ? "text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="collection-nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className={cn("text-[0.6rem]", active ? "text-background/60" : "text-accent")}>
                    {item.index}
                  </span>
                  {item.nav}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
