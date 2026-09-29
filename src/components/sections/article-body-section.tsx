import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { ArticleContent } from "@/types/content";

export interface ArticleBodySectionProps {
  article: ArticleContent;
}

export function ArticleBodySection({ article }: ArticleBodySectionProps) {
  return (
    <Section aria-labelledby="article-body-title" tone="muted">
      <Container size="reading">
        <Text
          className="mb-4 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          Contenu
        </Text>

        <Heading as="h2" id="article-body-title" size="lg">
          Publication en préparation
        </Heading>

        <div className="mt-7 space-y-5">
          {article.body.map((paragraph) => (
            <Text key={paragraph} size="lg" tone="muted">
              {paragraph}
            </Text>
          ))}
        </div>
      </Container>
    </Section>
  );
}
