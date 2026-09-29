import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { ExpertisesIndexContent } from "@/types/content";

export interface ExpertisesHeroSectionProps {
  content: Pick<ExpertisesIndexContent, "eyebrow" | "title" | "description">;
}

export function ExpertisesHeroSection({ content }: ExpertisesHeroSectionProps) {
  return (
    <section
      aria-labelledby="expertises-hero-title"
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

        <Heading as="h1" id="expertises-hero-title" size="display">
          {content.title}
        </Heading>

        <Text className="mt-7 max-w-3xl" size="lg" tone="muted">
          {content.description}
        </Text>
      </Container>
    </section>
  );
}
