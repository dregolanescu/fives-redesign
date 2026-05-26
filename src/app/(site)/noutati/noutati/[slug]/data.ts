export interface ArticleData {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  body: string[];
  gallery: boolean;
}

export const allArticles: ArticleData[] = [
  {
    slug: "untold-2025-behind-the-scenes",
    title: "UNTOLD 2025 — Cum am construit cea mai mare scenă din istoria festivalului",
    category: "Festival",
    date: "15 Martie 2026",
    readTime: "8 min",
    author: { name: "Andrei Popescu", role: "Director Tehnic" },
    body: [
      "Festivalul UNTOLD a reprezentat întotdeauna un reper pentru industria de evenimente din România. Ediția din 2025 nu a făcut excepție — ba chiar a ridicat ștacheta la un nivel fără precedent. Scena principală, un mastodont de oțel, aluminium și lumini, a fost cel mai ambițios proiect tehnic pe care echipa FIVE'S l-a realizat vreodată.",
      "Totul a început cu 6 luni înainte de festival, într-o sală de ședințe din București. Brieful era simplu în aparență: «Vrem ceva ce nu s-a mai văzut în Europa de Est.» Din acel moment, echipa noastră de proiectanți, ingineri structurali și designeri de lighting au început să transforme această viziune în realitate.",
      "Procesul de montaj a durat 14 zile. Fiecare dimineață începea la ora 6:00, cu briefinguri de siguranță și planificarea detaliată a etapelor zilei. Am lucrat cu 280 de tone de echipament — de la structuri de rigging și truss-uri, la sisteme audio line array și peste 1.200 de corpuri de iluminat inteligente.",
      "Unul dintre cele mai complexe aspecte a fost integrarea sistemului video. Am folosit un LED wall curbat de 240 de metri pătrați, alimentat de servere media redundante care procesau conținut în timp real. Rezoluția totală depășea 8K, iar fiecare pixel trebuia calibrat individual pentru a asigura uniformitatea imaginii.",
      "Echipa de sunet a implementat un sistem audio distribuit, cu line array-uri principale și delay towers poziționate strategic în tot arena. Scopul: aceeași calitate sonoră pentru fiecare spectator, indiferent de poziția sa. Simulările acustice au durat săptămâni, iar calibrarea finală, realizată cu microfoane de măsurare, a ocupat ultimele 48 de ore înainte de deschidere.",
      "Rezultatul? O experiență imersivă care a lăsat fără cuvinte peste 90.000 de spectatori în fiecare seară. Momentele de vârf ale festivalului — cum ar fi show-ul de deschidere cu drone și pirotehnie sincronizată — au fost posibile doar datorită coordonării impecabile dintre departamentele de sunet, lumini, video și scenotehnică.",
      "UNTOLD 2025 ne-a confirmat încă o dată că producția tehnică de evenimente este, în esență, o artă a preciziei și a colaborării. Fiecare cablu, fiecare conector, fiecare linie de cod din automatizare contribuie la magia pe care publicul o simte fără să o vadă.",
    ],
    gallery: true,
  },
  {
    slug: "tendinte-iluminat-2026",
    title: "Tendințe în lighting design pentru evenimente corporate în 2026",
    category: "Tehnologie",
    date: "2 Martie 2026",
    readTime: "5 min",
    author: { name: "Maria Ionescu", role: "Lead Lighting Designer" },
    body: [
      "Lighting design-ul pentru evenimente corporate a evoluat dramatic în ultimii ani. Dacă în trecut iluminatul era considerat un element funcțional — suficient să vezi prezentarea PowerPoint — astăzi este o componentă esențială a branding-ului și a experienței de eveniment.",
      "Una dintre cele mai importante tendințe ale anului 2026 este LED-ul volumetric. Barele și panourile LED cu densitate mare de pixeli sunt folosite nu doar ca sursă de lumină, ci și ca elemente scenografice care creează volume și texturi de lumină tridimensională. Rezultatul este un spațiu care se transformă în timp real, adaptându-se fiecărui moment al evenimentului.",
      "Proiecțiile adaptive reprezintă o altă direcție fascinantă. Folosind camere de tracking și software de mapping în timp real, lumina urmărește literalmente mișcarea prezentatorilor sau a obiectelor de pe scenă. Această tehnologie, combinată cu content video generat procedural, creează efecte vizuale care par să sfideze legile fizicii.",
      "În ceea ce privește paleta cromatică, observăm o revenire a tonurilor calde și naturale în detrimentul LED-ului agresiv și suprasaturat. Clienții corporate caută sofisticare și eleganță — ambiental-uri în nuanțe de chihlimbar, alb cald și accente subtile care se aliniază cu identitatea vizuală a brand-ului.",
      "La FIVE'S, am implementat deja aceste tendințe în proiectele noastre recente. Fiecare eveniment este o oportunitate de a explora limitele tehnologiei și de a crea experiențe de lumină memorabile.",
    ],
    gallery: false,
  },
  {
    slug: "parteneriat-av-alliance",
    title: "FIVE'S devine partener strategic AV Alliance pentru Europa de Est",
    category: "Companie",
    date: "18 Februarie 2026",
    readTime: "4 min",
    author: { name: "Radu Marinescu", role: "CEO" },
    body: [
      "Suntem mândri să anunțăm că FIVE'S a fost acceptat ca partener strategic al AV Alliance, cea mai prestigioasă rețea globală de companii de producție tehnică de evenimente. Această apartenență ne plasează alături de cele mai respectate companii din industrie, din peste 50 de țări.",
      "AV Alliance reunește companii care respectă cele mai înalte standarde de calitate, siguranță și profesionalism. Procesul de evaluare a durat aproape un an și a inclus audituri tehnice, verificări ale portofoliului și evaluări ale capacităților operaționale.",
      "Ce înseamnă acest lucru pentru clienții noștri? Acces la o rețea globală de echipamente și expertiză. Dacă organizați un eveniment în Frankfurt, Dubai sau Singapore, putem coordona producția tehnică prin partenerii noștri AV Alliance, cu aceleași standarde de calitate pe care le garantăm în România.",
      "Acest parteneriat confirmă viziunea noastră: să fim nu doar cei mai buni din România, ci un jucător relevant pe piața europeană a producției tehnice de evenimente.",
    ],
    gallery: false,
  },
  {
    slug: "conferinta-tech-summit",
    title: "Tech Summit București — Studiu de caz în producția audio-video",
    category: "Corporate",
    date: "5 Februarie 2026",
    readTime: "6 min",
    author: { name: "Cristian Dinu", role: "Audio Engineer" },
    body: [
      "Tech Summit București 2026 a fost una dintre cele mai complexe producții corporate din acest an. Cu 3.000 de participanți în Sala Palatului și transmisiune live simultană în România, Ungaria, Bulgaria și Republica Moldova, provocările tehnice au fost pe măsura ambiției evenimentului.",
      "Sistemul audio a fost conceput în jurul a două cerințe fundamentale: inteligibilitate perfectă a vorbirii pentru public și un mix broadcast de calitate studio pentru transmisiunea online. Am folosit un sistem principal L-Acoustics K2 completat cu sisteme de fill și delay, calibrat cu software de predicție acustică Soundvision.",
      "Producția video a inclus 8 camere — 3 operate, 2 PTZ robotizate și 3 fixe — mixate în timp real prin un switcher Grass Valley. Conținutul era distribuit simultan către cele 4 ecrane LED din sală, către platforma de streaming și către rețelele de televiziune partenere.",
      "Transmisiunea live a necesitat o infrastructură de rețea dedicată, cu linkuri redundante și encoding adaptat pentru fiecare destinație. Latența medie a fost sub 3 secunde, iar calitatea video a fost menținută la 1080p60 pentru toate stream-urile.",
      "Evenimentul s-a desfășurat impecabil pe parcursul a două zile, fără nicio întrerupere tehnică. Feedback-ul organizatorilor și al participanților a confirmat că producția tehnică a fost la nivelul celor mai bune conferințe europene de tehnologie.",
    ],
    gallery: true,
  },
  {
    slug: "echipa-noua-membri",
    title: "Echipa FIVE'S crește: 5 specialiști noi în departamentul tehnic",
    category: "Companie",
    date: "20 Ianuarie 2026",
    readTime: "3 min",
    author: { name: "Radu Marinescu", role: "CEO" },
    body: [
      "La începutul acestui an, echipa FIVE'S s-a extins cu cinci noi specialiști în departamentul tehnic. Fiecare dintre ei aduce experiență internațională și o pasiune autentică pentru producția de evenimente la cel mai înalt nivel.",
      "Noii colegi acoperă domenii esențiale: un inginer de sunet cu experiență în turnee internaționale, un lighting designer format la una dintre cele mai prestigioase școli europene de design de iluminat, doi tehnicieni video specializați în sisteme LED și proiecție de mare format, și un inginer de rigging certificat internațional.",
      "Investiția în oameni este prioritatea noastră numărul unu. Tehnologia evoluează rapid, dar expertiza umană rămâne diferențiatorul care transformă un eveniment bun într-unul extraordinar. Bine ați venit în echipă!",
    ],
    gallery: false,
  },
];
