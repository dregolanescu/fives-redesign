import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noutăți",
  description:
    "Ultimele noutăți din lumea producției tehnice de evenimente. Proiecte recente, tendințe din industrie și povești din culisele FIVE'S.",
};

export default function NoutatiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
