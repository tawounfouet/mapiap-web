import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export interface LegalPlaceholderSectionProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function LegalPlaceholderSection({
  eyebrow,
  title,
  description,
}: LegalPlaceholderSectionProps) {
  return (
    <Section>
      <Container size="reading">
        <Text
          className="mb-5 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          {eyebrow}
        </Text>

        <Heading as="h1" size="xl">
          {title}
        </Heading>

        <Text className="mt-7" size="lg" tone="muted">
          {description}
        </Text>
      </Container>
    </Section>
  );
}
