"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title?: string;
};

export function VideoPlayer({ src, title = "N.A.W.A.L." }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="overflow-hidden border border-border bg-black">
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="h-full w-full cursor-pointer object-cover"
          src={src}
          muted={muted}
          playsInline
          preload="metadata"
          aria-label={title}
          onClick={togglePlay}
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 bg-black/70 text-foreground backdrop-blur-sm transition-all duration-300 ease-[var(--ease-expo)] hover:border-accent hover:text-accent active:scale-[0.94]"
            aria-label={playing ? "Pause" : "Lecture"}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-11 w-11 cursor-pointer items-center justify-center border border-white/20 bg-black/70 text-foreground backdrop-blur-sm transition-all duration-300 ease-[var(--ease-expo)] hover:border-accent hover:text-accent active:scale-[0.94]"
            aria-label={muted ? "Activer le son" : "Couper le son"}
          >
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M16.5 12c0-1.8-1-3.3-2.5-4.1v2.2l2.5 2.5V12zm2.5 0c0 .9-.2 1.8-.5 2.6l1.5 1.5c.6-1.2 1-2.6 1-4.1 0-3.2-1.8-6-4.5-7.3v2.1c1.8 1.1 3 3 3 5.2zM4.3 3 3 4.3 7.7 9H4v6h4l5 5v-6.7l4.3 4.3 1.3-1.3L4.3 3zM14 8.8v-.9L9.9 3.8 14 8.8z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.8-1-3.3-2.5-4.1v8.1c1.5-.7 2.5-2.3 2.5-4zM14 3.2v2.1c2.9 1 5 3.8 5 6.7s-2.1 5.7-5 6.7v2.1c4-.9 7-4.5 7-8.8s-3-7.9-7-8.8z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
