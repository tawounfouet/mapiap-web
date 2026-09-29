import { articles, draftArticles } from "@/content/actualites";
import type { ArticleRepository } from "@/features/articles/repository/article-repository";

export class LocalArticleRepository implements ArticleRepository {
  async listPublished() {
    return articles;
  }

  async findPublishedBySlug(slug: string) {
    return articles.find((article) => article.slug === slug);
  }

  async findPreviewBySlug(slug: string) {
    return [...articles, ...draftArticles].find(
      (article) => article.slug === slug,
    );
  }
}
