"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

// Rota de voo dentro do viewBox 64 x 760 (proporção mantida ao escalar).
const PATH_D = "M 42 4 C 6 130 58 250 26 380 C 0 500 54 606 32 756";

export function FlightPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  const x = useMotionValue(42);
  const y = useMotionValue(4);

  // Reposiciona o marcador sobre a curva a cada avanço do scroll.
  const move = (progress: number) => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(path.getTotalLength() * progress);
    x.set(point.x);
    y.set(point.y);
  };

  useEffect(() => {
    move(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", move);

  return (
    <div className="pointer-events-none fixed right-3 top-0 z-30 hidden h-screen xl:block">
      <svg
        viewBox="0 0 64 760"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-auto"
        aria-hidden
      >
        {/* Rota completa, esmaecida — mostra o caminho à frente */}
        <path
          d={PATH_D}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1}
          strokeOpacity={0.14}
          strokeDasharray="2 6"
          strokeLinecap="round"
        />

        {/* Trilha percorrida, desenhada conforme o scroll */}
        <motion.path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.4}
          strokeLinecap="round"
          style={reduce ? { pathLength: 1 } : { pathLength: scrollYProgress }}
        />

        {/* Marcador: parapente */}
        {!reduce && (
          <motion.g style={{ x, y }}>
            <circle r={7} fill="var(--accent)" opacity={0.12} />
            <path
              d="M-9 -5 Q 0 -12 9 -5"
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
            <line x1={-7.5} y1={-5} x2={-1.6} y2={3} stroke="var(--accent)" strokeWidth={0.9} />
            <line x1={7.5} y1={-5} x2={1.6} y2={3} stroke="var(--accent)" strokeWidth={0.9} />
            <circle cx={0} cy={4} r={1.7} fill="var(--accent)" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
