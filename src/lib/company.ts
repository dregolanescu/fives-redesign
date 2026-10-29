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
  phone: "(+4) 031 401 1971",
  phoneHref: "tel:+40314011971",
} as const;

/** Date shown as "last updated" on the legal pages. */
export const LEGAL_UPDATED = { ro: "29 octombrie 2026", en: "29 October 2026" } as const;
