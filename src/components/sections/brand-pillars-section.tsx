import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { CabinetPillarsContent } from "@/types/content";

export interface BrandPillarsSectionProps {
  content: CabinetPillarsContent;
}

export function BrandPillarsSection({ content }: BrandPillarsSectionProps) {
  return (
    <Section aria-labelledby="cabinet-pillars-title">
      <Container>
        <div className="mb-10 max-w-3xl">
          {content.eyebrow ? (
            <Text
              className="mb-4 font-medium tracking-[0.18em] uppercase"
              size="sm"
              tone="muted"
            >
              {content.eyebrow}
            </Text>
          ) : null}

          <Heading as="h2" id="cabinet-pillars-title" size="lg">
            {content.title}
          </Heading>

          {content.description ? (
            <Text className="mt-5" tone="muted">
              {content.description}
            </Text>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {content.items.map((item, index) => (
            <Card className="h-full" key={item.title}>
              <Text className="font-medium tabular-nums" size="sm" tone="muted">
                0{index + 1}
              </Text>
              <Heading as="h3" className="mt-5" size="sm">
                {item.title}
              </Heading>
              <Text className="mt-4" tone="muted">
                {item.description}
              </Text>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
