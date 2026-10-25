import {
  ArrowRight,
  BarChart3,
  Cog,
  Diamond,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Target,
} from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { Link } from "@/components/ui/link";

const values = [
  {
    title: "Expertise reconnue",
    description: "Des analyses rigoureuses",
    icon: BarChart3,
  },
  {
    title: "Approche sur mesure",
    description: "Des solutions adaptées",
    icon: Lightbulb,
  },
  {
    title: "Résultats durables",
    description: "Une valeur concrète",
    icon: Target,
  },
  {
    title: "Partenaire de confiance",
    description: "Un engagement à vos côtés",
    icon: ShieldCheck,
  },
] as const;

const expertises = [
  {
    title: "Audit & Évaluation",
    description: "Des analyses rigoureuses pour des décisions éclairées.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
    icon: BarChart3,
  },
  {
    title: "Conseil stratégique",
    description: "Des stratégies sur mesure pour une croissance durable.",
    image:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=900&q=85",
    icon: Lightbulb,
  },
  {
    title: "Transformation & Innovation",
    description: "Des solutions innovantes pour relever vos défis.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    icon: Cog,
  },
] as const;

const qualities = [
  { title: "Expertise", description: "pluridisciplinaire", icon: Diamond },
  { title: "Approche", description: "sur mesure", icon: Cog },
  { title: "Engagement", description: "durable", icon: Leaf },
] as const;

const approach = [
  ["Comprendre vos enjeux", "Analyse du contexte et des objectifs"],
  [
    "Construire des solutions",
    "Co-conception de stratégies et de plans d'action",
  ],
  [
    "Accompagner la mise en œuvre",
    "Suivi opérationnel et montée en compétence",
  ],
  ["Mesurer l'impact", "Résultats concrets et amélioration continue"],
] as const;

function Eyebrow({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="bg-brand-cyan h-0.5 w-6" />
      <span
        className={`text-xs font-bold tracking-[0.2em] uppercase ${light ? "text-brand-cyan" : "text-brand-teal"}`}
      >
        {children}
      </span>
    </div>
  );
}

export function HomepageShowcase() {
  return (
    <>
      <section
        aria-labelledby="home-hero-title"
        className="bg-brand-navy relative isolate min-h-[36rem] overflow-hidden text-white"
      >
        <Image
          alt="Façade vitrée d'un immeuble contemporain"
          className="object-cover object-center opacity-55 grayscale"
          fill
          priority
          sizes="100vw"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#01324b_0%,rgba(1,50,75,0.94)_44%,rgba(1,50,75,0.25)_100%)]" />
        <div className="bg-brand-navy-dark/20 absolute inset-0" />

        <Container className="relative z-10 flex min-h-[36rem] items-center py-20 lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow light>AUDIT & CONSEILS</Eyebrow>
            <h1
              className="max-w-2xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
              id="home-hero-title"
            >
              Transformer vos ambitions en{" "}
              <span className="text-brand-cyan">résultats durables</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Un accompagnement stratégique pour des organisations plus
              performantes, plus innovantes et plus résilientes.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                className="bg-brand-teal hover:bg-brand-cyan hover:text-brand-navy gap-2 text-white hover:opacity-100"
                href="/contact"
                variant="button-primary"
              >
                Nous contacter
                <ArrowRight aria-hidden size={17} />
              </Link>
              <Link
                className="border-white/75 bg-transparent text-white hover:bg-white/10"
                href="/cabinet"
                variant="button-secondary"
              >
                Découvrir le cabinet
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-label="Nos engagements"
        className="border-border border-b bg-white py-7 shadow-sm"
      >
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ description, icon: Icon, title }) => (
              <div className="flex items-start gap-4" key={title}>
                <span className="bg-surface-muted text-brand-teal flex size-11 shrink-0 items-center justify-center rounded-md">
                  <Icon aria-hidden size={24} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-brand-navy text-sm font-bold">{title}</h2>
                  <p className="text-brand-gray mt-1 text-xs">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20" id="cabinet">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>LE CABINET</Eyebrow>
              <h2 className="text-brand-navy text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                Un partenaire engagé à vos côtés
              </h2>
              <p className="text-brand-gray mt-6 max-w-xl leading-7">
                MAPIAP est un cabinet d’audit et de conseils qui accompagne les
                organisations dans leurs enjeux de performance, d’innovation et
                de transformation durable.
              </p>
              <Link
                className="text-brand-navy hover:text-brand-teal mt-7 gap-2 no-underline"
                href="/cabinet"
                variant="standalone"
              >
                Découvrir le cabinet
                <ArrowRight aria-hidden size={17} />
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg lg:col-span-4">
              <Image
                alt="Espace de travail contemporain propice aux échanges"
                className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1">
              {qualities.map(({ description, icon: Icon, title }) => (
                <div className="flex items-center gap-4" key={title}>
                  <span className="border-border bg-surface-muted text-brand-teal flex size-11 shrink-0 items-center justify-center rounded-lg border">
                    <Icon aria-hidden size={21} />
                  </span>
                  <div>
                    <h3 className="text-brand-navy text-sm font-bold">
                      {title}
                    </h3>
                    <p className="text-brand-gray mt-0.5 text-xs">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-surface-muted py-20">
        <Container>
          <Eyebrow>NOS EXPERTISES</Eyebrow>
          <h2 className="text-brand-navy max-w-3xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
            Trois domaines d’expertise pour créer de la valeur durable
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {expertises.map(({ description, icon: Icon, image, title }) => (
              <article
                className="group border-border overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-lg"
                key={title}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    alt=""
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={image}
                  />
                  <div className="bg-brand-navy/10 absolute inset-0" />
                </div>
                <div className="relative flex min-h-48 flex-col p-6 pt-9">
                  <span className="border-border text-brand-teal absolute -top-6 left-6 flex size-12 items-center justify-center rounded-xl border bg-white shadow-md">
                    <Icon aria-hidden size={24} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-brand-navy text-lg font-bold">{title}</h3>
                  <p className="text-brand-gray mt-3 flex-1 text-sm leading-6">
                    {description}
                  </p>
                  <Link
                    className="text-brand-teal hover:text-brand-teal-dark mt-5 gap-2 text-sm no-underline"
                    href="/expertises"
                    variant="standalone"
                  >
                    En savoir plus
                    <ArrowRight aria-hidden size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>NOTRE APPROCHE</Eyebrow>
              <h2 className="text-brand-navy max-w-2xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                Une méthode structurée, du diagnostic à l’impact
              </h2>
              <ol className="before:bg-brand-teal/20 relative mt-12 grid gap-7 before:absolute before:top-6 before:right-[12.5%] before:left-[12.5%] before:hidden before:h-0.5 sm:grid-cols-4 sm:gap-4 sm:before:block">
                {approach.map(([title, description], index) => (
                  <li className="relative text-center" key={title}>
                    <span
                      className={`relative mx-auto flex size-12 items-center justify-center rounded-full text-sm font-bold shadow-sm ring-4 ring-white ${index === 0 ? "bg-brand-navy text-white" : index === 3 ? "bg-brand-cyan text-brand-navy" : "bg-brand-teal text-white"}`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="text-brand-navy mt-4 text-sm font-bold">
                      {title}
                    </h3>
                    <p className="text-brand-gray mt-2 text-xs leading-5">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <Eyebrow>ACTUALITÉS</Eyebrow>
                  <h2 className="text-brand-navy text-2xl font-extrabold">
                    Actualités
                  </h2>
                </div>
                <Link
                  className="text-brand-teal hover:text-brand-teal-dark gap-1.5 text-xs no-underline"
                  href="/actualites"
                  variant="standalone"
                >
                  Voir toutes
                  <ArrowRight aria-hidden size={14} />
                </Link>
              </div>

              <article className="border-border bg-surface-muted mt-6 grid grid-cols-[8rem_1fr] items-center gap-4 rounded-xl border p-4">
                <div className="relative h-28 overflow-hidden rounded-lg">
                  <Image
                    alt=""
                    className="object-cover"
                    fill
                    sizes="128px"
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80"
                  />
                </div>
                <div>
                  <span className="rounded bg-[#a65328] px-2 py-1 text-[0.625rem] font-bold tracking-wider text-white uppercase">
                    Conseil
                  </span>
                  <h3 className="text-brand-navy mt-3 text-sm leading-6 font-bold">
                    Comment réussir votre transformation durable ?
                  </h3>
                </div>
              </article>

              {[
                "Innovation et performance : quels leviers activer ?",
                "L'audit, un outil stratégique pour anticiper les risques",
              ].map((title) => (
                <article
                  className="group border-border flex items-center justify-between gap-4 border-b px-3 py-4"
                  key={title}
                >
                  <h3 className="text-brand-navy group-hover:text-brand-teal text-sm font-bold transition-colors">
                    {title}
                  </h3>
                  <ArrowRight className="text-brand-teal shrink-0" size={16} />
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-navy relative isolate overflow-hidden py-12 text-white">
        <Image
          alt=""
          className="-z-10 object-cover opacity-20 mix-blend-luminosity"
          fill
          sizes="100vw"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=75"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#01324b_0%,#022839_60%,rgba(7,91,101,0.8)_100%)]" />
        <Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-3xl">
            <Eyebrow light>DISCUTONS DE VOS PROJETS</Eyebrow>
            <h2 className="text-xl leading-8 font-bold text-white sm:text-2xl">
              Un premier échange pour comprendre vos enjeux et identifier
              ensemble les meilleures opportunités.
            </h2>
          </div>
          <Link
            className="bg-brand-teal hover:bg-brand-cyan hover:text-brand-navy shrink-0 gap-2 text-white hover:opacity-100"
            href="/contact"
            variant="button-primary"
          >
            Nous contacter
            <ArrowRight aria-hidden size={17} />
          </Link>
        </Container>
      </section>
    </>
  );
}
