import type { NavigationItem } from "@/types/navigation";

export const mainNavigation = [
  {
    label: "Cabinet",
    href: "/cabinet",
  },
  {
    label: "Expertises",
    href: "/expertises",
  },
  {
    label: "Actualités",
    href: "/actualites",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const satisfies readonly NavigationItem[];

export const legalNavigation = [
  {
    label: "Mentions légales",
    href: "/mentions-legales",
  },
  {
    label: "Politique de confidentialité",
    href: "/politique-de-confidentialite",
  },
] as const satisfies readonly NavigationItem[];
