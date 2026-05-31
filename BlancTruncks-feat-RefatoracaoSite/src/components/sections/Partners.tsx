import { Plus } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { CTAButton } from "@/components/common/CTAButton";

/**
 * Marcas/logos ilustrativas (placeholder) — desenhos vetoriais simples e
 * monocromáticos só para representar como ficaria o mural de parceiros.
 * Substituir pelos logos reais quando disponíveis.
 */
type MarkId = "wing" | "target" | "peak" | "swoosh" | "diamond" | "wind" | "summit";

const marks: Record<MarkId, React.ReactNode> = {
  wing: (
    <path d="M3 16c5-7 13-7 18 0-6-3-12-3-18 0Z M12 16v4" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  peak: <path d="M2 19 9 7l4 6 3-4 6 10H2Z" />,
  swoosh: <path d="M3 17c6 1 13-3 18-11-2 9-9 14-18 14v-3Z" />,
  diamond: (
    <>
      <path d="M12 3 21 12 12 21 3 12 12 3Z" />
      <path d="M12 8 16 12 12 16 8 12 12 8Z" />
    </>
  ),
  wind: (
    <>
      <path d="M3 9h11a3 3 0 1 0-3-3" />
      <path d="M3 14h15a3 3 0 1 1-3 3" />
    </>
  ),
  summit: (
    <>
      <path d="M4 20 12 5l8 15H4Z" />
      <path d="M12 5V2" />
    </>
  ),
};

const partners: { name: string; type: string; mark: MarkId }[] = [
  { name: "SkyBrasil", type: "Escola de voo livre", mark: "wing" },
  { name: "Aeroclub", type: "Clube de parapente", mark: "target" },
  { name: "Altus Gear", type: "Equipamentos técnicos", mark: "peak" },
  { name: "Fly Minas", type: "Associação MG", mark: "swoosh" },
  { name: "Condor Pro", type: "Wingsuit team", mark: "diamond" },
  { name: "Vento Livre", type: "Escola acrobática", mark: "wind" },
  { name: "Summit BH", type: "Loja especializada", mark: "summit" },
];

export function Partners() {
  return (
    <Section id="parceiros">
      <Container width="wide">
        <SectionTitle
          eyebrow="Parceiros & apoiadores"
          title="Quem voa com a gente"
          description="Marcas e escolas que confiam na Black Trunks. (Logos ilustrativos.)"
          align="center"
          className="mx-auto"
        />
      </Container>

      {/* Carrossel contínuo (full-bleed), pausa no hover */}
      <div className="group relative mt-14 flex overflow-hidden">
        {/* Fades nas bordas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
        />

        <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-5 pr-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) =>
            partners.map((partner) => (
              <Card
                key={`${copy}-${partner.name}`}
                className="group/logo flex w-56 shrink-0 flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground transition-colors duration-300 hover:border-accent/40 hover:text-foreground"
                aria-hidden={copy === 1}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-8 text-foreground/70 transition-colors duration-300 group-hover/logo:text-accent"
                  aria-hidden
                >
                  {marks[partner.mark]}
                </svg>
                <span className="font-mono text-base font-medium uppercase tracking-[0.15em] text-foreground">
                  {partner.name}
                </span>
                <span className="text-xs text-muted-foreground">{partner.type}</span>
              </Card>
            )),
          )}
        </div>
      </div>

      <Container width="wide" className="mt-12 flex justify-center">
        <CTAButton href="/#contato" variant="outline">
          <Plus />
          Seja parceiro
        </CTAButton>
      </Container>
    </Section>
  );
}
