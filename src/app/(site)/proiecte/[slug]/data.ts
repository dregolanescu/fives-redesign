export interface ProjectDetail {
  title: string;
  slug: string;
  category: string;
  location: string;
  year: string;
  services: string[];
  heroImage: string;
  context: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  galleryImages: string[];
}

export const projectData: ProjectDetail[] = [
  {
    title: "Conferința Dell CFO Leadership",
    slug: "conferinta-dell-cfo-leadership",
    category: "Corporate",
    location: "București, România",
    year: "2019",
    services: ["Sunet", "Lumini", "Video", "Scenografie"],
    heroImage: "https://www.fives.ro/files/up/1190.jpg",
    context:
      "Conferința Dell CFO Leadership a reunit lideri financiari din întreaga regiune pentru o serie de prezentări, paneluri și sesiuni interactive, într-un cadru corporate de top.",
    challenge:
      "Crearea unei atmosfere premium într-un spațiu de conferințe standard, cu cerințe stricte de branding Dell și integrarea unui sistem de prezentare multi-ecran pentru speakeri multipli.",
    solution:
      "Am implementat un sistem audio Bose Professional pentru claritate maximă a discursurilor, completat de ecrane LED 4K și iluminat scenic care a transformat sala într-un spațiu imersiv, aliniat cu identitatea vizuală Dell.",
    metrics: [
      { label: "Participanți", value: "500+" },
      { label: "Ecrane LED", value: "3×4K" },
      { label: "Ore de conținut", value: "8" },
      { label: "Camere live", value: "4" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1206.jpg",
      "https://www.fives.ro/files/up/1193.jpg",
      "https://www.fives.ro/files/up/1152.jpg",
      "https://www.fives.ro/files/up/1133.jpg",
    ],
  },
  {
    title: "Festivalul Hey Day 2018",
    slug: "festivalul-hey-day-2018",
    category: "Live",
    location: "București, România",
    year: "2018",
    services: ["Sunet", "Lumini", "Video", "Scenotehnică", "Rigging"],
    heroImage: "https://www.fives.ro/files/up/1184.jpg",
    context:
      "Hey Day a fost un festival de muzică live care a reunit artiști naționali și internaționali, necesitând o infrastructură tehnică de mare anvergură.",
    challenge:
      "Asigurarea unui sunet puternic și clar pe o scenă în aer liber, cu management complex al mai multor artiști și tranziții rapide între seturi.",
    solution:
      "Am implementat un sistem L-Acoustics pe scena principală, cu monitorizare in-ear pentru artiști. Iluminatul Robe a fost programat individual pentru fiecare set, iar ecranele LED au oferit vizibilitate pentru întregul public.",
    metrics: [
      { label: "Boxe audio", value: "80+" },
      { label: "Proiectoare", value: "200+" },
      { label: "LED m²", value: "120" },
      { label: "Artiști", value: "25+" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1164.jpg",
      "https://www.fives.ro/files/up/1184.jpg",
      "https://www.fives.ro/files/up/1206.jpg",
      "https://www.fives.ro/files/up/1193.jpg",
    ],
  },
  {
    title: "Gala Premiilor UNITER",
    slug: "gala-premiilor-uniter",
    category: "Artistice",
    location: "București, România",
    year: "2019",
    services: ["Sunet", "Lumini", "Video", "Scenografie"],
    heroImage: "https://www.fives.ro/files/up/1167.jpg",
    context:
      "Gala Premiilor UNITER este cel mai important eveniment al teatrului românesc, o ceremonie de premiere care celebrează excelența artistică pe scene naționale.",
    challenge:
      "Crearea unei scenografii elegante care să servească atât ceremoniei live cât și transmisiunii televizate, cu iluminat care să pună în valoare fiecare moment artistic.",
    solution:
      "Am creat o scenografie cu elemente transparente și proiecții de ambient, completată de un sistem de iluminat cu temperatură de culoare variabilă. Sunetul a fost optimizat atât pentru sala de spectacol cât și pentru broadcast TV.",
    metrics: [
      { label: "Spectatori", value: "1.200" },
      { label: "Corpuri iluminat", value: "180" },
      { label: "Ore transmisie", value: "3" },
      { label: "Premii acordate", value: "15" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1152.jpg",
      "https://www.fives.ro/files/up/1133.jpg",
      "https://www.fives.ro/files/up/1164.jpg",
      "https://www.fives.ro/files/up/1206.jpg",
    ],
  },
  {
    title: "The Color Run Night București",
    slug: "the-color-run-night-bucuresti",
    category: "Sportive",
    location: "București, România",
    year: "2018",
    services: ["Lumini", "Sunet", "Efecte speciale", "Scenotehnică"],
    heroImage: "https://www.fives.ro/files/up/1202.jpg",
    context:
      "The Color Run Night a fost ediția nocturnă a celebrei curse de culori, transformând parcul în arena de lumini și muzică, cu mii de participanți.",
    challenge:
      "Iluminarea unui traseu de cursă de 5 km în aer liber, cu efecte speciale sincronizate și un sistem audio care să acopere întreaga zonă a evenimentului.",
    solution:
      "Am instalat peste 200 de corpuri de iluminat de-a lungul traseului, cu efecte UV și stroboscopice sincronizate. Sistemul audio distribuit a asigurat energia muzicală pe fiecare segment al cursei.",
    metrics: [
      { label: "Participanți", value: "5.000+" },
      { label: "Km traseu", value: "5" },
      { label: "Corpuri iluminat", value: "200+" },
      { label: "kW putere", value: "500" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1193.jpg",
      "https://www.fives.ro/files/up/1152.jpg",
      "https://www.fives.ro/files/up/1184.jpg",
      "https://www.fives.ro/files/up/1133.jpg",
    ],
  },
  {
    title: "East European Comic Con",
    slug: "east-european-comic-con",
    category: "Sportive",
    location: "București, România",
    year: "2019",
    services: ["Sunet", "Lumini", "Video", "Scenotehnică"],
    heroImage: "https://www.fives.ro/files/up/1174.jpg",
    context:
      "East European Comic Con este cel mai mare eveniment de pop culture din Europa de Est, reunind fani ai filmelor, jocurilor și benzilor desenate sub același acoperiș.",
    challenge:
      "Managementul tehnic al multor zone tematice simultan — scene de prezentări, zone de gaming, arene de cosplay — fiecare cu cerințe audio-video distincte.",
    solution:
      "Am implementat sisteme audio independente per zonă cu control centralizat, ecrane LED pentru prezentări și gaming tournaments, și iluminat tematic adaptat fiecărei zone a convenției.",
    metrics: [
      { label: "Vizitatori", value: "30.000+" },
      { label: "Zone tematice", value: "8" },
      { label: "Ecrane LED", value: "12" },
      { label: "Zile eveniment", value: "3" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1164.jpg",
      "https://www.fives.ro/files/up/1206.jpg",
      "https://www.fives.ro/files/up/1133.jpg",
      "https://www.fives.ro/files/up/1152.jpg",
    ],
  },
  {
    title: "Digital Assembly 2019",
    slug: "digital-assembly-2019",
    category: "Corporate",
    location: "București, România",
    year: "2019",
    services: ["Sunet", "Video", "Streaming", "Traducere simultană"],
    heroImage: "https://www.fives.ro/files/up/1200.jpg",
    context:
      "Digital Assembly este o conferință internațională de nivel european, cu speakeri din multiple țări și audiență hibridă fizică și online.",
    challenge:
      "Managementul a 3 săli simultane cu traducere în mai multe limbi, streaming multi-cameră individual per sală și sistem de Q&A interactiv.",
    solution:
      "Am implementat sisteme Shure pe fiecare sală, cu routing audio Dante către interpreți și streaming. Video-ul a fost produs cu camere PTZ controlate remote, iar mixajul live a fost distribuit prin CDN dedicat.",
    metrics: [
      { label: "Speakeri", value: "40+" },
      { label: "Limbi traducere", value: "4" },
      { label: "Camere", value: "12" },
      { label: "Viewers online", value: "15K" },
    ],
    galleryImages: [
      "https://www.fives.ro/files/up/1193.jpg",
      "https://www.fives.ro/files/up/1184.jpg",
      "https://www.fives.ro/files/up/1164.jpg",
      "https://www.fives.ro/files/up/1206.jpg",
    ],
  },
];
