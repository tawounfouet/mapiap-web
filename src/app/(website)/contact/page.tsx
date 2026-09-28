import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

export default function ContactPage() {
  return (
    <Section>
      <Container size="content">
        <Heading as="h1" size="xl">
          Contact
        </Heading>
      </Container>
    </Section>
  );
}
