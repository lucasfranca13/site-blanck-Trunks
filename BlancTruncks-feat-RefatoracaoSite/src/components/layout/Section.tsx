import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Ritmo vertical. `lg` é o padrão das seções principais. */
  spacing?: "md" | "lg";
}

const spacings = {
  md: "py-16 sm:py-20",
  lg: "py-24 sm:py-32 lg:py-40",
} as const;

/** Wrapper semântico `<section>` com o ritmo vertical do design system. */
export function Section({ spacing = "lg", className, children, ...props }: SectionProps) {
  return (
    <section className={cn("relative scroll-mt-24", spacings[spacing], className)} {...props}>
      {children}
    </section>
  );
}
