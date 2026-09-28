import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function CabinetPage() {
  return (
    <Section>
      <Container size="content">
        <Heading as="h1" size="xl">
          Cabinet
        </Heading>
      </Container>
    </Section>
  );
}
