export interface CallToAction {
  label: string;
  href: string;
}

export interface ExpertiseSummary {
  slug: string;
  title: string;
  shortDescription: string;
}

export interface ExpertiseContent extends ExpertiseSummary {
  introduction: string;
  body: readonly string[];
}

export interface ExpertisesIndexContent {
  eyebrow: string;
  title: string;
  description: string;
  contactCta: HomeContactCtaContent;
}

export interface PersonSummary {
  firstName: string;
  lastName: string;
  role: string;
  shortBio?: string;
}

export interface BrandPillar {
  title: string;
  description: string;
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: CallToAction;
  secondaryAction?: CallToAction;
}

export interface HomeIntroductionContent {
  eyebrow?: string;
  title: string;
  body: readonly string[];
  action?: CallToAction;
}

export interface HomeFounderContent {
  eyebrow?: string;
  title: string;
  person: PersonSummary;
  action?: CallToAction;
}

export interface HomeContactCtaContent {
  eyebrow?: string;
  title: string;
  description?: string;
  action: CallToAction;
}

export interface HomeContent {
  hero: HomeHeroContent;
  introduction: HomeIntroductionContent;
  founder: HomeFounderContent;
  contactCta: HomeContactCtaContent;
}

export interface CabinetHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface CabinetIntroductionContent {
  eyebrow?: string;
  title: string;
  body: readonly string[];
}

export interface CabinetPillarsContent {
  eyebrow?: string;
  title: string;
  description?: string;
  items: readonly BrandPillar[];
}

export interface CabinetFounderContent {
  eyebrow?: string;
  person: PersonSummary;
}

export interface CabinetContent {
  hero: CabinetHeroContent;
  introduction: CabinetIntroductionContent;
  pillars: CabinetPillarsContent;
  founder: CabinetFounderContent;
  contactCta: HomeContactCtaContent;
}
