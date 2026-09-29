import type { Metadata } from "next";

import { ArticlePreviewClient } from "@/components/features/article-preview-client";

export const metadata: Metadata = {
  title: "Aperçu éditorial",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ArticlePreviewPage() {
  return <ArticlePreviewClient />;
}
