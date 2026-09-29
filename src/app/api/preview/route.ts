import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { getEditorialPreviewSecret } from "@/config/editorial";
import { getArticleHref } from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import { secretsMatch } from "@/lib/security/secrets";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(request: Request) {
  const configuredSecret = getEditorialPreviewSecret();

  if (!configuredSecret) {
    return NextResponse.json(
      {
        enabled: false,
        message: "Editorial preview is not configured.",
      },
      {
        status: 503,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  const requestUrl = new URL(request.url);
  const providedSecret = requestUrl.searchParams.get("secret");
  const slug = requestUrl.searchParams.get("slug")?.trim();

  if (!secretsMatch(providedSecret, configuredSecret)) {
    return NextResponse.json(
      {
        enabled: false,
        message: "Invalid preview credentials.",
      },
      {
        status: 401,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  if (!slug || !slugPattern.test(slug)) {
    return NextResponse.json(
      {
        enabled: false,
        message: "A valid article slug is required.",
      },
      {
        status: 400,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  let articleSlug: string;

  try {
    const repository = getArticleRepository();
    const article = await repository.findPreviewBySlug(slug);

    if (!article) {
      return NextResponse.json(
        {
          enabled: false,
          message: "Preview article not found.",
        },
        {
          status: 404,
          headers: {
            "cache-control": "no-store",
          },
        },
      );
    }

    articleSlug = article.slug;
  } catch {
    return NextResponse.json(
      {
        enabled: false,
        message: "Preview content is currently unavailable.",
      },
      {
        status: 502,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  const draft = await draftMode();
  draft.enable();

  redirect(getArticleHref(articleSlug));
}
