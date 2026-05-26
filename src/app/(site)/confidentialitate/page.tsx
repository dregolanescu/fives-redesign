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

export default function ConfidentialitaePage() {
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
            Politica de confidențialitate
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
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Operatorul de date</h2>
            <p className="leading-relaxed">
              <strong className="text-text-primary">FIVE&apos;S International S.R.L.</strong>, cu sediul în
              Bd. Timișoara 173, Sector 6, București, România (denumit în continuare „FIVE&apos;S" sau „noi")
              acționează în calitate de operator de date cu caracter personal în conformitate cu
              Regulamentul (UE) 2016/679 privind protecția persoanelor fizice în ceea ce privește
              prelucrarea datelor cu caracter personal (GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Ce date colectăm</h2>
            <p className="leading-relaxed mb-4">
              Colectăm datele cu caracter personal pe care ni le furnizați în mod voluntar, inclusiv prin:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Formularul de contact",
                  desc: "Nume, adresă de email, număr de telefon, mesaj — pentru a răspunde solicitărilor dumneavoastră.",
                },
                {
                  title: "Comunicări directe",
                  desc: "Date transmise prin email, telefon sau alte canale de comunicare în legătură cu serviciile noastre.",
                },
                {
                  title: "Date de navigare",
                  desc: "Adresă IP, tip browser, pagini vizitate — colectate automat prin cookie-uri și instrumente de analiză.",
                },
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-border-light bg-surface">
                  <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Scopul prelucrării</h2>
            <p className="leading-relaxed">
              Datele colectate sunt utilizate exclusiv pentru:
            </p>
            <ul className="mt-3 space-y-2 list-none">
              {[
                "Răspunderea la solicitări, cereri de ofertă și alte comunicări",
                "Gestionarea relației contractuale cu clienții și partenerii noștri",
                "Îmbunătățirea serviciilor și experienței pe site-ul nostru",
                "Respectarea obligațiilor legale aplicabile",
                "Trimiterea de comunicări comerciale, doar cu acordul dumneavoastră prealabil",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Temeiul legal</h2>
            <p className="leading-relaxed">
              Prelucrăm datele dumneavoastră în baza unuia sau mai multor temeiuri legale:
              (a) executarea unui contract sau demersuri precontractuale la cererea dumneavoastră;
              (b) îndeplinirea unor obligații legale;
              (c) interesul nostru legitim în desfășurarea activității comerciale;
              (d) consimțământul dumneavoastră explicit, acolo unde este solicitat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Durata stocării</h2>
            <p className="leading-relaxed">
              Păstrăm datele dumneavoastră doar atât timp cât este necesar pentru scopurile pentru care
              au fost colectate sau cât impun obligațiile legale. Datele din formularul de contact sunt
              păstrate maximum 3 ani de la ultima interacțiune. Datele aferente contractelor se
              arhivează conform prevederilor legale contabile și fiscale (minimum 5 ani).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Drepturile dumneavoastră</h2>
            <p className="leading-relaxed mb-4">
              În conformitate cu GDPR, beneficiați de următoarele drepturi:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { right: "Dreptul de acces", desc: "Să solicitați o copie a datelor deținute despre dumneavoastră." },
                { right: "Dreptul la rectificare", desc: "Să solicitați corectarea datelor inexacte sau incomplete." },
                { right: "Dreptul la ștergere", desc: "Să solicitați ștergerea datelor în anumite condiții." },
                { right: "Dreptul la restricționare", desc: "Să limitați prelucrarea datelor în anumite situații." },
                { right: "Dreptul la portabilitate", desc: "Să primiți datele într-un format structurat și portabil." },
                { right: "Dreptul de opoziție", desc: "Să vă opuneți prelucrării bazate pe interese legitime." },
              ].map((item) => (
                <div key={item.right} className="p-3 rounded-xl border border-border-light bg-surface">
                  <p className="text-sm font-semibold text-text-primary">{item.right}</p>
                  <p className="text-xs mt-1 text-text-tertiary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Pentru exercitarea oricăruia dintre aceste drepturi, ne puteți contacta la{" "}
              <a href="mailto:office@fives.ro" className="text-gold hover:underline">
                office@fives.ro
              </a>
              . Veți primi un răspuns în termen de maximum 30 de zile. Aveți de asemenea dreptul de a
              depune o plângere la{" "}
              <a
                href="https://www.dataprotection.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">7. Securitatea datelor</h2>
            <p className="leading-relaxed">
              Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja datele cu caracter
              personal împotriva accesului neautorizat, modificării, divulgării sau distrugerii. Transmisia
              datelor pe site este protejată prin conexiuni criptate (HTTPS/SSL).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">8. Transferuri internaționale</h2>
            <p className="leading-relaxed">
              Datele dumneavoastră sunt prelucrate în principal pe teritoriul Uniunii Europene. În cazul
              utilizării unor servicii terțe (ex. Google Analytics) care pot implica transferuri de date
              în afara UE, acestea se realizează cu garanțiile adecvate prevăzute de GDPR (ex. Clauze
              Contractuale Standard aprobate de Comisia Europeană).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">9. Modificări ale politicii</h2>
            <p className="leading-relaxed">
              Ne rezervăm dreptul de a actualiza periodic această politică pentru a reflecta modificările
              legislative sau operaționale. Data ultimei actualizări este indicată la începutul documentului.
              Vă recomandăm să consultați periodic această pagină.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">10. Contact</h2>
            <div className="p-4 rounded-xl border border-border-light bg-surface space-y-1 text-sm">
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
