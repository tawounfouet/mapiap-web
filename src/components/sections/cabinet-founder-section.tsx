import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { CabinetFounderContent } from "@/types/content";

export interface CabinetFounderSectionProps {
  content: CabinetFounderContent;
}

export function CabinetFounderSection({ content }: CabinetFounderSectionProps) {
  const initials = `${content.person.firstName.charAt(0)}${content.person.lastName.charAt(0)}`;

  return (
    <section
      aria-labelledby="cabinet-founder-title"
      className="bg-white py-10 lg:py-14"
    >
      <Container>
        <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-10">
          <div
            aria-label="Portrait professionnel à intégrer"
            className="from-brand-navy to-brand-teal relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br lg:col-span-5 lg:aspect-[4/5]"
            role="img"
          >
            <div className="absolute inset-4 rounded-lg border border-white/15" />
            <span className="relative text-5xl font-extrabold tracking-tight text-white/95 lg:text-6xl">
              {initials}
            </span>
          </div>

          <div className="lg:col-span-7">
            {content.eyebrow ? <Eyebrow>{content.eyebrow}</Eyebrow> : null}
            <h2
              className="text-brand-navy text-2xl leading-[1.18] font-extrabold tracking-tight lg:text-[1.75rem]"
              id="cabinet-founder-title"
            >
              {content.person.firstName} {content.person.lastName}
            </h2>
            <p className="text-brand-teal mt-2 text-sm font-semibold">
              {content.person.role}
            </p>
            {content.person.shortBio ? (
              <p className="text-brand-gray mt-4 max-w-2xl text-sm leading-6 lg:text-base lg:leading-7">
                {content.person.shortBio}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
