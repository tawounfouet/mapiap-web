import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getArticleHref } from "@/content/actualites";
import { serverSecretMatches } from "@/lib/security/server-secret";

const revalidationRequestSchema = z.object({
  scope: z.literal("articles"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
});

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.CMS_REVALIDATE_SECRET?.trim();

  if (!expectedSecret) {
    return NextResponse.json(
      {
        error: "Revalidation is not configured.",
      },
      { status: 503 },
    );
  }

  const receivedSecret = request.headers.get(
    "x-mapiap-revalidate-secret",
  );

  if (!serverSecretMatches(receivedSecret, expectedSecret)) {
    return NextResponse.json(
      {
        error: "Unauthorized revalidation request.",
      },
      { status: 401 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON payload.",
      },
      { status: 400 },
    );
  }

  const parsed = revalidationRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid revalidation payload.",
      },
      { status: 400 },
    );
  }

  revalidateTag("cms:articles", "max");
  revalidatePath("/actualites");
  revalidatePath("/sitemap.xml");

  if (parsed.data.slug) {
    revalidatePath(getArticleHref(parsed.data.slug));
  } else {
    revalidatePath("/actualites/[slug]", "page");
  }

  return NextResponse.json({
    revalidated: true,
    scope: parsed.data.scope,
    slug: parsed.data.slug ?? null,
  });
}
