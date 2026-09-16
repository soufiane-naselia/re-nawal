"use client";

import { useState, type FormEvent } from "react";
import { membershipTiers } from "@/content/membership";
import { site } from "@/content/site";

const fieldClass =
  "w-full min-h-11 border border-border bg-surface px-4 py-3 text-foreground transition-colors duration-300 placeholder:text-muted hover:border-foreground/30 focus:border-brand-pink";

/* Espacements explicites plutôt qu'un `space-y` uniforme : l'étiquette doit
   être nettement plus proche de son champ (12px) que du champ précédent
   (28px), sinon on ne voit plus quelle étiquette va avec quoi. Le texte d'aide
   se colle encore plus près de son champ (8px). */
const labelClass = "mb-3 block text-sm text-foreground";
const helpClass = "mt-2 block text-xs text-muted";

const Required = () => (
  <span aria-hidden className="text-brand-pink">
    *
  </span>
);

/**
 * Formulaire d'adhésion.
 *
 * TODO — deux points à valider côté client :
 *  · les champs ci-dessous sont une proposition : le document ne précise pas
 *    ce qu'une demande doit contenir ;
 *  · rien n'est encore envoyé nulle part. Comme pour l'infolettre, on ne
 *    prétend donc PAS que la demande a été reçue : on renvoie vers le courriel.
 */
export function MembershipForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="border border-brand-pink/40 bg-surface px-6 py-7"
        role="status"
      >
        <p className="font-medium text-brand-pink">
          L’envoi en ligne n’est pas encore actif.
        </p>
        <p className="mt-2 text-[0.95rem] leading-[1.7] text-muted">
          Écrivez-nous à{" "}
          <a
            href={`mailto:${site.contact.email}?subject=${encodeURIComponent("Demande d’adhésion")}`}
            className="cursor-pointer text-foreground underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            {site.contact.email}
          </a>{" "}
          en précisant la catégorie de membre visée, et nous reviendrons vers
          vous.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7">
      <p className="text-sm text-muted">
        <Required /> indique un champ obligatoire
      </p>

      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>
            Nom complet <Required />
          </span>
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
          <span className={labelClass}>
            Adresse courriel <Required />
          </span>
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
        <span className={labelClass}>
          Catégorie de membre <Required />
        </span>
        <select required name="tier" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choisir une catégorie
          </option>
          {membershipTiers.map((tier) => (
            <option key={tier.id} value={tier.id}>
              {tier.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>Lien vers votre travail</span>
        <input
          name="portfolio"
          type="url"
          className={fieldClass}
          placeholder="Site web, IMDb, Vimeo…"
        />
        <span className={helpClass}>
          Facultatif, mais utile pour les demandes de membre cinéaste.
        </span>
      </label>

      <label className="block">
        <span className={labelClass}>
          Présentez-vous en quelques lignes <Required />
        </span>
        <textarea
          required
          name="message"
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="Votre parcours, vos projets, ce qui vous amène vers N.A.W.A.L."
        />
      </label>

      <button
        type="submit"
        className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 bg-brand-pink px-6 py-3.5 text-sm font-semibold tracking-[0.14em] text-brand-teal uppercase transition-all duration-300 ease-[var(--ease-expo)] hover:bg-accent-dim active:scale-[0.98] sm:w-auto sm:min-w-[14rem]"
      >
        Envoyer ma demande
        <span
          aria-hidden
          className="transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1"
        >
          →
        </span>
      </button>
    </form>
  );
}
