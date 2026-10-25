import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface EyebrowProps {
  children: ReactNode;
  tone?: "default" | "inverse";
  className?: string;
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: EyebrowProps) {
  return (
    <div className={cn("mb-2.5 flex items-center gap-2", className)}>
      <span className="bg-brand-cyan h-0.5 w-6" aria-hidden />
      <span
        className={cn(
          "text-[0.6875rem] font-bold tracking-[0.18em] uppercase",
          tone === "inverse" ? "text-brand-cyan" : "text-brand-teal",
        )}
      >
        {children}
      </span>
    </div>
  );
}
