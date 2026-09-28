import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function HomePage() {
  return (
    <main>
      <Section spacing="lg">
        <Container size="content">
          <Text
            className="mb-3 font-medium tracking-wide uppercase"
            size="sm"
            tone="muted"
          >
            Frontend foundation
          </Text>
          <Heading as="h1" size="xl">
            MAPIAP Audit & Conseils
          </Heading>
        </Container>
      </Section>
    </main>
  );
}
