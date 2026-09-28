export interface CallToAction {
  label: string;
  href: string;
}

export interface ExpertiseSummary {
  slug: string;
  title: string;
  shortDescription: string;
}

export interface PersonSummary {
  firstName: string;
  lastName: string;
  role: string;
  shortBio?: string;
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
