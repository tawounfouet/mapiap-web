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
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="text-brand-navy text-2xl font-extrabold">
            {content.title}
          </h2>
        </div>
        <Link
          className="text-brand-teal hover:text-brand-teal-dark gap-1.5 text-xs no-underline"
          href={content.allAction.href}
          variant="standalone"
        >
          {content.allAction.label}
          <ArrowRight aria-hidden size={14} />
        </Link>
      </div>

      <Link
        className="border-border bg-surface-muted mt-5 grid grid-cols-[6.5rem_1fr] items-center gap-4 rounded-xl border p-3 no-underline sm:grid-cols-[8rem_1fr]"
        href={content.featured.href}
        variant="standalone"
      >
        {content.featured.image ? (
          <div className="relative h-24 overflow-hidden rounded-lg sm:h-28">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="128px"
              src={content.featured.image}
            />
          </div>
        ) : null}
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-2">
            {content.featured.category ? (
              <span className="bg-editorial-advice rounded px-2 py-1 text-[0.625rem] font-bold tracking-wider text-white uppercase">
                {content.featured.category}
              </span>
            ) : null}
            {content.featured.date ? (
              <span className="text-brand-gray-light text-[0.6875rem]">
                {content.featured.date}
              </span>
            ) : null}
          </span>
          <span className="text-brand-navy mt-2 block text-sm leading-5 font-bold">
            {content.featured.title}
          </span>
        </span>
      </Link>

      <div className="mt-3 hidden gap-2 lg:grid">
        {content.secondary.map((item) => (
          <Link
            className="group border-border grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-lg border bg-white p-2 no-underline"
            href={item.href}
            key={item.title}
            variant="standalone"
          >
            {item.image ? (
              <span className="relative h-14 overflow-hidden rounded-md">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="72px"
                  src={item.image}
                />
              </span>
            ) : (
              <span className="bg-surface-muted h-14 rounded-md" />
            )}
            <span className="min-w-0">
              {item.date ? (
                <span className="text-brand-gray-light text-[0.625rem]">
                  {item.date}
                </span>
              ) : null}
              <span className="text-brand-navy group-hover:text-brand-teal mt-0.5 block text-xs leading-4 font-bold transition-colors">
                {item.title}
              </span>
            </span>
            <ArrowRight className="text-brand-teal shrink-0" size={15} />
          </Link>
        ))}
      </div>
    </div>
  );
}
