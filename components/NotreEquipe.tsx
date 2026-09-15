import Image from "next/image";
import { site } from "@/content/site";

function UserPlaceholder() {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-background"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-20 w-20 text-border"
        fill="currentColor"
      >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

export function NotreEquipe() {
  return (
    <section id="equipe" className="scroll-mt-20 border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-foreground sm:text-5xl">
          Notre équipe
        </h2>

        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.team.map((member) => (
            <li key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden border border-border bg-background">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <UserPlaceholder />
                )}
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-foreground">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-brand-orange uppercase">
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
