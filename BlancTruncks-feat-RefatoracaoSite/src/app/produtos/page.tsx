import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/common/icons";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { CollectionHero } from "@/components/catalog/CollectionHero";
import { CatalogExperience } from "@/components/catalog/CatalogExperience";
import { CONTACT, chapters, heroImage, totalLooks } from "@/data/lookbook";

export const metadata: Metadata = {
  title: "Coleção",
  description:
    "Lookbook Black Trunks: streetwear, peças técnicas e equipamento de voo livre em capítulos. Do solo ao céu — moda premium com DNA de parapente.",
  alternates: { canonical: "/produtos" },
  openGraph: {
    title: "Coleção · Black Trunks",
    description:
      "Do solo ao céu — streetwear, peças técnicas e equipamento de voo livre. Um lookbook de arquivo.",
    url: "/produtos",
    images: [{ url: heroImage, alt: "Coleção Black Trunks" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Coleção Black Trunks",
  description:
    "Lookbook em capítulos: streetwear, peças técnicas e equipamento de voo livre.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalLooks,
    itemListElement: chapters.flatMap((chapter, ci) =>
      chapter.looks.map((look, li) => ({
        "@type": "ListItem",
        position: ci * 100 + li + 1,
        name: `${look.name}${look.colorway ? ` — ${look.colorway}` : ""}`,
      })),
    ),
  },
};

export default function ProdutosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="conteudo">
        <CollectionHero />
        <CatalogExperience />

        {/* CTA de fechamento */}
        <section aria-labelledby="cta-title" className="border-t border-border py-24 sm:py-32">
          <Container className="text-center">
            <span className="eyebrow">Como comprar</span>
            <h2
              id="cta-title"
              className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold uppercase leading-[0.95] tracking-tighter sm:text-5xl lg:text-6xl"
            >
              Sua próxima peça começa com um direct
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              O catálogo é o nosso arquivo vivo. Escolheu uma peça? Chama a gente —
              respondemos rápido e cuidamos de cada detalhe até a entrega.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-9 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <InstagramIcon className="size-4" />
                @blacktrunksbrasil
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-foreground/30 px-9 font-mono text-[0.8rem] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
