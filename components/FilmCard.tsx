import Image from "next/image";
import Link from "next/link";
import type { Film } from "@/content/films";
import { statusLabel } from "@/content/films";

type Props = {
  film: Film;
  priority?: boolean;
  className?: string;
};

export function FilmCard({
  film,
  priority = false,
  className = "w-[9.5rem] shrink-0 snap-start sm:w-[11.5rem]",
}: Props) {
  return (
    <Link
      href={`/films/${film.slug}`}
      className={`group block ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface">
        <Image
          src={film.poster}
          alt={`${film.title} poster`}
          fill
          sizes="(max-width: 640px) 152px, 184px"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
        <span className="absolute top-2 left-2 bg-accent/95 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-accent-ink uppercase">
          {statusLabel[film.status]}
        </span>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-[family-name:var(--font-bebas)] text-xl leading-none tracking-wide text-foreground transition-colors group-hover:text-accent">
          {film.title}
        </h3>
        <p className="text-xs text-muted">
          {film.genres.join(" · ")}
        </p>
        <p className="text-xs text-muted">
          {film.year} · Dir. {film.director}
        </p>
      </div>
    </Link>
  );
}
