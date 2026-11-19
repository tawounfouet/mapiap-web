import { expect, test } from "@playwright/test";

const expectedExpertises = [
  {
    title: "Comptabilité et accompagnement des TPE/PME",
    slug: "comptabilite-accompagnement-tpe-pme",
  },
  {
    title: "Consolidation des comptes de groupe (normes françaises et IFRS)",
    slug: "consolidation-comptes-groupe",
  },
  {
    title: "Fiscalité, juridique et social",
    slug: "fiscalite-juridique-social",
  },
  {
    title: "Audit, évaluation et conseil financier",
    slug: "audit-evaluation-conseil-financier",
  },
] as const;

test("expertises index exposes the four client-supplied domains", async ({
  page,
}) => {
  await page.goto("/expertises");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Quatre pôles d’expertise à vos côtés",
    }),
  ).toBeVisible();

  for (const { title, slug } of expectedExpertises) {
    await expect(
      page.getByRole("heading", { level: 3, name: title }),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/expertises/' + slug + '"]'),
    ).toHaveCount(1);
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
});

test("expertise detail displays the consolidation offering", async ({
  page,
}) => {
  await page.goto("/expertises/consolidation-comptes-groupe");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Consolidation des comptes de groupe (normes françaises et IFRS)",
    }),
  ).toBeVisible();

  const breadcrumb = page.getByRole("navigation", {
    name: "Fil d’Ariane",
  });
  await expect(
    breadcrumb.getByRole("link", { name: "Expertises" }),
  ).toHaveAttribute("href", "/expertises");
});

test("homepage expertise cards link to each business detail", async ({
  page,
}) => {
  await page.goto("/");
  for (const { slug } of expectedExpertises) {
    await expect(
      page.locator('a[href="/expertises/' + slug + '"]'),
    ).toHaveCount(2);
  }
});

test("unknown and old provisional expertise slugs return 404", async ({
  page,
}) => {
  for (const slug of ["expertise-01-a-valider", "expertise-inconnue"]) {
    const response = await page.goto("/expertises/" + slug);
    expect(response?.status()).toBe(404);
  }
});
