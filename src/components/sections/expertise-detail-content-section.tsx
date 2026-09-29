import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { ExpertiseContent } from "@/types/content";

export interface ExpertiseDetailContentSectionProps {
  expertise: ExpertiseContent;
}

export function ExpertiseDetailContentSection({
  expertise,
}: ExpertiseDetailContentSectionProps) {
  return (
    <Section aria-labelledby="expertise-detail-content-title" tone="muted">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <Text
              className="mb-4 font-medium tracking-[0.18em] uppercase"
              size="sm"
              tone="muted"
            >
              Périmètre
            </Text>

            <Heading as="h2" id="expertise-detail-content-title" size="lg">
              Une expertise à documenter
            </Heading>
          </div>

          <div className="max-w-2xl space-y-5">
            <Text size="lg">{expertise.shortDescription}</Text>

            {expertise.body.map((paragraph) => (
              <Text key={paragraph} tone="muted">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
