import Image from "next/image";
import { site } from "@/content/site";

export function NotreEquipe() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground sm:text-5xl">
          Notre équipe
        </h2>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.team.map((member) => (
            <li key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-background">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                {member.role}
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                {member.bio}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
