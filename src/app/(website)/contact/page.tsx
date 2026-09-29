import type { Metadata } from "next";

import { ContactFormSection } from "@/components/sections/contact-form-section";
import { ContactHeroSection } from "@/components/sections/contact-hero-section";
import { contactContent } from "@/content/contact";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez MAPIAP Audit & Conseils.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection content={contactContent} />
      <ContactFormSection content={contactContent} />
    </>
  );
}
