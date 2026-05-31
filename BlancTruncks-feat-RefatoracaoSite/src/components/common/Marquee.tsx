import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/**
 * Faixa horizontal com rolagem contínua (CSS puro, sem JS).
 * O track contém duas cópias idênticas e desliza -50% para um loop perfeito.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("group flex overflow-hidden border-y border-border py-6 select-none", className)}>
      <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-12 pr-12">
            {items.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="flex items-center gap-12 font-mono text-sm uppercase tracking-[0.25em] whitespace-nowrap text-muted-foreground"
              >
                {item}
                <span className="text-accent">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
