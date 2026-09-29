"use client";

import { useEffect, useState } from "react";

import type { ArticleContent } from "@/types/content";

type PreviewState =
  | {
      status: "loading";
    }
  | {
      status: "error";
    }
  | {
      status: "ready";
      article: ArticleContent;
    };

interface PreviewArticleResponse {
  item: ArticleContent;
}

export function ArticlePreviewClient() {
  const [state, setState] = useState<PreviewState>({
    status: "loading",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadPreview() {
      const slug = new URLSearchParams(window.location.search)
        .get("slug")
        ?.trim();

      if (!slug) {
        setState({
          status: "error",
        });
        return;
      }

      try {
        const response = await fetch(
          `/api/preview/article?slug=${encodeURIComponent(slug)}`,
          {
            cache: "no-store",
            credentials: "same-origin",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          setState({
            status: "error",
          });
          return;
        }

        const payload = (await response.json()) as PreviewArticleResponse;

        setState({
          status: "ready",
          article: payload.item,
        });
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          status: "error",
        });
      }
    }

    void loadPreview();

    return () => {
      controller.abort();
    };
  }, []);

  if (state.status === "loading") {
    return (
      <section className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-6 sm:py-24">
        <p className="text-muted-foreground" role="status">
          Chargement de l’aperçu éditorial…
        </p>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-6 sm:py-24">
        <h1 className="text-3xl font-semibold tracking-tight">
          Aperçu indisponible
        </h1>
        <p className="text-muted-foreground mt-5">
          Cette session d’aperçu est invalide, expirée ou le contenu demandé
          n’est plus disponible.
        </p>
      </section>
    );
  }

  return (
    <>
      <aside
        aria-label="Mode aperçu éditorial"
        className="border-border bg-surface-muted border-b"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Aperçu éditorial actif — ce contenu peut ne pas être publié.</p>
          <a className="font-medium underline" href="/api/preview/disable">
            Quitter l’aperçu
          </a>
        </div>
      </aside>

      <article>
        <header className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-6 sm:py-24">
          <p className="text-muted-foreground mb-5 text-sm font-medium tracking-[0.18em] uppercase">
            Publication en aperçu
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {state.article.title}
          </h1>
          <p className="text-muted-foreground mt-7 text-lg">
            {state.article.excerpt}
          </p>
        </header>

        <section className="bg-surface-muted">
          <div className="mx-auto w-full max-w-3xl space-y-5 px-5 py-16 sm:px-6 sm:py-20">
            <h2 className="text-2xl font-semibold tracking-tight">Contenu</h2>
            {state.article.body.map((paragraph) => (
              <p className="text-muted-foreground text-lg" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
