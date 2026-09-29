import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { ContactPageContent } from "@/types/content";

export interface ContactFormSectionProps {
  content: Pick<
    ContactPageContent,
    | "formTitle"
    | "formDescription"
    | "directContactTitle"
    | "directContactDescription"
  >;
}

export function ContactFormSection({ content }: ContactFormSectionProps) {
  return (
    <Section aria-labelledby="contact-form-title" tone="muted">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <div>
            <Heading as="h2" id="contact-form-title" size="lg">
              {content.formTitle}
            </Heading>
            <Text className="mt-4 mb-8 max-w-2xl" tone="muted">
              {content.formDescription}
            </Text>
            <ContactForm />
          </div>

          <Card className="h-fit">
            <Heading as="h2" size="sm">
              {content.directContactTitle}
            </Heading>
            <Text className="mt-4" tone="muted">
              {content.directContactDescription}
            </Text>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
