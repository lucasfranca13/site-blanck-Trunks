"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Atraso em segundos para encadear revelações. */
  delay?: number;
  /** Direção da entrada. */
  from?: "up" | "down" | "none";
  as?: "div" | "section" | "li" | "span";
}

const distance = 24;

/**
 * Revela o conteúdo com fade + leve deslocamento ao entrar na viewport.
 * Animação discreta e premium — percebida, mas sem chamar atenção.
 */
export function AnimatedReveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: AnimatedRevealProps) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: from === "up" ? distance : from === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}
