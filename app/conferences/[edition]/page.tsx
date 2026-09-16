import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgrammeBody } from "@/components/ProgrammeBody";
import { VideoPlayer } from "@/components/VideoPlayer";
import {
  conferenceEditions,
  getConferenceEdition,
  hasConferencePage,
  vimeoEmbedUrl,
} from "@/content/conferences";

type Props = {
  params: Promise<{ edition: string }>;
};

/** Seules les éditions dont le contenu est livré ont une page. */
export async function generateStaticParams() {
  return conferenceEditions
    .filter(hasConferencePage)
    .map((edition) => ({ edition: edition.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { edition: slug } = await params;
  const edition = getConferenceEdition(slug);
  if (!edition) return { title: "Conférences" };

  return {
    title: `Conférences — ${edition.label}`,
    description: edition.title,
  };
}

export default async function ConferenceEditionPage({ params }: Props) {
  const { edition: slug } = await params;
  const edition = getConferenceEdition(slug);
  if (!edition || !hasConferencePage(edition)) notFound();

  const sections = edition.sections ?? [];
  const embedUrl = edition.videoUrl ? vimeoEmbedUrl(edition.videoUrl) : null;

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <Link
              href="/conferences"
              className="text-xs tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground"
            >
              ← Conférences
            </Link>

            <p className="mt-8 text-xs font-semibold tracking-[0.3em] text-brand-lilac uppercase">
              Conférences
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl leading-[1.05] tracking-wide text-foreground sm:text-6xl lg:text-7xl">
              {edition.label}
            </h1>

            {edition.title ? (
              <p className="mt-6 max-w-[62ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
                {edition.title}
              </p>
            ) : null}
          </div>

          {/* Extrait de l'édition, dans l'ordre de préférence : MP4 local,
              puis captation Vimeo intégrable, puis emplacement réservé. Pas de
              garde `sections.length` comme sur la page programme : cette page
              n'existe que si le contenu est livré. */}
          {edition.excerpt ? (
            <VideoPlayer
              src={edition.excerpt}
              title={`Extrait — ${edition.label}`}
            />
          ) : embedUrl ? (
            <div className="aspect-video overflow-hidden border border-border bg-black">
              <iframe
                src={embedUrl}
                title={`Extrait — Conférences ${edition.label}`}
                className="h-full w-full"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center border border-dashed border-border bg-black/40">
              <p className="px-4 text-center text-xs tracking-[0.25em] text-muted uppercase">
                Extrait de l’édition à venir
              </p>
            </div>
          )}
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
                  {section.navLabel ?? section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {/* Les conférences empruntent la palette lilas, distincte de
              l'orange de VOLUME. */}
          <ProgrammeBody sections={sections} accent="lilac" />

          <Link
            href="/conferences"
            className="mt-16 inline-block text-sm tracking-[0.15em] text-brand-lilac uppercase transition-opacity hover:opacity-80"
          >
            ← Toutes les éditions
          </Link>
        </div>
      </div>
    </article>
  );
}
