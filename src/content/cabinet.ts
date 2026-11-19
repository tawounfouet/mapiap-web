import type { CabinetContent, PersonSummary } from "@/types/content";

/**
 * Proposed public profile based on Yves TCHAMO's CV (25 October 2026) and
 * the cabinet presentation he supplied on 8 November 2026.
 *
 * Regulated professional titles and use of the portrait require the client's
 * final confirmation before an official release (REM-06 / REM-08).
 */
export const founderProfile = {
  firstName: "Yves",
  lastName: "TCHAMO",
  role: "Expert-comptable et commissaire aux comptes",
  shortBio:
    "Fort de plus de dix exercices d’expérience, Yves TCHAMO a exercé dans des cabinets à taille humaine et au sein de réseaux internationaux. Il intervient notamment en comptabilité, révision et consolidation de groupes selon les normes françaises et IFRS.",
} satisfies PersonSummary;

export const cabinetContent = {
  hero: {
    eyebrow: "Le cabinet",
    title: "MAPIAP Audit & Conseils",
    description:
      "MAPIAP Audit & Conseils accompagne les entreprises, des micro-entreprises aux groupes, avec la proximité d’un cabinet à taille humaine et la rigueur acquise dans les réseaux internationaux.",
    image: "/media/home/hero.jpg",
  },
  introduction: {
    eyebrow: "Présentation",
    title: "La proximité d’un cabinet, l’exigence des dossiers complexes",
    body: [
      "Notre expérience s’est construite dans des cabinets à taille humaine comme dans des réseaux internationaux, auprès d’une clientèle très variée : micro-entreprises, TPE/PME, groupes et grandes entreprises.",
      "La consolidation des comptes, en normes françaises comme en IFRS, est l’un de nos domaines de spécialité. Nous accompagnons également les entreprises dans leurs obligations comptables et fiscales et leurs décisions financières.",
      "Notre approche repose sur la rigueur, l’esprit de synthèse, la réactivité et l’autonomie. Elle se traduit par un engagement simple : des travaux fiables, un interlocuteur disponible et des conseils clairs.",
    ],
    image: "/media/home/cabinet.jpg",
  },
  pillars: {
    eyebrow: "Signature",
    title: "Expertise. Innovation. Performance.",
    description:
      "Expertise, innovation, performance : trois engagements pour des comptes fiables et des conseils clairs.",
    items: [
      {
        title: "Expertise",
        description:
          "Une expérience combinant proximité avec les dirigeants et rigueur dans les dossiers complexes.",
      },
      {
        title: "Innovation",
        description:
          "L’utilisation d’outils adaptés pour gagner en fiabilité et en rapidité sans perdre le contrôle de la donnée.",
      },
      {
        title: "Performance",
        description:
          "Des travaux produits dans les délais et des indicateurs clairs pour faciliter la décision.",
      },
    ],
  },
  founder: {
    eyebrow: "Direction",
    person: founderProfile,
  },
  contactCta: {
    eyebrow: "Contact",
    title: "Échanger avec MAPIAP",
    description:
      "Présentez-nous les enjeux de votre entreprise pour identifier ensemble les missions adaptées.",
    image: "/media/home/hero.jpg",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies CabinetContent;
