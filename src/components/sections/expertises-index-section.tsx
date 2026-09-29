import { ExpertiseCard } from "@/components/domain/expertise-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { ExpertiseSummary } from "@/types/content";

export interface ExpertisesIndexSectionProps {
  items: readonly ExpertiseSummary[];
}

export function ExpertisesIndexSection({
  items,
}: ExpertisesIndexSectionProps) {
  return (
    <Section aria-labelledby="expertises-index-title" tone="muted">
      <Container>
        <div className="mb-10 max-w-3xl">
          <Text
            className="mb-4 font-medium tracking-[0.18em] uppercase"
            size="sm"
            tone="muted"
          >
            Périmètre
          </Text>

          <Heading as="h2" id="expertises-index-title" size="lg">
            Les trois domaines prévus
          </Heading>

          <Text className="mt-5" tone="muted">
            Les cartes ci-dessous matérialisent la structure attendue. Les
            liens vers les pages détail seront activés au LOT-08, une fois la
            route dynamique qualifiée.
          </Text>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((expertise) => (
            <ExpertiseCard expertise={expertise} key={expertise.slug} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
