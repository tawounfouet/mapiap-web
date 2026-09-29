import type { Metadata } from "next";

import { ContactFormSection } from "@/components/sections/contact-form-section";
import { ContactHeroSection } from "@/components/sections/contact-hero-section";
import { contactContent } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact | MAPIAP Audit & Conseils",
  description: "Contactez MAPIAP Audit & Conseils.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection content={contactContent} />
      <ContactFormSection content={contactContent} />
    </>
  );
}
