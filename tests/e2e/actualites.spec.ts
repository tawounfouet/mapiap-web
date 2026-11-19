import { expect, test } from "@playwright/test";

test("actualites index has an honest empty state", async ({ page }) => {
  await page.goto("/actualites");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Actualités & publications",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("status", { name: "" }).last(),
  ).toContainText("Aucune publication pour le moment.");

  await expect(
    page.getByRole("link", { name: "Lire la publication" }),
  ).toHaveCount(0);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("fictitious article detail routes are not publicly accessible", async ({
  page,
}) => {
  for (const slug of ["article-01-a-valider", "article-02-a-valider"]) {
    const response = await page.goto("/actualites/" + slug);
    expect(response?.status()).toBe(404);
  }
});

test("unknown article slug returns 404", async ({ page }) => {
  const response = await page.goto("/actualites/article-inconnu");
  expect(response?.status()).toBe(404);
});

test("homepage never displays fictional 2024 publications", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Aucune publication pour le moment.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("Innovation et performance : quels leviers pour 2024 ?"),
  ).toHaveCount(0);
});
