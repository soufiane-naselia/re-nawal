"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const nav = site.nav;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // One subscription, two jobs: the callback tracks scroll depth for the
  // header treatment, the return value is the instance we start/stop below.
  const lenis = useLenis((instance) => {
    setScrolled(instance.scroll > 8);
  });

  // Lenis drives window scroll itself and preventDefault()s wheel/touch, so
  // `body { overflow: hidden }` does not lock it — stop the instance instead.
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  // Restart synchronously: Lenis ignores scrollTo while stopped, and its own
  // anchor handler runs later in this same click event than the state update.
  function closeMenu() {
    lenis?.start();
    setOpen(false);
  }

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-500 ease-[var(--ease-expo)] ${
        scrolled || open
          ? "border-border bg-background/95 backdrop-blur-md"
          : // At rest the bar is a scrim rather than a fill, so the hero video
            // reads through it while the logo and nav stay legible.
            "border-transparent bg-gradient-to-b from-background/90 via-background/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative cursor-pointer py-1 text-sm tracking-wide text-muted transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-pink transition-transform duration-300 ease-[var(--ease-expo)] group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.accentCta.href}
            className="hidden cursor-pointer bg-brand-pink px-4 py-2 text-xs font-semibold tracking-[0.12em] text-brand-teal uppercase transition-all duration-300 ease-[var(--ease-expo)] hover:bg-accent-dim active:scale-[0.97] sm:inline-block"
          >
            {site.accentCta.label}
          </a>

          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 cursor-pointer items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-6 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-px w-full bg-foreground transition-transform duration-300 ease-[var(--ease-expo)] ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px bg-foreground transition-all duration-300 ease-[var(--ease-expo)] ${
                  open ? "w-full -translate-y-[3.5px] -rotate-45" : "w-4 self-end"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="animate-fade-in border-t border-border bg-background md:hidden"
        >
          <nav className="flex flex-col px-4 py-6" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="flex cursor-pointer items-center justify-between border-b border-border py-4 text-lg tracking-wide text-foreground transition-colors duration-300 hover:text-brand-pink"
              >
                {item.label}
                <span aria-hidden className="text-muted">
                  →
                </span>
              </a>
            ))}
            <a
              href={site.accentCta.href}
              onClick={closeMenu}
              className="mt-6 cursor-pointer bg-brand-pink px-4 py-3.5 text-center text-sm font-semibold tracking-[0.12em] text-brand-teal uppercase transition-transform duration-300 ease-[var(--ease-expo)] active:scale-[0.98]"
            >
              {site.accentCta.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
