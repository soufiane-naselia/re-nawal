"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const SESSION_KEY = "nawal-visited";
/** Same cubic as nawal2's CustomEase "hop". */
const HOP = "cubic-bezier(0.87, 0, 0.13, 1)";
const COUNT_MS = 1400;
const MIN_HOLD_MS = 300;
const CHROME_FADE_MS = 400;
const CURTAIN_MS = 700;

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

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

/** Two frames so the browser paints the empty chrome before we animate. */
function nextPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/**
 * First-visit / reload loader (from nawal2): progress line + %, then a black
 * curtain slides up.
 *
 * Progress is driven by rAF → inline `scaleX`, not a CSS width class toggle.
 * The class-based transition often never fires in production: React commits
 * `showChrome` and `--full` in one paint, so the bar mounts already at 100%
 * (or stays at 0%) and you only see the empty track.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"boot" | "loading" | "exiting" | "done">(
    "boot",
  );
  const [progress, setProgress] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [curtainUp, setCurtainUp] = useState(false);
  const [showChrome, setShowChrome] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;

    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    const isFirstVisit = !safeSessionGet(SESSION_KEY);
    const shouldShow = isFirstVisit || isReload;

    async function revealCurtainOnly() {
      setPhase("exiting");
      await nextPaint();
      if (cancelled) return;
      setCurtainUp(true);
      await wait(CURTAIN_MS);
      if (cancelled) return;
      safeSessionSet(SESSION_KEY, "true");
      setPhase("done");
    }

    async function runFullLoader() {
      setShowChrome(true);
      setChromeVisible(true);
      setProgress(0);
      setCurtainUp(false);
      setPhase("loading");

      await nextPaint();
      if (cancelled) return;

      const countStart = performance.now();
      await new Promise<void>((resolve) => {
        const tick = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((now - countStart) / COUNT_MS, 1);
          // Ease matches the old CSS curve so the fill doesn't feel linear.
          const eased = t * t * (3 - 2 * t);
          setProgress(Math.min(Math.round(eased * 100), 100));
          if (t < 1) raf = requestAnimationFrame(tick);
          else resolve();
        };
        raf = requestAnimationFrame(tick);
      });
      if (cancelled) return;

      const waitImages = new Promise<void>((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }
        window.addEventListener("load", () => resolve(), { once: true });
      });

      await Promise.all([waitImages, wait(MIN_HOLD_MS)]);
      if (cancelled) return;

      setChromeVisible(false);
      setPhase("exiting");
      await wait(CHROME_FADE_MS);
      if (cancelled) return;

      setCurtainUp(true);
      await wait(CURTAIN_MS);
      if (cancelled) return;

      safeSessionSet(SESSION_KEY, "true");
      setPhase("done");
    }

    if (prefersReducedMotion()) {
      safeSessionSet(SESSION_KEY, "true");
      setCurtainUp(true);
      setPhase("done");
      return;
    }

    if (!shouldShow) {
      void revealCurtainOnly();
    } else {
      void runFullLoader();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <div
        className={`nawal-curtain${curtainUp ? " nawal-curtain--up" : ""}`}
        aria-hidden
        style={{ transitionTimingFunction: HOP }}
      />

      {showChrome ? (
        <div
          className={`nawal-loader${chromeVisible ? "" : " nawal-loader--hide"}`}
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
