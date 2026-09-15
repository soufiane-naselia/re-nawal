"use client";

import { site } from "@/content/site";

const HERO_VIDEO = "/vids/nawal-2025-promo.mp4";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[min(92vh,920px)] w-full overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={`${site.name} promo`}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,920px)] max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h1 className="animate-fade-up font-[family-name:var(--font-bebas)] text-6xl leading-[0.92] tracking-[0.06em] text-foreground sm:text-7xl md:text-8xl">
          {site.name}
        </h1>
        <p className="animate-fade-up delay-1 mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          {site.tagline}
        </p>
        <div className="animate-fade-up delay-2 mt-8 flex flex-wrap gap-3">
            <a
            href="#programmes"
            className="bg-brand-pink px-5 py-3 text-sm font-semibold tracking-[0.12em] text-brand-teal uppercase transition-opacity hover:opacity-90"
          >
            Programmes
          </a>
          <a
            href="#qui-sommes-nous"
            className="border border-brand-orange/60 px-5 py-3 text-sm font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            À propos
          </a>
        </div>
      </div>
    </section>
  );
}
