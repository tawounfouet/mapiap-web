import type {
  ExpertiseContent,
  ExpertiseSummary,
  ExpertisesIndexContent,
} from "@/types/content";

/**
 * Development placeholders only.
 *
 * The project confirms that three expertise areas are expected, but their
 * final labels, descriptions and detailed content are not yet validated.
 * These entries must be replaced before client-final delivery.
 */
export const expertises = [
  {
    slug: "expertise-01-a-valider",
    title: "Expertise 01",
    shortDescription:
      "À valider — intitulé et description métier de la première expertise.",
    introduction:
      "À valider — introduction de la première expertise et contexte client associé.",
    body: [
      "À valider — périmètre d’intervention, accompagnements et bénéfices attendus.",
    ],
  },
  {
    slug: "expertise-02-a-valider",
    title: "Expertise 02",
    shortDescription:
      "À valider — intitulé et description métier de la deuxième expertise.",
    introduction:
      "À valider — introduction de la deuxième expertise et contexte client associé.",
    body: [
      "À valider — périmètre d’intervention, accompagnements et bénéfices attendus.",
    ],
  },
  {
    slug: "expertise-03-a-valider",
    title: "Expertise 03",
    shortDescription:
      "À valider — intitulé et description métier de la troisième expertise.",
    introduction:
      "À valider — introduction de la troisième expertise et contexte client associé.",
    body: [
      "À valider — périmètre d’intervention, accompagnements et bénéfices attendus.",
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
  title: "Trois expertises à structurer",
  description:
    "Le périmètre prévoit trois domaines d’expertise. Leurs intitulés et contenus définitifs restent à valider avant restitution client finale.",
  contactCta: {
    eyebrow: "Contact",
    title: "Parler de votre besoin avec MAPIAP",
    description:
      "À valider — formulation finale du message reliant les expertises à la prise de contact.",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies ExpertisesIndexContent;

export function getExpertiseBySlug(
  slug: string,
): ExpertiseContent | undefined {
  return expertises.find((expertise) => expertise.slug === slug);
}

export function getExpertiseHref(slug: string) {
  return `/expertises/${slug}`;
}
