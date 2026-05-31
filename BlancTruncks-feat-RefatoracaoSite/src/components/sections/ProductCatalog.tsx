"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductLightbox } from "@/components/common/ProductLightbox";
import { categories, products } from "@/data/products";
import type { Category, Gender, Product } from "@/types";

type GenderFilter = "todos" | Gender;
type CategoryFilter = "todas" | Category;

const genders: { value: GenderFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function ProductCatalog() {
  const [gender, setGender] = useState<GenderFilter>("todos");
  const [category, setCategory] = useState<CategoryFilter>("todas");
  const [active, setActive] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (gender === "todos" || p.gender === gender) &&
          (category === "todas" || p.category === category),
      ),
    [gender, category],
  );

  return (
    <>
      <div className="flex flex-col gap-5 border-y border-border py-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por gênero">
          {genders.map((g) => (
            <Chip key={g.value} active={gender === g.value} onClick={() => setGender(g.value)}>
              {g.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
          <Chip active={category === "todas"} onClick={() => setCategory("todas")}>
            Todas
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
              {c.title}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "peça" : "peças"}
        <span className="text-foreground/40"> · clique para ampliar</span>
      </p>

      {filtered.length > 0 ? (
        <motion.ul
          layout
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.li
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={product} index={i} onOpen={setActive} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="mt-16 text-center text-muted-foreground">
          Nenhuma peça encontrada para esse filtro.
        </p>
      )}

      <ProductLightbox product={active} onClose={() => setActive(null)} />
    </>
  );
}
