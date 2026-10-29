import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";
import NotFoundContent from "./(site)/not-found";
import "./(site)/globals.css";

/**
 * Branded 404 for URLs that match no route at all (e.g. /pagina-inexistenta or old
 * fives.ro links). The app has two root layouts — (site) and (payload) — so the
 * (site)/not-found.tsx page only covers notFound() calls inside site routes; without
 * this file Next.js served its bare default 404. Enabled by
 * `experimental.globalNotFound` in next.config.ts. It bypasses the layouts, so it
 * brings its own <html>, font, styles and the site chrome.
 */

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Pagina nu a fost găsită | FIVE'S",
  description: "Pagina pe care o cauți nu există sau a fost mutată.",
  icons: { icon: "/favicon.png" },
};

export default function GlobalNotFound() {
  return (
    <html lang="ro" className={roboto.variable}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">
            <NotFoundContent />
          </main>
          <Footer />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
