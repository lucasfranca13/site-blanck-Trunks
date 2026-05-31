"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/common/icons";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { CONTACT, type Look } from "@/data/lookbook";

interface LookLightboxProps {
  look: Look | null;
  onClose: () => void;
}

/** Visualização ampliada da peça (acessível: fecha com Esc e no backdrop). */
export function LookLightbox({ look, onClose }: LookLightboxProps) {
  useEffect(() => {
    if (!look) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [look, onClose]);

  const isSwatch = look?.kind === "swatch";

  return (
    <AnimatePresence>
      {look && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${look.name}, visualização ampliada`}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out bg-background/85 backdrop-blur-md"
          />

          <motion.div
            className="relative z-10 grid max-h-[88svh] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2"
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={cn("relative aspect-[4/5] md:aspect-auto", isSwatch && "bg-[#e7e1d6]")}>
              <Image
                src={look.image}
                alt={`${look.name}${look.colorway ? ` — ${look.colorway}` : ""}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={isSwatch ? "object-contain p-8" : "object-cover"}
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Black Trunks
                </span>
                {look.badge && <Badge>{look.badge}</Badge>}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {look.name}
                {look.colorway && (
                  <span className="mt-1 block text-base font-normal text-muted-foreground">
                    {look.colorway}
                  </span>
                )}
              </h2>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-muted-foreground">
                {look.spec}
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <InstagramIcon className="size-4" />
                  Instagram
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-foreground/30 px-6 font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  WhatsApp
                </a>
              </div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
                Peça de catálogo · valores e disponibilidade no direct
              </p>
            </div>

            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur-md transition-colors hover:text-accent"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
