import type { HomeContent } from "@/types/content";

/**
 * Visual-alignment content for the homepage.
 *
 * The homepage now reflects the approved working visual direction. Client
 * approval is still required for final public copy, founder information and
 * brand master values. Keep the “À valider” markers until RC-003 is actually
 * closed from confirmed client input.
 */
export const homeContent = {
  hero: {
    eyebrow: "Audit & Conseils",
    title: "Transformer vos ambitions en résultats durables",
    highlight: "résultats durables",
    description:
      "Un accompagnement stratégique pour des organisations plus performantes, plus innovantes et plus résilientes.",
    image: "/media/home/hero.jpg",
    primaryAction: {
      label: "Nous contacter",
      href: "/contact",
    },
    secondaryAction: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  trust: [
    {
      title: "Expertise reconnue",
      description: "Des analyses rigoureuses",
      icon: "bar-chart",
    },
    {
      title: "Approche sur mesure",
      description: "Des solutions adaptées",
      icon: "lightbulb",
    },
    {
      title: "Résultats durables",
      description: "Une valeur concrète",
      icon: "target",
    },
    {
      title: "Partenaire de confiance",
      description: "Un engagement à vos côtés",
      icon: "shield-check",
    },
  ],
  cabinet: {
    eyebrow: "Le cabinet",
    title: "Un partenaire engagé à vos côtés",
    description:
      "MAPIAP est un cabinet d’audit et de conseils qui accompagne les organisations dans leurs enjeux de performance, d’innovation et de transformation durable.",
    image: "/media/home/cabinet.jpg",
    action: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  differentiators: [
    {
      title: "Expertise",
      description: "pluridisciplinaire",
      icon: "diamond",
    },
    {
      title: "Approche",
      description: "sur mesure",
      icon: "cog",
    },
    {
      title: "Engagement",
      description: "durable",
      icon: "leaf",
    },
  ],
  expertiseSection: {
    eyebrow: "Nos expertises",
    title: "Trois domaines d’expertise pour créer de la valeur durable",
    allAction: {
      label: "Voir toutes les expertises",
      href: "/expertises",
    },
    items: [
      {
        title: "Audit & Évaluation",
        description: "Des analyses rigoureuses pour des décisions éclairées.",
        image: "/media/home/expertise-audit.jpg",
        icon: "bar-chart",
        href: "/expertises",
      },
      {
        title: "Conseil stratégique",
        description: "Des stratégies sur mesure pour une croissance durable.",
        image: "/media/home/expertise-strategy.jpg",
        icon: "lightbulb",
        href: "/expertises",
      },
      {
        title: "Transformation & Innovation",
        description: "Des solutions innovantes pour relever vos défis.",
        image: "/media/home/expertise-transformation.jpg",
        icon: "cog",
        href: "/expertises",
      },
    ],
  },
  approachSection: {
    eyebrow: "Notre approche",
    title: "Une méthode structurée, du diagnostic à l’impact",
    steps: [
      {
        title: "Comprendre vos enjeux",
        description: "Analyse du contexte et des objectifs",
      },
      {
        title: "Construire des solutions",
        description: "Co-conception de stratégies et de plans d’action",
      },
      {
        title: "Accompagner la mise en œuvre",
        description: "Suivi opérationnel et montée en compétence",
      },
      {
        title: "Mesurer l’impact",
        description: "Résultats concrets et amélioration continue",
      },
    ],
  },
  newsSection: {
    eyebrow: "Actualités",
    title: "Actualités",
    allAction: {
      label: "Voir toutes les actualités",
      href: "/actualites",
    },
    featured: {
      title: "Comment réussir votre transformation durable ?",
      href: "/actualites",
      image: "/media/home/hero.jpg",
      category: "Conseil",
      date: "12 mars 2024",
    },
    secondary: [
      {
        title: "Innovation et performance : quels leviers pour 2024 ?",
        href: "/actualites",
        image: "/media/home/expertise-strategy.jpg",
        date: "5 mars 2024",
      },
      {
        title: "Audit : un outil stratégique pour anticiper les risques",
        href: "/actualites",
        image: "/media/home/cabinet.jpg",
        date: "28 février 2024",
      },
    ],
  },
  introduction: {
    eyebrow: "Le cabinet",
    title: "Présentation de MAPIAP",
    body: [
      "À valider - présentation institutionnelle courte du cabinet, de son approche et de la valeur apportée à ses clients.",
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
      role: "À valider - titre professionnel",
      shortBio:
        "À valider - biographie courte et éléments d’expertise à présenter sur la homepage.",
    },
    action: {
      label: "Découvrir le cabinet",
      href: "/cabinet",
    },
  },
  contactCta: {
    eyebrow: "Discutons de vos projets",
    title:
      "Un premier échange pour comprendre vos enjeux et identifier ensemble les meilleures opportunités.",
    image: "/media/home/hero.jpg",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies HomeContent;
