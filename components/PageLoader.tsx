"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const SESSION_KEY = "nawal-visited";
/** Same cubic as nawal2's CustomEase "hop". */
const HOP = "cubic-bezier(0.87, 0, 0.13, 1)";

/** Le chargeur reste au moins ce temps, sinon il clignote sur connexion rapide. */
const MIN_VISIBLE_MS = 700;
/**
 * Plafond dur sur l'attente de la vidéo. Au-delà on ouvre quand même : un hero
 * qui finit de se remplir en direct vaut mieux qu'un écran noir prolongé.
 */
const MAX_WAIT_MS = 4_000;
const CHROME_FADE_MS = 400;
const CURTAIN_MS = 700;

/**
 * idle     — rideau baissé, rien d'autre (état rendu côté serveur)
 * loading  — logo + barre de progression
 * fading   — le logo s'efface, le rideau tient encore
 * lifting  — le rideau remonte
 * done     — démonté
 *
 * Une seule machine à états : les quatre booléens d'avant (phase, showChrome,
 * chromeVisible, curtainUp) décrivaient une séquence linéaire et pouvaient se
 * désynchroniser.
 */
type Phase = "idle" | "loading" | "fading" | "lifting" | "done";

function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

/* `prefers-reduced-motion` lu comme source externe : pas de setState dans un
   effet pour le réconcilier, et on suit les changements de préférence. */
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServer() {
  return false;
}

/**
 * Attente annulable.
 *
 * Uniquement des timers — aucun `requestAnimationFrame` dans tout le fichier.
 * rAF ne se déclenche jamais dans un onglet en arrière-plan : la version
 * précédente attendait deux frames avant de commencer et restait donc bloquée
 * sur un rideau noir tant que l'onglet n'avait pas le focus.
 */
function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    let id = 0;
    const done = () => {
      window.clearTimeout(id);
      signal.removeEventListener("abort", done);
      resolve();
    };
    id = window.setTimeout(done, ms);
    signal.addEventListener("abort", done, { once: true });
  });
}

/**
 * Attend que le hero ait une première image décodable, en rapportant
 * l'avancement du tampon.
 *
 * On écoute la vraie balise `<video data-hero>` plutôt que d'en fabriquer une
 * copie cachée : un seul élément, un seul téléchargement, et on mesure
 * exactement ce que le rideau masque. Sur une page sans hero (contact,
 * programmes…), il n'y a rien à attendre et la promesse est déjà résolue.
 *
 * `loadeddata` (1re image) et non `canplaythrough` (les 7 Mo entiers) : le hero
 * est une boucle de fond, elle peut démarrer et continuer à se remplir.
 */
function waitForHeroFrame(
  onProgress: (ratio: number) => void,
  signal: AbortSignal,
): Promise<void> {
  const video = document.querySelector<HTMLVideoElement>("video[data-hero]");
  if (!video || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const settle = () => {
      video.removeEventListener("loadeddata", settle);
      video.removeEventListener("error", settle);
      video.removeEventListener("progress", report);
      signal.removeEventListener("abort", settle);
      resolve();
    };

    const report = () => {
      // `duration`/`buffered` peuvent lever pendant que les métadonnées se posent.
      try {
        if (video.duration > 0 && video.buffered.length > 0) {
          const end = video.buffered.end(video.buffered.length - 1);
          onProgress(Math.min(end / video.duration, 0.99));
        }
      } catch {
        /* métadonnées pas encore stables */
      }
    };

    video.addEventListener("loadeddata", settle, { once: true });
    // Vidéo injoignable (404, R2 down) : on ouvre plutôt que d'attendre le plafond.
    video.addEventListener("error", settle, { once: true });
    video.addEventListener("progress", report);
    signal.addEventListener("abort", settle, { once: true });
  });
}

/** Rideau d'ouverture : barre de progression puis rideau noir qui remonte. */
export function PageLoader() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Mouvement réduit : rien à animer, on note juste la visite.
    if (reducedMotion) {
      safeSessionSet(SESSION_KEY, "true");
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    // Le logo et la barre ne valent que pour une vraie première ouverture.
    const withChrome =
      navigation?.type === "reload" || !safeSessionGet(SESSION_KEY);

    async function run() {
      const startedAt = performance.now();

      if (withChrome) {
        setPhase("loading");
      }

      // Course : la vidéo, ou le plafond. Rien ici ne peut attendre indéfiniment.
      await Promise.race([
        waitForHeroFrame(
          (ratio) => setProgress(Math.round(ratio * 100)),
          signal,
        ),
        wait(MAX_WAIT_MS, signal),
      ]);
      if (signal.aborted) return;

      if (withChrome) {
        setProgress(100);
        // Beat minimum, décompté du temps déjà passé à charger.
        await wait(
          Math.max(MIN_VISIBLE_MS - (performance.now() - startedAt), 0),
          signal,
        );
        if (signal.aborted) return;

        setPhase("fading");
        await wait(CHROME_FADE_MS, signal);
        if (signal.aborted) return;
      }

      setPhase("lifting");
      await wait(CURTAIN_MS, signal);
      if (signal.aborted) return;

      safeSessionSet(SESSION_KEY, "true");
      setPhase("done");
    }

    void run();

    return () => controller.abort();
  }, [reducedMotion]);

  // En mouvement réduit le rideau n'est jamais monté, plutôt que monté puis retiré.
  if (reducedMotion || phase === "done") return null;

  const chromeMounted = phase === "loading" || phase === "fading";

  return (
    <>
      <div
        className={`nawal-curtain${phase === "lifting" ? " nawal-curtain--up" : ""}`}
        aria-hidden
        style={{ transitionTimingFunction: HOP }}
      />

      {chromeMounted ? (
        <div
          className={`nawal-loader${phase === "fading" ? " nawal-loader--hide" : ""}`}
          role="status"
          aria-live="polite"
          aria-busy={phase === "loading"}
        >
          <div className="nawal-loader__top">
            {/* Plain img: next/image can flash a blank box in prod while the
                optimized asset resolves, which read as a “white border”. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/nawal.png"
              alt={site.name}
              width={200}
              height={50}
              className="nawal-loader__logo"
              decoding="async"
            />
          </div>

          <div className="nawal-loader__line">
            <div className="nawal-loader__track">
              <div
                className="nawal-loader__bar"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>
          </div>

          <div className="nawal-loader__bottom">
            <div className="nawal-loader__count">
              <span>{progress}</span>
              <span>%</span>
            </div>
            <span className="nawal-loader__caption">Chargement</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
