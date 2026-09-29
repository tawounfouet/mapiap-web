"use client";

import { useEffect, useState } from "react";

import { PreviewBanner } from "@/components/layout/preview-banner";
import { ArticleBodySection } from "@/components/sections/article-body-section";
import { ArticleDetailHeroSection } from "@/components/sections/article-detail-hero-section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
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
    const slug = new URLSearchParams(window.location.search)
      .get("slug")
      ?.trim();

    if (!slug) {
      setState({
        status: "error",
      });

      return () => {
        controller.abort();
      };
    }

    async function loadPreview() {
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
      } catch (error) {
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
      <section className="py-20 sm:py-24">
        <Container size="reading">
          <Text role="status" tone="muted">
            Chargement de l’aperçu éditorial…
          </Text>
        </Container>
      </section>
    );
  }

  if (state.status === "error") {
    return (
      <section className="py-20 sm:py-24">
        <Container size="reading">
          <Heading as="h1" size="lg">
            Aperçu indisponible
          </Heading>
          <Text className="mt-5" tone="muted">
            Cette session d’aperçu est invalide, expirée ou le contenu demandé
            n’est plus disponible.
          </Text>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PreviewBanner />
      <ArticleDetailHeroSection article={state.article} />
      <ArticleBodySection article={state.article} />
    </>
  );
}
