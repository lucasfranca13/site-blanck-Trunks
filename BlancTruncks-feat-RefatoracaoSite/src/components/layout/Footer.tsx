import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { InstagramIcon } from "@/components/common/icons";

const nav = {
  Navegação: [
    { label: "Coleção", href: "/produtos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Manifesto", href: "/#manifesto" },
  ],
  Ajuda: [
    { label: "Como comprar", href: "/#faq" },
    { label: "Embalagem", href: "/#embalagem" },
    { label: "Fale Conosco", href: "/#contato" },
  ],
};

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/blacktrunksbrasil",
    icon: InstagramIcon,
  },
  { label: "WhatsApp", href: "https://wa.me/5531999999999", icon: MessageCircle },
  { label: "E-mail", href: "mailto:contato@blacktrunks.com.br", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container width="wide" className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/img/diversos/BlanckTruncks.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
              <span className="font-mono text-sm font-medium tracking-[0.2em]">BLACK TRUNKS</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Moda para quem voa acima da média. Estilo, força e identidade em cada peça — do solo
              ao céu.
            </p>
          </div>

          {Object.entries(nav).map(([title, items]) => (
            <nav key={title} aria-label={title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Redes sociais">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Social</h2>
            <ul className="mt-5 space-y-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-4" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Black Trunks. Todos os direitos reservados.</span>
          <span className="font-mono uppercase tracking-[0.2em] text-accent/80">
            Voe mais alto
          </span>
        </div>
      </Container>
    </footer>
  );
}
