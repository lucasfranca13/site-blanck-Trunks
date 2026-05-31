import * as React from "react";
import { cn } from "@/lib/utils";

/** Campo de texto base, estilizado para fundos escuros. */
export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-12 w-full rounded-full border border-input bg-transparent px-5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
