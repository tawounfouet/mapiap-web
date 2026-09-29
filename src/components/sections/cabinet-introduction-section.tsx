import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { CabinetIntroductionContent } from "@/types/content";

export interface CabinetIntroductionSectionProps {
  content: CabinetIntroductionContent;
}

export function CabinetIntroductionSection({
  content,
}: CabinetIntroductionSectionProps) {
  return (
    <Section aria-labelledby="cabinet-introduction-title" tone="muted">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            {content.eyebrow ? (
              <Text
                className="mb-4 font-medium tracking-[0.18em] uppercase"
                size="sm"
                tone="muted"
              >
                {content.eyebrow}
              </Text>
            ) : null}

            <Heading as="h2" id="cabinet-introduction-title" size="lg">
              {content.title}
            </Heading>
          </div>

          <div className="max-w-2xl space-y-5">
            {content.body.map((paragraph) => (
              <Text key={paragraph} size="lg" tone="muted">
                {paragraph}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
