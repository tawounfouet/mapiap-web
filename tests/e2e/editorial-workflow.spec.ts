import { expect, test } from "@playwright/test";

const previewSecret = process.env.CMS_PREVIEW_SECRET ?? "e2e-preview-secret";
const revalidateSecret =
  process.env.CMS_REVALIDATE_SECRET ?? "e2e-revalidate-secret";

test("preview endpoint rejects an invalid secret", async ({ request }) => {
  const response = await request.get(
    "/api/preview?secret=wrong-secret&slug=article-01-a-valider",
    {
      maxRedirects: 0,
    },
  );

  expect(response.status()).toBe(401);
});

test("preview endpoint sets the signed session cookie and targets the fixed preview route", async ({
  request,
}) => {
  const response = await request.get(
    `/api/preview?secret=${previewSecret}&slug=article-01-a-valider`,
    {
      maxRedirects: 0,
    },
  );

  expect(response.status()).toBe(307);
  expect(response.headers()["location"]).toContain(
    "/preview/actualites?slug=article-01-a-valider",
  );
  expect(response.headers()["set-cookie"]).toContain(
    "mapiap_preview_session",
  );
});

test("signed preview session renders editorial preview content", async ({
  page,
}) => {
  await page.goto(
    `/api/preview?secret=${previewSecret}&slug=article-01-a-valider`,
  );

  await expect(page).toHaveURL(
    /\/preview\/actualites\?slug=article-01-a-valider$/,
  );

  await expect(
    page.getByText(
      "Aperçu éditorial actif — ce contenu peut ne pas être publié.",
    ),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Article 01",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Quitter l’aperçu" }).click();

  await expect(page).toHaveURL(/\/actualites$/);
});

test("revalidation endpoint rejects an invalid secret", async ({ request }) => {
  const response = await request.post("/api/revalidate", {
    data: {
      scope: "articles",
    },
    headers: {
      "x-mapiap-revalidate-secret": "wrong-secret",
    },
  });

  expect(response.status()).toBe(401);
});

test("revalidation endpoint accepts a signed article invalidation", async ({
  request,
}) => {
  const response = await request.post("/api/revalidate", {
    data: {
      scope: "articles",
      slug: "article-01-a-valider",
    },
    headers: {
      "x-mapiap-revalidate-secret": revalidateSecret,
    },
  });

  expect(response.status()).toBe(200);

  await expect(response.json()).resolves.toEqual({
    revalidated: true,
    scope: "articles",
    slug: "article-01-a-valider",
  });
});
