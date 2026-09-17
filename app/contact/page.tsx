import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  /* Pas de point final : `site.name` se termine déjà par un point. */
  description: `Écrivez à ${site.name}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Parlons-en
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Développement, coproduction, presse ou festivals. Nous lisons chaque
          message.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <p className="text-sm font-semibold text-foreground">Courriel</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-2 inline-flex min-h-11 cursor-pointer items-center text-sm text-muted transition-colors duration-300 hover:text-accent"
            >
              {site.contact.email}
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">
              Réseaux sociaux
            </p>
            <SocialLinks className="mt-2" />
          </div>
        </div>
      </div>

      <div className="border border-border bg-surface/50 p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
