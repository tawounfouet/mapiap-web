import { describe, expect, it } from "vitest";

import {
  articles,
  draftArticles,
  getArticleHref,
  toArticleSummary,
} from "./actualites";

describe("actualites content helpers", () => {
  it("does not publish any unapproved local content", () => {
    expect(articles).toEqual([]);
    expect(draftArticles).toHaveLength(1);
    expect(articles).not.toContain(draftArticles[0]);
  });

  it("maps an explicitly supplied article to its summary", () => {
    expect(
      toArticleSummary({
        slug: "publication-validee",
        title: "Publication validée",
        excerpt: "Résumé validé.",
        body: ["Texte approuvé."],
      }),
    ).toEqual({
      slug: "publication-validee",
      title: "Publication validée",
      excerpt: "Résumé validé.",
    });
  });

  it("builds the public article detail path", () => {
    expect(getArticleHref("publication-test")).toBe(
      "/actualites/publication-test",
    );
  });
});
