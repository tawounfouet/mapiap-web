import NextLink from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

export type LinkVariant = "default" | "standalone";

export type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
};

const variants: Record<LinkVariant, string> = {
  default:
    "underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
  standalone:
    "inline-flex items-center font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
};

export function Link({ className, variant = "default", ...props }: LinkProps) {
  return (
    <NextLink className={cn(variants[variant], className)} {...props} />
  );
}
