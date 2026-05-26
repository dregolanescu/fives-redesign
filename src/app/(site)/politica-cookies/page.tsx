"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export default function PoliticaCookiesPage() {
  return (
    <main className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-wide max-w-3xl">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <motion.span
            custom={0}
            variants={fadeUp}
            className="text-label text-gold block mb-3"
          >
            Legal
          </motion.span>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-display text-text-primary mb-4"
          >
            Politica de cookies
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-lg text-text-secondary"
          >
            Ultima actualizare: 1 ianuarie 2025
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none text-text-secondary space-y-8"
        >
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Ce sunt cookie-urile?</h2>
            <p className="leading-relaxed">
              Cookie-urile sunt fișiere mici de text stocate pe dispozitivul dumneavoastră (calculator, tabletă, telefon mobil)
              atunci când vizitați un site web. Acestea permit site-ului să rețină acțiunile și preferințele dumneavoastră
              pe o perioadă de timp, astfel încât să nu fie nevoie să le reintroduceți de fiecare dată când reveniți pe site
              sau navigați de pe o pagină pe alta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Ce tipuri de cookie-uri utilizăm?</h2>
            <p className="leading-relaxed mb-4">
              Site-ul nostru utilizează următoarele categorii de cookie-uri:
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-border-light bg-surface">
                <h3 className="font-semibold text-text-primary mb-1">Cookie-uri strict necesare</h3>
                <p className="text-sm leading-relaxed">
                  Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului și nu pot fi dezactivate.
                  Ele nu stochează nicio informație personală identificabilă și sunt activate ca răspuns la acțiunile
                  dumneavoastră, cum ar fi setarea preferințelor de confidențialitate sau completarea formularelor.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-light bg-surface">
                <h3 className="font-semibold text-text-primary mb-1">Cookie-uri de performanță și analiză</h3>
                <p className="text-sm leading-relaxed">
                  Aceste cookie-uri ne permit să numărăm vizitele și sursele de trafic, astfel încât să putem
                  măsura și îmbunătăți performanța site-ului nostru. Toate informațiile colectate sunt agregate
                  și anonime. Utilizăm Google Analytics pentru a înțelege modul în care vizitatorii interacționează
                  cu site-ul nostru.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-border-light bg-surface">
                <h3 className="font-semibold text-text-primary mb-1">Cookie-uri funcționale</h3>
                <p className="text-sm leading-relaxed">
                  Aceste cookie-uri permit site-ului să ofere funcționalități îmbunătățite și personalizare,
                  cum ar fi reținerile de preferințe de limbă sau regiune.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Durata de stocare</h2>
            <p className="leading-relaxed">
              Cookie-urile de sesiune sunt șterse automat la închiderea browserului. Cookie-urile persistente
              rămân pe dispozitivul dumneavoastră pentru o perioadă determinată (de obicei între 30 de zile și 2 ani)
              sau până când le ștergeți manual din browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Cum puteți controla cookie-urile?</h2>
            <p className="leading-relaxed mb-4">
              Puteți controla și/sau șterge cookie-urile în orice moment. Puteți șterge toate cookie-urile
              deja prezente pe calculatorul dumneavoastră și puteți seta majoritatea browserelor să blocheze
              plasarea acestora. Dacă faceți acest lucru, este posibil să fie nevoie să ajustați manual
              unele preferințe de fiecare dată când vizitați un site.
            </p>
            <p className="leading-relaxed">
              Pentru mai multe informații despre gestionarea cookie-urilor în browserul dumneavoastră,
              consultați documentația oficială a acestuia. De asemenea, puteți vizita{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                www.allaboutcookies.org
              </a>{" "}
              pentru informații detaliate despre gestionarea cookie-urilor.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Cookie-uri terțe</h2>
            <p className="leading-relaxed">
              Anumite pagini ale site-ului nostru pot conține conținut de la terți (de ex. videoclipuri YouTube,
              hărți Google Maps) care pot instala propriile cookie-uri. FIVE&apos;S International nu are control
              asupra acestor cookie-uri. Vă recomandăm să consultați politicile de confidențialitate ale
              respectivilor furnizori terți.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Contact</h2>
            <p className="leading-relaxed">
              Dacă aveți întrebări legate de utilizarea cookie-urilor pe site-ul nostru, ne puteți contacta la{" "}
              <a href="mailto:office@fives.ro" className="text-gold hover:underline">
                office@fives.ro
              </a>
              .
            </p>
          </section>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-border-light"
        >
          <Link
            href="/"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            ← Înapoi la pagina principală
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
