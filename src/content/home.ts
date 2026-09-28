import type { HomeContent } from "@/types/content";

export const homeContent = {
  hero: {
    eyebrow: "MAPIAP Audit & Conseils",
    title: "Expertise. Innovation. Performance.",
    description:
      "À valider — promesse et phrase de positionnement du cabinet pour la version éditoriale finale.",
    primaryAction: {
      label: "Nous contacter",
      href: "/contact",
    },
    secondaryAction: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  introduction: {
    eyebrow: "Le cabinet",
    title: "Présentation de MAPIAP",
    body: [
      "À valider — présentation institutionnelle courte du cabinet, de son approche et de la valeur apportée à ses clients.",
    ],
    action: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  founder: {
    eyebrow: "Le cabinet",
    title: "Yves TCHAMO",
    person: {
      firstName: "Yves",
      lastName: "TCHAMO",
      role: "À valider — titre professionnel",
      shortBio:
        "À valider — biographie courte et éléments d’expertise à présenter sur la homepage.",
    },
    action: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  contactCta: {
    eyebrow: "Contact",
    title: "Échanger avec MAPIAP",
    description:
      "À valider — formulation finale du message de conversion et de prise de contact.",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies HomeContent;
