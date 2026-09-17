"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

/* Pas d'`outline-none` : la bague de focus globale (globals.css) doit rester
   visible au clavier. Mêmes espacements que le formulaire d'adhésion —
   étiquette collée à son champ (12px), champs nettement séparés (28px). */
const fieldClass =
  "w-full min-h-11 border border-border bg-surface px-4 py-3 text-foreground transition-colors duration-300 placeholder:text-muted hover:border-foreground/30 focus:border-brand-pink";
const labelClass = "mb-3 block text-sm text-foreground";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  // TODO: brancher à un service d'envoi. En attendant, on ne prétend PAS que
  // le message a été reçu — rien n'est envoyé ni stocké.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Nom</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="Votre nom"
          />
        </label>
        <label className="block">
          <span className={labelClass}>Adresse courriel</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="vous@exemple.com"
          />
        </label>
      </div>

      <label className="block">
        <span className={labelClass}>Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="Votre message"
        />
      </label>

      <button
        type="submit"
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 bg-brand-pink px-6 py-3.5 text-sm font-semibold tracking-[0.12em] text-brand-teal uppercase transition-all duration-300 ease-[var(--ease-expo)] hover:bg-accent-dim active:scale-[0.98] sm:w-auto sm:min-w-[12rem]"
      >
        Envoyer le message
        <span
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
        >
          →
        </span>
      </button>

      {sent ? (
        <div
          className="space-y-1 border border-brand-pink/40 bg-surface px-5 py-5 text-sm"
          role="status"
        >
          <p className="font-medium text-brand-pink">
            Ce formulaire n’est pas encore actif.
          </p>
          <p className="leading-[1.7] text-muted">
            Écrivez-nous directement à{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="cursor-pointer text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      ) : null}
    </form>
  );
}
