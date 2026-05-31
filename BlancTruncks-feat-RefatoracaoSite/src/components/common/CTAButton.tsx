import Link from "next/link";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CTAButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

/**
 * CTA em formato de link. Usa `next/link` para rotas internas e `<a>` para
 * destinos externos/âncoras, preservando a estética do `Button`.
 */
export function CTAButton({ href, variant, size, className, children, ...props }: CTAButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
