import { expect, test } from "@playwright/test";

test("unconfigured deployment blocks search crawling", async ({ request }) => {
  const response = await request.get("/robots.txt");

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("Disallow: /");
});

test("unconfigured deployment does not expose provisional URLs in sitemap", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  const body = await response.text();

  expect(response.status()).toBe(200);
  expect(body).not.toContain("expertise-01-a-valider");
  expect(body).not.toContain("article-01-a-valider");
});

test("page title uses the global MAPIAP template", async ({ page }) => {
  await page.goto("/cabinet");

  await expect(page).toHaveTitle("Cabinet | MAPIAP Audit & Conseils");
});

test("legal placeholder routes are explicitly noindex", async ({ page }) => {
  await page.goto("/mentions-legales");

  await expect(
    page.getByRole("heading", { level: 1, name: "Mentions légales" }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );

  await page.goto("/politique-de-confidentialite");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Politique de confidentialité",
    }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("unknown public route returns the dedicated 404 page", async ({
  page,
}) => {
  const response = await page.goto("/page-totalement-inconnue");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "Page introuvable" }),
  ).toBeVisible();
});
