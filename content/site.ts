export const site = {
  name: "N.A.W.A.L.",
  shortName: "N.A.W.A.L.",
  tagline:
    "Laboratoire de soutien pour les artisans des écrans originaires d'Afrique du Nord et d'Asie de l'Ouest",
  mission: {
    lead: "Laboratoire de soutien pour les artisans des écrans originaires d'Afrique du Nord et d'Asie de l'Ouest",
    paragraphs: [
      "N.A.W.A.L. est un organisme canadien destiné à toutes les parties prenantes des industries du cinéma, de la télévision et des médias numériques interactifs, originaires d’Afrique du Nord et de l’Asie de l’Ouest, ou qui touchent à ces régions, d’une manière ou d’une autre, pour les aider à créer du contenu authentique et se tailler une place de choix dans l’industrie, avec assurance et compétence.",
    ],
  },
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
      "Avec un nom comme NAWAL, nous sommes plus inclusifs — et comme on le sait, les mots valent leur pesant d’or.",
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
    headline:
      "Laboratoire de soutien pour les artisans des écrans originaires d'Afrique du Nord et d'Asie de l'Ouest",
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
    href: "#programmes",
  },
} as const;
