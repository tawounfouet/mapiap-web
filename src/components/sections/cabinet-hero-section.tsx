import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CabinetHeroContent } from "@/types/content";

export interface CabinetHeroSectionProps {
  content: CabinetHeroContent;
}

export function CabinetHeroSection({ content }: CabinetHeroSectionProps) {
  return (
    <section
      aria-labelledby="cabinet-hero-title"
      className="bg-brand-navy relative isolate min-h-[21rem] overflow-hidden text-white lg:min-h-[23rem]"
    >
      {content.image ? (
        <Image
          alt=""
          className="object-cover object-[62%_center] opacity-75 lg:object-center"
          fill
          priority
          sizes="100vw"
          src={content.image}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--mapiap-hero-overlay-start) 0%, var(--mapiap-hero-overlay-mid) 54%, var(--mapiap-hero-overlay-end) 100%)",
        }}
      />

      <Container className="relative z-10 flex min-h-[21rem] items-center py-10 lg:min-h-[23rem]">
        <div className="max-w-2xl">
          <Eyebrow tone="inverse">{content.eyebrow}</Eyebrow>
          <h1
            className="text-[2rem] leading-[1.08] font-extrabold tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-5xl"
            id="cabinet-hero-title"
          >
            {content.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/90 lg:text-base lg:leading-7">
            {content.description}
          </p>
        </div>
      </Container>
    </section>
  );
}
