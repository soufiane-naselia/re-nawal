/**
 * Contenu des pages Conférences.
 *
 * Le document client ne décrit pas le programme « Conférences » lui-même — cette
 * partie est vide chez eux — mais il détaille les éditions. La page d'index se
 * contente donc de lister les éditions, sans texte de présentation inventé.
 *
 * Les blocs sont ceux des programmes (`ProgrammeBlock`) : une conférence = une
 * section, avec son générique puis ses paragraphes. Ajouter une édition = ajouter
 * des données, pas un composant.
 */

import type { ProgrammeSection } from "@/content/programmes";

export type ConferenceEdition = {
  /** Segment d'URL sous /conferences/. */
  slug: string;
  /** « 1ère édition » — tel que numéroté par le client. */
  label: string;
  /** Titre long quand il existe ; sinon le label suffit. */
  title?: string;
  /**
   * Extrait vidéo de l'édition : MP4 dans /public/vids, lu par `VideoPlayer`
   * (même convention que `Programme.trailer`). Absent = emplacement réservé.
   */
  excerpt?: string;
  /**
   * Captation Vimeo. Intégrée en lecteur si l'URL contient un identifiant
   * numérique, sinon ignorée — voir `vimeoEmbedUrl`.
   */
  videoUrl?: string;
  /** Absent tant que le client n'a pas livré le contenu de l'édition. */
  sections?: readonly ProgrammeSection[];
};

/** Partenaires de la 1ère édition — identiques à ceux de VOLUME 1. */
const PARTENAIRES_EDITION_1 = {
  financiers: [
    "FMC",
    "Inspirit Foundation",
    "Fond Bell",
    "FIP",
    "Conseil des arts de Montréal",
    "Patrimoine Canada",
  ],
  edition: [
    "Cinemania",
    "Agence On Est Là",
    "UPPCQ",
    "Centre Culturel Marocain",
    "Académie du Cinéma et de la Télévision",
  ],
} as const;

export const conferenceEditions: readonly ConferenceEdition[] = [
  {
    slug: "1",
    label: "1ère édition",
    sections: [
      {
        id: "conference-1",
        heading:
          "Conférence 1 : Orientalisme et représentation des communautés arabes au cinéma",
        navLabel: "Conférence 1",
        blocks: [
          {
            type: "people",
            groups: [
              {
                label: "Modératrice",
                people: [{ name: "Sara Nacer" }],
              },
              {
                label: "Intervenants",
                people: [
                  { name: "Marya Zarif", role: "Cinéaste" },
                  { name: "Aziz Zoromba", role: "Cinéaste" },
                  { name: "Bochra Manai", role: "Sociologue" },
                  { name: "Nerimen Hadrami", role: "Productrice" },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Au cours de cette discussion, les intervenants ont exploré la nécessité cruciale de favoriser une représentation authentique des communautés « arabes » au sein de l’industrie cinématographique. La conversation a porté sur la promotion de l’inclusion des cinéastes issus de ces communautés et sur la mise en valeur de leurs voix dans le paysage cinématographique. Les intervenants ont abordé les origines des stéréotypes, leur impact sur la société et sur leurs vies personnelles, tout en examinant les initiatives actuelles visant à encourager une narration plus nuancée et une représentation plus diversifiée des communautés « arabes » sur le paysage cinématographique et télévisuel.",
          },
          {
            type: "paragraph",
            text: "Cette conférence a offert une plateforme essentielle pour une réflexion approfondie sur la manière dont l’industrie cinématographique peut contribuer à une représentation plus authentique, équilibrée et respectueuse des communautés « arabes ». Elle a souligné l’importance de l’inclusion, tout en proposant des moyens concrets pour aller dans cette direction, faire face aux barrières systémiques et briser les stéréotypes trop bien ancrés dans le monde du cinéma.",
          },
        ],
      },
      {
        id: "conference-2",
        heading: "Conférence 2 : Court métrage et succès à l’international",
        navLabel: "Conférence 2",
        blocks: [
          {
            type: "people",
            groups: [
              {
                label: "Modératrice",
                people: [{ name: "Sara Nacer" }],
              },
              {
                label: "Intervenants",
                people: [
                  { name: "Aziz Zoromba", role: "Cinéaste" },
                  { name: "Halima Ouardiri", role: "Cinéaste" },
                  { name: "Omar Elhamy", role: "Cinéaste" },
                  {
                    name: "Benjamin Bonnet",
                    role: "Producteur et membre d’UNIFRANCE",
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Dans le cadre de la première édition du programme VOLUME, dédiée au format court, nous avons également organisé une conférence mettant en lumière les voix des cinéastes de la communauté NAWA qui ont connu un succès retentissant avec leurs courts-métrages.",
          },
          {
            type: "paragraph",
            text: "Lors de cet échange croisé, les trois cinéastes, Halima Ouardiri, Aziz Zoromba, et Omar Elhamy, ont partagé leurs expériences, notamment leur récent succès dans des festivals internationaux prestigieux tels que le TIFF, Sundance et la Berlinale. Ils ont également discuté du rôle essentiel que leurs courts-métrages ont joué dans leur trajectoire professionnelle, mettant en lumière l’impact significatif de ces œuvres sur la scène internationale. Ils ont partagé leurs expériences personnelles, les différents obstacles qu’ils ont pu rencontrer et leurs apprentissages.",
          },
          {
            type: "paragraph",
            text: "Enfin, en parallèle, dans le cadre de notre partenariat avec le festival CINEMANIA, nous avons présenté en première québécoise le film « Animalia » de la cinéaste franco-marocaine Sofia Alaoui. Cette initiative s’inscrit dans la continuité de nos efforts pour contribuer à la mise en lumière de la diversité et de la richesse des narrations cinématographiques issues de la région d’Afrique du Nord et d’Asie de l’Ouest.",
          },
        ],
      },
      {
        id: "partenaires",
        heading: "Partenaires",
        blocks: [
          {
            type: "tags",
            lead: "Partenaires financiers",
            items: PARTENAIRES_EDITION_1.financiers,
          },
          {
            type: "tags",
            lead: "Partenaires de l’édition",
            items: PARTENAIRES_EDITION_1.edition,
          },
        ],
      },
    ],
  },
  {
    slug: "2",
    label: "2ème édition",
    /* Le client signale un extrait vidéo pour cette édition, mais le fichier
       n'a pas encore été fourni : l'emplacement réservé reste affiché. */
    sections: [
      {
        id: "conference-1",
        heading:
          "Conférence 1 : Co-production international : Cinéma de la diaspora NAWA canadienne entre pays d’origine et pays d’accueil – Défis et opportunités",
        navLabel: "Conférence 1",
        blocks: [
          {
            type: "people",
            groups: [
              {
                label: "Modératrice",
                people: [{ name: "Katia Gaïd", role: "journaliste" }],
              },
              {
                label: "Intervenantes",
                people: [
                  {
                    /* Virgule et non tiret devant la maison : le rendu insère
                       déjà « — » entre le nom et le rôle. */
                    name: "Sherianne Bekhti",
                    role: "productrice franco-algérienne, Malfamé production",
                  },
                  {
                    name: "Halima Ouardiri",
                    role: "scénariste, réalisatrice, productrice suisso-canadienne d’origine marocaine",
                  },
                  {
                    name: "Meryam Joobeur",
                    role: "réalisatrice et scénariste canado-tunisienne",
                  },
                  {
                    name: "Maria Gracia Turgeon",
                    role: "productrice, Midi La Nuit",
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Dans le cadre des conférences de cette année, nous avons exploré le thème de la diaspora d’Afrique du Nord et d’Asie de l’Ouest au Canada, en mettant en lumière les expériences plurielles des cinéastes issus de cette communauté. Une table ronde consacrée à la coproduction internationale a offert une occasion privilégiée d’examiner les spécificités et les défis liés à la réalisation de films dans les pays d’origine des cinéastes de la diaspora.",
          },
          {
            type: "paragraph",
            text: "Grâce aux interventions de professionnelles reconnues, le public a pu approfondir sa compréhension des enjeux complexes liés au financement, à la production et à la distribution. Les discussions ont également présenté des stratégies concrètes pour surmonter les obstacles potentiels, tout en sensibilisant l’audience aux réalités uniques du cinéma diasporique et aux dynamiques culturelles qu’il reflète et transmet.",
          },
          {
            type: "paragraph",
            text: "Les intervenantes, cinéastes et productrices expérimentées en coproduction internationale, ont partagé des approches pragmatiques, des solutions novatrices, ainsi que leurs expériences riches et variées. Ces échanges ont permis de mettre en lumière les moyens de relever les défis, qu’ils soient artistiques ou logistiques, tout en soulignant la force et la résilience du cinéma issu de la diaspora.",
          },
        ],
      },
      {
        id: "conference-2",
        heading:
          "Conférence 2 : Le cinéma comme vecteur de transmission des mémoires",
        navLabel: "Conférence 2",
        blocks: [
          {
            type: "people",
            groups: [
              {
                label: "Modératrice",
                people: [
                  { name: "Hanna Zeïda", role: "artiste multidisciplinaire" },
                ],
              },
              {
                label: "Intervenant·e·s",
                people: [
                  {
                    name: "Nada El-Omari",
                    role: "cinéaste et écrivaine",
                  },
                  {
                    name: "Bouchra Assou",
                    role: "programmatrice de film et fondatrice du Dhakira Collective",
                  },
                  {
                    name: "Eli Jean Tahchi",
                    role: "réalisateur et scénariste",
                  },
                  {
                    name: "Samy Benammar",
                    role: "artiste et critique de cinéma",
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "À travers les témoignages d’intervenant·e·s issu·e·s des diasporas d’Afrique du Nord et d’Asie de l’Ouest, nous avons exploré comment les récits cinématographiques peuvent devenir de véritables archives vivantes, révélant et préservant des histoires souvent marginalisées ou effacées par les discours dominants.",
          },
          {
            type: "paragraph",
            text: "Les œuvres cinématographiques, en tant que vecteurs puissants de mémoire collective, jouent un rôle fondamental dans la transmission intergénérationnelle des récits, tout en initiant une réflexion approfondie sur les identités diasporiques et leurs multiples facettes. Le cinéma, par son langage universel et sa capacité à toucher les cœurs et les esprits, s’impose comme un moyen d’expression artistique unique et un outil de résistance. Il permet non seulement de déconstruire les stéréotypes, mais aussi de mettre en lumière des perspectives longtemps négligées dans le paysage audiovisuel, participant ainsi à une reconfiguration des récits dominants.",
          },
        ],
      },
    ],
  },
  {
    slug: "3",
    label: "3ème édition",
    videoUrl: "https://vimeo.com/1184848245?fl=ls&fe=ec",
    sections: [
      {
        /* Le titre du document est corrompu (« Quand l'histoire les d'un
           récits peuple familiaux racontent l'histoire d'un peuple ») : deux
           versions entrelacées. Le corps du texte donne l'intitulé exact,
           repris ici. */
        id: "table-ronde",
        heading:
          "Table ronde : Quand les récits familiaux racontent l’histoire d’un peuple",
        navLabel: "Table ronde",
        blocks: [
          {
            /* Modératrice en premier, comme sur les éditions 1 et 2 — le
               document la place après les panélistes, mais l'ordre des groupes
               est purement visuel. */
            type: "people",
            groups: [
              {
                label: "Modératrice",
                people: [
                  {
                    name: "Isabelle Raynauld",
                    role: "Scénariste et réalisatrice",
                  },
                ],
              },
              {
                label: "Panélistes",
                people: [
                  { name: "Alain Farah", role: "Écrivain et scénariste" },
                  { name: "Marya Zarif", role: "Autrice et cinéaste" },
                  {
                    name: "Onur Karaman",
                    role: "Producteur, scénariste et réalisateur",
                  },
                  {
                    name: "Rym Bellouti",
                    role: "Cinéaste émergente et psychologue",
                  },
                ],
              },
            ],
          },
          {
            type: "paragraph",
            text: "Nous avons collaboré avec Cinemania pour l’organisation d’une table ronde ayant pour titre : Quand les récits familiaux racontent l’histoire d’un peuple. Nous en avons profité pour inviter l’une des participantes de Volume 3 comme panéliste puisque son film aborde le sujet du panel.",
          },
          {
            type: "paragraph",
            text: "Au croisement de l’intime et du collectif, ce panel explore la manière dont les histoires de famille deviennent les miroirs d’un peuple. À travers leurs films, plusieurs cinéastes et scénaristes transforment les dynamiques familiales telles que les amours, les conflits, les héritages et les silences en reflets d’une mémoire politique et sociale. Comment des histoires personnelles peuvent-elles révéler le vécu d’un peuple ? En quoi les destins individuels portent-ils les cicatrices d’une histoire commune ? Nos invité·es partageront leur démarche, leur propos, leurs sources d’inspiration et les défis de mêler récit personnel et contexte historique. Cette rencontre met en lumière la puissance du cinéma à tisser des liens entre mémoire intime et mémoire collective. Une conversation essentielle sur la manière dont le cinéma raconte, à travers les familles, l’histoire des peuples.",
          },
        ],
      },
      {
        id: "partenaires",
        heading: "Partenaires",
        blocks: [
          {
            type: "tags",
            items: [
              "FMC",
              "Inspirit Foundation",
              "Telefilm",
              "Patrimoine Canada",
              "Fonds Bell",
              "FIP",
              "Académie",
              "Main Film",
              "Makila",
              "Centre culturel marocain",
              "MEDIA",
              "Cinémania",
              "RIDM",
            ],
          },
        ],
      },
    ],
  },
];

export function getConferenceEdition(
  slug: string,
): ConferenceEdition | undefined {
  return conferenceEditions.find((edition) => edition.slug === slug);
}

export function hasConferencePage(edition: ConferenceEdition): boolean {
  return Boolean(edition.sections?.length);
}

/**
 * URL de lecteur Vimeo à partir d'une URL de page, ou `null` si elle n'est pas
 * intégrable.
 *
 * Les URL « vanité » (vimeo.com/objectif9/nawal-volume1) ne portent pas
 * d'identifiant numérique : impossible de les intégrer, on ne devine pas.
 * Les URL privées portent un jeton après l'identifiant, repris en `h=`.
 *
 * `dnt=1` demande à Vimeo de ne pas déposer de cookies de suivi.
 */
export function vimeoEmbedUrl(pageUrl: string): string | null {
  const match = pageUrl.match(/vimeo\.com\/(\d+)(?:\/([0-9a-zA-Z]+))?/);
  if (!match) return null;

  const [, id, privacyHash] = match;
  const params = new URLSearchParams({ dnt: "1" });
  if (privacyHash) params.set("h", privacyHash);

  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}
