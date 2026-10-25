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

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
}

export interface ArticleContent extends ArticleSummary {
  body: readonly string[];
}

export interface ActualitesIndexContent {
  eyebrow: string;
  title: string;
  description: string;
  contactCta: HomeContactCtaContent;
}

export interface ContactPageContent {
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  formDescription: string;
  directContactTitle: string;
  directContactDescription: string;
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

export type HomeIconKey =
  | "bar-chart"
  | "lightbulb"
  | "target"
  | "shield-check"
  | "diamond"
  | "cog"
  | "leaf";

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  image?: string;
  primaryAction: CallToAction;
  secondaryAction?: CallToAction;
}

export interface HomeTrustItem {
  title: string;
  description: string;
  icon: HomeIconKey;
}

export interface HomeCabinetContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  action: CallToAction;
}

export interface HomeDifferentiator {
  title: string;
  description: string;
  icon: HomeIconKey;
}

export interface HomeExpertiseTeaser {
  title: string;
  description: string;
  image: string;
  icon: HomeIconKey;
  href: string;
}

export interface HomeExpertiseSectionContent {
  eyebrow: string;
  title: string;
  allAction: CallToAction;
  items: readonly HomeExpertiseTeaser[];
}

export interface HomeApproachStep {
  title: string;
  description: string;
}

export interface HomeApproachSectionContent {
  eyebrow: string;
  title: string;
  steps: readonly HomeApproachStep[];
}

export interface HomeNewsItem {
  title: string;
  href: string;
  image?: string;
  category?: string;
  date?: string;
}

export interface HomeNewsSectionContent {
  eyebrow: string;
  title: string;
  allAction: CallToAction;
  featured: HomeNewsItem;
  secondary: readonly HomeNewsItem[];
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
  image?: string;
  action: CallToAction;
}

export interface HomeContent {
  hero: HomeHeroContent;
  trust: readonly HomeTrustItem[];
  cabinet: HomeCabinetContent;
  differentiators: readonly HomeDifferentiator[];
  expertiseSection: HomeExpertiseSectionContent;
  approachSection: HomeApproachSectionContent;
  newsSection: HomeNewsSectionContent;
  introduction: HomeIntroductionContent;
  founder: HomeFounderContent;
  contactCta: HomeContactCtaContent;
}

export interface CabinetHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}

export interface CabinetIntroductionContent {
  eyebrow?: string;
  title: string;
  body: readonly string[];
  image?: string;
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
