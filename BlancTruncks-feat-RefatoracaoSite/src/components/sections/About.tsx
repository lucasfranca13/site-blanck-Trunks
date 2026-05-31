import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { EagleEmblem } from "@/components/common/EagleEmblem";

const tags = ["Premium", "Streetwear", "Voo Livre", "Identidade"];

export function About() {
  return (
    <Section id="sobre">
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimatedReveal from="up">
            <span className="eyebrow">A Marca</span>
            <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Feita para quem não se encaixa
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                A Black Trunks nasceu da recusa ao ordinário. Como a águia que não segue o bando,
                nossa marca foi construída para quem define o próprio caminho — com estilo, sem
                pedir licença.
              </p>
              <p>
                Cada detalhe é trabalhado com a precisão do olhar da águia: cortes limpos, tecidos
                selecionados e uma identidade que não se dissolve na multidão — no asfalto ou no céu.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.15} className="relative">
            <EagleEmblem />
          </AnimatedReveal>
        </div>
      </Container>
    </Section>
  );
}
