import type { Metadata } from "next";
import Link from "next/link";
import {
  accentClasses,
  editionStatusLabel,
  type Programme,
  programmesByKind,
} from "@/content/programmes";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Les programmes et partenariats de N.A.W.A.L.",
};

export default function ProgrammesPage() {
  const signature = programmesByKind("programme");
  const partnerships = programmesByKind("partenariat");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.3em] text-brand-orange uppercase">
          Ce que nous offrons
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Nos programmes
        </h1>
        <p className="mt-5 text-[0.95rem] leading-[1.8] text-muted sm:text-base">
          Accompagnement, création et partenariats pour les artisan.es des écrans
          des communautés NAWA.
        </p>
      </header>

      <section className="mt-14 sm:mt-16">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
          Programmes
        </h2>
        {/* Pas de `reveal-stagger` ici : la page est courte et, sur un écran
            haut, elle ne défile pas — la view timeline resterait inactive et
            les tuiles bloquées à opacity 0. */}
        {/* L'écart suit la taille de ce qu'il sépare : empilées, les tuiles
            font ~280px de haut et 12px ne suffisaient pas à les détacher les
            unes des autres. Plus serré une fois en colonnes. */}
        <ul className="mt-8 grid gap-6 md:mt-6 md:grid-cols-3 md:gap-4">
          {signature.map((programme, index) => (
            <li key={programme.slug}>
              <ProgrammeTile programme={programme} index={index} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 sm:mt-14">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
          Partenariats
        </h2>
        <ul className="mt-8 grid gap-6 md:mt-6 lg:grid-cols-2 lg:gap-4">
          {partnerships.map((programme, index) => (
            <li key={programme.slug}>
              <ProgrammeTile
                programme={programme}
                index={signature.length + index}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ProgrammeTile({
  programme,
  index,
}: {
  programme: Programme;
  index: number;
}) {
  const tint = accentClasses[programme.accent];
  /* Mise en avant de l'appel à candidatures en cours, s'il y en a un. */
  const current = programme.editions?.find(
    (edition) => edition.status !== "terminee",
  );

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className={`group flex h-full flex-col border border-border border-t-2 bg-surface px-5 py-6 transition-colors duration-300 ease-[var(--ease-expo)] hover:bg-surface-raised ${tint.borderTop}`}
    >
      <span className="text-xs tracking-[0.25em] text-muted uppercase">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground">
        {programme.name}
      </h3>

      {programme.title && programme.title !== programme.name ? (
        <p className="mt-2 text-sm leading-snug text-foreground">
          {programme.title}
        </p>
      ) : null}

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {programme.summary ?? "Détails à venir."}
      </p>

      {current ? (
        <p className={`mt-4 text-xs tracking-[0.2em] uppercase ${tint.text}`}>
          {current.label} — {editionStatusLabel[current.status]}
        </p>
      ) : null}

      <span
        className={`mt-auto pt-6 text-sm tracking-[0.15em] uppercase transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1 ${tint.text}`}
      >
        En savoir plus →
      </span>
    </Link>
  );
}
