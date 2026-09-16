import Image from "next/image";
import { site } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages -- same-page anchor: Lenis intercepts the click to smooth-scroll; next/link would make the router's own scroll fight it.
    <a
      href="/#top"
      // min-h-11 keeps the tap target at 44px; the mark itself stays h-5.
      className={`group inline-flex min-h-11 cursor-pointer items-center ${className}`}
      aria-label={`${site.name} — haut de page`}
    >
      <Image
        src="/img/nawal.png"
        alt={site.name}
        width={160}
        height={40}
        priority
        className="h-5 w-auto"
      />
    </a>
  );
}
