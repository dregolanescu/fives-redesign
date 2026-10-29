import type { Lang } from "./translations";

/**
 * Display labels for the CMS select values (collections/Projects.ts).
 * The stored values stay ASCII; only what visitors see is translated here.
 */
export const projectCategoryLabels: Record<Lang, Record<string, string>> = {
  ro: {
    Toate: "Toate",
    Corporate: "Corporate",
    Festival: "Festival",
    Live: "Muzică live",
    Sportiv: "Sportiv",
    Artistic: "Artistic",
    Conferinta: "Conferință",
  },
  en: {
    Toate: "All",
    Corporate: "Corporate",
    Festival: "Festival",
    Live: "Live Music",
    Sportiv: "Sports",
    Artistic: "Artistic",
    Conferinta: "Conference",
  },
};

export const projectServiceLabels: Record<Lang, Record<string, string>> = {
  ro: {
    sunet: "Sunet",
    lumini: "Lumini",
    video: "Video",
    scenotehnica: "Scenotehnică",
    "efecte-speciale": "Efecte speciale",
    pirotehnice: "Pirotehnice",
    scena: "Scenă",
    productie: "Producție eveniment",
    "management-tehnic": "Management tehnic",
  },
  en: {
    sunet: "Sound",
    lumini: "Lighting",
    video: "Video",
    scenotehnica: "Stage Design",
    "efecte-speciale": "Special Effects",
    pirotehnice: "Pyrotechnics",
    scena: "Stage",
    productie: "Event Production",
    "management-tehnic": "Technical Management",
  },
};

export function categoryLabel(lang: Lang, value: string): string {
  return projectCategoryLabels[lang]?.[value] || projectCategoryLabels.ro[value] || value;
}

export function serviceLabel(lang: Lang, value: string): string {
  return projectServiceLabels[lang]?.[value] || projectServiceLabels.ro[value] || value;
}
