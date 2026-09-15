import Image from "next/image";
import { site } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center ${className}`}
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
