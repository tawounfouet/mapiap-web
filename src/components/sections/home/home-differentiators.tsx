import { homeIcons } from "@/components/sections/home/home-icons";
import { cn } from "@/lib/utils/cn";
import type { HomeDifferentiator } from "@/types/content";

export interface HomeDifferentiatorsProps {
  items: readonly HomeDifferentiator[];
  variant?: "embedded" | "section";
  className?: string;
}

export function HomeDifferentiators({
  items,
  variant = "embedded",
  className,
}: HomeDifferentiatorsProps) {
  return (
    <div
      className={cn(
        variant === "embedded"
          ? "bg-surface-muted grid gap-4 rounded-lg p-4"
          : "py-1",
        className,
      )}
    >
      {variant === "section" ? (
        <h2 className="text-brand-navy mb-4 text-lg font-extrabold">
          Pourquoi choisir MAPIAP ?
        </h2>
      ) : null}
      <div
        className={cn(
          variant === "embedded"
            ? "grid gap-4"
            : "grid grid-cols-3 gap-2 text-center",
        )}
      >
        {items.map((item) => {
          const Icon = homeIcons[item.icon];

          return (
            <div
              className={cn(
                "min-w-0",
                variant === "embedded"
                  ? "flex items-center gap-3"
                  : "flex flex-col items-center",
              )}
              key={item.title}
            >
              <span className="border-border bg-surface text-brand-teal flex size-9 shrink-0 items-center justify-center rounded-lg border">
                <Icon aria-hidden size={19} />
              </span>
              <div>
                <h3
                  className={cn(
                    "text-brand-navy text-xs font-bold sm:text-sm",
                    variant === "section" && "mt-2",
                  )}
                >
                  {item.title}
                </h3>
                <p className="text-brand-gray mt-0.5 text-[0.625rem] leading-4 sm:text-[0.6875rem]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
