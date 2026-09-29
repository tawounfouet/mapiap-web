import {
  getCmsContentConfig,
  getContentSource,
} from "@/config/content";
import type { ArticleRepository } from "@/features/articles/repository/article-repository";
import { CmsArticleRepository } from "@/features/articles/repository/cms-article-repository";
import { LocalArticleRepository } from "@/features/articles/repository/local-article-repository";

export function getArticleRepository(): ArticleRepository {
  const source = getContentSource();

  if (source === "cms") {
    return new CmsArticleRepository(getCmsContentConfig());
  }

  return new LocalArticleRepository();
}
