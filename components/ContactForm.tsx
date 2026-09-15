"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Keep submission on-page — wire to backend later
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
        <p className="text-sm text-accent-dim">
          Merci — votre message a bien été reçu.
        </p>
      ) : null}
    </form>
  );
}
