"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

const inputClass =
  "w-full border border-on-teal/25 bg-background/80 px-4 py-3.5 text-foreground transition-colors duration-300 placeholder:text-muted hover:border-on-teal/40 focus:border-brand-pink";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  // TODO: wire to the mailing-list provider. Until then this must NOT claim the
  // address was stored — nothing is persisted anywhere.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="infolettre"
      className="grain relative w-full overflow-hidden bg-brand-teal"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #ff8aa3 0%, transparent 42%), radial-gradient(circle at 90% 85%, #ff5c00 0%, transparent 38%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal max-w-xl">
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(2.75rem,7vw,5rem)] leading-[0.92] tracking-[0.02em] text-brand-pink">
              Suivez nos
              <br />
              actualités&nbsp;!
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-on-teal-muted">
              Inscrivez-vous à notre infolettre pour recevoir les nouvelles et
              rester à l’affût de tous nos événements et projets.
            </p>
          </div>

          <div className="reveal w-full">
            {submitted ? (
              <div
                className="space-y-2 border border-brand-pink/40 bg-background/40 px-6 py-7 text-sm text-on-teal"
                role="status"
              >
                <p className="font-semibold text-brand-pink">
                  L’inscription en ligne n’est pas encore active.
                </p>
                <p className="leading-relaxed text-on-teal-muted">
                  Écrivez-nous à{" "}
                  <a
                    href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Inscription à l’infolettre")}`}
                    className="cursor-pointer text-on-teal underline underline-offset-4 transition-opacity hover:opacity-80"
                  >
                    {site.contact.email}
                  </a>{" "}
                  et nous vous ajouterons à la liste.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="w-full space-y-4">
                <p className="text-xs text-on-teal-muted">
                  <span aria-hidden className="font-semibold text-brand-pink">
                    *
                  </span>{" "}
                  indique un champ obligatoire
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-on-teal">
                      Adresse courriel{" "}
                      <span aria-hidden className="text-brand-pink">
                        *
                      </span>
                    </span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="vous@exemple.com"
                    />
                  </label>

                  <label className="block space-y-2 text-sm">
                    <span className="tracking-wide text-on-teal">
                      Nom{" "}
                      <span aria-hidden className="text-brand-pink">
                        *
                      </span>
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Votre nom"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 bg-brand-pink px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-brand-teal uppercase transition-all duration-300 ease-[var(--ease-expo)] hover:bg-accent-dim active:scale-[0.98] sm:w-auto sm:min-w-[12rem]"
                >
                  S’inscrire
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
