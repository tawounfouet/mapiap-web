import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertiseDetailContentSection } from "@/components/sections/expertise-detail-content-section";
import { ExpertiseDetailHeroSection } from "@/components/sections/expertise-detail-hero-section";
import {
  expertises,
  expertisesIndexContent,
  getExpertiseBySlug,
} from "@/content/expertises";

interface ExpertisePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return expertises.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ExpertisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    notFound();
  }

  return {
    title: `${expertise.title} | MAPIAP Audit & Conseils`,
    description: expertise.shortDescription,
  };
}

export default async function ExpertiseDetailPage({
  params,
}: ExpertisePageProps) {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);

  if (!expertise) {
    notFound();
  }

  return (
    <>
      <ExpertiseDetailHeroSection expertise={expertise} />
      <ExpertiseDetailContentSection expertise={expertise} />
      <ContactCtaSection
        content={expertisesIndexContent.contactCta}
        headingId="expertise-detail-contact-title"
      />
    </>
  );
}
