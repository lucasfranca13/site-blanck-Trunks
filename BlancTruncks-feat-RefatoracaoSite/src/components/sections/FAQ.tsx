import { Plus } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { faq } from "@/data/faq";

/**
 * Acordeão acessível e sem JS, usando <details>/<summary> nativos.
 * Zero JavaScript no cliente — bom para performance.
 */
export function FAQ() {
  return (
    <Section id="faq">
      <Container width="narrow">
        <SectionTitle
          eyebrow="Dúvidas frequentes"
          title="Tudo o que você precisa saber"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faq.map((item, i) => (
            <AnimatedReveal key={item.question} delay={i * 0.05}>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-medium tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="pb-5 pr-9 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
