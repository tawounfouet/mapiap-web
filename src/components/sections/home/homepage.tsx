import { HomeApproach } from "@/components/sections/home/home-approach";
import { HomeCabinet } from "@/components/sections/home/home-cabinet";
import { HomeContactCta } from "@/components/sections/home/home-contact-cta";
import { HomeDifferentiators } from "@/components/sections/home/home-differentiators";
import { HomeExpertises } from "@/components/sections/home/home-expertises";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeNews } from "@/components/sections/home/home-news";
import { HomeTrustStrip } from "@/components/sections/home/home-trust-strip";
import { Container } from "@/components/ui/container";
import { homeContent } from "@/content/home";

export function Homepage() {
  return (
    <>
      <HomeHero content={homeContent.hero} />
      <HomeTrustStrip items={homeContent.trust} />
      <HomeCabinet
        content={homeContent.cabinet}
        differentiators={homeContent.differentiators}
      />
      <HomeExpertises content={homeContent.expertiseSection} />

      <section className="bg-white py-8 lg:py-10">
        <Container>
          <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
            <HomeApproach content={homeContent.approachSection} />
            <HomeDifferentiators
              className="lg:hidden"
              items={homeContent.differentiators}
              variant="section"
            />
            <HomeNews content={homeContent.newsSection} />
          </div>
        </Container>
      </section>

      <HomeContactCta content={homeContent.contactCta} />
    </>
  );
}
