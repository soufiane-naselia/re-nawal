"use client";

import { useRef } from "react";
import type { Film } from "@/content/films";
import { FilmCard } from "@/components/FilmCard";

type Props = {
  title: string;
  films: Film[];
  exploreHref?: string;
};

export function FilmCarousel({ title, films, exploreHref = "/films" }: Props) {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: "smooth" });
  }

  if (films.length === 0) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide text-foreground sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={exploreHref}
            className="mr-2 text-xs tracking-[0.15em] text-accent uppercase transition-opacity hover:opacity-80"
          >
            Explore all
          </a>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous films"
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next films"
            className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {films.map((film, i) => (
          <FilmCard key={film.slug} film={film} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
