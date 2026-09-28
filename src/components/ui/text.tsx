import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type TextSize = "lg" | "md" | "sm";
export type TextTone = "default" | "muted";

export interface TextProps extends ComponentPropsWithoutRef<"p"> {
  size?: TextSize;
  tone?: TextTone;
}

const sizes: Record<TextSize, string> = {
  lg: "text-lg leading-8",
  md: "text-base leading-7",
  sm: "text-sm leading-6",
};

const tones: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
};

export function Text({
  className,
  size = "md",
  tone = "default",
  ...props
}: TextProps) {
  return <p className={cn(sizes[size], tones[tone], className)} {...props} />;
}
