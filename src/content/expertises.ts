import type { ExpertiseSummary } from "@/types/content";

/**
 * Development placeholders only.
 *
 * The project confirms that three expertise areas are expected, but their
 * final labels and descriptions are not yet validated in the current source
 * material. These entries must be replaced before client-final delivery.
 */
export const expertiseSummaries = [
  {
    slug: "expertise-01-a-valider",
    title: "Expertise 01",
    shortDescription:
      "À valider — intitulé et description métier de la première expertise.",
  },
  {
    slug: "expertise-02-a-valider",
    title: "Expertise 02",
    shortDescription:
      "À valider — intitulé et description métier de la deuxième expertise.",
  },
  {
    slug: "expertise-03-a-valider",
    title: "Expertise 03",
    shortDescription:
      "À valider — intitulé et description métier de la troisième expertise.",
  },
] as const satisfies readonly ExpertiseSummary[];
