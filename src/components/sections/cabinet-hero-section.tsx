import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { CabinetHeroContent } from "@/types/content";

export interface CabinetHeroSectionProps {
  content: CabinetHeroContent;
}

export function CabinetHeroSection({ content }: CabinetHeroSectionProps) {
  return (
    <section
      aria-labelledby="cabinet-hero-title"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container size="content">
        <Text
          className="mb-5 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          {content.eyebrow}
        </Text>

        <Heading as="h1" id="cabinet-hero-title" size="display">
          {content.title}
        </Heading>

        <Text className="mt-7 max-w-3xl" size="lg" tone="muted">
          {content.description}
        </Text>
      </Container>
    </section>
  );
}
