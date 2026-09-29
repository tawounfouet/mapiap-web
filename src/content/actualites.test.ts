import { describe, expect, it } from "vitest";

import { articles, getArticleHref, toArticleSummary } from "./actualites";

describe("actualites content helpers", () => {
  it("maps ArticleContent to its summary projection", () => {
    expect(toArticleSummary(articles[0])).toEqual({
      slug: "article-01-a-valider",
      title: "Article 01",
      excerpt:
        "À valider — titre, angle éditorial et résumé de la première publication.",
    });
  });

  it("builds the public article detail path", () => {
    expect(getArticleHref("article-test")).toBe("/actualites/article-test");
  });
});
