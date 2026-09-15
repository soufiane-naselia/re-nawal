import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
          Contact
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Let&apos;s talk
        </h1>
        <p className="mt-4 max-w-md text-muted">
          Development, co-production, press, or festival inquiries. We read every message.
        </p>

        <dl className="mt-10 space-y-5 text-sm">
          <div>
            <dt className="text-xs tracking-[0.15em] text-muted uppercase">Email</dt>
            <dd className="mt-1 text-foreground">{site.contact.email}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.15em] text-muted uppercase">Phone</dt>
            <dd className="mt-1 text-foreground">{site.contact.phone}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.15em] text-muted uppercase">Based in</dt>
            <dd className="mt-1 text-foreground">{site.contact.address}</dd>
          </div>
        </dl>
      </div>

      <div className="border border-border bg-surface/50 p-6 sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
