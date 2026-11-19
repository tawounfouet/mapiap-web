import type { Metadata } from "next";

import { Homepage } from "@/components/sections/home/homepage";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
};

export default function HomePage() {
  return <Homepage />;
}
