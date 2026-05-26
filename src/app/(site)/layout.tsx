import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Performing events - FIVE'S",
    template: "%s | FIVE'S",
  },
  description:
    "30+ years of technical event production excellence. Sound, lighting, video, and stage engineering across 4 countries.",
  keywords: [
    "event production",
    "technical events",
    "sound engineering",
    "lighting design",
    "video production",
    "stage engineering",
    "AV Alliance",
    "Romania",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "FIVE'S",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={roboto.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
