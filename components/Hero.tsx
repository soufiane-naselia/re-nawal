import { HERO_VIDEO } from "@/content/media";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      id="top"
      // -mt-16 cancels main's header offset so the footage runs edge-to-edge
      // under the fixed header. svh (not dvh) so the hero is never clipped by
      // mobile browser chrome and never resizes mid-scroll as the URL bar hides.
      className="grain relative flex min-h-svh w-full flex-col overflow-hidden bg-background -mt-16"
    >
      <video
        // Repère pour PageLoader : il attend la 1re image de CETTE balise
        // plutôt que d'en précharger une copie de son côté.
        data-hero
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        // `auto`: the PageLoader already warmed this URL into the HTTP cache,
        // so this should hit disk/memory instead of starting cold at reveal.
        preload="auto"
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Scrims: vertical lift for the copy, then a warm brand wash so the
          footage reads as part of the palette instead of raw grey video. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 10% 85%, #6b0a1f 0%, transparent 60%), radial-gradient(55% 45% at 88% 12%, #0f3d45 0%, transparent 65%)",
        }}
      />

      {/* pt-16 keeps the copy clear of the fixed header if the viewport is too
          short for the bottom-anchored block (landscape phones). */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        {/* The headline is the org descriptor, not the name — the logo in the
            header already carries the name, so repeating it here spent the
            largest type on the least information.

            Bebas is caps-only, so 100+ characters needs help to avoid reading
            as a wall: a wider measure, and the regions split out in brand
            pink for internal hierarchy — the same emphasis the client's own
            promo end card uses. The drop-shadow is insurance, since the copy
            sits over live footage and must survive a bright frame. */}
        <h1 className="animate-fade-up delay-1 max-w-5xl font-[family-name:var(--font-bebas)] text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.05] tracking-[0.02em] text-balance text-foreground drop-shadow-[0_2px_24px_rgba(7,7,7,0.55)]">
          {site.hero.headline.lead}{" "}
          <span className="text-brand-pink">{site.hero.headline.regions}</span>
        </h1>
      </div>
    </section>
  );
}
