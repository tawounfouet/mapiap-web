import { expect, test } from "@playwright/test";

test("homepage exposes the visual-alignment narrative and navigation", async ({
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
      name: "Une méthode structurée, du diagnostic à l’impact",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("link", { name: "Nous contacter" }).first(),
  ).toHaveAttribute("href", "/contact");

  const primaryNavigation = page.getByRole("navigation", {
    name: "Navigation principale",
  });

  const homeLink = primaryNavigation.getByRole("link", { name: "Accueil" });
  await expect(homeLink).toHaveAttribute("href", "/");
  await expect(homeLink).toHaveAttribute("aria-current", "page");

  await primaryNavigation.getByRole("link", { name: "Cabinet" }).click();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "MAPIAP Audit & Conseils",
    }),
  ).toBeVisible();

  await expect(
    page
      .getByRole("navigation", { name: "Navigation principale" })
      .getByRole("link", { name: "Cabinet" }),
  ).toHaveAttribute("aria-current", "page");
});
