import type { Metadata } from "next";
import { FilmsGrid } from "@/components/FilmsGrid";
import { films } from "@/content/films";

export const metadata: Metadata = {
  title: "Films",
  description: "The full slate from Nawal Pictures — released, in production, and coming soon.",
};

export default function FilmsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
          Catalog
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-6xl">
          Films
        </h1>
        <p className="mt-4 text-muted">
          Features and documentaries across development, production, and release.
        </p>
      </header>
      <FilmsGrid films={films} />
    </div>
  );
}
