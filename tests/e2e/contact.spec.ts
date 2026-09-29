import { expect, test } from "@playwright/test";

test("contact page exposes server-side validation errors", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Échanger avec MAPIAP",
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Envoyer la demande" }).click();

  await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
  await expect(
    page.getByText("Indiquez une adresse email valide."),
  ).toBeVisible();
  await expect(
    page.getByText("Décrivez votre demande en au moins 20 caractères."),
  ).toBeVisible();
});

test("valid contact request never reports false delivery success", async ({
  page,
}) => {
  await page.goto("/contact");

  await page.getByLabel("Nom complet").fill("Jean Dupont");
  await page.getByLabel("Email").fill("jean@example.com");
  await page.getByLabel("Organisation").fill("Entreprise Test");
  await page
    .getByRole("textbox", { name: "Votre demande" })
    .fill("Je souhaite échanger au sujet d’un besoin professionnel précis.");
  await page
    .getByLabel(
      "J’accepte que les informations saisies soient utilisées uniquement pour répondre à ma demande.",
    )
    .check();

  await page.getByRole("button", { name: "Envoyer la demande" }).click();

  await expect(
    page.getByText(
      "Le formulaire est validé, mais l’envoi n’est pas encore configuré. Aucun message n’a été transmis.",
    ),
  ).toBeVisible();
});

test("contact page has no horizontal overflow on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/contact");

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
});
