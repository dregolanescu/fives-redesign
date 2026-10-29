import type { Metadata } from "next";
import { PrivacyPolicyContent } from "./content";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Cum prelucrează FIVE'S International datele personale primite prin acest site: ce date, de ce, cât timp și ce drepturi ai.",
};

export default function ConfidentialitatePage() {
  return <PrivacyPolicyContent />;
}
