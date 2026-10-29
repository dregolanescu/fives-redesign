import type { Metadata } from "next";
import { TermsContent } from "./content";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: "Termenii de folosire a site-ului FIVE'S International.",
};

export default function TermeniPage() {
  return <TermsContent />;
}
