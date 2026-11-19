import { ExpertiseCard } from "@/components/domain/expertise-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getExpertiseHref } from "@/content/expertises";
import type { ExpertiseSummary } from "@/types/content";

export interface ExpertisesIndexSectionProps {
  items: readonly ExpertiseSummary[];
}

export function ExpertisesIndexSection({ items }: ExpertisesIndexSectionProps) {
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
            Les quatre pôles d’expertise
          </Heading>

          <Text className="mt-5" tone="muted">
            Quatre domaines d’intervention présentés par MAPIAP pour
            accompagner les entreprises et les groupes.
          </Text>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((expertise) => (
            <ExpertiseCard
              expertise={expertise}
              href={getExpertiseHref(expertise.slug)}
              key={expertise.slug}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
