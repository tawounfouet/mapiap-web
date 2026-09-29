import { NextRequest, NextResponse } from "next/server";

import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import {
  createPreviewSessionToken,
  PREVIEW_SESSION_COOKIE,
} from "@/lib/security/preview-session";
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

    const response = NextResponse.redirect(
      new URL(`/preview/actualites/${article.slug}`, request.url),
    );

    response.cookies.set(
      PREVIEW_SESSION_COOKIE,
      createPreviewSessionToken(expectedSecret),
      {
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
      },
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        error: "Preview content is unavailable.",
      },
      { status: 503 },
    );
  }
}
