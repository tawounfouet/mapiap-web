import { expect, test } from "@playwright/test";

test("homepage shell and navigation are reachable", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "MAPIAP Audit & Conseils",
    }),
  ).toBeVisible();

  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "Cabinet" })
    .click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Cabinet",
    }),
  ).toBeVisible();
});
