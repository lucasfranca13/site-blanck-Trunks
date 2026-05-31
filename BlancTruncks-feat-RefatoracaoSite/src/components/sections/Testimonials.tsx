import { Quote } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section className="border-y border-border bg-card">
      <Container width="wide">
        <SectionTitle
          eyebrow="Quem voa com a gente"
          title="A comunidade Black Trunks"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedReveal key={t.id} delay={i * 0.08}>
              <Card className="flex h-full flex-col bg-background p-8">
                <Quote className="size-7 text-accent" aria-hidden />
                <blockquote className="mt-5 flex-1 text-pretty leading-relaxed text-foreground/90">
                  {t.quote}
                </blockquote>
                <footer className="mt-7 border-t border-border pt-5">
                  <p className="font-medium tracking-tight">{t.name}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {t.role}
                  </p>
                </footer>
              </Card>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
