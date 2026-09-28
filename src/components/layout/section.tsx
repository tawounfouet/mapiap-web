import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type SectionTone = "default" | "muted";
export type SectionSpacing = "sm" | "md" | "lg";

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: SectionTone;
  spacing?: SectionSpacing;
}

const tones: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
};

const spacings: Record<SectionSpacing, string> = {
  sm: "py-16",
  md: "py-20",
  lg: "py-24",
};

export function Section({
  className,
  tone = "default",
  spacing = "md",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], spacings[spacing], className)}
      {...props}
    />
  );
}
