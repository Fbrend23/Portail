export default {
  meta: {
    title: "Brendan Fleurdelys | Informaticien CFC, développement d'applications",
    description:
      "Brendan Fleurdelys, informaticien CFC en développement d'applications et photographe animalier amateur : retrouvez tous ses projets, de Prodysos à La Matinale de Séoul.",
    ogTitle: "Brendan Fleurdelys | Informaticien CFC, développement d'applications",
    ogDescription:
      'Tous mes projets et applications, et ma photographie animalière, réunis au même endroit.',
    ogImage: '/og-image.jpg',
    ogImageAlt: "Brendan Fleurdelys, informaticien CFC en développement d'applications",
    ogLocale: 'fr_CH',
    jobTitle: "Informaticien CFC en développement d'applications",
    credentials: {
      it: "Informaticien CFC, orientation développement d'applications",
      polymechanic: 'Polymécanicien CFC',
      category: 'Certificat fédéral de capacité (CFC)'
    },
    knowsAbout: ["Développement d'applications", 'Développement web', 'CMS headless', 'Photographie animalière']
  },
  langSwitch: {
    label: 'Langue du site'
  },
  intro: {
    loading: 'Initialisation'
  },
  header: {
    phrases: [
      "Informaticien CFC en développement d'applications",
      'Développeur web',
      'Photographe animalier amateur',
      'Actuellement en stage à Séoul',
      'Français · English · 한국어 en cours'
    ],
    subtitle: 'Retrouvez ici tous mes projets',
    scrollDown: 'Découvrir mon parcours'
  },
  journey: {
    title: 'Parcours',
    intro: 'De l’atelier au code : une reconversion par passion.',
    items: [
      {
        date: '2015',
        title: 'CFC de polymécanicien',
        text: 'Usinage de pièces de précision. J’en ai gardé le goût du travail minutieux.',
        status: 'past'
      },
      {
        date: '2024',
        title: 'Reconversion à l’ETML',
        text: 'Formation accélérée (FPA) de deux ans pour devenir informaticien.',
        place: 'Lausanne',
        status: 'past'
      },
      {
        date: '2026',
        title: 'TPI pour le Paléo Festival',
        text: 'Modules de statistiques et de recherche de conducteurs et de courses pour Runeado, l’application qui gère le transport des artistes et du staff.',
        status: 'past'
      },
      {
        date: '2026',
        title: 'CFC d’informaticien, développement d’applications',
        text: 'Diplômé de l’ETML.',
        place: 'Lausanne',
        status: 'past'
      },
      {
        date: 'Août 2026 – février 2027',
        title: 'Stage dans un cabinet d’avocats',
        text: 'Équipe média : refontes des sites web et outils internes pour faciliter le travail des avocats.',
        place: 'Séoul',
        status: 'current'
      },
      {
        date: 'Dès mars 2027',
        title: 'Et ensuite ?',
        text: 'À la recherche d’un poste de développeur, en Suisse ou en Corée.',
        status: 'future'
      }
    ],
    current: 'En cours'
  },
  marquee: {
    label: 'Technologies utilisées'
  },
  backToTop: 'Revenir en haut',
  social: {
    open: 'Ouvrir les réseaux sociaux',
    close: 'Fermer les réseaux sociaux'
  },
  card: {
    techs: 'Technologies',
    paused: 'En pause',
    comingBack: 'BIENTÔT DE RETOUR'
  },
  projects: {
    's-photo': {
      title: 'Photographie animalière',
      description: 'Mon portfolio de photographie animalière',
      btnText: 'EXPLORER →'
    },
    's-prodysos': {
      title: 'Prodysos',
      description: 'Gestion de production, réalisée pour une troupe de théâtre',
      btnText: 'GÉRER →'
    },
    's-horaire': {
      title: 'Vivement la fin',
      description: 'Suivre son horaire en direct avec un clicker pour passer le temps',
      btnText: 'SUIVRE →'
    },
    's-fieu': {
      title: 'Maisallezfieu',
      description: 'Site d’une pièce de théâtre, réalisé pour une troupe',
      btnText: 'DÉCOUVRIR →'
    },
    's-travel': {
      title: 'TravelDB',
      description: 'Suivre ses pays visités avec carte interactive',
      btnText: 'VOYAGER →'
    },
    's-wiki': {
      title: 'Wiki ETML',
      description: 'Mes fiches de révisions avec audio',
      btnText: 'RÉVISER →'
    },
    's-tanuki': {
      title: 'TanukiCode',
      description: "Apprendre le japonais en s'amusant",
      btnText: 'APPRENDRE →'
    },
    's-lunchpicker': {
      title: 'LunchPicker',
      description: 'Choisir un restaurant à plusieurs en Corée, en quelques swipes',
      btnText: 'CHOISIR →'
    },
    's-matinale': {
      title: 'La Matinale de Séoul',
      description: 'Résumé d’actualité automatisé par IA',
      btnText: 'LIRE →'
    }
  },
  footer: {
    contact: 'Me contacter'
  },
  echo: {
    greeting: 'Bienvenue !',
    open: 'Ouvrir l’assistant',
    close: 'Fermer l’assistant',
    avatarAlt: 'Assistant IA',
    contactLink: 'Aller vers la page de contact →',
    faq: {
      start: {
        text: "Bonjour ! Je suis Echo, l'assistant virtuel de Brendan. Comment puis-je vous aider ?",
        options: [
          { label: 'Qui est Brendan ?', next: 'who' },
          { label: 'Compétences', next: 'skills' },
          { label: 'Disponibilité', next: 'availability' },
          { label: 'Ses projets', next: 'projects' },
          { label: 'Le contacter', next: 'contact' }
        ]
      },
      who: {
        text: 'Brendan est informaticien CFC en développement d’applications, diplômé de l’ETML en 2026. C’est une reconversion par passion : polymécanicien CFC depuis 2015, il a suivi une formation accélérée (FPA) de deux ans pour passer de l’atelier au code.',
        options: [
          { label: 'Son travail de diplôme', next: 'tpi' },
          { label: 'Ses langues', next: 'languages' },
          { label: 'Ses compétences', next: 'skills' },
          { label: 'Retour au début', next: 'start' }
        ]
      },
      tpi: {
        text: 'Pour son TPI, Brendan a développé des modules de statistiques et de recherche de conducteurs et de courses pour Runeado, l’application qui gère le transport des artistes et du staff du Paléo Festival.',
        options: [
          { label: 'Ses compétences', next: 'skills' },
          { label: 'Voir ses projets', next: 'projects' },
          { label: 'Retour au début', next: 'start' }
        ]
      },
      languages: {
        text: 'Le français et l’anglais sont ses deux langues maternelles, et il apprend le coréen.',
        options: [
          { label: 'Est-il disponible ?', next: 'availability' },
          { label: 'Retour au début', next: 'start' }
        ]
      },
      skills: {
        text: 'Brendan travaille en ce moment surtout avec Astro et des CMS headless : son portfolio photo tourne sur Astro avec Directus, qu’il héberge lui-même. Il développe aussi avec Vue 3, Supabase et AdonisJS, comme Prodysos, une PWA en Vue et Supabase.',
        options: [
          { label: 'Est-il disponible ?', next: 'availability' },
          { label: 'Voir ses projets', next: 'projects' },
          { label: 'Retour', next: 'start' }
        ]
      },
      availability: {
        text: 'D’août 2026 à février 2027, Brendan est en stage à Séoul dans l’équipe média d’un cabinet d’avocats, où il participe aux refontes des sites web et à des outils internes pour faciliter le travail des avocats. Après son stage, il cherche un poste et est ouvert à travailler en Corée.',
        options: [
          { label: 'Le contacter', next: 'contact' },
          { label: 'Fun fact', next: 'funfact' },
          { label: 'Retour', next: 'start' }
        ]
      },
      projects: {
        text: 'Ses deux projets préférés : son portfolio de photographie animalière (Astro et Directus) et Prodysos, une application de gestion de production réalisée pour une troupe de théâtre. Vous trouverez tous ses projets sur les cartes en arrière-plan !',
        options: [
          { label: 'Ses compétences', next: 'skills' },
          { label: 'Le contacter', next: 'contact' }
        ]
      },
      contact: {
        text: 'Vous souhaitez lui envoyer un message ? Vous pouvez utiliser le formulaire de contact officiel.',
        options: [{ label: 'Retour au début', next: 'start' }],
        isContact: true
      }
    },
    facts: [
      'Fun fact : Brendan adore transformer des idées simples en projets interactifs, parfois juste « pour voir jusqu’où ça peut aller »',
      'Fun fact : Brendan pratique la photographie, en particulier la photographie animalière, ce qui lui a appris la patience, l’observation et l’attention aux détails.',
      'Fun fact : avant le code, Brendan usinait des pièces de précision comme polymécanicien. Il a gardé le goût du travail précis.',
      'Fun fact : Brendan apprend le coréen, pratique quand on fait un stage à Séoul !'
    ],
    factOptions: [
      { label: 'Voir ses projets', next: 'projects' },
      { label: 'Autre fun fact ?', next: 'funfact' },
      { label: 'Retour au début', next: 'start' }
    ]
  }
}
