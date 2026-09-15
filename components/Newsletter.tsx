"use client";

import { useState, type FormEvent } from "react";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="infolettre"
      className="relative w-full scroll-mt-20 overflow-hidden bg-brand-teal"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #ff8aa3 0%, transparent 40%), radial-gradient(circle at 90% 85%, #ff5c00 0%, transparent 35%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-brand-pink/80 uppercase">
              Infolettre
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl leading-[0.95] tracking-wide text-brand-pink sm:text-5xl lg:text-6xl">
              Suivez nos
              <br />
              actualités&nbsp;!
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-pink/75 sm:text-base">
              Inscrivez-vous à notre infolettre pour recevoir les nouvelles et
              rester à l’affût de tous nos événements et projets.
            </p>
          </div>

          <div className="w-full">
            {submitted ? (
              <p className="border border-brand-pink/30 bg-brand-pink/10 px-5 py-6 text-sm text-brand-pink">
                Merci — votre inscription a bien été reçue.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="w-full space-y-4">
                <p className="text-xs text-brand-pink/65">
                  <span className="font-semibold">*</span> indique un champ
                  obligatoire
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-brand-pink/85">
                      Adresse courriel <span>*</span>
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full border border-brand-pink/20 bg-background/90 px-3 py-3.5 text-foreground outline-none transition-colors placeholder:text-muted focus:border-brand-pink"
                      placeholder="vous@exemple.com"
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-brand-pink/85">
                      Nom <span>*</span>
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="w-full border border-brand-pink/20 bg-background/90 px-3 py-3.5 text-foreground outline-none transition-colors placeholder:text-muted focus:border-brand-pink"
                      placeholder="Votre nom"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-pink px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-brand-teal uppercase transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[12rem]"
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
