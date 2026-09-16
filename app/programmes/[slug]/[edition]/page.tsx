import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgrammeBody } from "@/components/ProgrammeBody";
import {
  accentClasses,
  editionStatusLabel,
  getEdition,
  hasEditionPage,
  programmes,
} from "@/content/programmes";

type Props = {
  params: Promise<{ slug: string; edition: string }>;
};

/**
 * Le `generateStaticParams` enfant est exécuté une fois par `params` du parent
 * et ne renvoie que son propre segment. On ne pré-rend que les éditions dont le
 * bilan est rédigé : les autres n'ont pas de page.
 */
export async function generateStaticParams({
  params,
}: {
  params: { slug: string };
}) {
  const programme = programmes.find((p) => p.slug === params.slug);
  return (programme?.editions ?? [])
    .filter(hasEditionPage)
    .map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, edition: editionSlug } = await params;
  const found = getEdition(slug, editionSlug);
  if (!found) return { title: "Édition" };

  return {
    title: found.edition.label,
    description: found.edition.audience,
  };
}

export default async function EditionPage({ params }: Props) {
  const { slug, edition: editionSlug } = await params;
  const found = getEdition(slug, editionSlug);

  /* Une édition sans bilan rédigé ne mérite pas une page vide. */
  if (!found || !hasEditionPage(found.edition)) notFound();

  const { programme, edition } = found;
  const tint = accentClasses[programme.accent];
  const sections = edition.sections ?? [];

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href={`/programmes/${programme.slug}`}
            className="text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
          >
            ← {programme.name}
          </Link>

          <p
            className={`mt-8 text-xs font-semibold tracking-[0.3em] uppercase ${tint.text}`}
          >
            {editionStatusLabel[edition.status]}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl leading-[1.05] tracking-wide text-foreground sm:text-6xl lg:text-7xl">
            {edition.label}
          </h1>

          <p className="mt-6 max-w-[62ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
            {edition.audience}
          </p>

          {/* Espace explicite avant le nom : `ml-3` écarte visuellement mais
              laisserait « Direction du programmeSarah El Attar » au lecteur
              d'écran. */}
          {edition.director ? (
            <p className="mt-6 text-sm text-muted">
              Direction du programme{" "}
              <span className="ml-3 text-foreground">{edition.director}</span>
            </p>
          ) : null}
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-20 lg:px-8">
        <nav aria-label="Sommaire" className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            Sommaire
          </p>
          <ul className="mt-5 space-y-3 border-l border-border pl-4">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm leading-snug text-muted transition-colors hover:text-foreground"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ProgrammeBody sections={sections} accent={programme.accent} />

          <Link
            href={`/programmes/${programme.slug}`}
            className={`mt-16 inline-block text-sm tracking-[0.15em] uppercase transition-opacity hover:opacity-80 ${tint.text}`}
          >
            ← Toutes les éditions
          </Link>
        </div>
      </div>
    </article>
  );
}
