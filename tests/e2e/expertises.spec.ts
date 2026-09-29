import { expect, test } from "@playwright/test";

test("expertises index exposes the three planned domains", async ({ page }) => {
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

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).last(),
  ).toHaveAttribute("href", "/contact");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});
