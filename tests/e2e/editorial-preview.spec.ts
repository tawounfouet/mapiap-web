import { expect, test } from "@playwright/test";

const draftSlug = "article-brouillon-a-valider";

test("draft article stays hidden without preview mode", async ({ page }) => {
  const response = await page.goto(`/actualites/${draftSlug}`);

  expect(response?.status()).toBe(404);
});

test("preview endpoint rejects invalid credentials", async ({ request }) => {
  const response = await request.get(
    `/api/preview?secret=wrong-secret&slug=${draftSlug}`,
    {
      maxRedirects: 0,
    },
  );

  expect(response.status()).toBe(401);
});

test("authorized preview exposes a draft and can be disabled", async ({
  page,
}) => {
  await page.goto(
    `/api/preview?secret=playwright-preview-secret&slug=${draftSlug}`,
  );

  await expect(page).toHaveURL(
    new RegExp(`/actualites/${draftSlug.replaceAll("-", "\\-")}$`),
  );
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Brouillon éditorial",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("complementary", {
      name: "Mode aperçu éditorial",
    }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );

  await page.getByRole("link", { name: "Quitter l’aperçu" }).click();

  await expect(page).toHaveURL(/\/actualites$/);

  const hiddenAgain = await page.goto(`/actualites/${draftSlug}`);

  expect(hiddenAgain?.status()).toBe(404);
});

test("revalidation webhook requires credentials and accepts a valid request", async ({
  request,
}) => {
  const unauthorized = await request.post("/api/revalidate", {
    data: {
      slug: "article-01-a-valider",
    },
  });

  expect(unauthorized.status()).toBe(401);

  const authorized = await request.post("/api/revalidate", {
    headers: {
      authorization: "Bearer playwright-revalidation-secret",
    },
    data: {
      slug: "article-01-a-valider",
    },
  });

  expect(authorized.status()).toBe(200);
  await expect(authorized.json()).resolves.toMatchObject({
    revalidated: true,
    scope: "articles",
    slug: "article-01-a-valider",
  });
});
