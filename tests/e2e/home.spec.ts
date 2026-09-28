import { expect, test } from "@playwright/test";

test("homepage is reachable", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "MAPIAP Audit & Conseils",
    }),
  ).toBeVisible();
});
