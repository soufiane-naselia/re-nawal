/**
 * Contenu des pages Programmes.
 *
 * Le client livre les programmes un par un : VOLUME est complet, les quatre
 * autres n'ont encore que leur intitulé. Un programme sans `sections` s'affiche
 * comme fiche « contenu à venir » — rien n'est inventé ici.
 *
 * Les blocs (`ProgrammeBlock`) reprennent la mise en forme du document client :
 * paragraphes, listes à puces introduites par une ligne, notes, et le tableau
 * d'admissibilité. Ajouter un programme = ajouter des données, pas un composant.
 */

export type ProgrammeKind = "programme" | "partenariat";

/** Une seule couleur de marque par programme, réutilisée tuile → page. */
export type ProgrammeAccent = "orange" | "lilac" | "yellow" | "pink";

/** Puce « **Étiquette :** texte » du document client. */
export type ProgrammeBullet = { label?: string; text: string };

/**
 * Un·e participant·e d'une édition, tel·le que listé·e par le client.
 *
 * Le niveau de détail varie d'une édition à l'autre : VOLUME 1 et 2 donnent
 * format, genre et mentor·e ; VOLUME 3 ne donne que le projet et le jumelage.
 * Tout sauf le nom et le projet est donc optionnel, et la carte n'affiche que
 * les lignes réellement fournies.
 */
export type EditionParticipant = {
  /** Auteur·rice du projet. */
  name: string;
  project: string;
  /** « Court-métrage » ou « Série courte ». */
  format?: string;
  /** Durée fournie à partir de VOLUME 2 : « 20 minutes », « 8 x 5 minutes »… */
  duration?: string;
  genre?: string;
  /** Le document alterne « Mentore », « Mentor », « Mentor·e ». */
  mentorRole?: string;
  mentor?: string;
};

/** Un atelier effectivement donné pendant une édition. */
export type EditionWorkshop = {
  /** « Atelier scénarisation #1 », « Clinique légale »… */
  label: string;
  /** Sous-titre en italique dans le document, absent pour certains ateliers. */
  title?: string;
  /**
   * VOLUME 1 nomme le rôle (« Formatrice »), VOLUME 2 écrit « avec X ».
   * Absent = rendu « avec X ». Les deux absents = atelier sans intervenant cité.
   */
  facilitatorRole?: string;
  facilitators?: string;
  /** Sous-points du document (thématiques couvertes par l'atelier). */
  points?: readonly string[];
};

export type ProgrammeBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; lead?: string; items: readonly ProgrammeBullet[] }
  | { type: "note"; text: string }
  | {
      type: "criteria";
      tone: "eligible" | "ineligible";
      title: string;
      items: readonly string[];
    }
  /** Liste des pays NAWA : repliée par défaut, 25 entrées en petits caractères. */
  | { type: "countries"; label: string; items: readonly string[] }
  /* --- Blocs de bilan d'édition --- */
  | { type: "participants"; lead?: string; items: readonly EditionParticipant[] }
  | { type: "workshops"; lead?: string; items: readonly EditionWorkshop[] }
  /** Libellés courts en pastilles — partenaires en attendant les logos. */
  | { type: "tags"; lead?: string; items: readonly string[] }
  /** Lien externe, p. ex. la captation Vimeo d'une édition. */
  | { type: "link"; href: string; label: string }
  /** Générique : modération puis intervenant·e·s d'une conférence. */
  | { type: "people"; groups: readonly PersonGroup[] };

/** Un groupe nommé de personnes (« Modératrice », « Intervenants »…). */
export type PersonGroup = {
  label: string;
  people: readonly { name: string; role?: string }[];
};

export type ProgrammeSection = {
  /** Sert d'ancre et d'entrée dans le sommaire latéral. */
  id: string;
  heading: string;
  /** Libellé court pour le sommaire quand `heading` est trop long (titres de
   *  conférence). Par défaut, le sommaire reprend `heading`. */
  navLabel?: string;
  blocks: readonly ProgrammeBlock[];
};

export type ProgrammeEdition = {
  /** Segment d'URL sous /programmes/<programme>/. */
  slug: string;
  label: string;
  audience: string;
  status: "terminee" | "ouverte" | "a-venir";
  /** Telle que fournie par le client — le jour n'est pas encore arrêté. */
  deadline?: string;
  /** `null` tant que la page d'appel à candidatures n'existe pas. */
  applyHref?: string | null;
  /* --- Bilan publié après l'édition. Absent = pas encore de page détaillée. --- */
  director?: string;
  /** Captation de l'édition. Page Vimeo, pas une URL d'embed : on lie, on
   *  n'intègre pas (l'identifiant numérique du lecteur n'est pas fourni). */
  video?: string;
  /** Mêmes blocs que les programmes : `ProgrammeBody` les rend tels quels. */
  sections?: readonly ProgrammeSection[];
};

export type Programme = {
  slug: string;
  /** Nom court : tuiles, sommaire, titre de page. */
  name: string;
  /** Intitulé complet quand il diffère du nom court (cas des partenariats). */
  title?: string;
  kind: ProgrammeKind;
  accent: ProgrammeAccent;
  /** Reprise de la 1re phrase du programme, pas un résumé réécrit. */
  summary?: string;
  /** Bande d'annonce : MP4 dans /public/vids. Absente = emplacement réservé. */
  trailer?: string;
  sections?: readonly ProgrammeSection[];
  editions?: readonly ProgrammeEdition[];
};

/** Les 25 pays listés en note de bas de page par le client. */
const PAYS_NAWA = [
  "Afghanistan",
  "Algérie",
  "Arabie saoudite",
  "Bahrain",
  "Djibouti",
  "Égypte",
  "Émirats Arabes Unis",
  "Iran",
  "Iraq",
  "Jordanie",
  "Kuwait",
  "Liban",
  "Libye",
  "Maroc",
  "Mauritanie",
  "Oman",
  "Pakistan",
  "Palestine",
  "Qatar",
  "Somalie",
  "Soudan",
  "Syrie",
  "Tunisie",
  "Turquie",
  "Yemen",
] as const;

export const programmes: readonly Programme[] = [
  {
    slug: "volume",
    name: "VOLUME",
    kind: "programme",
    accent: "orange",
    summary:
      "VOLUME est un incubateur qui combine formation, mentorat et mise en réseau pour accompagner les cinéastes émergent·e·s dans le développement de leur projet documentaire.",
    sections: [
      {
        id: "a-propos",
        heading: "À propos du programme",
        blocks: [
          {
            type: "paragraph",
            text: "VOLUME est un incubateur qui combine formation, mentorat et mise en réseau pour accompagner les cinéastes émergent·e·s dans le développement de leur projet documentaire.",
          },
          {
            type: "paragraph",
            text: "La troisième édition (2025), axée sur le court et le moyen métrage documentaire, s’adresse aux cinéastes établi·es au Canada, ayant des racines en Afrique du Nord ou en Asie de l’Ouest, et pouvant participer aux ateliers en présentiel à Montréal (des arrangements ponctuels de déplacement peuvent être envisagés).",
          },
          {
            type: "list",
            lead: "Les participant·e·s prendront part à :",
            items: [
              {
                label: "Des ateliers en écriture documentaire",
                text: "alternant théorie et mise en pratique, pour structurer un récit, développer un point de vue d’auteur·rice et créer des personnages mémorables.",
              },
              {
                label: "Un mentorat personnalisé",
                text: "un accompagnement sur mesure par un·e mentor·e expérimenté·e, tout au long du processus d’écriture.",
              },
              {
                label: "Des ateliers en production",
                text: "comprendre les rouages du financement, explorer des études de cas en court et moyen métrage documentaire.",
              },
              {
                label: "Des ateliers en stratégie de diffusion",
                text: "préparer la distribution en festivals, auprès de diffuseurs et de distributeurs.",
              },
              {
                label: "Une préparation au pitch",
                text: "techniques, répétitions et présentations finales devant des professionnel·le·s de l’industrie.",
              },
            ],
          },
          {
            type: "note",
            text: "Tous les ateliers se déroulent en français.",
          },
          {
            type: "countries",
            label: "Liste des pays NAWA",
            items: PAYS_NAWA,
          },
        ],
      },
      {
        id: "pour-qui",
        heading: "Pour qui ?",
        blocks: [
          {
            type: "paragraph",
            text: "Le programme VOLUME s’adresse aux cinéastes émergent·e·s résidant au Canada, sans distinction de genre, et ayant des racines en Afrique du Nord ou en Asie de l’Ouest.",
          },
          {
            type: "criteria",
            tone: "eligible",
            title: "Admissible",
            items: [
              "Les cinéastes émergent·e·s avec un minimum d’expérience professionnelle.",
              "Celles et ceux qui n’ont pas encore intégré les circuits traditionnels de financement.",
              "Les néophytes porteurs·euses de projets documentaires prometteurs.",
            ],
          },
          {
            type: "criteria",
            tone: "ineligible",
            title: "Non admissible",
            items: [
              "Les cinéastes ayant déjà réalisé un long métrage ayant bénéficié d’un financement en production.",
            ],
          },
        ],
      },
      {
        id: "en-bref",
        heading: "En bref ça ressemble à quoi ?",
        blocks: [
          {
            type: "paragraph",
            text: "Tout au long du programme, vous apprendrez à structurer un récit documentaire, à intégrer archives et montage comme outils narratifs, et à affiner votre scénario avec l’appui d’un·e mentor·e expérimenté·e.",
          },
          {
            type: "list",
            lead: "Les ateliers couvriront :",
            items: [
              {
                label: "Écriture documentaire",
                text: "structure narrative, point de vue d’auteur·rice, personnages.",
              },
              {
                label: "Production",
                text: "financement, collaboration avec un·e producteur·rice, développement visuel.",
              },
              {
                label: "Diffusion",
                text: "stratégies de festivals, distribution et diffusion.",
              },
              {
                label: "Préparation au pitch",
                text: "techniques, répétitions et présentations finales.",
              },
            ],
          },
          {
            type: "list",
            lead: "En janvier 2026, vous repartirez avec :",
            items: [
              {
                text: "Une première version complète de votre scénario et de votre dossier de production.",
              },
              { text: "Un pitch présenté en public." },
              {
                text: "Des rencontres professionnelles avec des producteurs et productrices.",
              },
            ],
          },
        ],
      },
      {
        id: "conditions",
        heading: "Conditions générales d’admissibilité",
        blocks: [
          {
            type: "list",
            items: [
              {
                text: "Être un.e cinéaste émergent.e ou néophyte, résidant au Canada, originaire d’Afrique du Nord ou d’Asie de l’Ouest.",
              },
              { text: "Avoir un projet de court ou moyen métrage documentaire." },
              {
                text: "Être disponible pour la scénarisation de votre projet de septembre 2025 à janvier 2026 (temps partiel – horaire à définir entre les candidat.e.s et mentors, selon les disponibilités de chacun.e).",
              },
              {
                text: "Être disponible pour les ateliers de septembre 2025 à janvier 2026. Ces ateliers auront lieu majoritairement au cours des fins de semaine ou en fin de journée la semaine, avec périodes de relâche.",
              },
            ],
          },
        ],
      },
    ],
    editions: [
      {
        slug: "1",
        label: "VOLUME 1",
        audience:
          "Destinés aux femmes avec un projet de court-métrage de fiction ou série court.",
        status: "terminee",
        director: "Sarah El Attar",
        video: "https://vimeo.com/objectif9/nawal-volume1?fl=ls&fe=ec",
        sections: [
          {
            id: "presentation",
            heading: "À propos de cette édition",
            blocks: [
              {
                type: "paragraph",
                text: "Destinés aux femmes avec un projet de court-métrage de fiction ou série court, la première édition du programme VOLUME a allié formation, inclusion, professionnalisation et visibilité des femmes originaires d’Afrique du Nord et d’Asie de l’Ouest. Le programme prend la forme d’une série d’ateliers en scénarisation (théorie et mise en pratique), d’un accompagnement personnalisé par un mentor ainsi que d’ateliers en production (préparation au pitch, recherche et rédaction de demandes de financement) et en stratégie de distribution (festivals, distributeurs, télédiffuseurs). Le programme est ouvert aux projets de courts métrages et de séries de format court. Nous offrons des ateliers et un accompagnement à chaque étape d’écriture afin d’atteindre des objectifs définis et concrets à l’issue du programme.",
              },
              {
                type: "paragraph",
                text: "Le programme avait été imaginé et dirigé par Sarah El Attar.",
              },
              {
                type: "link",
                href: "https://vimeo.com/objectif9/nawal-volume1?fl=ls&fe=ec",
                label: "Voir la captation de l’édition sur Vimeo",
              },
            ],
          },
          {
            id: "participantes",
            heading: "Participantes",
            blocks: [
              {
                type: "participants",
                items: [
                  {
                    name: "Afaf El Haddioui",
                    project: "La Visite",
                    format: "Série courte",
                    genre: "Comédie",
                    mentorRole: "Mentore",
                    mentor: "Josiane Blanc",
                  },
                  {
                    name: "Dihya-Sarra Chertouk",
                    project: "LA BATMAN DE TANGER",
                    format: "Court-métrage",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Zoé Pelchat",
                  },
                  {
                    name: "Sara Nacer",
                    project: "KHLAT",
                    format: "Court-métrage",
                    genre: "Comédie",
                    mentorRole: "Mentore",
                    mentor: "Nicolas Krief",
                  },
                  {
                    name: "Katia Gaïd",
                    project: "Mani",
                    format: "Court-métrage",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentor",
                    mentor: "Aziz Zoromba",
                  },
                  {
                    name: "Sara Naïm",
                    project: "La Demeure",
                    format: "Court-métrage",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Miryam Charles",
                  },
                  {
                    name: "Sara Ben-Saud",
                    project: "Fabriqué",
                    format: "Série courte",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Erika Mathieu",
                  },
                  {
                    name: "Sonia Alimi",
                    project: "Entre deux",
                    format: "Court-métrage",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Florence Lafond",
                  },
                  {
                    name: "Aida Karkas",
                    project: "Karkas",
                    format: "Court-métrage",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Meryam Joobeur",
                  },
                  {
                    name: "Iman Sta-Ali",
                    project: "REVIVRE",
                    format: "Court-métrage",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Julie Hivon",
                  },
                  {
                    name: "Hanna Zeïda",
                    project: "C’EST LA HESS",
                    format: "Série courte",
                    genre: "Comédie",
                    mentorRole: "Mentore",
                    mentor: "Kadidja Haïdara",
                  },
                ],
              },
            ],
          },
          {
            id: "ateliers-scenarisation",
            heading: "Ateliers en scénarisation",
            blocks: [
              {
                type: "workshops",
                items: [
                  {
                    label: "Atelier scénarisation #1",
                    title:
                      "Les principes fondamentaux de la scénarisation et notions clés (Part I)",
                    facilitatorRole: "Formatrice",
                    facilitators: "Isabelle Raynauld",
                  },
                  {
                    label: "Atelier scénarisation #2",
                    title:
                      "Les principes fondamentaux de la scénarisation et notions clés (Part II)",
                    facilitatorRole: "Formatrice",
                    facilitators: "Isabelle Raynauld",
                  },
                  {
                    label: "Atelier scénarisation #3",
                    title: "La structure",
                    facilitatorRole: "Formatrice",
                    facilitators: "Kadidja Haïdara",
                  },
                  {
                    label: "Atelier scénarisation #4",
                    title: "Les personnages",
                    facilitatorRole: "Formateur",
                    facilitators: "Eduardo Morataya-Guevara",
                  },
                  {
                    label: "Atelier scénarisation #5",
                    title: "Les dialogues",
                    facilitatorRole: "Formatrice",
                    facilitators: "Kadidja Haïdara",
                  },
                  {
                    label: "Atelier scénarisation #6",
                    title:
                      "Les principes fondamentaux de la scénarisation et notions clés (Part III)",
                    facilitatorRole: "Formatrice",
                    facilitators: "Isabelle Raynauld",
                  },
                ],
              },
            ],
          },
          {
            id: "ateliers-production",
            heading: "Ateliers production, diffusion et financement",
            blocks: [
              {
                type: "workshops",
                items: [
                  {
                    label: "Atelier Production #1",
                    title: "Relation Auteur.e / Producteur.trice",
                    facilitatorRole: "Formateur",
                    facilitators: "Ziad Touma (Couzins Film)",
                  },
                  {
                    label: "Atelier Production #2",
                    title: "Étude de cas Série / Étude de cas Court-Métrage",
                    facilitatorRole: "Formateurs.trices",
                    facilitators:
                      "Eric Idriss Kanago (Yzanakio) / Daniela Mujica (Productions Ocho)",
                  },
                  {
                    label: "Atelier Distribution",
                    facilitatorRole: "Formatrices",
                    facilitators:
                      "Stephanie Demers et Léa-Marie Montreuil de l’équipe h264",
                  },
                  {
                    label: "Atelier Festival",
                    facilitatorRole: "Formateur",
                    facilitators: "Danny Lennon",
                  },
                  {
                    label: "Ateliers Financement",
                    title: "Fonds Indépendant de production",
                    facilitatorRole: "Formatrice",
                    facilitators: "Catherine Moreau",
                  },
                  {
                    label: "Ateliers Financement",
                    title: "Sodec",
                    facilitatorRole: "Formatrice",
                    facilitators: "Alix Wagner-Bernier",
                  },
                  {
                    label: "Ateliers Financement",
                    title: "Fonds Bell",
                    facilitatorRole: "Formateur",
                    facilitators: "Elie Michaud-Alexi",
                  },
                  {
                    label: "Atelier logiciels d’écriture scénaristique",
                    facilitatorRole: "Formateur",
                    facilitators: "Boris Rodriguez",
                  },
                  {
                    label: "Atelier juridique",
                    title:
                      "Introduction : contrats, droits d’auteur et bonnes pratiques",
                    facilitatorRole: "Formateur",
                    facilitators: "Remy Khouzam",
                  },
                  {
                    label: "Ateliers Pitch #1 et #2",
                    title: "Introduction et Pratique",
                    facilitatorRole: "Formatrice",
                    facilitators: "Véronique Marcotte",
                  },
                ],
              },
            ],
          },
          {
            id: "pitch-final",
            heading: "L’événement de pitch final",
            blocks: [
              {
                type: "paragraph",
                text: "Enfin, nous avons organisé l’événement de pitch final le vendredi 3 novembre en partenariat avec le festival CINEMANIA. L’événement a eu lieu à la cinémathèque québécoise, dans la salle Fernand Seguin, rassemblant une audience de 75 personnes.",
              },
              {
                type: "list",
                lead: "L’événement était scindé en deux parties :",
                items: [
                  {
                    label: "Première partie",
                    text: "présentations des pitchs et lecture publique des extraits de scénario.",
                  },
                  { label: "Deuxième partie", text: "activité de maillage." },
                ],
              },
              {
                type: "list",
                lead: "Les producteurs et productrices présents aux rencontres one-on-one :",
                items: [
                  { label: "Nathalie Michaux", text: "Film extérieur jour" },
                  { label: "Christine Tannous", text: "Couzin films" },
                  { label: "Amélie Tremblay", text: "Nemesis films" },
                  { label: "Bahija Essoussi", text: "Objectif 9" },
                  { label: "Nitsé Mathelier", text: "Yzanakio" },
                  { label: "Paola Arriagada-Nunez", text: "Pimiento Média" },
                  { label: "Marwa Laquerre", text: "Sphere Media" },
                  { label: "Kimberley Ann Surin", text: "Afro Dynamic Films" },
                  { label: "Yannick Létourneau", text: "Peripheria" },
                  {
                    label: "Andrés Molina et Charbel El Melhem",
                    text: "Mixfilm",
                  },
                ],
              },
            ],
          },
          {
            id: "partenaires",
            heading: "Partenaires",
            blocks: [
              {
                /* Le document client dit « LOGO des partenaires » : en attendant
                   les fichiers, les noms sont rendus en pastilles. */
                type: "tags",
                lead: "Partenaires financiers",
                items: [
                  "FMC",
                  "Inspirit Foundation",
                  "Fond Bell",
                  "FIP",
                  "Conseil des arts de Montréal",
                  "Patrimoine Canada",
                ],
              },
              {
                type: "tags",
                lead: "Partenaires de l’édition",
                items: [
                  "Cinemania",
                  "Agence On Est Là",
                  "UPPCQ",
                  "Centre Culturel Marocain",
                  "Académie du Cinéma et de la Télévision",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "2",
        label: "VOLUME 2",
        audience:
          "Destinés aux femmes et aux hommes avec un projet de court-métrage de fiction ou série court.",
        status: "terminee",
        director: "Sarah El Attar",
        video: "https://vimeo.com/objectif9/nawal-volume2?fl=ls&fe=ec",
        sections: [
          {
            id: "presentation",
            heading: "À propos de cette édition",
            blocks: [
              {
                type: "paragraph",
                text: "La deuxième édition du programme VOLUME était destinés tant aux femmes qu’aux hommes, avec à nouveau des projets de fictions court-métrages ou séries courtes.",
              },
              {
                type: "link",
                href: "https://vimeo.com/objectif9/nawal-volume2?fl=ls&fe=ec",
                label: "Voir la captation de l’édition sur Vimeo",
              },
            ],
          },
          {
            id: "projets",
            heading: "Projets participants",
            blocks: [
              {
                type: "participants",
                items: [
                  {
                    name: "Rachid Allaoua",
                    project: "El Meknine Ezzine",
                    format: "Court-métrage",
                    duration: "20 minutes",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Edith Kabuya",
                  },
                  {
                    name: "Robine Nachar",
                    project: "Sous la chaleur de Beyrouth",
                    format: "Court-métrage",
                    duration: "20 minutes",
                    genre: "Drame social / Drame néoréaliste",
                    mentorRole: "Mentor",
                    mentor: "Eduardo Morataya-Guevara",
                  },
                  {
                    name: "Riad Hamidi",
                    project: "A song for tomorrow",
                    format: "Court-métrage",
                    duration: "15-20 minutes",
                    genre: "Sci-fi drama",
                    mentorRole: "Mentor",
                    mentor: "Josiane Blanc",
                  },
                  {
                    name: "Zainab Rabbaa",
                    project: "Malak",
                    format: "Court-métrage",
                    duration: "15 minutes (inclus de l’animation 2D)",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Miryam Charles",
                  },
                  {
                    name: "Ismael Mossadeq",
                    project: "Gomme",
                    format: "Série courte",
                    duration: "8 x 5 minutes",
                    genre: "Animation",
                    mentorRole: "Mentore",
                    mentor: "Marya Zarif",
                  },
                  {
                    name: "Rania Lardjane",
                    project: "Ma très chère Houriya",
                    format: "Court-métrage",
                    duration: "20 minutes",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Meryam Joobeur",
                  },
                  {
                    name: "Salim Tsouli",
                    project: "L’examen",
                    format: "Court-métrage",
                    duration: "8 minutes",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Halima Ouardiri",
                  },
                  {
                    name: "Ahlam Gholami et Stella Lemaine",
                    project: "Les temps sont durs",
                    format: "Série courte",
                    duration: "8 x 15 minutes",
                    genre: "Comédie",
                    mentorRole: "Mentore",
                    mentor: "Kadidja Haidara",
                  },
                  {
                    name: "Haïtam Alam",
                    project: "Comment braquer un rappeur sans se fatiguer ?",
                    format: "Court-métrage",
                    duration: "15 minutes",
                    genre: "Drame",
                    mentorRole: "Mentore",
                    mentor: "Mathieu Roy",
                  },
                  {
                    name: "Azza Baaziz",
                    project: "Salope",
                    format: "Court-métrage",
                    duration: "12 minutes",
                    genre: "Drame social",
                    mentorRole: "Mentore",
                    mentor: "Alliah Fafin",
                  },
                  {
                    name: "Tina Maalaoui",
                    project: "Les retrouvailles",
                    format: "Série courte",
                    duration: "6 à 8 épisodes x 8-12 minutes",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Erika Mathieu",
                  },
                  {
                    name: "Hicham Elajl",
                    project: "Alqarine",
                    format: "Court-métrage",
                    duration: "15 minutes",
                    genre: "Thriller psychologique d’horreur",
                    mentorRole: "Mentore",
                    mentor: "Kays Mejri",
                  },
                  {
                    name: "Sharbel Showairy",
                    project: "L’audition",
                    format: "Court-métrage",
                    duration: "15 minutes",
                    genre: "Satire absurde / Surréalisme arabe",
                    mentorRole: "Mentore",
                    mentor: "Nicolas Krief",
                  },
                  {
                    name: "Sulav Haji",
                    project: "Bonne fille",
                    format: "Court-métrage",
                    duration: "15 minutes",
                    genre: "Body horror, suspense psychologique",
                    mentorRole: "Mentore",
                    mentor: "Florence Lafond",
                  },
                  {
                    name: "Adel Rouine",
                    project: "Dans la nuit",
                    format: "Court-métrage",
                    duration: "10 minutes",
                    genre: "Comédie dramatique",
                    mentorRole: "Mentore",
                    mentor: "Zoé Pelchat",
                  },
                ],
              },
            ],
          },
          {
            id: "ateliers-scenarisation",
            heading: "Ateliers en scénarisation",
            blocks: [
              {
                type: "workshops",
                lead: "Les ateliers de scénarisation ont abordé les thématiques suivantes :",
                items: [
                  {
                    label: "Les concepts clés, partie I et II",
                    facilitators: "Isabelle Raynauld",
                    points: [
                      "Introduction aux concepts fondamentaux.",
                      "Approfondissement et applications pratiques.",
                    ],
                  },
                  {
                    label: "La structure narrative, partie I et II",
                    facilitators: "Isabelle Raynauld",
                    points: [
                      "Construction des arcs narratifs.",
                      "Progression dramatique.",
                    ],
                  },
                  {
                    label: "Les personnages et les dialogues",
                    facilitators: "Eduardo Morataya-Guevara",
                    points: [
                      "Développement des personnages.",
                      "Écriture de dialogues percutants.",
                    ],
                  },
                  {
                    label: "Séance finale (9h30 à 12h30)",
                    facilitators: "Isabelle Raynauld",
                    points: [
                      "Synthèse des notions abordées et conseils pour une application pratique.",
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "production-financement",
            heading: "Production et financement",
            blocks: [
              {
                type: "paragraph",
                text: "En production et financement, les participant·e·s ont exploré des outils essentiels pour structurer et financer leurs projets.",
              },
              {
                type: "workshops",
                lead: "Parmi les thématiques abordées :",
                items: [
                  {
                    label: "Financement",
                    title: "Le Fonds indépendant de production",
                  },
                  { label: "Financement", title: "Le Fonds Bell" },
                  {
                    label: "Production",
                    title: "La relation producteur / auteur",
                    facilitators: "Maria Gracia Turgeon (Midi La Nuit)",
                  },
                  {
                    label: "Production",
                    title:
                      "Deux études de cas sur les séries courtes et les courts-métrages",
                    facilitators:
                      "Marie Ka et Mylène Augustin (Inaru Films)",
                  },
                  {
                    label:
                      "Cartographie des financements internationaux pour la diaspora NAWA",
                    facilitators: "Myriam Arab",
                  },
                  { label: "Financement", title: "La SODEC" },
                ],
              },
            ],
          },
          {
            id: "pitch-juridique-diffusion",
            heading: "Pitch, juridique et diffusion",
            blocks: [
              {
                type: "workshops",
                lead: "Les participant·e·s ont également suivi une série d’ateliers axés sur le pitching, les enjeux juridiques, ainsi que la distribution et les stratégies festival :",
                items: [
                  {
                    label: "L’art du pitch aux télédiffuseurs",
                    facilitators: "Nathalie D’Souza (TV5 Unis)",
                  },
                  {
                    label: "Clinique légale",
                    facilitators: "Rémy Khouzam (Lussier & Khouzam)",
                  },
                  {
                    label: "Formation au pitch vidéo",
                    facilitators: "Licia Eminenti",
                  },
                  {
                    label: "Atelier collectif et sessions individuelles",
                    title:
                      "feedback personnalisé pendant le mois de septembre",
                  },
                  { label: "Stratégie festival", facilitators: "Danny Lennon" },
                  {
                    label: "Stratégie distribution",
                    facilitators: "Travelling",
                  },
                  {
                    label: "Préparation au pitch one-on-one",
                    facilitators: "Giulia Frati",
                  },
                ],
              },
            ],
          },
          {
            id: "pitch-final",
            heading: "L’événement de pitch final",
            blocks: [
              {
                type: "paragraph",
                text: "L’événement final s’est tenu le vendredi 8 novembre, en partenariat avec le festival CINEMANIA, à la Cinémathèque québécoise, et s’est articulé en deux temps forts :",
              },
              {
                type: "list",
                items: [
                  {
                    text: "Une première partie consacrée aux présentations des pitchs vidéo publics, animé par l’humoriste Oussama Farès, où les producteur·rice·s et autres professionnel·le·s de l’industrie ont pu découvrir l’ensemble des projets. Avec un public de 85 personnes, l’événement a affiché complet plus d’une semaine avant la date.",
                  },
                  {
                    text: "Une seconde partie dédiée à une activité de maillage professionnel, organisée sous forme de speed-dating.",
                  },
                ],
              },
              {
                type: "paragraph",
                text: "Dans le cadre de cette activité de maillage, les producteur·rice·s ont reçu, en amont, un catalogue des projets, comprenant les profils des scénaristes et les synopsis de leurs courts-métrages ou séries courtes. Chaque rencontre, d’une durée de 10 à 15 minutes, a permis aux participant·e·s de présenter leur projet aux producteur·rice·s.",
              },
              {
                /* Le document ne nomme que les maisons, pas les personnes —
                   d'où des pastilles plutôt que la liste nom / société de V1. */
                type: "tags",
                lead: "Les producteur·rice·s présents aux rencontres one-on-one :",
                items: [
                  "Extérieur Jour",
                  "Couzin Films",
                  "Yzanakio",
                  "Productions Ocho",
                  "Objectif 9",
                  "Chapitre2production",
                  "Pimiento",
                  "Les Studios de la Marque Rouge",
                  "Mix Films",
                  "Couronne nord",
                ],
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
                  "SODEC",
                  "Telefilm Canada",
                  "Conseil des arts de Montréal",
                  "FIP",
                  "Fond Bell",
                  "Inspirit Foundation",
                  "Patrimoine Canada",
                  "Cinemania",
                  "Centre Culturel Marocain",
                ],
              },
            ],
          },
        ],
      },
      {
        slug: "3",
        label: "VOLUME 3 – DOC",
        audience:
          "Destinés aux femmes et aux hommes avec un projet de documentaire.",
        status: "terminee",
        /* Le document ne nomme pas de direction de programme pour cette
           édition, contrairement à VOLUME 1 et 2. */
        video: "https://vimeo.com/1170174766/4f0cdd549d?fl=ls&fe=ec",
        sections: [
          {
            id: "presentation",
            heading: "À propos de cette édition",
            blocks: [
              {
                type: "paragraph",
                text: "La troisième édition du programme de mentorat en scénarisation VOLUME s’est déroulée avec succès. Cinq cinéastes émergentes ont ainsi pu bénéficier d’un accompagnement personnalisé, développer leurs projets grâce au mentorat, aux formations reçues et aux conseils prodigués tout au long de leur parcours.",
              },
              {
                type: "link",
                href: "https://vimeo.com/1170174766/4f0cdd549d?fl=ls&fe=ec",
                label: "Voir la captation de l’édition sur Vimeo",
              },
            ],
          },
          {
            id: "participantes",
            heading: "Participantes",
            blocks: [
              {
                /* Le document liste les projets et le jumelage séparément.
                   Même information, réunie ici sur une carte par cinéaste —
                   « X avec Y » se lit : X mentor·e de Y. */
                type: "participants",
                items: [
                  {
                    name: "Baharan Baniahmadi",
                    project: "Les prisonniers",
                    mentorRole: "Mentor·e",
                    mentor: "Ana Alice de Morais",
                  },
                  {
                    name: "Chaymaa Faour",
                    project: "L’oiseau migrateur",
                    mentorRole: "Mentor·e",
                    mentor: "Eli Jean Tahchi",
                  },
                  {
                    name: "Malika Rafa",
                    project: "Vue d’Algérie",
                    mentorRole: "Mentor·e",
                    mentor: "Yves Bisaillon",
                  },
                  {
                    name: "Razan Elkhatib",
                    project: "From Saddam to Samon",
                    mentorRole: "Mentor·e",
                    mentor: "Mathieu Roy",
                  },
                  {
                    name: "Rym Bellouti",
                    project: "Nawel",
                    mentorRole: "Mentor·e",
                    mentor: "Carol Nguyen",
                  },
                ],
              },
            ],
          },
          {
            id: "pitch-final",
            heading: "L’événement de pitch final",
            blocks: [
              {
                type: "paragraph",
                text: "Nous avons présenté un événement de pitch public dans le cadre du Forum RIDM.",
              },
              {
                type: "list",
                lead: "Au programme :",
                items: [
                  {
                    text: "La présentation des projets des cinq cinéastes, qui ont pitché leurs projets documentaires devant des professionnel·le·s de l’industrie.",
                  },
                  {
                    text: "Une séance de réseautage permettant des échanges entre les talents et les acteur·trice·s de l’industrie.",
                  },
                  {
                    text: "Des rencontres individuelles (maillages) organisées avec des producteur·trice·s.",
                  },
                ],
              },
              {
                type: "note",
                text: "L’événement a été animé par l’humoriste Hassan Mahbouba, alias Mackbouba.",
              },
              {
                type: "list",
                lead: "Les producteurs et productrices qui ont participé au maillage :",
                items: [
                  { label: "Andres Molina", text: "Mix Film" },
                  {
                    label: "Béatrice Moukhaiber",
                    text: "Béa M. Productions inc.",
                  },
                  { label: "Daniel Mujica", text: "Productions Ocho" },
                  { label: "Hind Benchekroun", text: "Les films de la tortue" },
                  { label: "Koussay Hamzeh", text: "Presse à Scotch inc." },
                  { label: "Mylène Augustin", text: "Inaru Films" },
                  { label: "Daniela Mujica", text: "Productions Ocho" },
                ],
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
      {
        slug: "4",
        label: "VOLUME 4",
        audience:
          "Destinés à tout type de projet (courts et longs métrages, fiction, documentaire, animation, série web).",
        status: "a-venir",
        /* Le document client indique « ?? Août 2026 » : le jour reste à confirmer. */
        deadline: "Août 2026 (date à confirmer)",
        /* La page d'appel à candidatures VOLUME 4 n'existe pas encore. */
        applyHref: null,
      },
    ],
  },
  {
    slug: "ficam",
    name: "FICAM",
    title: "Partenariat avec la résidence d’écriture de la FICAM",
    kind: "partenariat",
    accent: "pink",
  },
  {
    slug: "amanar",
    name: "AMANAR",
    title:
      "Partenariat avec le Marrakech Short Film Festival et le programme Amanar",
    kind: "partenariat",
    accent: "yellow",
  },
  {
    slug: "cinephilia",
    name: "CINÉPHILIA",
    kind: "programme",
    accent: "lilac",
  },
  {
    slug: "the-story-lab",
    name: "THE STORY LAB",
    kind: "programme",
    accent: "orange",
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((programme) => programme.slug === slug);
}

export function programmesByKind(kind: ProgrammeKind): readonly Programme[] {
  return programmes.filter((programme) => programme.kind === kind);
}

export function getEdition(
  programmeSlug: string,
  editionSlug: string,
): { programme: Programme; edition: ProgrammeEdition } | undefined {
  const programme = getProgramme(programmeSlug);
  const edition = programme?.editions?.find((e) => e.slug === editionSlug);
  return programme && edition ? { programme, edition } : undefined;
}

/** Une édition n'a sa propre page que si son bilan est rédigé. */
export function hasEditionPage(edition: ProgrammeEdition): boolean {
  return Boolean(edition.sections?.length);
}

/** Classes Tailwind statiques : le scanner ne lit pas les noms composés. */
export const accentClasses: Record<
  ProgrammeAccent,
  { text: string; border: string; borderTop: string; borderLeft: string; bg: string }
> = {
  orange: {
    text: "text-brand-orange",
    border: "border-brand-orange",
    borderTop: "border-t-brand-orange",
    borderLeft: "border-l-brand-orange",
    bg: "bg-brand-orange",
  },
  lilac: {
    text: "text-brand-lilac",
    border: "border-brand-lilac",
    borderTop: "border-t-brand-lilac",
    borderLeft: "border-l-brand-lilac",
    bg: "bg-brand-lilac",
  },
  yellow: {
    text: "text-brand-yellow",
    border: "border-brand-yellow",
    borderTop: "border-t-brand-yellow",
    borderLeft: "border-l-brand-yellow",
    bg: "bg-brand-yellow",
  },
  pink: {
    text: "text-brand-pink",
    border: "border-brand-pink",
    borderTop: "border-t-brand-pink",
    borderLeft: "border-l-brand-pink",
    bg: "bg-brand-pink",
  },
};

export const editionStatusLabel: Record<ProgrammeEdition["status"], string> = {
  terminee: "Édition passée",
  ouverte: "Candidatures ouvertes",
  "a-venir": "Prochaine édition",
};
