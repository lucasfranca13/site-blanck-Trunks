"use client";

import { useState } from "react";
import { MessageCircle, Mail, Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";
import { InstagramIcon } from "@/components/common/icons";

const socials = [
  {
    label: "@blacktrunksbrasil",
    href: "https://www.instagram.com/blacktrunksbrasil",
    icon: InstagramIcon,
  },
  { label: "WhatsApp", href: "https://wa.me/5531999999999", icon: MessageCircle },
  { label: "E-mail", href: "mailto:contato@blacktrunks.com.br", icon: Mail },
];

export function Contact() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO: integrar com serviço de e-mail/CRM. Por ora, confirma localmente.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <Section id="contato">
      <Container width="wide">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <AnimatedReveal>
              <span className="eyebrow">Acompanhe</span>
              <h2 className="mt-5 text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
                Fique por dentro das coleções
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
                Novas coleções, bastidores da marca e o universo do voo livre. Para conhecer peças e
                comprar, chame a gente no Instagram ou WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </a>
                ))}
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              {submitted ? (
                <div className="flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/5 px-6 py-5">
                  <Check className="size-5 shrink-0 text-accent" aria-hidden />
                  <p className="text-sm">
                    Tudo certo! Você está na lista — fique de olho no seu e-mail.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                  <label htmlFor="newsletter-email" className="sr-only">
                    Seu e-mail
                  </label>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="sm:flex-1"
                    />
                    <Button type="submit" className="shrink-0">
                      Inscrever
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sem spam. Só o que importa. Cancele quando quiser.
                  </p>
                </form>
              )}
            </AnimatedReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
