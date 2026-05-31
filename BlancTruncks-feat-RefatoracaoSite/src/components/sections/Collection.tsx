import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTAButton } from "@/components/common/CTAButton";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { ProductCard } from "@/components/common/ProductCard";
import { featuredProducts } from "@/data/products";

export function Collection() {
  return (
    <Section id="colecao">
      <Container width="wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionTitle eyebrow="Coleção" title="Peças em destaque" />
          <AnimatedReveal delay={0.1}>
            <CTAButton href="/produtos" variant="ghost">
              Ver toda a coleção
              <ArrowRight />
            </CTAButton>
          </AnimatedReveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, i) => (
            <AnimatedReveal as="li" key={product.id} delay={(i % 3) * 0.08}>
              <ProductCard product={product} index={i} />
            </AnimatedReveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
