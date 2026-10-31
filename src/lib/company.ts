/**
 * Legal identity of the site operator, used on the legal pages.
 * CUI, registration number and registered office checked against ANAF's public
 * VAT-registry API on 29.10.2026 (FIVES INTERNATIONAL SRL, VAT payer).
 */
export const COMPANY = {
  name: "FIVE'S International S.R.L.",
  brand: "FIVE'S International",
  shortName: "FIVE'S",
  cui: "RO10239820",
  regCom: "J1998001491400",
  addressRo: "Bd. Timișoara nr. 173, Sector 6, București, România",
  addressEn: "173 Timișoara Blvd., Sector 6, Bucharest, Romania",
  email: "office@fives.ro",
  // Mobile number FIVE'S asked for on 31.10.2026, replacing the landline everywhere on the site.
  phone: "0724 580 731",
  phoneIntl: "+40 724 580 731",
  phoneHref: "tel:+40724580731",
} as const;

/** Phone as shown to visitors: local format in Romanian, international format in English. */
export function displayPhone(lang: "ro" | "en") {
  return lang === "en" ? COMPANY.phoneIntl : COMPANY.phone;
}

/** Date shown as "last updated" on the legal pages. */
export const LEGAL_UPDATED = { ro: "31 octombrie 2026", en: "31 October 2026" } as const;
