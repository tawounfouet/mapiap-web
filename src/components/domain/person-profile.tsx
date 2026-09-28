import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { PersonSummary } from "@/types/content";

export interface PersonProfileProps {
  person: PersonSummary;
}

export function PersonProfile({ person }: PersonProfileProps) {
  const initials = `${person.firstName.charAt(0)}${person.lastName.charAt(0)}`;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
      <div
        aria-label="Portrait professionnel à intégrer"
        className="border-border bg-surface flex aspect-[4/5] items-center justify-center rounded-lg border"
        role="img"
      >
        <span className="text-muted-foreground text-5xl font-semibold tracking-tight">
          {initials}
        </span>
      </div>

      <div>
        <Heading as="h3" size="md">
          {person.firstName} {person.lastName}
        </Heading>
        <Text className="mt-2 font-medium" size="sm" tone="muted">
          {person.role}
        </Text>
        {person.shortBio ? (
          <Text className="mt-5" tone="muted">
            {person.shortBio}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
