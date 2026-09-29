import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { ArticleContent } from "@/types/content";

export interface ArticleDetailHeroSectionProps {
  article: ArticleContent;
}

export function ArticleDetailHeroSection({
  article,
}: ArticleDetailHeroSectionProps) {
  return (
    <section
      aria-labelledby="article-detail-title"
      className="bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container size="content">
        <nav aria-label="Fil d’Ariane" className="mb-8">
          <ol className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link href="/actualites" variant="navigation">
                Actualités
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page">{article.title}</li>
          </ol>
        </nav>

        <Text
          className="mb-5 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          Publication à valider
        </Text>

        <Heading as="h1" id="article-detail-title" size="display">
          {article.title}
        </Heading>

        <Text className="mt-7 max-w-3xl" size="lg" tone="muted">
          {article.excerpt}
        </Text>
      </Container>
    </section>
  );
}
