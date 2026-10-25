import type { Metadata } from "next";

import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de MAPIAP Audit & Conseils.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MentionsLegalesPage() {
  const { legal } = siteConfig;

  return (
    <Section>
      <Container size="reading">
        <Text
          className="mb-5 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          Informations juridiques
        </Text>

        <Heading as="h1" size="xl">
          Mentions légales
        </Heading>

        <Text className="mt-7" size="lg" tone="muted">
          Les informations ci-dessous sont issues des données RCS et RNE de
          MAPIAP Audit & Conseils arrêtées au 25 octobre 2026.
        </Text>

        <div className="mt-12 space-y-8">
          <section aria-labelledby="legal-editor">
            <Heading as="h2" id="legal-editor" size="sm">
              Éditeur du site
            </Heading>
            <dl className="mt-5 grid gap-4 text-base leading-7 sm:grid-cols-[12rem_1fr]">
              <dt className="font-medium">Dénomination</dt>
              <dd>{siteConfig.name}</dd>
              <dt className="font-medium">Sigle</dt>
              <dd>{legal.acronym}</dd>
              <dt className="font-medium">Forme juridique</dt>
              <dd>{legal.legalForm}</dd>
              <dt className="font-medium">Capital social</dt>
              <dd>{legal.shareCapital}</dd>
              <dt className="font-medium">Immatriculation</dt>
              <dd>{legal.registration}</dd>
              <dt className="font-medium">SIREN</dt>
              <dd>{legal.siren}</dd>
              <dt className="font-medium">SIRET du siège</dt>
              <dd>{legal.siret}</dd>
              <dt className="font-medium">Siège social</dt>
              <dd>{legal.registeredOffice}</dd>
              <dt className="font-medium">Activité</dt>
              <dd>{legal.activity}</dd>
              <dt className="font-medium">Code APE</dt>
              <dd>{legal.apeCode}</dd>
              <dt className="font-medium">Nom de domaine</dt>
              <dd>{legal.domain}</dd>
            </dl>
          </section>

          <section aria-labelledby="legal-management">
            <Heading as="h2" id="legal-management" size="sm">
              Direction
            </Heading>
            <Text className="mt-4" tone="muted">
              Gérant : {legal.manager}.
            </Text>
          </section>

          <Card data-release-blocker="RC-012">
            <Heading as="h2" size="sm">
              Informations restant à confirmer
            </Heading>
            <Text className="mt-4" tone="muted">
              L’identité du directeur de la publication, les coordonnées de
              contact publiques, les informations de l’hébergeur et les mentions
              professionnelles propres à l’activité réglementée doivent être
              confirmées avant la publication du site.
            </Text>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
