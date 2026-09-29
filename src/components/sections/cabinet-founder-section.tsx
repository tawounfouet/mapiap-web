import { PersonProfile } from "@/components/domain/person-profile";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import type { CabinetFounderContent } from "@/types/content";

export interface CabinetFounderSectionProps {
  content: CabinetFounderContent;
}

export function CabinetFounderSection({ content }: CabinetFounderSectionProps) {
  return (
    <Section aria-label="Direction du cabinet" tone="muted">
      <Container>
        {content.eyebrow ? (
          <Text
            className="mb-8 font-medium tracking-[0.18em] uppercase"
            size="sm"
            tone="muted"
          >
            {content.eyebrow}
          </Text>
        ) : null}

        <PersonProfile headingAs="h2" person={content.person} />
      </Container>
    </Section>
  );
}
