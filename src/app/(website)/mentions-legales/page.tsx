import type { Metadata } from "next";

import { LegalPlaceholderSection } from "@/components/sections/legal-placeholder-section";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de MAPIAP Audit & Conseils.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPlaceholderSection
      eyebrow="Informations juridiques"
      title="Mentions légales"
      description="Contenu juridique à finaliser avant publication. Les informations légales officielles du cabinet n’ont pas encore été validées dans le projet."
    />
  );
}
