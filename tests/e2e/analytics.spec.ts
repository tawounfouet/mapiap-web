import { expect, test } from "@playwright/test";

test("analytics is privacy-safe and disabled by default", async ({
  page,
  request,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("complementary", {
      name: "Préférences de mesure d’audience",
    }),
  ).toHaveCount(0);

  await expect(
    page.getByRole("button", { name: "Gérer les préférences" }),
  ).toHaveCount(0);

  const response = await request.post("/api/analytics", {
    data: {
      type: "page_view",
      path: "/",
      timestamp: new Date().toISOString(),
    },
  });

  expect(response.status()).toBe(404);
});
