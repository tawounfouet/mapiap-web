import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { HomeContactCtaContent } from "@/types/content";

export interface ContactCtaSectionProps {
  content: HomeContactCtaContent;
}

export function ContactCtaSection({ content }: ContactCtaSectionProps) {
  return (
    <Section aria-labelledby="home-contact-title">
      <Container>
        <div className="border-border bg-surface-muted rounded-lg border px-6 py-10 sm:px-10 sm:py-12 lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            {content.eyebrow ? (
              <Text
                className="mb-4 font-medium uppercase tracking-[0.18em]"
                size="sm"
                tone="muted"
              >
                {content.eyebrow}
              </Text>
            ) : null}
            <Heading as="h2" id="home-contact-title" size="lg">
              {content.title}
            </Heading>
            {content.description ? (
              <Text className="mt-5" tone="muted">
                {content.description}
              </Text>
            ) : null}
          </div>

          <Link
            className="mt-8 lg:mt-0"
            href={content.action.href}
            variant="button-primary"
          >
            {content.action.label}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
