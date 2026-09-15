import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { films, getFilm, statusLabel } from "@/content/films";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) return { title: "Film" };
  return {
    title: film.title,
    description: film.synopsis,
    openGraph: {
      title: film.title,
      description: film.synopsis,
      images: [{ url: film.hero }],
    },
  };
}

export default async function FilmDetailPage({ params }: Props) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  return (
    <article>
      <div className="relative min-h-[50vh] w-full overflow-hidden bg-black sm:min-h-[60vh]">
        <Image
          src={film.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
            {statusLabel[film.status]}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-bebas)] text-5xl tracking-wide sm:text-7xl">
            {film.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="space-y-6">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-[280px] overflow-hidden bg-surface shadow-2xl">
            <Image
              src={film.poster}
              alt={`${film.title} poster`}
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs tracking-[0.15em] text-muted uppercase">Director</dt>
              <dd className="mt-1 text-foreground">{film.director}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-muted uppercase">Year</dt>
              <dd className="mt-1 text-foreground">{film.year}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.15em] text-muted uppercase">Genres</dt>
              <dd className="mt-1 text-foreground">{film.genres.join(", ")}</dd>
            </div>
            {film.runtime ? (
              <div>
                <dt className="text-xs tracking-[0.15em] text-muted uppercase">Runtime</dt>
                <dd className="mt-1 text-foreground">{film.runtime}</dd>
              </div>
            ) : null}
          </dl>
        </aside>

        <div className="space-y-12">
          <section>
            <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
              Synopsis
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              {film.synopsis}
            </p>
          </section>

          {film.credits?.length ? (
            <section>
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                Credits
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {film.credits.map((c) => (
                  <li key={`${c.role}-${c.name}`} className="flex gap-3">
                    <span className="w-36 shrink-0 text-muted">{c.role}</span>
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {film.trailerUrl ? (
            <section id="trailer">
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                Trailer
              </h2>
              <div className="mt-4 aspect-video overflow-hidden bg-surface">
                <iframe
                  src={film.trailerUrl}
                  title={`${film.title} trailer`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          ) : null}

          {film.stills?.length ? (
            <section>
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide">
                Stills
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {film.stills.map((src) => (
                  <div key={src} className="relative aspect-video overflow-hidden bg-surface">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <Link
            href="/films"
            className="inline-block text-sm tracking-[0.15em] text-accent uppercase transition-opacity hover:opacity-80"
          >
            ← All films
          </Link>
        </div>
      </div>
    </article>
  );
}
