import { describe, expect, it } from "vitest";

import { articles, getArticleBySlug, getArticleHref } from "./actualites";

describe("actualites content helpers", () => {
  it("resolves a known article by slug", () => {
    const article = getArticleBySlug(articles[0].slug);

    expect(article?.title).toBe("Article 01");
  });

  it("returns undefined for an unknown article slug", () => {
    expect(getArticleBySlug("article-inconnu")).toBeUndefined();
  });

  it("builds the public article detail path", () => {
    expect(getArticleHref("article-test")).toBe("/actualites/article-test");
  });
});
