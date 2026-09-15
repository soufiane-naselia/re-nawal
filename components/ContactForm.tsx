"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Inquiry from ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`,
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
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
          Opening your email client… If nothing opens, write us at{" "}
          <a className="underline" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
