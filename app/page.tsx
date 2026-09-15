import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Newsletter } from "@/components/Newsletter";
// import Link from "next/link";
// import { FilmCarousel } from "@/components/FilmCarousel";
// import { films } from "@/content/films";

export default function Home() {
  // const released = films.filter((f) => f.status === "released");

  return (
    <>
      {/*
      <div className="border-b border-accent/30 bg-accent">
        <p className="mx-auto max-w-7xl px-4 py-2.5 text-center text-xs font-semibold tracking-[0.18em] text-accent-ink uppercase sm:px-6 lg:px-8">
          <Link href="/films" className="hover:opacity-80">
            Explore the slate →
          </Link>
        </p>
      </div>
      */}

      <Hero />

      <Mission />

      <Newsletter />

      {/* Kept for later
      <section className="mx-auto max-w-7xl space-y-16 px-4 py-24 sm:px-6 lg:px-8">
        <FilmCarousel title="Selected Work" films={films} />
        <FilmCarousel title="Watch at Home" films={released} />
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide sm:text-4xl">
              Start a conversation
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              Development, co-production, or festival inquiries — we&apos;d like to hear from you.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-accent px-6 py-3 text-sm font-semibold tracking-[0.12em] text-accent-ink uppercase transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
        </div>
      </section>
      */}
    </>
  );
}
