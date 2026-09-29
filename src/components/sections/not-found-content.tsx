import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export function NotFoundContent() {
  return (
    <Section>
      <Container size="reading">
        <Text
          className="mb-5 font-medium tracking-[0.18em] uppercase"
          size="sm"
          tone="muted"
        >
          Erreur 404
        </Text>

        <Heading as="h1" size="xl">
          Page introuvable
        </Heading>

        <Text className="mt-5" size="lg" tone="muted">
          La page demandée n’existe pas ou n’est plus disponible.
        </Text>

        <Link className="mt-8" href="/" variant="button-primary">
          Retour à l’accueil
        </Link>
      </Container>
    </Section>
  );
}
