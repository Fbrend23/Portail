export default {
  meta: {
    title: 'Brendan Fleurdelys | Application Developer, Swiss Federal VET Diploma',
    description:
      'Brendan Fleurdelys, Swiss-certified application developer and amateur wildlife photographer: explore all his projects, from Prodysos to La Matinale de Séoul.',
    ogTitle: 'Brendan Fleurdelys | Application Developer',
    ogDescription: 'All my projects and applications, and my wildlife photography, in one place.',
    ogImage: '/og-image-en.jpg',
    ogImageAlt: 'Brendan Fleurdelys, Swiss-certified application developer',
    ogLocale: 'en_US',
    jobTitle: 'Application Developer (ICT Specialist, Swiss Federal VET Diploma)',
    credentials: {
      it: 'ICT Specialist, Application Development (Swiss Federal VET Diploma)',
      polymechanic: 'Polymechanic (Swiss Federal VET Diploma)',
      category: 'Swiss Federal Vocational Education and Training Diploma (CFC)'
    },
    knowsAbout: ['Application development', 'Web development', 'Headless CMS', 'Wildlife photography']
  },
  langSwitch: {
    label: 'Site language'
  },
  intro: {
    loading: 'Initializing'
  },
  header: {
    phrases: [
      'Application developer, Swiss Federal VET Diploma',
      'Web developer',
      'Amateur wildlife photographer',
      'Currently interning in Seoul',
      'Français · English · learning 한국어'
    ],
    subtitle: 'All my projects, in one place',
    scrollDown: 'Discover my journey'
  },
  journey: {
    title: 'Journey',
    intro: 'From the workshop to code: a career change driven by passion.',
    items: [
      {
        date: '2015',
        title: 'Polymechanic, Swiss Federal VET Diploma',
        text: 'Machining precision parts. It left me with a taste for meticulous work.',
        status: 'past'
      },
      {
        date: '2024',
        title: 'Career change at ETML',
        text: 'Two-year accelerated programme to become an ICT specialist.',
        place: 'Lausanne',
        status: 'past'
      },
      {
        date: '2026',
        title: 'Diploma project for the Paléo Festival',
        text: 'Statistics and driver/run search modules for Runeado, the app that manages transport for artists and staff.',
        status: 'past'
      },
      {
        date: '2026',
        title: 'ICT Specialist, Application Development',
        text: 'Swiss Federal VET Diploma, graduated from ETML.',
        place: 'Lausanne',
        status: 'past'
      },
      {
        date: 'August 2026 – February 2027',
        title: 'Internship at a law firm',
        text: "Media team: website redesign and internal tools that make the lawyers' work easier.",
        place: 'Seoul',
        status: 'current'
      },
      {
        date: 'From March 2027',
        title: "What's next?",
        text: 'Looking for a developer position, in Switzerland or in Korea.',
        status: 'future'
      }
    ],
    current: 'Now'
  },
  marquee: {
    label: 'Technologies I use'
  },
  backToTop: 'Back to top',
  social: {
    open: 'Open social links',
    close: 'Close social links'
  },
  card: {
    techs: 'Technologies',
    paused: 'On hold',
    comingBack: 'COMING BACK SOON'
  },
  projects: {
    's-photo': {
      title: 'Wildlife photography',
      description: 'My wildlife photography portfolio',
      btnText: 'EXPLORE →'
    },
    's-prodysos': {
      title: 'Prodysos',
      description: 'Production management, built for a theatre company',
      btnText: 'MANAGE →'
    },
    's-horaire': {
      title: 'Vivement la fin',
      description: 'Follow your class schedule live, with a clicker to pass the time',
      btnText: 'TRACK →'
    },
    's-fieu': {
      title: 'Maisallezfieu',
      description: 'Website for a stage play, built for a theatre company',
      btnText: 'DISCOVER →'
    },
    's-travel': {
      title: 'TravelDB',
      description: "Track the countries you've visited on an interactive map",
      btnText: 'TRAVEL →'
    },
    's-wiki': {
      title: 'Wiki ETML',
      description: 'My revision notes, with audio',
      btnText: 'STUDY →'
    },
    's-tanuki': {
      title: 'TanukiCode',
      description: 'Learn Japanese the fun way',
      btnText: 'LEARN →'
    },
    's-lunchpicker': {
      title: 'LunchPicker',
      description: 'Pick a restaurant as a group in Korea, in a few swipes',
      btnText: 'PICK →'
    },
    's-matinale': {
      title: 'La Matinale de Séoul',
      description: 'AI-automated daily news digest',
      btnText: 'READ →'
    }
  },
  footer: {
    contact: 'Contact me'
  },
  echo: {
    greeting: 'Welcome!',
    open: 'Open the assistant',
    close: 'Close the assistant',
    avatarAlt: 'AI assistant',
    contactLink: 'Go to the contact page →',
    faq: {
      start: {
        text: "Hi! I'm Echo, Brendan's virtual assistant. How can I help you?",
        options: [
          { label: 'Who is Brendan?', next: 'who' },
          { label: 'Skills', next: 'skills' },
          { label: 'Availability', next: 'availability' },
          { label: 'His projects', next: 'projects' },
          { label: 'Contact him', next: 'contact' }
        ]
      },
      who: {
        text: 'Brendan is a Swiss-certified application developer (ICT Specialist, Federal VET Diploma), who graduated from ETML in 2026. It was a career change driven by passion: a certified polymechanic since 2015, he completed a two-year accelerated programme to move from the workshop to code.',
        options: [
          { label: 'His diploma project', next: 'tpi' },
          { label: 'His languages', next: 'languages' },
          { label: 'His skills', next: 'skills' },
          { label: 'Back to start', next: 'start' }
        ]
      },
      tpi: {
        text: 'For his final diploma project, Brendan built statistics and driver/run search modules for Runeado, the app that manages transport for artists and staff at the Paléo Festival.',
        options: [
          { label: 'His skills', next: 'skills' },
          { label: 'See his projects', next: 'projects' },
          { label: 'Back to start', next: 'start' }
        ]
      },
      languages: {
        text: 'French and English are both his native languages, and he is learning Korean.',
        options: [
          { label: 'Is he available?', next: 'availability' },
          { label: 'Back to start', next: 'start' }
        ]
      },
      skills: {
        text: 'Brendan currently works mostly with Astro and headless CMSs: his photo portfolio runs on Astro with Directus, which he hosts himself. He also builds with Vue 3, Supabase and AdonisJS, like Prodysos, a PWA made with Vue and Supabase.',
        options: [
          { label: 'Is he available?', next: 'availability' },
          { label: 'See his projects', next: 'projects' },
          { label: 'Back', next: 'start' }
        ]
      },
      availability: {
        text: "From August 2026 to February 2027, Brendan is interning in Seoul with the media team of a law firm, where he works on the website redesign and on internal tools that make the lawyers' work easier. After his internship, he is looking for a position and is open to working in Korea.",
        options: [
          { label: 'Contact him', next: 'contact' },
          { label: 'Fun fact', next: 'funfact' },
          { label: 'Back', next: 'start' }
        ]
      },
      projects: {
        text: 'His two favourite projects: his wildlife photography portfolio (Astro and Directus) and Prodysos, a production management app built for a theatre company. You can find all his projects on the cards in the background!',
        options: [
          { label: 'His skills', next: 'skills' },
          { label: 'Contact him', next: 'contact' }
        ]
      },
      contact: {
        text: 'Would you like to send him a message? You can use the official contact form.',
        options: [{ label: 'Back to start', next: 'start' }],
        isContact: true
      }
    },
    facts: [
      'Fun fact: Brendan loves turning simple ideas into interactive projects, sometimes just "to see how far it can go".',
      'Fun fact: Brendan is into photography, especially wildlife photography, which taught him patience, observation and attention to detail.',
      'Fun fact: before coding, Brendan machined precision parts as a polymechanic. He kept his taste for precise work.',
      'Fun fact: Brendan is learning Korean, handy when you are interning in Seoul!'
    ],
    factOptions: [
      { label: 'See his projects', next: 'projects' },
      { label: 'Another fun fact?', next: 'funfact' },
      { label: 'Back to start', next: 'start' }
    ]
  }
}
