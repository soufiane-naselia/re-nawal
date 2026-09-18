import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "À propos",
  description: site.tagline,
};

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            À propos
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-[0.08em] sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-5 text-lg font-medium leading-snug text-foreground sm:text-xl">
            {site.about.headline}
          </p>
        </header>

        <div className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-muted">
          {site.about.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
    </>
  );
}
