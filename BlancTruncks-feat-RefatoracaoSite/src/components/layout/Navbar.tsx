"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/common/CTAButton";

const links = [
  { label: "Coleção", href: "/produtos" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Manifesto", href: "/#manifesto" },
  { label: "Contato", href: "/#contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-background/80 to-transparent",
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-20 max-w-[88rem] items-center justify-between px-6 sm:px-8 lg:px-12"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Black Trunks — início">
          <Image
            src="/img/diversos/BlanckTruncks.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <span className="font-mono text-sm font-medium tracking-[0.2em]">BLACK TRUNKS</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CTAButton href="/produtos" variant="outline" size="sm">
            Ver Coleção
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="inline-flex size-10 items-center justify-center md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "grid overflow-hidden border-t border-border bg-background transition-[grid-template-rows] duration-500 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-transparent",
        )}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 py-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <CTAButton
                href="/produtos"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Ver Coleção
              </CTAButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
