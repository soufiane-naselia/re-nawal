"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder — wire to mailing provider later
    setSubmitted(true);
  }

  return (
    <section className="relative w-full overflow-hidden bg-accent">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 20%, #0d2a14 0%, transparent 42%), radial-gradient(circle at 88% 80%, #0d2a14 0%, transparent 38%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-accent-ink/70 uppercase">
              Infolettre
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl leading-[0.95] tracking-wide text-accent-ink sm:text-5xl lg:text-6xl">
              Suivez nos
              <br />
              actualités&nbsp;!
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-accent-ink/80 sm:text-base">
              Inscrivez-vous à notre infolettre pour recevoir les nouvelles et
              rester à l’affût de tous nos événements et projets.
            </p>
          </div>

          <div className="w-full">
            {submitted ? (
              <p className="border border-accent-ink/20 bg-accent-ink/5 px-5 py-6 text-sm text-accent-ink">
                Merci — votre inscription a bien été reçue.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="w-full space-y-4">
                <p className="text-xs text-accent-ink/65">
                  <span className="font-semibold">*</span> indique un champ
                  obligatoire
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-accent-ink/80">
                      Adresse courriel <span>*</span>
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border border-accent-ink/15 bg-background/90 px-3 py-3.5 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent-ink"
                      placeholder="vous@exemple.com"
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-accent-ink/80">
                      Nom <span>*</span>
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="w-full border border-accent-ink/15 bg-background/90 px-3 py-3.5 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent-ink"
                      placeholder="Votre nom"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-ink px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-accent uppercase transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[12rem]"
                >
                  S’inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
