import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { HomeIntroductionContent } from "@/types/content";

export interface IntroductionSectionProps {
  content: HomeIntroductionContent;
}

export function IntroductionSection({ content }: IntroductionSectionProps) {
  return (
    <Section aria-labelledby="home-introduction-title" tone="muted">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            {content.eyebrow ? (
              <Text
                className="mb-4 font-medium uppercase tracking-[0.18em]"
                size="sm"
                tone="muted"
              >
                {content.eyebrow}
              </Text>
            ) : null}
            <Heading as="h2" id="home-introduction-title" size="lg">
              {content.title}
            </Heading>
          </div>

          <div className="max-w-2xl space-y-5">
            {content.body.map((paragraph) => (
              <Text key={paragraph} size="lg" tone="muted">
                {paragraph}
              </Text>
            ))}

            {content.action ? (
              <Link
                className="mt-3"
                href={content.action.href}
                variant="standalone"
              >
                {content.action.label}
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
