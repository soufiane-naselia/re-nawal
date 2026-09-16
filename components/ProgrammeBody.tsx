import {
  accentClasses,
  type ProgrammeAccent,
  type ProgrammeBlock,
  type ProgrammeSection,
} from "@/content/programmes";

type Props = {
  sections: readonly ProgrammeSection[];
  accent: ProgrammeAccent;
};

/**
 * Rend les blocs livrés par le client pour un programme.
 *
 * Un seul composant pour tous les programmes : la page dédiée d'un nouveau
 * programme ne demande que des données dans content/programmes.ts.
 */
export function ProgrammeBody({ sections, accent }: Props) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {sections.map((section) => (
        // Pas de scroll-mt : globals.css porte déjà scroll-padding-top et
        // Lenis soustrait les deux, ce qui doublerait le décalage.
        <section key={section.id} id={section.id}>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl">
            {section.heading}
          </h2>
          <div
            className={`mt-3 h-px w-16 ${accentClasses[accent].bg} opacity-70`}
          />

          <div className="mt-8 space-y-8">
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} accent={accent} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Block({
  block,
  accent,
}: {
  block: ProgrammeBlock;
  accent: ProgrammeAccent;
}) {
  const tint = accentClasses[accent];

  switch (block.type) {
    case "paragraph":
      return (
        <p className="max-w-[68ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
          {block.text}
        </p>
      );

    case "list":
      return (
        <div>
          {block.lead ? (
            <p className="text-sm font-medium tracking-wide text-foreground sm:text-base">
              {block.lead}
            </p>
          ) : null}
          <ul
            className={`space-y-4 border-l border-border pl-5 ${block.lead ? "mt-5" : ""}`}
          >
            {block.items.map((item) => (
              <li
                key={item.label ?? item.text.slice(0, 48)}
                className="max-w-[64ch] text-[0.95rem] leading-[1.75] text-muted"
              >
                {item.label ? (
                  <>
                    <span className={`font-medium ${tint.text}`}>
                      {item.label}
                    </span>
                    <span className="text-foreground"> : </span>
                  </>
                ) : null}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      );

    case "note":
      return (
        <p className="text-sm tracking-wide text-foreground italic">
          {block.text}
        </p>
      );

    case "criteria":
      return (
        <div
          className={`border border-border border-l-2 px-5 py-5 sm:px-6 ${
            block.tone === "eligible"
              ? "border-l-brand-lilac bg-surface-raised"
              : "border-l-brand-orange"
          }`}
        >
          <p
            className={`text-xs font-semibold tracking-[0.25em] uppercase ${
              block.tone === "eligible" ? "text-brand-lilac" : "text-brand-orange"
            }`}
          >
            {block.title}
          </p>
          <ul className="mt-4 space-y-3">
            {block.items.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="max-w-[64ch] text-[0.95rem] leading-[1.7] text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "participants":
      return (
        <div>
          {block.lead ? (
            <p className="mb-5 text-sm font-medium tracking-wide text-foreground sm:text-base">
              {block.lead}
            </p>
          ) : null}
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {block.items.map((person) => (
              <li key={person.name} className="bg-surface px-5 py-5">
                <p
                  className={`font-[family-name:var(--font-bebas)] text-2xl tracking-wide ${tint.text}`}
                >
                  {person.name}
                </p>
                <p className="mt-2 text-[0.95rem] text-foreground italic">
                  {person.project}
                </p>
                {/* Chaque ligne n'apparaît que si l'édition l'a fournie. */}
                {person.format || person.duration || person.genre ? (
                  <p className="mt-1 text-sm text-muted">
                    {[person.format, person.duration, person.genre]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
                {person.mentor ? (
                  <p className="mt-2 text-sm text-muted">
                    {person.mentorRole ?? "Mentor·e"} : {person.mentor}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      );

    case "workshops":
      return (
        <div>
          {block.lead ? (
            <p className="mb-5 text-sm font-medium tracking-wide text-foreground sm:text-base">
              {block.lead}
            </p>
          ) : null}
          <ol className="border-t border-border">
            {block.items.map((workshop, i) => (
              <li
                key={`${workshop.label}-${workshop.title ?? i}`}
                className="border-b border-border py-4"
              >
                <p className="text-[0.95rem] text-foreground">
                  <span className={`font-medium ${tint.text}`}>
                    {workshop.label}
                  </span>
                  {workshop.title ? (
                    <span className="text-muted"> — {workshop.title}</span>
                  ) : null}
                </p>
                {workshop.facilitators ? (
                  <p className="mt-1.5 text-sm text-muted">
                    {workshop.facilitatorRole
                      ? `${workshop.facilitatorRole} : ${workshop.facilitators}`
                      : `avec ${workshop.facilitators}`}
                  </p>
                ) : null}

                {workshop.points?.length ? (
                  <ul className="mt-2.5 space-y-1 border-l border-border pl-4">
                    {workshop.points.map((point) => (
                      <li key={point} className="text-sm text-muted italic">
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      );

    case "tags":
      return (
        <div>
          {block.lead ? (
            <p className="mb-4 text-sm font-medium tracking-wide text-foreground sm:text-base">
              {block.lead}
            </p>
          ) : null}
          <ul className="flex flex-wrap gap-2">
            {block.items.map((item) => (
              <li
                key={item}
                className="border border-border px-3 py-1.5 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "link":
      return (
        <a
          href={block.href}
          target="_blank"
          rel="noreferrer"
          className={`group inline-flex items-center gap-2 text-[0.95rem] transition-opacity hover:opacity-80 ${tint.text}`}
        >
          {block.label}
          <span
            aria-hidden
            className="transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      );

    case "countries":
      return (
        <details className="group border border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-xs font-semibold tracking-[0.2em] text-muted uppercase transition-colors hover:text-foreground">
            {block.label}
            <span className="text-base leading-none transition-transform duration-300 ease-[var(--ease-expo)] group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="flex flex-wrap gap-2 px-5 pt-1 pb-5">
            {block.items.map((country) => (
              <li
                key={country}
                className="border border-border px-2.5 py-1 text-xs text-muted"
              >
                {country}
              </li>
            ))}
          </ul>
        </details>
      );
  }
}
