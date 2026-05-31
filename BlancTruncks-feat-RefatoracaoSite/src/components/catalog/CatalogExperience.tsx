"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CollectionNav, type NavItem } from "@/components/catalog/CollectionNav";
import { ChapterSection } from "@/components/catalog/ChapterSection";
import { ManifestoInterlude } from "@/components/catalog/ManifestoInterlude";
import { LookLightbox } from "@/components/catalog/LookLightbox";
import { chapters, heritage, type Look } from "@/data/lookbook";

/** Ordem editorial: o bloco "Serra" entra entre Altitude e Voo Livre. */
const navItems: NavItem[] = [
  { slug: chapters[0].slug, index: chapters[0].index, nav: chapters[0].nav },
  { slug: chapters[1].slug, index: chapters[1].index, nav: chapters[1].nav },
  { slug: heritage.slug, index: "✦", nav: heritage.nav },
  { slug: chapters[2].slug, index: chapters[2].index, nav: chapters[2].nav },
];

/**
 * Orquestra a experiência do catálogo: navegação de coleções com capítulo
 * ativo (IntersectionObserver), capítulos, interlúdio institucional e a
 * visualização ampliada. Mantém o estado interativo em um único client island.
 */
export function CatalogExperience() {
  const [active, setActive] = useState<Look | null>(null);
  const [activeSlug, setActiveSlug] = useState(navItems[0].slug);
  const sections = useRef(new Map<string, HTMLElement>());

  const register = useCallback(
    (slug: string) => (el: HTMLElement | null) => {
      if (el) sections.current.set(slug, el);
      else sections.current.delete(slug);
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSlug(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    const els = sections.current;
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onOpen = useCallback((look: Look) => setActive(look), []);
  const onClose = useCallback(() => setActive(null), []);

  return (
    <div id="colecao">
      <CollectionNav items={navItems} activeSlug={activeSlug} />

      <ChapterSection
        chapter={chapters[0]}
        onOpen={onOpen}
        priority
        sectionRef={register(chapters[0].slug)}
      />
      <ChapterSection chapter={chapters[1]} onOpen={onOpen} sectionRef={register(chapters[1].slug)} />

      <ManifestoInterlude sectionRef={register(heritage.slug)} />

      <ChapterSection chapter={chapters[2]} onOpen={onOpen} sectionRef={register(chapters[2].slug)} />

      <LookLightbox look={active} onClose={onClose} />
    </div>
  );
}
