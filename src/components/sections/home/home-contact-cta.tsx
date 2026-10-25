import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type { HomeContactCtaContent } from "@/types/content";

export interface HomeContactCtaProps {
  content: HomeContactCtaContent;
}

export function HomeContactCta({ content }: HomeContactCtaProps) {
  return (
    <section className="bg-brand-navy relative isolate overflow-hidden py-6 text-white">
      {content.image ? (
        <Image
          alt=""
          className="-z-10 object-cover opacity-25"
          fill
          sizes="100vw"
          src={content.image}
        />
      ) : null}
      <div className="bg-brand-navy-dark/80 absolute inset-0 -z-10" />
      <Container className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
        <div className="max-w-3xl">
          {content.eyebrow ? (
            <Eyebrow tone="inverse">{content.eyebrow}</Eyebrow>
          ) : null}
          <h2 className="text-lg leading-6 font-bold text-white sm:text-xl sm:leading-7">
            {content.title}
          </h2>
          {content.description ? (
            <p className="mt-2 text-xs leading-5 text-white/85">
              {content.description}
            </p>
          ) : null}
        </div>
        <Link
          className="bg-brand-teal hover:bg-brand-teal-dark min-h-11 shrink-0 gap-2 text-white hover:opacity-100"
          href={content.action.href}
          variant="button-primary"
        >
          {content.action.label}
          <ArrowRight aria-hidden size={17} />
        </Link>
      </Container>
    </section>
  );
}
