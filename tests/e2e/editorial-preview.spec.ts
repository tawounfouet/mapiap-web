import { expect, test } from "@playwright/test";

const draftSlug = "article-brouillon-a-valider";
const previewPath =
  `/api/preview?secret=playwright-preview-secret&slug=${draftSlug}`;

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
  request,
  context,
  browserName,
}) => {
  if (browserName === "webkit") {
    /*
     * CI qualifies the production build through next start on HTTP.
     * Next marks its production Draft Mode cookie Secure, and WebKit correctly
     * refuses Secure cookies received over HTTP. Capture the real cookie value
     * issued by Next, then install the same value as a non-Secure test cookie
     * to emulate the HTTPS transport used by production.
     */
    const previewResponse = await request.get(previewPath, {
      maxRedirects: 0,
    });

    expect(previewResponse.status()).toBeGreaterThanOrEqual(300);
    expect(previewResponse.status()).toBeLessThan(400);

    const draftCookie = previewResponse
      .headersArray()
      .find(
        ({ name, value }) =>
          name.toLowerCase() === "set-cookie" &&
          value.startsWith("__prerender_bypass="),
      );

    expect(draftCookie).toBeDefined();

    const cookiePair = draftCookie?.value.split(";")[0];
    const separatorIndex = cookiePair?.indexOf("=") ?? -1;

    expect(separatorIndex).toBeGreaterThan(0);

    await context.addCookies([
      {
        name: cookiePair!.slice(0, separatorIndex),
        value: cookiePair!.slice(separatorIndex + 1),
        url: "http://127.0.0.1:3000",
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      },
    ]);

    await page.goto(`/actualites/${draftSlug}`);
  } else {
    await page.goto(previewPath);
  }

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

  if (browserName === "webkit") {
    /*
     * The HTTP-only CI transport also prevents WebKit from naturally applying
     * Next's Secure cookie deletion. Chromium and Firefox cover that native
     * flow; clear the emulated test cookie before asserting the public state.
     */
    await context.clearCookies();
  }

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
