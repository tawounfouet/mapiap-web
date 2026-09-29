import { z } from "zod";

import type { CmsContentConfig } from "@/config/content";
import type { ArticleRepository } from "@/features/articles/repository/article-repository";
import type { ArticleContent } from "@/types/content";

const cmsArticleSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().min(1).max(600),
  body: z.array(z.string().trim().min(1)).min(1),
  status: z.literal("published"),
});

export const cmsArticlesResponseSchema = z.object({
  items: z.array(cmsArticleSchema),
});

function toArticleContent(
  article: z.infer<typeof cmsArticleSchema>,
): ArticleContent {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
  };
}

export class CmsArticleRepository implements ArticleRepository {
  constructor(private readonly config: CmsContentConfig) {}

  private async fetchPublishedArticles(): Promise<readonly ArticleContent[]> {
    const headers = new Headers({
      accept: "application/json",
    });

    if (this.config.token) {
      headers.set("authorization", `Bearer ${this.config.token}`);
    }

    const response = await fetch(this.config.endpoint, {
      headers,
      next: {
        revalidate: 300,
        tags: ["cms:articles"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `CMS article request failed with status ${response.status}.`,
      );
    }

    const payload: unknown = await response.json();
    const parsed = cmsArticlesResponseSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(
        "CMS article response does not match the expected contract.",
      );
    }

    return parsed.data.items.map(toArticleContent);
  }

  async listPublished() {
    return this.fetchPublishedArticles();
  }

  async findPublishedBySlug(slug: string) {
    const articles = await this.fetchPublishedArticles();

    return articles.find((article) => article.slug === slug);
  }
}
