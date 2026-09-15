import { site } from "@/content/site";

const programmeAccents = [
  "border-t-brand-orange",
  "border-t-brand-lilac",
  "border-t-brand-yellow",
] as const;

const partnershipAccents = [
  "border-l-brand-pink",
  "border-l-brand-orange",
] as const;

export function ProgrammesSection() {
  const signature = site.programmes.filter((p) => p.kind === "programme");
  const partnerships = site.programmes.filter((p) => p.kind === "partenariat");

  return (
    <section id="programmes" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-brand-orange uppercase">
            Ce que nous offrons
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground sm:text-5xl">
            Programmes
          </h2>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-3">
          {signature.map((programme, index) => (
            <li key={programme.slug}>
              <div
                className={`flex h-full min-h-[9.5rem] flex-col justify-between border border-border border-t-2 bg-surface px-5 py-6 ${programmeAccents[index]}`}
              >
                <span className="text-xs tracking-[0.25em] text-muted uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground">
                  {programme.title}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-brand-lilac uppercase">
            Partenariats
          </p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-2">
            {partnerships.map((programme, index) => (
              <li key={programme.slug}>
                <div
                  className={`flex h-full min-h-[7.5rem] items-end border border-border border-l-2 px-5 py-6 ${partnershipAccents[index]}`}
                >
                  <div>
                    <span className="text-xs tracking-[0.25em] text-muted uppercase">
                      {String(signature.length + index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 block text-base leading-snug font-medium text-foreground sm:text-lg">
                      {programme.title}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
