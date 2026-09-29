import { ExpertiseCard } from "@/components/domain/expertise-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { ExpertiseSummary } from "@/types/content";

export interface ExpertiseSectionProps {
  items: readonly ExpertiseSummary[];
}

export function ExpertiseSection({ items }: ExpertiseSectionProps) {
  return (
    <Section aria-labelledby="home-expertises-title">
      <Container>
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Text
              className="mb-4 font-medium tracking-[0.18em] uppercase"
              size="sm"
              tone="muted"
            >
              Expertises
            </Text>
            <Heading as="h2" id="home-expertises-title" size="lg">
              Trois expertises à structurer
            </Heading>
            <Text className="mt-5" tone="muted">
              Les trois pôles sont prévus dans le périmètre du site ; leurs
              intitulés et descriptions définitifs restent à valider.
            </Text>
          </div>

          <Link href="/expertises" variant="standalone">
            Toutes les expertises
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((expertise) => (
            <ExpertiseCard
              expertise={expertise}
              href="/expertises"
              key={expertise.slug}
              linkLabel="Voir les expertises"
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
