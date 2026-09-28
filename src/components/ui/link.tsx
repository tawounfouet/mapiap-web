import NextLink from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

export type LinkVariant =
  | "default"
  | "standalone"
  | "navigation"
  | "button-primary"
  | "button-secondary";

export type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
};

const variants: Record<LinkVariant, string> = {
  default:
    "underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
  standalone:
    "inline-flex items-center font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
  navigation:
    "text-sm font-medium no-underline transition-colors hover:text-muted-foreground",
  "button-primary":
    "inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background no-underline transition-opacity hover:opacity-90",
  "button-secondary":
    "inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface px-5 text-sm font-medium text-foreground no-underline transition-colors hover:bg-surface-muted",
};

export function Link({ className, variant = "default", ...props }: LinkProps) {
  return <NextLink className={cn(variants[variant], className)} {...props} />;
}
