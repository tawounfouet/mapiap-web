import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { HomeDifferentiators } from "@/components/sections/home/home-differentiators";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type {
  HomeCabinetContent,
  HomeDifferentiator,
} from "@/types/content";

export interface HomeCabinetProps {
  content: HomeCabinetContent;
  differentiators: readonly HomeDifferentiator[];
}

export function HomeCabinet({
  content,
  differentiators,
}: HomeCabinetProps) {
  return (
    <section className="bg-white py-12 lg:py-16" id="cabinet">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="text-brand-navy text-[1.75rem] leading-[1.2] font-extrabold tracking-tight lg:text-3xl">
              {content.title}
            </h2>
            <p className="text-brand-gray mt-5 max-w-xl text-sm leading-6 lg:text-base lg:leading-7">
              {content.description}
            </p>
            <Link
              className="text-brand-navy hover:text-brand-teal mt-6 gap-2 text-sm no-underline"
              href={content.action.href}
              variant="standalone"
            >
              {content.action.label}
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md lg:col-span-4">
            <Image
              alt="Espace de travail contemporain propice aux échanges"
              className="object-cover transition-transform duration-400 hover:scale-[1.02] motion-reduce:transition-none"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              src={content.image}
            />
          </div>

          <HomeDifferentiators
            className="hidden lg:col-span-3 lg:grid"
            items={differentiators}
          />
        </div>
      </Container>
    </section>
  );
}
