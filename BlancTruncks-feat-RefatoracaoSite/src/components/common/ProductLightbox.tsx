"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { categories, formatPrice } from "@/data/products";
import type { Product } from "@/types";

interface ProductLightboxProps {
  product: Product | null;
  onClose: () => void;
}

/** Visualização ampliada da peça em overlay (acessível, fecha com Esc/backdrop). */
export function ProductLightbox({ product, onClose }: ProductLightboxProps) {
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const categoryTitle = product
    ? (categories.find((c) => c.slug === product.category)?.title ?? product.category)
    : "";

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name}, visualização ampliada`}
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
            <div className="relative aspect-[4/5] md:aspect-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {categoryTitle}
                </span>
                {product.badge && <Badge>{product.badge}</Badge>}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                {product.name}
                {product.colorway && (
                  <span className="mt-1 block text-base font-normal text-muted-foreground">
                    {product.colorway}
                  </span>
                )}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <p className="font-mono text-lg text-accent">{formatPrice(product.price)}</p>
              <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted-foreground">
                Valor de referência · venda pelo Instagram
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
