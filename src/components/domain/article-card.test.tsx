import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArticleCard } from "./article-card";

describe("ArticleCard", () => {
  it("renders article content and its explicit destination", () => {
    render(
      <ArticleCard
        article={{
          slug: "article-test",
          title: "Article Test",
          excerpt: "Résumé de test",
        }}
        href="/actualites/article-test"
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Article Test" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /lire la publication/i }),
    ).toHaveAttribute("href", "/actualites/article-test");
  });
});
