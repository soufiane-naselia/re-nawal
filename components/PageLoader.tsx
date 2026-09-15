"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const MIN_MS = 900;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const started = Date.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    function finish() {
      const wait = Math.max(0, MIN_MS - (Date.now() - started));
      fadeTimer = setTimeout(() => {
        setLeaving(true);
        hideTimer = setTimeout(() => setVisible(false), 500);
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`page-loader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background ${
        leaving ? "page-loader-leave" : ""
      }`}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="page-loader-mark flex flex-col items-center gap-8">
        <Image
          src="/img/nawal.png"
          alt={site.name}
          width={200}
          height={50}
          priority
          className="h-8 w-auto sm:h-10"
        />
        <div className="page-loader-bar" aria-hidden />
        <span className="sr-only">Chargement…</span>
      </div>
    </div>
  );
}
