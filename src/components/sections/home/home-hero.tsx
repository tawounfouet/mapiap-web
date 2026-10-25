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
      className="bg-brand-navy relative isolate min-h-[32rem] overflow-hidden text-white lg:min-h-[28rem]"
    >
      {content.image ? (
        <Image
          alt="Façade vitrée d’un immeuble contemporain"
          className="object-cover object-center opacity-75"
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
            "linear-gradient(90deg, var(--mapiap-hero-overlay-start) 0%, var(--mapiap-hero-overlay-mid) 46%, var(--mapiap-hero-overlay-end) 100%)",
        }}
      />
      <Container className="relative z-10 flex min-h-[32rem] items-center py-14 lg:min-h-[28rem] lg:py-14">
        <div className="max-w-2xl">
          <Eyebrow tone="inverse">{content.eyebrow}</Eyebrow>
          <h1
            className="text-[2.125rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.5rem] lg:text-5xl lg:leading-[1.15]"
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
          <p className="mt-5 max-w-xl text-base leading-7 text-white/90">
            {content.description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
