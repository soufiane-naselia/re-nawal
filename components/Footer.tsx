import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const nav = site.nav;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      {/* Brand rule: the palette read as one band, so the footer closes the
          page with the same colours the sections use individually. */}
      <div className="flex h-0.5" aria-hidden>
        <span className="flex-1 bg-brand-pink" />
        <span className="flex-1 bg-brand-orange" />
        <span className="flex-1 bg-brand-yellow" />
        <span className="flex-1 bg-brand-lilac" />
        <span className="flex-1 bg-brand-teal" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-foreground">
            Explorer
          </p>
          {/* Tight list gaps + min-h-11 per link: 44px tap targets without the
              column stretching into a ladder. */}
          <ul className="space-y-1 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="h-px w-0 bg-brand-pink transition-all duration-300 ease-[var(--ease-expo)] group-hover:w-4"
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold text-foreground">
            Contact
          </p>
          <ul className="space-y-1 text-sm text-muted">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-300 hover:text-accent"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-300 hover:text-accent"
              >
                {site.contact.phone}
              </a>
            </li>
            <li className="flex min-h-11 items-center">{site.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6 lg:px-8">
          © {year} {site.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
