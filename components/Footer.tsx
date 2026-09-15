import { Logo } from "@/components/Logo";
import { site } from "@/content/site";

const nav = [
  { href: "#qui-sommes-nous", label: "À propos" },
  { href: "#programmes", label: "Programmes" },
  { href: "#equipe", label: "Équipe" },
  { href: "#infolettre", label: "Infolettre" },
];

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
            Explorer
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-foreground uppercase">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>{site.contact.email}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.address}</li>
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
