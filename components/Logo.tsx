import Link from "next/link";
import { site } from "@/content/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline leading-none ${className}`}
      aria-label={`${site.name} home`}
    >
      <span className="font-[family-name:var(--font-bebas)] text-[1.55rem] tracking-[0.22em] text-foreground transition-colors group-hover:text-accent">
        N.A.W.A.L.
      </span>
    </Link>
  );
}
