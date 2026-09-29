import { expect, test } from "@playwright/test";

test("expertises index exposes the three planned domains and detail links", async ({
  page,
}) => {
  await page.goto("/expertises");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Trois expertises à structurer",
    }),
  ).toBeVisible();

  for (const title of ["Expertise 01", "Expertise 02", "Expertise 03"]) {
    await expect(
      page.getByRole("heading", {
        level: 3,
        name: title,
      }),
    ).toBeVisible();
  }

  await expect(page.getByRole("link", { name: "En savoir plus" }).first()).toHaveAttribute(
    "href",
    "/expertises/expertise-01-a-valider",
  );

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});

test("expertise detail route renders known content", async ({ page }) => {
  await page.goto("/expertises/expertise-01-a-valider");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Expertise 01",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("navigation", { name: "Fil d’Ariane" }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Expertises" }),
  ).toHaveAttribute("href", "/expertises");

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).last(),
  ).toHaveAttribute("href", "/contact");
});

test("unknown expertise slug returns 404", async ({ page }) => {
  const response = await page.goto("/expertises/expertise-inconnue");

  expect(response?.status()).toBe(404);
});
