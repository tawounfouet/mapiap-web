import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { HomeDifferentiators } from "@/components/sections/home/home-differentiators";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Link } from "@/components/ui/link";
import type { HomeCabinetContent, HomeDifferentiator } from "@/types/content";

export interface HomeCabinetProps {
  content: HomeCabinetContent;
  differentiators: readonly HomeDifferentiator[];
}

export function HomeCabinet({ content, differentiators }: HomeCabinetProps) {
  return (
    <section className="bg-white py-10 lg:py-14" id="cabinet">
      <Container>
        <div className="grid items-start gap-7 min-[380px]:grid-cols-8 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="min-[380px]:col-span-5 lg:col-span-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="text-brand-navy text-[1.75rem] leading-[1.2] font-extrabold tracking-tight lg:text-3xl">
              {content.title}
            </h2>
            <p className="text-brand-gray mt-4 max-w-xl text-sm leading-6 lg:text-base lg:leading-7">
              {content.description}
            </p>
            <Link
              className="text-brand-navy hover:text-brand-teal mt-5 gap-2 text-sm no-underline"
              href={content.action.href}
              variant="standalone"
            >
              {content.action.label}
              <ArrowRight aria-hidden size={16} />
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md min-[380px]:col-span-3 min-[380px]:mt-9 lg:col-span-4 lg:mt-0 lg:aspect-[16/9]">
            <Image
              alt="Espace de travail contemporain propice aux échanges"
              className="object-cover transition-transform duration-400 hover:scale-[1.02] motion-reduce:transition-none"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 380px) 38vw, 100vw"
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
