"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // `duration` + easing takes precedence over `lerp` in Lenis — setting
        // both is misleading, so only the one actually used is kept.
        duration: 1.2,
        smoothWheel: true,
        anchors: true,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
