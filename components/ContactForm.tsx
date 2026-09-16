"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  // TODO: wire to a backend. Until then this must NOT claim the message was
  // received — nothing is sent or stored anywhere.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="tracking-wide text-muted">Name</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className="w-full border border-border bg-surface px-3 py-3 text-foreground outline-none transition-colors focus:border-accent"
          />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="tracking-wide text-muted">Email</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className="w-full border border-border bg-surface px-3 py-3 text-foreground outline-none transition-colors focus:border-accent"
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm">
        <span className="tracking-wide text-muted">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="w-full resize-y border border-border bg-surface px-3 py-3 text-foreground outline-none transition-colors focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="bg-accent px-6 py-3 text-sm font-semibold tracking-[0.12em] text-accent-ink uppercase transition-opacity hover:opacity-90"
      >
        Send Inquiry
      </button>
      {sent ? (
        <div className="space-y-1 border border-border bg-surface px-4 py-4 text-sm">
          <p className="font-semibold text-foreground">
            Ce formulaire n’est pas encore actif.
          </p>
          <p className="text-muted">
            Écrivez-nous directement à{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-accent underline underline-offset-4 hover:opacity-80"
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
