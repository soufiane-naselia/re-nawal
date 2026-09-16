/**
 * Descriptif officiel de l'organisme.
 *
 * Sert de `tagline` (métadonnées + pied de page), de titre du hero et de
 * `about.headline`. Définie une seule fois pour que ces usages ne divergent
 * pas.
 *
 * Volontairement absente de la section « Qui sommes-nous » : le hero la dit
 * déjà, un écran plus haut.
 */
const TAGLINE_LEAD =
  "Laboratoire de soutien pour les artisans des écrans originaires";
const TAGLINE_REGIONS = "d'Afrique du Nord et d'Asie de l'Ouest";

/** Composée, pas recopiée : `TAGLINE` reste exactement la phrase d'origine. */
const TAGLINE = `${TAGLINE_LEAD} ${TAGLINE_REGIONS}`;

export const site = {
  name: "N.A.W.A.L.",
  shortName: "N.A.W.A.L.",
  tagline: TAGLINE,
  /**
   * TODO — en attente de la copie client pour le hero.
   *
   * Aucun texte inventé ici : le hero affiche le descriptif officiel en
   * entier. Le nom de l'organisme n'est pas répété, il est déjà porté par le
   * logo dans l'en-tête.
   *
   * Le hero est volontairement réduit au seul titre : pas de boutons, la
   * navigation et le bouton « Programmes » de l'en-tête restent visibles
   * au-dessus de la ligne de flottaison.
   *
   * Quand la vraie copie arrive, elle se remplace ici uniquement — Hero.tsx
   * ne lit rien d'autre que `site.hero`.
   */
  hero: {
    /**
     * Rendu en deux temps dans un seul <h1> : `lead` en blanc, `regions` en
     * rose. Même emphase que la carte de fin du promo client, qui met déjà
     * « d'Afrique du Nord » et « d'Asie de l'Ouest » en couleur de marque.
     */
    headline: { lead: TAGLINE_LEAD, regions: TAGLINE_REGIONS },
  },
  mission: {
    /* Pas de `lead` ici : le hero affiche déjà la TAGLINE mot pour mot, un
       écran plus haut. */
    paragraphs: [
      "N.A.W.A.L. est un organisme canadien destiné à toutes les parties prenantes des industries du cinéma, de la télévision et des médias numériques interactifs, originaires d’Afrique du Nord et de l’Asie de l’Ouest, ou qui touchent à ces régions, d’une manière ou d’une autre, pour les aider à créer du contenu authentique et se tailler une place de choix dans l’industrie, avec assurance et compétence.",
    ],
  },
  /**
   * Texte client, mot pour mot (deux paragraphes, ~1 030 caractères).
   *
   * La 1re phrase du 1er paragraphe (« Nawal, en arabe, c'est un prénom de
   * fille et ça veut dire "don" ou "offrande". ») est présentée en liste de
   * définitions : même information, découpée en étiquette + valeur +
   * précision. Le reste est repris mot pour mot dans `paragraphs` et
   * `closing`.
   *
   * Seuls les guillemets droits du document ont été normalisés en guillemets
   * français « … », comme partout ailleurs dans ce fichier.
   *
   * NB : `paragraphs[0]` répète mot pour mot le paragraphe de
   * « Qui sommes-nous ». C'est voulu — le client demande ce texte complet ici.
   */
  nameMeaning: {
    title: "NAWAL, ça veut dire quoi\u202F?",
    arabic: {
      label: "En arabe",
      meaning: "« don » ou « offrande »",
      note: "Nawal est un prénom de fille.",
    },
    acronym: {
      label: "Pour nous",
      expansion: "North African Western Asian Lab",
    },
    paragraphs: [
      "Pour nous, ça veut surtout dire le North African Western Asian Lab, un organisme destiné à toutes les parties prenantes des industries du cinéma, de la télévision et des médias numériques interactifs, originaires d’Afrique du Nord et de l’Asie de l’Ouest, ou qui touchent à ces régions, d’une manière ou d’une autre, pour les aider à créer du contenu authentique et se tailler une place de choix dans l’industrie, avec assurance et compétence.",
      "On parle « d’Afrique du Nord et d’Asie de l’Ouest » car la société a tendance à mettre tous les « Arabes » dans le même panier, même quand on vit sur deux continents différents, que tous les ressortissants ne se sentent pas Arabes (il y a les Amazighs, les Assyriens, les Kurdes, et la liste est longue), que nous ne parlons pas la même langue ou le même dialecte et nous n’avons même pas tous la même confession religieuse.",
    ],
    closing:
      "Avec un nom comme NAWAL, nous sommes plus inclusif, et comme on le sait, les mots valent leur pesant d’or.",
  },
  missionPillars: [
    {
      title: "Créer un écosystème",
      body: "Créer un espace de création pour les cinéastes issu.es des communautés NAWA.",
    },
    {
      title: "Former les talents",
      body: "Accompagner, soutenir et professionnaliser les cinéastes émergent.es",
    },
    {
      title: "Favoriser une industrie diversifiée",
      body: "Promouvoir une transformation concrète, durable et systémique de l'industrie.",
    },
  ],
  programmes: [
    {
      slug: "volume",
      title: "Volume",
      kind: "programme" as const,
    },
    {
      slug: "cinephilia",
      title: "Cinéphilia",
      kind: "programme" as const,
    },
    {
      slug: "the-story-lab",
      title: "The Story Lab",
      kind: "programme" as const,
    },
    {
      slug: "partenariat-ficam",
      title: "Partenariat avec la résidence d’écriture de la FICAM",
      kind: "partenariat" as const,
    },
    {
      slug: "partenariat-marrakech-amanar",
      title:
        "Partenariat avec le Marrakech Short Film Festival et le programme Amanar",
      kind: "partenariat" as const,
    },
  ],
  about: {
    headline: TAGLINE,
    body: [
      "N.A.W.A.L. est un organisme canadien destiné à toutes les parties prenantes des industries du cinéma, de la télévision et des médias numériques interactifs, originaires d’Afrique du Nord et de l’Asie de l’Ouest, ou qui touchent à ces régions, d’une manière ou d’une autre, pour les aider à créer du contenu authentique et se tailler une place de choix dans l’industrie, avec assurance et compétence.",
      "Nawal, en arabe, c’est un prénom de fille et ça veut dire « don » ou « offrande ». Pour nous, ça veut surtout dire le North African Western Asian Lab.",
      "On parle « d’Afrique du Nord et d’Asie de l’Ouest » car la société a tendance à mettre tous les « Arabes » dans le même panier, même quand on vit sur deux continents différents, que tous les ressortissants ne se sentent pas Arabes (il y a les Amazighs, les Assyriens, les Kurdes, et la liste est longue), que nous ne parlons pas la même langue ou le même dialecte et nous n’avons même pas tous la même confession religieuse. Avec un nom comme NAWAL, nous sommes plus inclusifs, et comme on le sait, les mots valent leur pesant d’or.",
    ],
  },
  team: [
    {
      name: "Bahija Essoussi Gagnon",
      role: "Présidente",
      bio: "Courte biographie à venir.",
      image: "/img/bahija.jpg",
    },
    {
      name: "Samuel Yoshimura Gagnon",
      role: "Directeur",
      bio: "Courte biographie à venir.",
      image: "/img/samuel.jpg",
    },
    {
      name: "Amina Oueslati",
      role: "Coordonatrice",
      bio: "Courte biographie à venir.",
      image: null,
    },
  ],
  contact: {
    email: "hello@nawalpictures.com",
    phone: "+1 (323) 555-0142",
    address: "Los Angeles, CA",
  },
  accentCta: {
    label: "Programmes",
    href: "/#programmes",
  },
  /** Shared by Header and Footer. Root-relative so the links also work off the home page. */
  nav: [
    { href: "/#qui-sommes-nous", label: "À propos" },
    { href: "/#programmes", label: "Programmes" },
    { href: "/#equipe", label: "Équipe" },
    { href: "/#infolettre", label: "Infolettre" },
  ],
} as const;
