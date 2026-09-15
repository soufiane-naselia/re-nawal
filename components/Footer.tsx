import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Explore
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/films" className="transition-colors hover:text-accent">
                Films
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Connect
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-accent"
              >
                {site.contact.email}
              </a>
            </li>
            {site.contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
          © {year} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
