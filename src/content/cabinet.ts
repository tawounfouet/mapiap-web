import type { CabinetContent } from "@/types/content";

export const cabinetContent = {
  hero: {
    eyebrow: "Le cabinet",
    title: "MAPIAP Audit & Conseils",
    description:
      "À valider — phrase institutionnelle de positionnement du cabinet et synthèse de sa proposition de valeur.",
  },
  introduction: {
    eyebrow: "Présentation",
    title: "Un cabinet à présenter avec précision",
    body: [
      "À valider — texte de présentation du cabinet, de son contexte, de sa manière d’accompagner ses clients et de son positionnement.",
      "À valider — éléments différenciants, périmètre d’intervention et formulation institutionnelle définitive.",
    ],
  },
  pillars: {
    eyebrow: "Signature",
    title: "Expertise. Innovation. Performance.",
    description:
      "La signature de marque est confirmée. Les formulations détaillées associées à chaque pilier restent à valider.",
    items: [
      {
        title: "Expertise",
        description:
          "À valider — signification du pilier Expertise dans le positionnement MAPIAP.",
      },
      {
        title: "Innovation",
        description:
          "À valider — signification du pilier Innovation dans le positionnement MAPIAP.",
      },
      {
        title: "Performance",
        description:
          "À valider — signification du pilier Performance dans le positionnement MAPIAP.",
      },
    ],
  },
  founder: {
    eyebrow: "Direction",
    person: {
      firstName: "Yves",
      lastName: "TCHAMO",
      role: "À valider — titre professionnel",
      shortBio:
        "À valider — biographie professionnelle, expérience, qualifications et éléments de légitimité à présenter sur le site.",
    },
  },
  contactCta: {
    eyebrow: "Contact",
    title: "Échanger avec MAPIAP",
    description:
      "À valider — formulation finale du message de prise de contact du cabinet.",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies CabinetContent;
