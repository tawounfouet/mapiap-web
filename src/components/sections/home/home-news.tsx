import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type { HomeNewsSectionContent } from "@/types/content";

export interface HomeNewsProps {
  content: HomeNewsSectionContent;
}

export function HomeNews({ content }: HomeNewsProps) {
  return (
    <div className="lg:col-span-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow className="mb-0 hidden lg:flex">{content.eyebrow}</Eyebrow>
          <h2 className="text-brand-navy text-xl font-extrabold lg:sr-only">
            {content.title}
          </h2>
        </div>
        <Link
          className="text-brand-teal hover:text-brand-teal-dark gap-1.5 text-[0.6875rem] no-underline"
          href={content.allAction.href}
          variant="standalone"
        >
          {content.allAction.label}
          <ArrowRight aria-hidden size={13} />
        </Link>
      </div>

      <Link
        className="border-border bg-surface-muted mt-4 grid grid-cols-[6rem_1fr] items-center gap-3 rounded-lg border p-2.5 no-underline sm:grid-cols-[7rem_1fr]"
        href={content.featured.href}
        variant="standalone"
      >
        {content.featured.image ? (
          <div className="relative h-20 overflow-hidden rounded-md sm:h-24">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="112px"
              src={content.featured.image}
            />
          </div>
        ) : null}
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            {content.featured.category ? (
              <span className="bg-editorial-advice rounded px-1.5 py-0.5 text-[0.5625rem] font-bold tracking-wider text-white uppercase">
                {content.featured.category}
              </span>
            ) : null}
            {content.featured.date ? (
              <span className="text-brand-gray-light text-[0.625rem]">
                {content.featured.date}
              </span>
            ) : null}
          </span>
          <span className="text-brand-navy mt-1.5 block text-xs leading-4 font-bold">
            {content.featured.title}
          </span>
        </span>
      </Link>

      <div className="mt-2.5 hidden gap-2 lg:grid">
        {content.secondary.map((item) => (
          <Link
            className="group border-border grid grid-cols-[4rem_1fr_auto] items-center gap-2.5 rounded-lg border bg-white p-2 no-underline"
            href={item.href}
            key={item.title}
            variant="standalone"
          >
            {item.image ? (
              <span className="relative h-12 overflow-hidden rounded-md">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="64px"
                  src={item.image}
                />
              </span>
            ) : (
              <span className="bg-surface-muted h-12 rounded-md" />
            )}
            <span className="min-w-0">
              {item.date ? (
                <span className="text-brand-gray-light text-[0.5625rem]">
                  {item.date}
                </span>
              ) : null}
              <span className="text-brand-navy group-hover:text-brand-teal mt-0.5 block text-[0.6875rem] leading-4 font-bold transition-colors">
                {item.title}
              </span>
            </span>
            <ArrowRight className="text-brand-teal shrink-0" size={14} />
          </Link>
        ))}
      </div>
    </div>
  );
}
