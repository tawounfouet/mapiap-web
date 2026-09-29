import type { Metadata } from "next";

import { LegalPlaceholderSection } from "@/components/sections/legal-placeholder-section";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de MAPIAP Audit & Conseils.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPlaceholderSection
      eyebrow="Protection des données"
      title="Politique de confidentialité"
      description="Contenu juridique à finaliser avant publication. Le formulaire de contact est implémenté techniquement, mais la politique officielle de traitement des données doit être validée avant mise en ligne."
    />
  );
}
