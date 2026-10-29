import type { Metadata } from "next";
import { CookiePolicyContent } from "./content";

export const metadata: Metadata = {
  title: "Politica de cookies",
  description:
    "Ce salvează site-ul FIVE'S pe dispozitivul tău, de ce și cum îți poți schimba oricând alegerea privind cookie-urile.",
};

export default function PoliticaCookiesPage() {
  return <CookiePolicyContent />;
}
