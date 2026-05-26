import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Descoperiți povestea FIVE'S — peste 30 de ani de excelență în producția tehnică de evenimente. Sunet, lumini, video și scenotehnică pentru cele mai importante evenimente din România și Europa.",
};

export default function DespreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
