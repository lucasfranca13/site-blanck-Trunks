"use client";

import { MotionConfig } from "framer-motion";

/**
 * Aplica `reducedMotion="user"` globalmente: o Framer Motion reduz
 * automaticamente as animações para quem ativou "reduzir movimento" no SO.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
