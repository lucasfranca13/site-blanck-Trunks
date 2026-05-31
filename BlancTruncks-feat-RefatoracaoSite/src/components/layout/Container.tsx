import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Largura máxima do conteúdo. `default` cobre a maioria das seções. */
  width?: "default" | "narrow" | "wide";
}

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  // No xl reservamos um gutter maior à direita p/ a "faixa de voo" (FlightPath).
  wide: "max-w-[88rem] xl:px-24",
} as const;

/** Centraliza o conteúdo e aplica o gutter horizontal responsivo padrão. */
export function Container({ width = "default", className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", widths[width], className)} {...props} />
  );
}
