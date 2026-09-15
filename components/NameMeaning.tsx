import { site } from "@/content/site";

/** Second story beat — meaning of the name, visually distinct from Mission. */
export function NameMeaning() {
  const { nameMeaning } = site;

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            Notre nom
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl leading-[1.05] tracking-wide text-pretty text-foreground sm:text-5xl lg:text-6xl">
            NAWAL, ça veut{" "}
            <span className="whitespace-nowrap">dire quoi&nbsp;?</span>
          </h2>

          <dl className="mt-10 space-y-6 border-t border-border pt-8">
            <div>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">
                {nameMeaning.arabic.label}
              </dt>
              <dd className="mt-2 text-xl text-foreground sm:text-2xl">
                {nameMeaning.arabic.meaning}
              </dd>
              <dd className="mt-1 text-sm text-muted">{nameMeaning.arabic.note}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">
                {nameMeaning.acronym.label}
              </dt>
              <dd className="mt-2 text-lg font-medium tracking-wide text-accent sm:text-xl">
                {nameMeaning.acronym.expansion}
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-6 text-[0.95rem] leading-[1.8] text-muted sm:text-base">
          {nameMeaning.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          <p className="border-l-2 border-accent pl-5 text-foreground">
            {nameMeaning.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
