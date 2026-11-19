import { expect, test } from "@playwright/test";

test("homepage exposes the rendered narrative and routes to Cabinet", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Transformer vos ambitions en résultats durables",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Trois domaines d’expertise pour créer de la valeur durable",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Un partenaire engagé à vos côtés",
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
      name: "MAPIAP Audit & Conseils",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "Yves TCHAMO",
    }),
  ).toBeVisible();
});
