"use client";

import { useRef } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { categories, formatPrice } from "@/data/products";
import type { Product } from "@/types";

const categoryTitle = (slug: Product["category"]) =>
  categories.find((c) => c.slug === slug)?.title ?? slug;

interface ProductCardProps {
  product: Product;
  index?: number;
  priority?: boolean;
  sizes?: string;
  /** Abre a visualização ampliada (lightbox). */
  onOpen?: (product: Product) => void;
}

const MAX_TILT = 5;

export function ProductCard({
  product,
  index,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  onOpen,
}: ProductCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * MAX_TILT * 2);
    rotateX.set(-py * MAX_TILT * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const Media = onOpen ? "button" : "div";

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group [transform-style:preserve-3d]"
    >
      <Media
        type={onOpen ? "button" : undefined}
        onClick={onOpen ? () => onOpen(product) : undefined}
        aria-label={onOpen ? `Ampliar ${product.name}` : undefined}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card text-left focus-visible:outline-none"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {product.badge && <Badge className="absolute left-4 top-4">{product.badge}</Badge>}
        {typeof index === "number" && (
          <span className="absolute right-4 top-4 font-mono text-xs text-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-foreground/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {categoryTitle(product.category)}
          {onOpen && <Maximize2 className="size-3.5" aria-hidden />}
        </span>
      </Media>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">
          {product.name}
          {product.colorway && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              · {product.colorway}
            </span>
          )}
        </h3>
        <span className="shrink-0 font-mono text-sm text-accent">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      {product.placeholder && (
        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-muted-foreground/60">
          Imagem ilustrativa
        </p>
      )}
    </motion.article>
  );
}
