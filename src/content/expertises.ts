import type {
  ExpertiseContent,
  ExpertiseSummary,
  ExpertisesIndexContent,
} from "@/types/content";

/**
 * Four business domains provided by Yves TCHAMO on 8 November 2026.
 * All client-supplied wording remains subject to final approval before
 * an official release (REM-04 / RC-005).
 */
export const expertises = [
  {
    slug: "comptabilite-accompagnement-tpe-pme",
    title: "Comptabilité et accompagnement des TPE/PME",
    shortDescription:
      "Des comptes fiables, produits dans les délais, qui vous aident à piloter votre entreprise.",
    introduction:
      "Nous prenons en charge l’organisation et la production de votre comptabilité, de la collecte de vos pièces jusqu’à l’établissement de vos comptes annuels (bilan, compte de résultat et annexe).",
    body: [
      "Nous analysons vos circuits d’information, nous mettons en place des outils adaptés pour limiter la saisie manuelle, puis nous révisons vos écritures afin que les comptes reflètent fidèlement la réalité de votre activité.",
      "Au-delà de la conformité, nous vous remettons des situations intermédiaires et des indicateurs simples (chiffre d’affaires, marge, trésorerie, résultat) pour décider en cours d’année plutôt que de découvrir les chiffres après la clôture.",
      "Que vous soyez en micro-entreprise, en TPE, en PME ou à la tête de plusieurs sociétés, vous avez un interlocuteur unique qui connaît votre dossier.",
    ],
  },
  {
    slug: "consolidation-comptes-groupe",
    title: "Consolidation des comptes de groupe (normes françaises et IFRS)",
    shortDescription:
      "Une vision unique et fiable de votre groupe, conforme à ce qu’attendent vos banques, vos associés et vos investisseurs.",
    introduction:
      "Lorsqu’une société détient des filiales, ses comptes seuls ne montrent pas la situation réelle de l’ensemble. Nous regroupons les comptes de chaque entité comme s’ils ne formaient qu’une seule société, selon le référentiel qui vous est demandé : les normes françaises (règlement ANC 2020-01) ou les normes internationales IFRS.",
    body: [
      "Cela suppose de définir le périmètre du groupe, d’éliminer les opérations entre sociétés du même groupe, de calculer les écarts d’acquisition et de traiter la fiscalité différée.",
      "Nous produisons ensuite les documents de présentation (plaquettes, reporting, suivi des covenants bancaires) et vous accompagnons dans l’organisation du processus : calendrier de remontée des informations, formats de collecte auprès des filiales, choix de l’outil de consolidation.",
      "L’objectif est que vous disposiez de comptes consolidés dans les délais, avec une méthode que vos équipes pourront reproduire d’une année sur l’autre.",
    ],
  },
  {
    slug: "fiscalite-juridique-social",
    title: "Fiscalité, juridique et social",
    shortDescription:
      "Vos obligations et vos décisions de gestion sécurisées auprès d’un seul interlocuteur.",
    introduction:
      "Nous vous accompagnons dans vos obligations fiscales, dans la vie juridique de votre société et dans la gestion sociale, en tenant compte des liens entre ces trois domaines.",
    body: [
      "Fiscalité : Nous établissons vos déclarations fiscales (liasses fiscales, TVA, impôt sur les sociétés, CFE et autres déclarations périodiques ou annuelles) et veillons au respect de vos échéances. Nous vous conseillons sur les conséquences fiscales de vos choix de gestion.",
      "Juridique : Nous vous accompagnons dans le choix de la forme de société, dans la création de votre entreprise et dans la vie juridique courante : assemblées, approbation des comptes, procès-verbaux et certaines restructurations, en lien avec vos conseils juridiques lorsque l’opération le requiert.",
      "Social : Nous vous accompagnons dans les recrutements, les contrats de travail, les bulletins de paie, les déclarations sociales et les départs de salariés.",
      "En traitant ces trois domaines ensemble, nous évitons les décisions prises isolément et réduisons les risques d’erreur ou de pénalité.",
    ],
  },
  {
    slug: "audit-evaluation-conseil-financier",
    title: "Audit, évaluation et conseil financier",
    shortDescription:
      "Des missions ponctuelles pour éclairer vos grandes décisions.",
    introduction:
      "Lorsque vous préparez une opération importante, nous réalisons des missions sur mesure : audit contractuel de vos comptes ou de votre organisation, due diligence avant l’acquisition ou la cession d’une société, évaluation d’une entreprise, d’un fonds de commerce ou de titres.",
    body: [
      "Nous vous remettons une analyse chiffrée et argumentée, qui vous permet de négocier un prix, d’identifier les risques et de décider en connaissance de cause.",
      "Nous vous accompagnons aussi dans la construction de vos projets : business plan, budget, plan de trésorerie et plan de financement destinés à votre banque ou à vos investisseurs, puis suivi des réalisations par rapport aux prévisions.",
    ],
  },
] as const satisfies readonly ExpertiseContent[];

export const expertiseSummaries = expertises.map(
  ({ slug, title, shortDescription }) => ({
    slug,
    title,
    shortDescription,
  }),
) satisfies readonly ExpertiseSummary[];

export const expertisesIndexContent = {
  eyebrow: "Expertises",
  title: "Quatre pôles d’expertise à vos côtés",
  description:
    "De la comptabilité à la consolidation des groupes, en passant par la fiscalité, le juridique, le social, l’audit et le conseil financier : découvrez les domaines d’intervention de MAPIAP.",
  contactCta: {
    eyebrow: "Contact",
    title: "Parler de votre besoin avec MAPIAP",
    description:
      "Échangeons sur les enjeux de votre entreprise et sur les missions qui pourraient y répondre.",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies ExpertisesIndexContent;

export function getExpertiseBySlug(slug: string): ExpertiseContent | undefined {
  return expertises.find((expertise) => expertise.slug === slug);
}

export function getExpertiseHref(slug: string) {
  return "/expertises/" + slug;
}
