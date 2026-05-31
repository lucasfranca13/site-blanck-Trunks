import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline";
}

/** Selo compacto em mono uppercase, usado em cards e destaques. */
export function Badge({ variant = "solid", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em]",
        variant === "solid"
          ? "bg-accent text-accent-foreground"
          : "border border-foreground/30 text-foreground",
        className,
      )}
      {...props}
    />
  );
}
