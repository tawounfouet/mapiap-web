import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { HomeHeroContent } from "@/types/content";

export interface HeroSectionProps {
  content: HomeHeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" aria-labelledby="home-hero-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
          <div>
            <Text
              className="mb-5 font-medium uppercase tracking-[0.18em]"
              size="sm"
              tone="muted"
            >
              {content.eyebrow}
            </Text>

            <Heading as="h1" size="display" id="home-hero-title">
              {content.title}
            </Heading>

            <Text className="mt-7 max-w-2xl" size="lg" tone="muted">
              {content.description}
            </Text>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={content.primaryAction.href} variant="button-primary">
                {content.primaryAction.label}
              </Link>
              {content.secondaryAction ? (
                <Link
                  href={content.secondaryAction.href}
                  variant="button-secondary"
                >
                  {content.secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>

          <div
            className="border-border bg-surface-muted rounded-lg border p-7 sm:p-9"
            aria-label="Signature de marque MAPIAP"
          >
            <div className="divide-border divide-y">
              {["EXPERTISE", "INNOVATION", "PERFORMANCE"].map((value, index) => (
                <div
                  className="flex items-center justify-between gap-6 py-6 first:pt-0 last:pb-0"
                  key={value}
                >
                  <span className="text-muted-foreground text-sm tabular-nums">
                    0{index + 1}
                  </span>
                  <span className="text-right text-xl font-semibold tracking-[0.08em] sm:text-2xl">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
