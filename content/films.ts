export type FilmStatus = "released" | "in-production" | "coming-soon";

export type Film = {
  slug: string;
  title: string;
  year: number;
  director: string;
  genres: string[];
  status: FilmStatus;
  synopsis: string;
  runtime?: string;
  poster: string;
  hero: string;
  trailerUrl?: string;
  featured?: boolean;
  stills?: string[];
  credits?: { role: string; name: string }[];
};

export const films: Film[] = [
  {
    slug: "glass-harbor",
    title: "Glass Harbor",
    year: 2026,
    director: "Elena Marquez",
    genres: ["Drama", "Mystery"],
    status: "coming-soon",
    featured: true,
    runtime: "118 min",
    synopsis:
      "A harbor town seals itself after a freighter vanishes overnight. A young cartographer maps the silence — and finds a town rewriting its own history.",
    poster:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stills: [
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Writer", name: "Elena Marquez" },
      { role: "Cinematography", name: "Jonah Hale" },
      { role: "Editor", name: "Priya Sen" },
    ],
  },
  {
    slug: "night-orchard",
    title: "Night Orchard",
    year: 2025,
    director: "Kai Okonkwo",
    genres: ["Drama"],
    status: "released",
    featured: true,
    runtime: "104 min",
    synopsis:
      "Three siblings return to their family’s orchard under a blood moon to settle an inheritance that none of them want — and all of them need.",
    poster:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    stills: [
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    ],
    credits: [
      { role: "Writer", name: "Maya Chen" },
      { role: "Cinematography", name: "Rafi Torres" },
    ],
  },
  {
    slug: "signal-fire",
    title: "Signal Fire",
    year: 2026,
    director: "Nora Belmont",
    genres: ["Documentary"],
    status: "in-production",
    featured: true,
    synopsis:
      "A vérité portrait of volunteer radio operators keeping coastal communities connected during consecutive storm seasons.",
    poster:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1920&q=80",
    credits: [{ role: "Producer", name: "Sofia Reyes" }],
  },
  {
    slug: "the-last-projectionist",
    title: "The Last Projectionist",
    year: 2024,
    director: "Omar Farid",
    genres: ["Documentary", "Biography"],
    status: "released",
    runtime: "92 min",
    synopsis:
      "Inside a single-screen cinema fighting to stay open, one projectionist keeps the light alive for a neighborhood that refuses to go dark.",
    poster:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1518676590629-3bfe83f2faf8?auto=format&fit=crop&w=1920&q=80",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    slug: "salt-line",
    title: "Salt Line",
    year: 2025,
    director: "Amira Nawal",
    genres: ["Thriller", "Drama"],
    status: "released",
    runtime: "111 min",
    synopsis:
      "A border-town mechanic discovers a smuggling route etched into the salt flats — and a debt that follows her inland.",
    poster:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920&q=80",
  },
  {
    slug: "blue-rehearsal",
    title: "Blue Rehearsal",
    year: 2026,
    director: "Yara Kim",
    genres: ["Drama", "Music"],
    status: "coming-soon",
    synopsis:
      "An understudy in a storied opera company must decide whether stealing a role means claiming a life she never rehearsed for.",
    poster:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1920&q=80",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    year: 2023,
    director: "Theo Lang",
    genres: ["Documentary"],
    status: "released",
    runtime: "86 min",
    synopsis:
      "Ecologists race a vanishing wetland — and the film becomes a ledger of what memory can hold when land disappears.",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1920&q=80",
  },
  {
    slug: "after-the-cut",
    title: "After the Cut",
    year: 2025,
    director: "Rina Okada",
    genres: ["Drama"],
    status: "released",
    runtime: "99 min",
    synopsis:
      "A film editor uncovers a deleted scene that implicates the director she once loved — and the festival premiere is days away.",
    poster:
      "https://images.unsplash.com/photo-1518676590629-3bfe83f2faf8?auto=format&fit=crop&w=800&q=80",
    hero: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1920&q=80",
  },
];

export function getFilm(slug: string): Film | undefined {
  return films.find((f) => f.slug === slug);
}

export function getFeaturedFilms(): Film[] {
  return films.filter((f) => f.featured);
}

export function getFilmsByStatus(status: FilmStatus | "all"): Film[] {
  if (status === "all") return films;
  return films.filter((f) => f.status === status);
}

export const statusLabel: Record<FilmStatus, string> = {
  released: "Watch at Home",
  "in-production": "In Production",
  "coming-soon": "Coming Soon",
};
