import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { homeIcons } from "@/components/sections/home/home-icons";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type { HomeExpertiseSectionContent } from "@/types/content";

export interface HomeExpertisesProps {
  content: HomeExpertiseSectionContent;
}

export function HomeExpertises({ content }: HomeExpertisesProps) {
  return (
    <section className="bg-surface-muted py-10 lg:py-14">
      <Container>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="text-brand-navy max-w-3xl text-[1.75rem] leading-[1.2] font-extrabold tracking-tight lg:max-w-5xl lg:text-3xl">
              {content.title}
            </h2>
          </div>
          <Link
            className="text-brand-teal mt-8 hidden shrink-0 gap-1.5 text-[0.6875rem] no-underline min-[380px]:inline-flex lg:hidden"
            href={content.allAction.href}
            variant="standalone"
          >
            {content.allAction.label}
            <ArrowRight aria-hidden size={13} />
          </Link>
        </div>

        <div className="mt-7 grid gap-3 lg:hidden">
          {content.items.map((item) => {
            const Icon = homeIcons[item.icon];

            return (
              <Link
                className="border-border bg-surface group flex min-h-[5rem] items-center gap-4 rounded-xl border p-4 no-underline shadow-sm"
                href={item.href}
                key={item.title}
                variant="standalone"
              >
                <span className="bg-surface-muted text-brand-teal flex size-11 shrink-0 items-center justify-center rounded-lg">
                  <Icon aria-hidden size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-brand-navy block text-sm font-bold">
                    {item.title}
                  </span>
                  <span className="text-brand-gray mt-1 block text-xs leading-5">
                    {item.description}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="text-brand-teal shrink-0"
                  size={17}
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-8 hidden grid-cols-3 gap-5 lg:grid">
          {content.items.map((item) => {
            const Icon = homeIcons[item.icon];

            return (
              <article
                className="group border-border overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
                key={item.title}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    alt=""
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.02] motion-reduce:transition-none"
                    fill
                    sizes="33vw"
                    src={item.image}
                  />
                </div>
                <div className="relative flex min-h-44 flex-col p-5 pt-8">
                  <span className="border-border text-brand-teal absolute -top-5 left-5 flex size-10 items-center justify-center rounded-lg border bg-white shadow-sm">
                    <Icon aria-hidden size={21} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-brand-navy text-base font-bold">
                    {item.title}
                  </h3>
                  <p className="text-brand-gray mt-2 flex-1 text-sm leading-6">
                    {item.description}
                  </p>
                  <Link
                    className="text-brand-teal hover:text-brand-teal-dark mt-4 gap-2 text-sm no-underline"
                    href={item.href}
                    variant="standalone"
                  >
                    En savoir plus
                    <ArrowRight aria-hidden size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
