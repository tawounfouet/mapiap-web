import type { Metadata } from "next";

import { HomepageShowcase } from "@/components/sections/homepage-showcase";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function HomePage() {
  return <HomepageShowcase />;
}
