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

export default function TermeniPage() {
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
            Termeni și condiții
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
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Informații generale</h2>
            <p className="leading-relaxed">
              Prezentul site web este operat de <strong className="text-text-primary">FIVE&apos;S International S.R.L.</strong>,
              cu sediul în Bd. Timișoara 173, Sector 6, București, România, înregistrată la Registrul Comerțului,
              cod fiscal CUI: RO14888880.
            </p>
            <p className="leading-relaxed mt-3">
              Prin accesarea și utilizarea acestui site web, acceptați în mod implicit termenii și condițiile
              prezentate mai jos. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați site-ul nostru.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Serviciile noastre</h2>
            <p className="leading-relaxed">
              FIVE&apos;S International furnizează servicii profesionale de producție tehnică pentru evenimente,
              incluzând sisteme audio, iluminat, video și scenotehnică. Informațiile prezentate pe acest site
              au caracter pur informativ și nu constituie o ofertă contractuală fermă.
            </p>
            <p className="leading-relaxed mt-3">
              Orice angajament contractual dintre FIVE&apos;S International și clienți se stabilește exclusiv prin
              documente contractuale semnate de ambele părți. Prețurile și disponibilitatea echipamentelor
              se confirmă în urma unei solicitări formale de ofertă.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Proprietate intelectuală</h2>
            <p className="leading-relaxed">
              Conținutul acestui site web — inclusiv texte, imagini, grafice, logo-uri, clipuri video și
              materiale audiovizuale — este proprietatea FIVE&apos;S International S.R.L. sau a deținătorilor de
              licențe și este protejat de legislația română și internațională privind dreptul de autor.
            </p>
            <p className="leading-relaxed mt-3">
              Este interzisă reproducerea, distribuirea, modificarea sau utilizarea în orice scop comercial
              a oricărui material de pe acest site fără acordul scris prealabil al FIVE&apos;S International.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Limitarea răspunderii</h2>
            <p className="leading-relaxed">
              FIVE&apos;S International depune toate eforturile pentru a menține informațiile de pe site actualizate
              și corecte, însă nu garantează acuratețea, completitudinea sau actualitatea conținutului.
              Ne rezervăm dreptul de a modifica informațiile de pe site în orice moment, fără notificare prealabilă.
            </p>
            <p className="leading-relaxed mt-3">
              FIVE&apos;S International nu va fi responsabilă pentru niciun prejudiciu direct, indirect sau
              consecvent rezultat din utilizarea sau imposibilitatea utilizării acestui site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Link-uri externe</h2>
            <p className="leading-relaxed">
              Site-ul poate conține link-uri către site-uri externe. FIVE&apos;S International nu are control
              asupra conținutului acestor site-uri și nu își asumă nicio responsabilitate pentru conținutul,
              politicile de confidențialitate sau practicile site-urilor terțe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Legislație aplicabilă</h2>
            <p className="leading-relaxed">
              Prezentele Termeni și Condiții sunt guvernate de legislația română. Orice litigiu decurgând din
              sau în legătură cu utilizarea acestui site va fi soluționat de instanțele competente din România.
            </p>
            <p className="leading-relaxed mt-3">
              Pentru soluționarea alternativă a litigiilor, utilizatorii pot accesa platforma europeană de
              soluționare online a litigiilor (SOL) disponibilă la{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">7. Modificarea termenilor</h2>
            <p className="leading-relaxed">
              FIVE&apos;S International își rezervă dreptul de a modifica oricând prezentele Termeni și Condiții.
              Continuarea utilizării site-ului după publicarea modificărilor constituie acceptarea acestora.
              Vă recomandăm să consultați periodic această pagină.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">8. Contact</h2>
            <p className="leading-relaxed">
              Pentru orice întrebări legate de acești Termeni și Condiții, ne puteți contacta la:
            </p>
            <div className="mt-3 p-4 rounded-xl border border-border-light bg-surface space-y-1 text-sm">
              <p><strong className="text-text-primary">FIVE&apos;S International S.R.L.</strong></p>
              <p>Bd. Timișoara 173, Sector 6, București</p>
              <p>
                Email:{" "}
                <a href="mailto:office@fives.ro" className="text-gold hover:underline">
                  office@fives.ro
                </a>
              </p>
              <p>
                Telefon:{" "}
                <a href="tel:+40314011971" className="text-gold hover:underline">
                  (+4) 031 401 1971
                </a>
              </p>
            </div>
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
