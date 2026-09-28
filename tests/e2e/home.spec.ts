import { expect, test } from "@playwright/test";

test("homepage MVP exposes the primary narrative and navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Expertise. Innovation. Performance.",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Trois expertises à structurer",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Yves TCHAMO",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).first(),
  ).toHaveAttribute("href", "/contact");

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
