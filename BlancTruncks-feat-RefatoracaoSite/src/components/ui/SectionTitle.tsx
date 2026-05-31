import { cn } from "@/lib/utils";
import { AnimatedReveal } from "@/components/common/AnimatedReveal";

interface SectionTitleProps {
  /** Kicker em mono uppercase acima do título. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Nível semântico do heading (default h2). */
  as?: "h1" | "h2" | "h3";
}

/** Cabeçalho de seção padronizado: eyebrow + título + descrição. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Heading = "h2",
}: SectionTitleProps) {
  return (
    <AnimatedReveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading className="text-balance text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </AnimatedReveal>
  );
}
