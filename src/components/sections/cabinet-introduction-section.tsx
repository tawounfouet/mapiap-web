import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CabinetIntroductionContent } from "@/types/content";

export interface CabinetIntroductionSectionProps {
  content: CabinetIntroductionContent;
}

export function CabinetIntroductionSection({
  content,
}: CabinetIntroductionSectionProps) {
  return (
    <section
      aria-labelledby="cabinet-introduction-title"
      className="bg-white py-8 lg:py-10"
    >
      <Container>
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
            <h2
              className="text-brand-navy max-w-2xl text-2xl leading-[1.18] font-extrabold tracking-tight lg:text-[1.75rem]"
              id="cabinet-introduction-title"
            >
              {content.title}
            </h2>

            <div className="text-brand-gray mt-3 max-w-2xl space-y-3 text-sm leading-6 lg:text-base lg:leading-7">
              {content.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {content.image ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-sm lg:col-span-5">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                src={content.image}
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
