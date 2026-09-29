import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertiseDetailContentSection } from "@/components/sections/expertise-detail-content-section";
import { ExpertiseDetailHeroSection } from "@/components/sections/expertise-detail-hero-section";
import {
  expertises,
  expertisesIndexContent,
  getExpertiseBySlug,
  getExpertiseHref,
} from "@/content/expertises";
import { isProvisionalSlug } from "@/lib/seo/provisional";
import { getCanonicalUrl } from "@/lib/seo/site-url";

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
    title: expertise.title,
    description: expertise.shortDescription,
    alternates: {
      canonical: getCanonicalUrl(getExpertiseHref(slug)),
    },
    robots: isProvisionalSlug(slug)
      ? {
          index: false,
          follow: false,
        }
      : undefined,
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
