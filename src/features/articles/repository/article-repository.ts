import type { ArticleContent } from "@/types/content";

export interface ArticleRepository {
  listPublished(): Promise<readonly ArticleContent[]>;
  findPublishedBySlug(slug: string): Promise<ArticleContent | undefined>;
  findPreviewBySlug(slug: string): Promise<ArticleContent | undefined>;
}
