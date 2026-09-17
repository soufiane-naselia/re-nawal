"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const SESSION_KEY = "nawal-visited";
/** Same cubic as nawal2's CustomEase "hop". */
const HOP = "cubic-bezier(0.87, 0, 0.13, 1)";
const COUNT_MS = 1200;
const MIN_HOLD_MS = 400;
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

/**
 * First-visit / reload loader stolen from nawal2: progress line, percentage
 * counter, then a black curtain that slides up to reveal the page.
 *
 * Skipped on soft navigations within the same session (layout stays mounted).
 * `sessionStorage` is written only when the sequence finishes, so React Strict
 * Mode's double-invoke in dev can restart cleanly without getting stuck at 0%.
 */
export function PageLoader() {
  const [phase, setPhase] = useState<"boot" | "loading" | "exiting" | "done">(
    "boot",
  );
  const [count, setCount] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [barFull, setBarFull] = useState(false);
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
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
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
      setCount(0);
      setBarFull(false);
      setCurtainUp(false);
      setPhase("loading");

      // Restart the CSS width transition after a Strict Mode remount.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          setBarFull(true);
          resolve();
        });
      });
      if (cancelled) return;

      const countStart = performance.now();
      await new Promise<void>((resolve) => {
        const tick = (now: number) => {
          if (cancelled) {
            resolve();
            return;
          }
          const t = Math.min((now - countStart) / COUNT_MS, 1);
          setCount(Math.min(Math.floor(t * 100), 100));
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
            <Image
              src="/img/nawal.png"
              alt={site.name}
              width={200}
              height={50}
              priority
              className="nawal-loader__logo"
            />
          </div>

          <div className="nawal-loader__line">
            <div className="nawal-loader__track">
              <div
                className={`nawal-loader__bar${barFull ? " nawal-loader__bar--full" : ""}`}
              />
            </div>
          </div>

          <div className="nawal-loader__bottom">
            <div className="nawal-loader__count">
              <span>{count}</span>
              <span>%</span>
            </div>
            <span className="nawal-loader__caption">Chargement</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
