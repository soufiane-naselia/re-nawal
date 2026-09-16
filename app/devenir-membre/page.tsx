import type { Metadata } from "next";
import { MembershipForm } from "@/components/MembershipForm";
import {
  PAYS_NAWA,
  membershipBenefits,
  membershipBenefitsLead,
  membershipTiers,
} from "@/content/membership";

export const metadata: Metadata = {
  title: "Devenir membre",
  description:
    "Catégories de membres, critères d’admissibilité et avantages de l’Association N.A.W.A.L.",
};

/** Une couleur d'accent par catégorie — classes statiques pour le scanner. */
const accentClasses = {
  orange: { text: "text-brand-orange", rule: "bg-brand-orange" },
  lilac: { text: "text-brand-lilac", rule: "bg-brand-lilac" },
  pink: { text: "text-brand-pink", rule: "bg-brand-pink" },
} as const;

export default function DevenirMembrePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Devenir membre
        </h1>
      </header>

      {/* Registre, pas grille tarifaire : trois cartes égales côte à côte avec
          une ligne en pied se lisent comme des forfaits à acheter. Ce sont des
          catégories d'admissibilité — d'où des rangées pleine largeur séparées
          par des filets, libellé à gauche, critères à droite. */}
      <section aria-labelledby="categories" className="mt-14 sm:mt-16">
        <h2
          id="categories"
          className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl"
        >
          Les catégories
        </h2>

        <ol className="mt-8 border-t border-border">
          {membershipTiers.map((tier, index) => {
            const tint = accentClasses[tier.accent];

            return (
              <li
                key={tier.id}
                className="grid gap-6 border-b border-border py-8 sm:py-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-12"
              >
                <div>
                  <span className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={`mt-1 font-[family-name:var(--font-bebas)] text-2xl tracking-wide sm:text-3xl ${tint.text}`}
                  >
                    {tier.name}
                  </h3>
                  {tier.voting ? (
                    <p className="mt-3 text-sm leading-snug text-muted">
                      {tier.voting}
                    </p>
                  ) : null}
                </div>

                <div className="max-w-[68ch]">
                  {tier.lead ? (
                    <p className="text-[0.95rem] leading-[1.8] text-foreground sm:text-base">
                      {tier.lead}
                    </p>
                  ) : null}

                  <ul className={tier.lead ? "mt-4 space-y-3" : "space-y-3"}>
                    {tier.criteria.map((criterion) => (
                      <li
                        key={criterion.slice(0, 40)}
                        className="flex gap-3 text-[0.95rem] leading-[1.8] text-muted sm:text-base"
                      >
                        <span
                          aria-hidden
                          className={`mt-[0.6em] h-px w-3 shrink-0 ${tint.rule}`}
                        />
                        {criterion}
                      </li>
                    ))}
                  </ul>

                  {tier.note ? (
                    <p className="mt-5 text-[0.95rem] leading-[1.8] text-muted">
                      {tier.note}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Les 25 pays valent pour les deux premières catégories : affichés une
            fois ici plutôt que répétés dans chaque carte. */}
        <details className="group mt-4 border border-border bg-surface">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-muted transition-colors hover:text-foreground">
            Pays d’Afrique du Nord et d’Asie de l’Ouest (NAWA)
            <span
              aria-hidden
              className="text-base leading-none transition-transform duration-300 ease-[var(--ease-expo)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <ul className="flex flex-wrap gap-2 px-5 pt-1 pb-5">
            {PAYS_NAWA.map((pays) => (
              <li
                key={pays}
                className="border border-border px-2.5 py-1 text-xs text-muted"
              >
                {pays}
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section aria-labelledby="avantages" className="mt-16 sm:mt-24">
        <h2
          id="avantages"
          className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl"
        >
          Les avantages
        </h2>
        <p className="mt-4 max-w-[62ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
          {membershipBenefitsLead}
        </p>

        <ol className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          {membershipBenefits.map((benefit, index) => (
            <li key={benefit.title} className="bg-background p-6 sm:p-7">
              <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium text-foreground">
                {benefit.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.7] text-muted">
                {benefit.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="demande"
        className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2
              id="demande"
              className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl"
            >
              Faire une demande
            </h2>
            <p className="mt-4 max-w-[48ch] text-[0.95rem] leading-[1.8] text-muted sm:text-base">
              Les demandes sont étudiées par le conseil d’administration.
              Indiquez la catégorie qui vous correspond et parlez-nous de votre
              parcours.
            </p>
          </div>

          <MembershipForm />
        </div>
      </section>
    </div>
  );
}
