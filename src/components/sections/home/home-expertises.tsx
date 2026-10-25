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
    <section className="border-border border-t bg-white py-8 lg:py-10">
      <Container>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="text-brand-navy max-w-3xl text-[1.375rem] leading-[1.22] font-extrabold tracking-tight lg:max-w-5xl lg:text-[1.6rem]">
              {content.title}
            </h2>
          </div>
          <Link
            className="text-brand-teal mt-7 hidden shrink-0 gap-1.5 text-[0.6875rem] no-underline min-[380px]:inline-flex lg:hidden"
            href={content.allAction.href}
            variant="standalone"
          >
            {content.allAction.label}
            <ArrowRight aria-hidden size={13} />
          </Link>
        </div>

        <div className="mt-5 grid gap-2.5 lg:hidden">
          {content.items.map((item) => {
            const Icon = homeIcons[item.icon];

            return (
              <Link
                className="border-border bg-surface group flex min-h-[4.5rem] items-center gap-3 rounded-lg border px-3.5 py-3 no-underline shadow-sm"
                href={item.href}
                key={item.title}
                variant="standalone"
              >
                <span className="bg-surface-muted text-brand-teal flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon aria-hidden size={21} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="text-brand-navy block text-sm font-bold">
                    {item.title}
                  </span>
                  <span className="text-brand-gray mt-0.5 block text-[0.6875rem] leading-4">
                    {item.description}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="text-brand-teal shrink-0"
                  size={16}
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-5 hidden grid-cols-3 gap-4 lg:grid">
          {content.items.map((item) => {
            const Icon = homeIcons[item.icon];

            return (
              <article
                className="group border-border overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md"
                key={item.title}
              >
                <div className="relative h-28 overflow-hidden">
                  <Image
                    alt=""
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.02] motion-reduce:transition-none"
                    fill
                    sizes="33vw"
                    src={item.image}
                  />
                </div>
                <div className="relative flex min-h-36 flex-col p-4 pt-7">
                  <span className="border-border text-brand-teal absolute -top-4 left-4 flex size-9 items-center justify-center rounded-lg border bg-white shadow-sm">
                    <Icon aria-hidden size={19} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-brand-navy text-sm font-bold">
                    {item.title}
                  </h3>
                  <p className="text-brand-gray mt-1.5 flex-1 text-xs leading-5">
                    {item.description}
                  </p>
                  <Link
                    className="text-brand-teal hover:text-brand-teal-dark mt-3 gap-2 text-xs no-underline"
                    href={item.href}
                    variant="standalone"
                  >
                    En savoir plus
                    <ArrowRight aria-hidden size={14} />
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
