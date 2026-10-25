import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type { HomeHeroContent } from "@/types/content";

export interface HomeHeroProps {
  content: HomeHeroContent;
}

export function HomeHero({ content }: HomeHeroProps) {
  const highlight = content.highlight;
  const titleParts = highlight
    ? content.title.split(highlight)
    : [content.title];

  return (
    <section
      aria-labelledby="home-hero-title"
      className="bg-brand-navy relative isolate min-h-[25rem] overflow-hidden text-white lg:min-h-[23rem]"
    >
      {content.image ? (
        <Image
          alt="Façade vitrée d’un immeuble contemporain"
          className="object-cover object-[62%_center] opacity-90 lg:object-center"
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
            "linear-gradient(90deg, var(--mapiap-hero-overlay-start) 0%, var(--mapiap-hero-overlay-mid) 50%, var(--mapiap-hero-overlay-end) 100%)",
        }}
      />
      <Container className="relative z-10 flex min-h-[25rem] items-center py-10 lg:min-h-[23rem] lg:py-10">
        <div className="max-w-[34rem]">
          <Eyebrow tone="inverse">{content.eyebrow}</Eyebrow>
          <h1
            className="text-[2rem] leading-[1.08] font-extrabold tracking-[-0.025em] text-white sm:text-[2.25rem] lg:text-5xl lg:leading-[1.08]"
            id="home-hero-title"
          >
            {titleParts[0]}
            {highlight ? (
              <>
                <span className="text-brand-cyan">{highlight}</span>
                {titleParts.slice(1).join(highlight)}
              </>
            ) : null}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/90 lg:text-base lg:leading-7">
            {content.description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              className="bg-brand-teal hover:bg-brand-teal-dark min-h-11 gap-2 text-white hover:opacity-100"
              href={content.primaryAction.href}
              variant="button-primary"
            >
              {content.primaryAction.label}
              <ArrowRight aria-hidden size={17} />
            </Link>
            {content.secondaryAction ? (
              <Link
                className="min-h-11 border-white/75 bg-transparent text-white hover:bg-white/10"
                href={content.secondaryAction.href}
                variant="button-secondary"
              >
                {content.secondaryAction.label}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
