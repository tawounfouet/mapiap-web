import { Section } from "@/components/layout/section";
import { PersonProfile } from "@/components/domain/person-profile";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { HomeFounderContent } from "@/types/content";

export interface FounderSectionProps {
  content: HomeFounderContent;
}

export function FounderSection({ content }: FounderSectionProps) {
  return (
    <Section aria-labelledby="home-founder-title" tone="muted">
      <Container>
        <div className="mb-10 max-w-2xl">
          {content.eyebrow ? (
            <Text
              className="mb-4 font-medium tracking-[0.18em] uppercase"
              size="sm"
              tone="muted"
            >
              {content.eyebrow}
            </Text>
          ) : null}
          <Heading as="h2" id="home-founder-title" size="lg">
            {content.title}
          </Heading>
        </div>

        <PersonProfile person={content.person} />

        {content.action ? (
          <Link
            className="mt-8"
            href={content.action.href}
            variant="standalone"
          >
            {content.action.label}
          </Link>
        ) : null}
      </Container>
    </Section>
  );
}
