import { cn } from "@/lib/utils";

/** Superfície base com borda e cantos arredondados do design system. */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-card", className)}
      {...props}
    />
  );
}
