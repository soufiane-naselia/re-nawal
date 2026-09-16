import { NameMeaning } from "@/components/NameMeaning";
import { NotreEquipe } from "@/components/NotreEquipe";
import { NotreMission } from "@/components/NotreMission";
import { ProgrammesSection } from "@/components/ProgrammesSection";
import { VideoPlayer } from "@/components/VideoPlayer";
import { site } from "@/content/site";

const ABOUT_VIDEO = "/vids/nawal-2025-promo.mp4";

/** Identity blocks under the hero. */
export function Mission() {
  return (
    <>
      {/* No scroll-mt here: globals.css already sets scroll-padding-top and
          Lenis subtracts both, which lands the section 160px down instead of
          80px. See the note above `html` in globals.css. */}
      <section id="qui-sommes-nous" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
              Qui sommes-nous
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-bebas)] text-4xl tracking-[0.08em] text-foreground sm:text-5xl">
              {site.name}
            </h2>
            <div className="mt-5 h-px w-14 bg-brand-orange" aria-hidden />
            <div className="mt-7 space-y-5 text-[0.95rem] leading-[1.8] text-muted sm:text-base">
              {site.mission.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <VideoPlayer src={ABOUT_VIDEO} title="N.A.W.A.L. · Promo 2025" />
        </div>
      </section>

      <NameMeaning />

      <NotreMission />

      <ProgrammesSection />

      <NotreEquipe />
    </>
  );
}
