import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează echipa FIVE'S pentru producția tehnică a evenimentului tău. Sunet, lumini, video și scenotehnică la cele mai înalte standarde.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
