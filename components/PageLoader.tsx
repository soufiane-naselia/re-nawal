"use client";

import { useEffect, useState } from "react";
import { HERO_VIDEO } from "@/content/media";
import { site } from "@/content/site";

const SESSION_KEY = "nawal-visited";
/** Same cubic as nawal2's CustomEase "hop". */
const HOP = "cubic-bezier(0.87, 0, 0.13, 1)";
const CHROME_FADE_MS = 400;
const CURTAIN_MS = 700;
/** Don't block forever on a bad connection — reveal anyway. */
const VIDEO_TIMEOUT_MS = 20_000;

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
 * Warm the HTTP cache for the hero reel and resolve once it can play through
 * (or we time out). Progress is reported from `buffered` when the browser
 * exposes it — far more honest than a fixed 1.4s timer for a ~7 MB file.
 */
function preloadHeroVideo(
  src: string,
  onProgress: (ratio: number) => void,
  signal: { cancelled: boolean },
): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.src = src;
    // Some engines won't buffer off-DOM; keep it invisible but attached.
    video.setAttribute(
      "style",
      "position:fixed;inset:0;width:1px;height:1px;opacity:0;pointer-events:none",
    );
    document.body.appendChild(video);

    let settled = false;
    let timeoutId = 0;
    let cancelPoll = 0;

    const finish = () => {
      if (settled) return;
      settled = true;
      onProgress(1);
      window.clearTimeout(timeoutId);
      window.clearInterval(cancelPoll);
      video.removeEventListener("progress", onBuffer);
      video.removeEventListener("loadeddata", onBuffer);
      video.removeEventListener("canplaythrough", finish);
      video.remove();
      resolve();
    };

    const onBuffer = () => {
      if (signal.cancelled) {
        finish();
        return;
      }
      try {
        if (video.duration > 0 && video.buffered.length > 0) {
          const end = video.buffered.end(video.buffered.length - 1);
          onProgress(Math.min(end / video.duration, 0.99));
        }
      } catch {
        /* duration/buffered can throw while metadata is still settling */
      }
    };

    timeoutId = window.setTimeout(finish, VIDEO_TIMEOUT_MS);
    cancelPoll = window.setInterval(() => {
      if (signal.cancelled) finish();
    }, 200);

    video.addEventListener("progress", onBuffer);
    video.addEventListener("loadeddata", onBuffer);
    video.addEventListener("canplaythrough", finish, { once: true });
    video.load();

    // Already warm (bfcache / prior visit within the session).
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      finish();
    }
  });
}

/**
 * First-visit / reload loader (from nawal2): progress line + %, then a black
 * curtain slides up.
 *
 * Progress tracks the hero MP4 download. The old fixed-timer approach always
 * finished before a ~7 MB reel had buffered, so the page opened onto black.
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
    const signal = { cancelled: false };

    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = nav?.type === "reload";
    const isFirstVisit = !safeSessionGet(SESSION_KEY);
    const shouldShow = isFirstVisit || isReload;

    async function revealCurtain() {
      setPhase("exiting");
      await nextPaint();
      if (signal.cancelled) return;
      setCurtainUp(true);
      await wait(CURTAIN_MS);
      if (signal.cancelled) return;
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
      if (signal.cancelled) return;

      await preloadHeroVideo(
        HERO_VIDEO,
        (ratio) => {
          if (!signal.cancelled) {
            setProgress(Math.min(Math.round(ratio * 100), 100));
          }
        },
        signal,
      );
      if (signal.cancelled) return;

      setProgress(100);
      // Brief beat at 100% so the fill doesn't vanish the instant it completes.
      await wait(280);
      if (signal.cancelled) return;

      setChromeVisible(false);
      await wait(CHROME_FADE_MS);
      if (signal.cancelled) return;

      await revealCurtain();
    }

    async function runCurtainWithWarmup() {
      // Return visit: no chrome, but still wait for the reel if it isn't cached
      // so we don't open onto a black hero again.
      setPhase("exiting");
      await preloadHeroVideo(HERO_VIDEO, () => {}, signal);
      if (signal.cancelled) return;
      await revealCurtain();
    }

    if (prefersReducedMotion()) {
      safeSessionSet(SESSION_KEY, "true");
      setCurtainUp(true);
      setPhase("done");
      return;
    }

    if (!shouldShow) {
      void runCurtainWithWarmup();
    } else {
      void runFullLoader();
    }

    return () => {
      signal.cancelled = true;
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
