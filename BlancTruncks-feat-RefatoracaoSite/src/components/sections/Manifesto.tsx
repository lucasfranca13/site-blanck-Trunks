import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";

export function Manifesto() {
  return (
    <Section id="manifesto" className="overflow-hidden border-y border-border bg-card">
      <Container width="wide">
        <div className="relative mx-auto max-w-4xl text-center">
          <AnimatedReveal>
            <span className="eyebrow">Manifesto</span>
          </AnimatedReveal>

          <AnimatedReveal delay={0.1} className="relative mt-8">
            <Image
              src="/img/diversos/voodesenho-removebg-preview.png"
              alt=""
              width={220}
              height={220}
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 -z-0 -translate-x-1/2 opacity-[0.07] sm:-top-24 sm:w-72"
            />
            <h2 className="relative text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Voaremos
              <br />
              <span className="text-accent">mais alto</span>
            </h2>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A águia não pede permissão para voar alto. Não segue correntes, não aceita limites
              impostos. É livre, feroz e elegante ao mesmo tempo. Essa é a filosofia da Black
              Trunks — moda para quem carrega essa mesma chama.
            </p>
          </AnimatedReveal>
        </div>
      </Container>
    </Section>
  );
}
