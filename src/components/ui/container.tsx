import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils/cn";

export type ContainerSize = "page" | "content" | "reading";

export interface ContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: ContainerSize;
}

const sizes: Record<ContainerSize, string> = {
  page: "max-w-7xl",
  content: "max-w-5xl",
  reading: "max-w-3xl",
};

export function Container({
  className,
  size = "page",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
