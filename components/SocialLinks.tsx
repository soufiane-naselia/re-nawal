import { site } from "@/content/site";

/**
 * Comptes sociaux, partagés par le pied de page et la page Contact.
 *
 * Tant qu'une URL vaut `null`, le nom s'affiche sans lien : on n'invente pas
 * d'adresse de profil. Renseigner `url` dans `site.contact.social` suffit à en
 * faire un lien, aux deux endroits à la fois.
 */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-6 text-sm text-muted ${className}`}>
      {site.contact.social.map((account) => (
        <li key={account.label}>
          {account.url ? (
            <a
              href={account.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center transition-colors duration-300 hover:text-accent"
            >
              {account.label}
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center">
              {account.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
