import { NextRequest, NextResponse } from "next/server";

import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import {
  PREVIEW_SESSION_COOKIE,
  previewSessionIsValid,
} from "@/lib/security/preview-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const secret = process.env.CMS_PREVIEW_SECRET?.trim();
  const sessionToken = request.cookies.get(PREVIEW_SESSION_COOKIE)?.value;

  if (!previewSessionIsValid(sessionToken, secret)) {
    return NextResponse.json(
      {
        error: "Unauthorized preview session.",
      },
      {
        status: 401,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json(
      {
        error: "Missing article slug.",
      },
      {
        status: 400,
        headers: {
          "cache-control": "no-store",
        },
      },
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
        {
          status: 404,
          headers: {
            "cache-control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(
      {
        item: article,
      },
      {
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Preview content is unavailable.",
      },
      {
        status: 503,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }
}
