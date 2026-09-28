import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type CardProps = ComponentPropsWithoutRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-lg border p-6",
        className,
      )}
      {...props}
    />
  );
}
