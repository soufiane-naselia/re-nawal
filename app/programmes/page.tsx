import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Les programmes et partenariats de N.A.W.A.L.",
};

export default function ProgrammesPage() {
  const signature = site.programmes.filter((p) => p.kind === "programme");
  const partnerships = site.programmes.filter((p) => p.kind === "partenariat");

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
          Programmes
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Nos programmes
        </h1>
        <p className="mt-4 text-muted">
          Accompagnement, création et partenariats pour les artisan.es des écrans
          des communautés NAWA.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
          Programmes
        </h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {signature.map((programme, index) => (
            <li key={programme.slug} id={programme.slug} className="py-8">
              <p className="text-xs tracking-[0.25em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-bebas)] text-3xl tracking-wide sm:text-4xl">
                {programme.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-muted">
                Description à venir.
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
          Partenariats
        </h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {partnerships.map((programme, index) => (
            <li key={programme.slug} id={programme.slug} className="py-8">
              <p className="text-xs tracking-[0.25em] text-accent uppercase">
                {String(signature.length + index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 max-w-3xl text-xl font-medium leading-snug sm:text-2xl">
                {programme.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-muted">
                Description à venir.
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
