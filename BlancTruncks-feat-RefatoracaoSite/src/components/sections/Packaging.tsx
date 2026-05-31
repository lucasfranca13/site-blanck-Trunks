import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { packagingShots } from "@/data/products";

export function Packaging() {
  const [primary, ...rest] = packagingShots;

  return (
    <Section id="embalagem" className="border-y border-border bg-card">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <AnimatedReveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src={primary.image}
                alt={primary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {rest.map((shot) => (
                <div
                  key={shot.image}
                  className="relative aspect-square overflow-hidden rounded-xl border border-border"
                >
                  <Image
                    src={shot.image}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 1024px) 33vw, 16vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.12}>
            <span className="eyebrow">Como você recebe</span>
            <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
              Embalada à mão, com a alma da marca
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Cada peça chega na nossa caixa kraft com o selo da águia desenhado à mão — o mesmo
                traço que nasceu junto da marca. Nada de plástico genérico: um cuidado artesanal do
                início ao fim.
              </p>
              <p>
                Abrir uma Black Trunks é parte da experiência. Porque quem voa acima da média merece
                receber suas roupas como uma entrega, não como um pacote qualquer.
              </p>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </Section>
  );
}
