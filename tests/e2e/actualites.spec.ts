import { expect, test } from "@playwright/test";

test("actualites index exposes development publications", async ({ page }) => {
  await page.goto("/actualites");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Actualités & publications",
    }),
  ).toBeVisible();

  for (const title of ["Article 01", "Article 02"]) {
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: title,
      }),
    ).toBeVisible();
  }

  await expect(
    page.getByRole("link", { name: "Lire la publication" }).first(),
  ).toHaveAttribute("href", "/actualites/article-01-a-valider");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});

test("article detail route renders known content", async ({ page }) => {
  await page.goto("/actualites/article-01-a-valider");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Article 01",
    }),
  ).toBeVisible();

  const breadcrumb = page.getByRole("navigation", {
    name: "Fil d’Ariane",
  });

  await expect(breadcrumb).toBeVisible();
  await expect(
    breadcrumb.getByRole("link", { name: "Actualités" }),
  ).toHaveAttribute("href", "/actualites");

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).last(),
  ).toHaveAttribute("href", "/contact");
});

test("unknown article slug returns 404", async ({ page }) => {
  const response = await page.goto("/actualites/article-inconnu");

  expect(response?.status()).toBe(404);
});
