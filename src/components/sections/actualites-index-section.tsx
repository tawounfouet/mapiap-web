import { ArticleCard } from "@/components/domain/article-card";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getArticleHref } from "@/content/actualites";
import type { ArticleSummary } from "@/types/content";

export interface ActualitesIndexSectionProps {
  items: readonly ArticleSummary[];
}

export function ActualitesIndexSection({ items }: ActualitesIndexSectionProps) {
  return (
    <Section aria-labelledby="actualites-index-title" tone="muted">
      <Container>
        <div className="mb-10 max-w-3xl">
          <Text
            className="mb-4 font-medium tracking-[0.18em] uppercase"
            size="sm"
            tone="muted"
          >
            Publications
          </Text>

          <Heading as="h2" id="actualites-index-title" size="lg">
            Espace éditorial
          </Heading>

          <Text className="mt-5" tone="muted">
            La structure est opérationnelle. Les publications ci-dessous sont
            des contenus de démonstration explicitement provisoires.
          </Text>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {items.map((article) => (
            <ArticleCard
              article={article}
              href={getArticleHref(article.slug)}
              key={article.slug}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
