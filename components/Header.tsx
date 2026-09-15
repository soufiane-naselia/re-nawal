"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const nav = [
  { href: "/films", label: "Films" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={site.accentCta.href}
            className="hidden bg-accent px-3 py-1.5 text-xs font-semibold tracking-[0.12em] text-accent-ink uppercase transition-opacity hover:opacity-90 sm:inline-block"
          >
            {site.accentCta.label}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-6 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-px w-full bg-foreground transition-transform ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px bg-foreground transition-all ${
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
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border py-4 text-lg tracking-wide text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={site.accentCta.href}
              className="mt-6 bg-accent px-4 py-3 text-center text-sm font-semibold tracking-[0.12em] text-accent-ink uppercase"
            >
              {site.accentCta.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
