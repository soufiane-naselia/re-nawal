"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
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
