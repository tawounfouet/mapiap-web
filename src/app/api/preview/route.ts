import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getArticleHref } from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import { serverSecretMatches } from "@/lib/security/server-secret";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const expectedSecret = process.env.CMS_PREVIEW_SECRET?.trim();

  if (!expectedSecret) {
    return NextResponse.json(
      {
        error: "Preview is not configured.",
      },
      { status: 503 },
    );
  }

  const receivedSecret = request.nextUrl.searchParams.get("secret");

  if (!serverSecretMatches(receivedSecret, expectedSecret)) {
    return NextResponse.json(
      {
        error: "Unauthorized preview request.",
      },
      { status: 401 },
    );
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      {
        error: "Missing article slug.",
      },
      { status: 400 },
    );
  }

  try {
    const repository = getArticleRepository();
    const article = await repository.findPreviewBySlug(slug);

    if (!article) {
      return NextResponse.json(
        {
          error: "Preview article not found.",
        },
        { status: 404 },
      );
    }

    const draft = await draftMode();
    draft.enable();

    return NextResponse.redirect(
      new URL(getArticleHref(article.slug), request.url),
    );
  } catch {
    return NextResponse.json(
      {
        error: "Preview content is unavailable.",
      },
      { status: 503 },
    );
  }
}
