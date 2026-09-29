import { expect, test } from "@playwright/test";

test("cabinet page exposes the institutional narrative", async ({ page }) => {
  await page.goto("/cabinet");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "MAPIAP Audit & Conseils",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Expertise. Innovation. Performance.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Yves TCHAMO",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).last(),
  ).toHaveAttribute("href", "/contact");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});
