import { ArrowRight } from "lucide-react";

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
      <div className="border-border bg-surface-muted mt-4 rounded-lg border px-5 py-6">
        <p className="text-brand-gray text-sm leading-6" role="status">
          {content.emptyMessage}
        </p>
      </div>
    </div>
  );
}
