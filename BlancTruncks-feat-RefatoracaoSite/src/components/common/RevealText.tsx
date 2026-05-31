"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  /** Cada item vira uma linha que sobe de trás de uma máscara. */
  lines: React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const line: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

/** Reveal tipográfico com máscara — uma linha sobe após a outra. */
export function RevealText({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.12,
}: RevealTextProps) {
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container(delay, stagger)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {lines.map((content, i) => (
          <span key={i} className={cn("block overflow-hidden", i > 0 && "-mt-[0.08em]")}>
            <motion.span variants={line} className="block">
              {content}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
