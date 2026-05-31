import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { pillars } from "@/data/pillars";

export function Benefits() {
  return (
    <Section id="essencia">
      <Container width="wide">
        <SectionTitle eyebrow="Por que BT" title="Nossa essência" align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <AnimatedReveal key={pillar.title} delay={i * 0.08}>
              <Card className="group h-full p-7 transition-colors duration-300 hover:border-accent/40">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border text-accent transition-colors duration-300 group-hover:border-accent/40">
                  <pillar.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-medium tracking-tight">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
