/**
 * Contenu de la page « Devenir membre ».
 *
 * Texte client repris mot pour mot, à deux aménagements de mise en page près,
 * signalés sur place :
 *  · la liste des 25 pays NAWA, répétée à l'identique dans deux catégories,
 *    est sortie des puces et affichée une seule fois sous les cartes ;
 *  · « Chef.fe maquilleur.e[u](http://maquilleur.se/)se » — reste d'un lien
 *    cassé dans le document — est rétabli en « Chef.fe maquilleur.euse ».
 */

export type MembershipTier = {
  id: string;
  name: string;
  /** Phrase d'introduction du document, quand elle existe. */
  lead?: string;
  criteria: readonly string[];
  /** Modalités d'admission et droits, après les critères. */
  note?: string;
  /**
   * Résumé du droit de vote pour le pied de carte. Absent pour les membres
   * émergents : le document ne le précise pas, on ne le devine pas.
   */
  voting?: string;
  accent: "orange" | "lilac" | "pink";
};

/**
 * Les 25 pays NAWA, dans l'orthographe du document « Devenir membre ».
 *
 * NB : `content/programmes.ts` porte la même liste avec d'autres graphies
 * (Bahrain / Bahreïn, Kuwait / Koweït, Yemen / Yémen). À unifier côté client.
 */
export const PAYS_NAWA = [
  "Afghanistan",
  "Algérie",
  "Arabie saoudite",
  "Bahreïn",
  "Djibouti",
  "Égypte",
  "Émirats arabes unis",
  "Iran",
  "Iraq",
  "Jordanie",
  "Koweït",
  "Liban",
  "Libye",
  "Maroc",
  "Mauritanie",
  "Oman",
  "Palestine",
  "Pakistan",
  "Qatar",
  "Somalie",
  "Soudan",
  "Syrie",
  "Tunisie",
  "Turquie",
  "Yémen",
] as const;

export const membershipTiers: readonly MembershipTier[] = [
  {
    id: "cineastes",
    name: "Membres cinéastes",
    lead: "Sont éligibles comme membres cinéastes les personnes physiques qui :",
    criteria: [
      "Résident au Canada.",
      "Sont originaires d’Afrique du Nord ou d’Asie de l’Ouest (NAWA).",
      "Ont déjà été crédité·es pour un poste clé sur une œuvre audiovisuelle qui a eu un parcours professionnel reconnu : scénariste, réalisateur·trice, producteur·trice, directeur·trice photo, directeur·trice artistique, monteur·teuse, compositeur·trice de musique, créateur·trice des costumes, chef·fe maquilleur·euse, chef·fe coiffeur·euse, directeur·trice de production, acteur·trice. D’autres postes peuvent être acceptés selon l’approbation de l’association.",
      "Adhèrent aux valeurs et à la mission de N.A.W.A.L. telles qu’énoncées dans les présents règlements.",
    ],
    note: "Les membres cinéastes sont admis sur présentation d’une demande approuvée par le conseil d’administration. Ils ont droit de vote à l’assemblée générale et peuvent participer aux programmes de l’organisme.",
    voting: "Droit de vote à l’assemblée générale",
    accent: "orange",
  },
  {
    id: "emergents",
    name: "Membres émergents",
    criteria: [
      "Résident au Canada.",
      "Sont originaires d’Afrique du Nord ou d’Asie de l’Ouest (NAWA).",
      "Œuvrent ou souhaitent œuvrer dans le domaine de l’audiovisuel mais n’ont pas encore acquis les crédits nécessaires pour être un membre régulier.",
    ],
    accent: "lilac",
  },
  {
    id: "associes",
    name: "Membres associés",
    lead: "Sont éligibles comme membres associés les personnes physiques ou morales qui :",
    criteria: [
      "Soutiennent activement la mission de N.A.W.A.L. sans nécessairement appartenir aux communautés NAWA.",
      "Peuvent inclure des allié·es de l’industrie, des partenaires institutionnels, des organisations, des entreprises, des chercheur·euses, des éducateur·rices ou toute autre partie prenante engagée dans la diversité et l’inclusion dans l’industrie audiovisuelle.",
    ],
    note: "Les membres associés ont un rôle consultatif. Ils n’ont pas de droit de vote à l’assemblée générale sauf disposition contraire adoptée par résolution du conseil d’administration.",
    voting: "Rôle consultatif, sans droit de vote",
    accent: "pink",
  },
];

export const membershipBenefitsLead =
  "Les membres de l’Association N.A.W.A.L. profitent de nombreux avantages :";

export const membershipBenefits = [
  {
    title: "La représentation",
    text: "Être représenté par une association nationale qui regroupe les travailleurs de l’audiovisuel provenant originairement de la région NAWA auprès des instances gouvernementales, des diffuseurs et au sein de l’industrie de la télévision, du film et du multimédia.",
  },
  {
    title: "Les partenariats",
    text: "Avoir accès à un réseau de partenaires vous permettant de développer de nouvelles collaborations avec les divers secteurs de l’industrie de l’audiovisuel.",
  },
  {
    title: "Le réseautage",
    text: "Profiter des occasions de réseautage afin de renforcer vos liens avec vos pairs mais également les distributeurs et les diffuseurs, dans l’optique de créer de futurs partenariats d’affaires.",
  },
  {
    title: "La formation",
    text: "Avoir accès à des formations, du mentorat et du développement professionnel.",
  },
] as const;
