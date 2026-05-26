import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proiecte",
  description:
    "Descoperiți portofoliul FIVE'S — proiecte de producție tehnică pentru festivaluri, evenimente corporate, concerte și lansări de produs în România și Europa.",
};

export default function ProiecteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
