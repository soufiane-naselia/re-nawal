import type { Metadata } from "next";
import Link from "next/link";
import {
  conferenceEditions,
  hasConferencePage,
} from "@/content/conferences";

export const metadata: Metadata = {
  title: "Conférences",
  description: "Les éditions des conférences de N.A.W.A.L.",
};

export default function ConferencesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      {/* Pas de texte de présentation : le document client laisse cette partie
          vide. On liste les éditions plutôt que d'inventer un chapeau. */}
      <header className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Conférences
        </h1>
      </header>

      <ol className="mt-12 border-t border-border sm:mt-16">
        {conferenceEditions.map((edition, index) => {
          const published = hasConferencePage(edition);
          const number = String(index + 1).padStart(2, "0");

          const inner = (
            <>
              <span className="text-xs tracking-[0.25em] text-muted uppercase">
                {number}
              </span>
              <span className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl">
                  {edition.label}
                </span>
                {published ? null : (
                  <span className="text-xs tracking-[0.2em] text-muted uppercase">
                    Contenu à venir
                  </span>
                )}
              </span>
              {published ? (
                <span className="mt-4 inline-flex items-center gap-2 text-sm tracking-[0.15em] text-accent uppercase transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1">
                  Voir l’édition →
                </span>
              ) : null}
            </>
          );

          return (
            <li key={edition.slug} className="border-b border-border">
              {/* Une édition sans contenu n'est pas un lien : elle mènerait à
                  une page vide. */}
              {published ? (
                <Link
                  href={`/conferences/${edition.slug}`}
                  className="group flex flex-col py-8 transition-colors duration-300 ease-[var(--ease-expo)] hover:bg-surface"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex flex-col py-8 opacity-70">{inner}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
