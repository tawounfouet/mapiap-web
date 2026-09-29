import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getEditorialRevalidationSecret } from "@/config/editorial";
import { getArticleHref } from "@/content/actualites";
import { readBearerToken, secretsMatch } from "@/lib/security/secrets";

const revalidationPayloadSchema = z
  .object({
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
  })
  .strict();

export async function POST(request: Request) {
  const configuredSecret = getEditorialRevalidationSecret();

  if (!configuredSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Editorial revalidation is not configured.",
      },
      { status: 503 },
    );
  }

  if (!secretsMatch(readBearerToken(request), configuredSecret)) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Invalid revalidation credentials.",
      },
      { status: 401 },
    );
  }

  let payload: unknown = {};

  try {
    const rawBody = await request.text();
    payload = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Invalid JSON payload.",
      },
      { status: 400 },
    );
  }

  const parsed = revalidationPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Invalid revalidation payload.",
      },
      { status: 400 },
    );
  }

  revalidateTag("cms:articles", { expire: 0 });
  revalidatePath("/actualites");

  if (parsed.data.slug) {
    revalidatePath(getArticleHref(parsed.data.slug));
  }

  return NextResponse.json({
    revalidated: true,
    scope: "articles",
    slug: parsed.data.slug ?? null,
  });
}
