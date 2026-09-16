import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgrammeBody } from "@/components/ProgrammeBody";
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  accentClasses,
  editionStatusLabel,
  getProgramme,
  hasEditionPage,
  programmes,
} from "@/content/programmes";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return programmes.map((programme) => ({ slug: programme.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) return { title: "Programme" };

  return {
    title: programme.title ?? programme.name,
    description: programme.summary,
  };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;
  const programme = getProgramme(slug);
  if (!programme) notFound();

  const tint = accentClasses[programme.accent];
  const sections = programme.sections ?? [];
  const editions = programme.editions ?? [];

  /* Sommaire : les sections livrées, plus les éditions si le programme en a. */
  const summaryNav = [
    ...sections.map((section) => ({ id: section.id, label: section.heading })),
    ...(editions.length ? [{ id: "editions", label: "Les éditions" }] : []),
  ];

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Link
              href="/programmes"
              className="text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
            >
              ← Programmes
            </Link>

            <p
              className={`mt-8 text-xs font-semibold tracking-[0.3em] uppercase ${tint.text}`}
            >
              {programme.kind === "partenariat" ? "Partenariat" : "Programme"}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl leading-[1.05] tracking-wide text-foreground sm:text-6xl lg:text-7xl">
              {programme.name}
            </h1>

            {programme.title && programme.title !== programme.name ? (
              <p className="mt-4 max-w-xl text-base leading-snug text-foreground sm:text-lg">
                {programme.title}
              </p>
            ) : null}

            {programme.summary ? (
              <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.8] text-muted sm:text-base">
                {programme.summary}
              </p>
            ) : null}
          </div>

          {programme.trailer ? (
            <VideoPlayer
              src={programme.trailer}
              title={`Bande d’annonce — ${programme.name}`}
            />
          ) : sections.length ? (
            /* Emplacement réservé, uniquement si la page a du contenu : sur une
               fiche encore vide, un second cadre « à venir » n'apporte rien. */
            <div className="flex aspect-video items-center justify-center border border-dashed border-border bg-black/40">
              <p className="text-xs tracking-[0.25em] text-muted uppercase">
                Bande d’annonce à venir
              </p>
            </div>
          ) : null}
        </div>
      </header>

      {summaryNav.length === 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="max-w-[60ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
            Le détail de ce {programme.kind === "partenariat" ? "partenariat" : "programme"} sera
            publié prochainement.
          </p>
          <Link
            href="/programmes"
            className={`mt-8 inline-block text-sm tracking-[0.15em] uppercase transition-opacity hover:opacity-80 ${tint.text}`}
          >
            ← Tous les programmes
          </Link>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-20 lg:px-8">
          <nav aria-label="Sommaire" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
              Sommaire
            </p>
            <ul className="mt-5 space-y-3 border-l border-border pl-4">
              {summaryNav.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="text-sm leading-snug text-muted transition-colors hover:text-foreground"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {sections.length ? (
              <ProgrammeBody sections={sections} accent={programme.accent} />
            ) : null}

            {editions.length ? (
              <section
                id="editions"
                className={sections.length ? "mt-16 sm:mt-20" : undefined}
              >
                <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl">
                  Les éditions
                </h2>
                <div className={`mt-3 h-px w-16 ${tint.bg} opacity-70`} />

                <ol className="mt-8 border-t border-border">
                  {editions.map((edition) => {
                    const upcoming = edition.status !== "terminee";

                    return (
                      <li
                        key={edition.label}
                        className={`border-b border-border py-7 ${
                          upcoming ? "" : "opacity-70"
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                          <h3
                            className={`font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl ${
                              upcoming ? tint.text : "text-foreground"
                            }`}
                          >
                            {edition.label}
                          </h3>
                          <span className="text-xs tracking-[0.2em] text-muted uppercase">
                            {editionStatusLabel[edition.status]}
                          </span>
                        </div>

                        {/* Lien seulement si le bilan est rédigé — pas de page
                            vide pour les éditions encore non documentées. */}
                        {hasEditionPage(edition) ? (
                          <Link
                            href={`/programmes/${programme.slug}/${edition.slug}`}
                            className={`mt-3 inline-flex items-center gap-2 text-sm tracking-[0.1em] uppercase transition-opacity hover:opacity-80 ${tint.text}`}
                          >
                            Voir le bilan
                            <span aria-hidden>→</span>
                          </Link>
                        ) : null}

                        <p className="mt-3 max-w-[64ch] text-[0.95rem] leading-[1.7] text-muted">
                          {edition.audience}
                        </p>

                        {edition.deadline ? (
                          <p className="mt-4 text-sm text-foreground">
                            <span className="text-xs tracking-[0.2em] text-muted uppercase">
                              Date limite
                            </span>
                            <span className="ml-3">{edition.deadline}</span>
                          </p>
                        ) : null}

                        {edition.applyHref ? (
                          <Link
                            href={edition.applyHref}
                            className="mt-5 inline-block bg-brand-pink px-5 py-2.5 text-sm font-medium tracking-[0.1em] text-brand-teal uppercase transition-opacity hover:opacity-90"
                          >
                            Appliquer
                          </Link>
                        ) : edition.status !== "terminee" ? (
                          /* Pas de bouton mort : le lien de candidature n'existe
                             pas encore côté client. */
                          <p className="mt-5 text-xs tracking-[0.2em] text-muted uppercase">
                            Lien de candidature à venir
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </section>
            ) : null}

            <Link
              href="/programmes"
              className="mt-16 inline-block text-sm tracking-[0.15em] text-accent uppercase transition-opacity hover:opacity-80"
            >
              ← Tous les programmes
            </Link>
          </div>
        </div>
      )}
    </article>
  );
}
