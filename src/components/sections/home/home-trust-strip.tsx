import { Container } from "@/components/ui/container";
import { homeIcons } from "@/components/sections/home/home-icons";
import type { HomeTrustItem } from "@/types/content";

export interface HomeTrustStripProps {
  items: readonly HomeTrustItem[];
}

export function HomeTrustStrip({ items }: HomeTrustStripProps) {
  return (
    <section
      aria-label="Nos engagements"
      className="border-border border-b bg-white py-5 shadow-sm lg:py-6"
    >
      <Container>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4 lg:gap-6">
          {items.map((item) => {
            const Icon = homeIcons[item.icon];

            return (
              <div className="flex min-w-0 items-start gap-3" key={item.title}>
                <span className="bg-surface-muted text-brand-teal flex size-10 shrink-0 items-center justify-center rounded-md">
                  <Icon aria-hidden size={22} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <h2 className="text-brand-navy text-xs font-bold sm:text-sm">
                    {item.title}
                  </h2>
                  <p className="text-brand-gray mt-1 text-[0.6875rem] leading-4 sm:text-xs">
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
