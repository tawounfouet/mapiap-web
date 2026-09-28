import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type HeadingElement = "h1" | "h2" | "h3" | "h4";
export type HeadingSize = "display" | "xl" | "lg" | "md" | "sm";

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  as?: HeadingElement;
  size?: HeadingSize;
}

const sizes: Record<HeadingSize, string> = {
  display: "text-5xl leading-none sm:text-6xl lg:text-7xl",
  xl: "text-4xl leading-tight sm:text-5xl",
  lg: "text-3xl leading-tight sm:text-4xl",
  md: "text-2xl leading-snug sm:text-3xl",
  sm: "text-xl leading-snug sm:text-2xl",
};

export function Heading({
  as: Component = "h2",
  className,
  size = "lg",
  ...props
}: HeadingProps) {
  return (
    <Component
      className={cn("font-semibold tracking-tight", sizes[size], className)}
      {...props}
    />
  );
}
