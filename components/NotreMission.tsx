import { site } from "@/content/site";

export function NotreMission() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground sm:text-5xl">
          Notre mission
        </h2>

        <ol className="mt-12 grid gap-0 border-t border-border md:grid-cols-3">
          {site.missionPillars.map((pillar, index) => (
            <li
              key={pillar.title}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-foreground sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.95rem] sm:leading-[1.7]">
                {pillar.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
