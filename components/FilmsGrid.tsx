"use client";

import { useMemo, useState } from "react";
import type { Film, FilmStatus } from "@/content/films";
import { FilmCard } from "@/components/FilmCard";

const filters: { id: FilmStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-production", label: "In Production" },
  { id: "coming-soon", label: "Coming Soon" },
  { id: "released", label: "Released" },
];

export function FilmsGrid({ films }: { films: Film[] }) {
  const [filter, setFilter] = useState<FilmStatus | "all">("all");

  const visible = useMemo(() => {
    if (filter === "all") return films;
    return films.filter((f) => f.status === filter);
  }, [films, filter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter films">
        {filters.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-xs tracking-[0.15em] uppercase transition-colors ${
                active
                  ? "bg-accent text-accent-ink"
                  : "border border-border text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((film) => (
          <FilmCard key={film.slug} film={film} className="w-full" />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted">No films in this category yet.</p>
      ) : null}
    </div>
  );
}
