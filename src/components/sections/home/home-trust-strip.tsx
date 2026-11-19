import { homeIcons } from "@/components/sections/home/home-icons";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils/cn";
import type { HomeTrustItem } from "@/types/content";

export interface HomeTrustStripProps {
  items: readonly HomeTrustItem[];
}

export function HomeTrustStrip({ items }: HomeTrustStripProps) {
  return (
    <section
      aria-label="Nos engagements"
      className="border-border border-b bg-white py-3 shadow-sm lg:py-3.5"
    >
      <Container>
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => {
            const Icon = homeIcons[item.icon];

            return (
              <div
                className={cn(
                  "min-w-0 items-center gap-2.5",
                  index === items.length - 1 ? "hidden lg:flex" : "flex",
                )}
                key={item.title}
              >
                <span className="bg-surface-muted text-brand-teal flex size-9 shrink-0 items-center justify-center rounded-md">
                  <Icon aria-hidden size={20} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-brand-navy text-[0.6875rem] leading-4 font-bold sm:text-xs">
                    {item.title}
                  </h2>
                  <p className="text-brand-gray mt-0.5 hidden text-[0.625rem] leading-4 min-[380px]:block lg:text-[0.6875rem]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
