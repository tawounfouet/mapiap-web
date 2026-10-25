import { Gauge, Gem, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CabinetPillarsContent } from "@/types/content";

export interface BrandPillarsSectionProps {
  content: CabinetPillarsContent;
}

const pillarIcons = [Gem, Sparkles, Gauge] as const;

export function BrandPillarsSection({ content }: BrandPillarsSectionProps) {
  return (
    <section
      aria-labelledby="cabinet-pillars-title"
      className="bg-surface-muted py-10 lg:py-14"
    >
      <Container>
        <div className="max-w-3xl">
          {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
          <h2
            className="text-brand-navy text-2xl leading-[1.18] font-extrabold tracking-tight lg:text-[1.75rem]"
            id="cabinet-pillars-title"
          >
            {content.title}
          </h2>

          {content.description ? (
            <p className="text-brand-gray mt-3 max-w-2xl text-sm leading-6">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 lg:gap-4">
          {content.items.map((item, index) => {
            const Icon = pillarIcons[index] ?? Gem;

            return (
              <article
                className="border-border bg-surface rounded-xl border p-5 shadow-sm"
                key={item.title}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-surface-muted text-brand-teal flex size-10 items-center justify-center rounded-lg">
                    <Icon aria-hidden size={20} strokeWidth={1.8} />
                  </span>
                  <span className="text-brand-gray-light text-xs font-bold tabular-nums">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-brand-navy mt-5 text-base font-bold">
                  {item.title}
                </h3>
                <p className="text-brand-gray mt-2 text-sm leading-6">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
