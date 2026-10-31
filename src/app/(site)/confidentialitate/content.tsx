"use client";

import { useLanguage } from "@/lib/i18n";
import { COMPANY, LEGAL_UPDATED, displayPhone } from "@/lib/company";
import { LegalCard, LegalLink, LegalList, LegalPage, type LegalSection } from "@/components/legal-page";

function CompanyBlock({ en }: { en: boolean }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm space-y-1">
      <p className="font-semibold text-stone-900">{COMPANY.name}</p>
      <p>
        {en ? "VAT ID" : "CUI"} {COMPANY.cui} · {en ? "Trade Register no." : "Nr. Reg. Com."} {COMPANY.regCom}
      </p>
      <p>{en ? COMPANY.addressEn : COMPANY.addressRo}</p>
      <p>
        Email: <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink> · {en ? "Phone" : "Telefon"}:{" "}
        <LegalLink href={COMPANY.phoneHref}>{displayPhone(en ? "en" : "ro")}</LegalLink>
      </p>
    </div>
  );
}

export function PrivacyPolicyContent() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const anspdcp = "https://www.dataprotection.ro";

  const sections: LegalSection[] = en
    ? [
        {
          id: "controller",
          title: "Who we are",
          body: (
            <>
              <p>
                {COMPANY.name} (“{COMPANY.shortName}”, “we”) is the controller of the personal data
                processed through this website, under Regulation (EU) 2016/679 (GDPR).
              </p>
              <CompanyBlock en />
            </>
          ),
        },
        {
          id: "data",
          title: "What data we process and why",
          body: (
            <>
              <LegalCard title="Messages you send us">
                <p>
                  When you write to us through the contact form, by email or by phone: your name, email, phone number,
                  company and message. We use them to reply and, where relevant, to prepare an offer. Legal basis:
                  steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR) and our legitimate
                  interest in answering enquiries (Art. 6(1)(f)).
                </p>
              </LegalCard>
              <LegalCard title="Technical data">
                <p>
                  When you visit the site, the hosting server automatically processes your IP address, browser type,
                  the page requested and the time of access, to deliver the pages and protect the site against abuse.
                  We do not use this data to identify you or to build a profile. Legal basis: our legitimate interest
                  in running a secure website (Art. 6(1)(f)).
                </p>
              </LegalCard>
              <LegalCard title="External content (Google Maps)">
                <p>
                  Only if you choose to show the map on the contact page: Google receives your IP address and may set
                  cookies under its own policy. Legal basis: your consent (Art. 6(1)(a)), which you can withdraw at any
                  time from “Cookie settings” at the bottom of the page.
                </p>
              </LegalCard>
              <LegalCard title="Editor accounts">
                <p>
                  For the people who manage the site’s content: name, email and login data for the admin panel.
                  Legal basis: our legitimate interest in administering the site securely (Art. 6(1)(f)).
                </p>
              </LegalCard>
              <p>
                We do not use analytics, marketing or advertising tools, and we do not sell personal data. Details
                about what is stored in your browser are in the <LegalLink href="/politica-cookies">Cookie Policy</LegalLink>.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep data",
          body: (
            <LegalList
              items={[
                "Messages and correspondence: as long as needed to reply and to manage the business relationship, as a rule no longer than 3 years after the last interaction.",
                "Contracts and accounting documents: for the periods required by tax and accounting law.",
                "Technical data (server logs): for short periods, according to the hosting provider's settings.",
                "Your cookie choice: 12 months, in your own browser.",
              ]}
            />
          ),
        },
        {
          id: "recipients",
          title: "Who else has access to the data",
          body: (
            <>
              <p>We work with providers that process data on our behalf, under contracts and the safeguards required by the GDPR:</p>
              <LegalList
                items={[
                  <><strong>Vercel Inc.</strong> (USA) — website hosting and image storage;</>,
                  <><strong>Turso</strong> — the database behind the admin panel (editor accounts and site content);</>,
                  <><strong>Resend</strong> — sending automated emails, such as password resets for editors;</>,
                  <><strong>Google</strong> — only the map on the contact page and only if you choose to show it; Google acts as an independent controller for the data collected through the map.</>,
                ]}
              />
              <p>Data may also be disclosed to public authorities when the law requires it.</p>
            </>
          ),
        },
        {
          id: "transfers",
          title: "Transfers outside the EU/EEA",
          body: (
            <p>
              Some of these providers have their headquarters or servers outside the European Economic Area, mainly in
              the United States. Such transfers rely on the safeguards provided by the GDPR: the EU–US Data Privacy
              Framework for certified companies, or the Standard Contractual Clauses approved by the European
              Commission.
            </p>
          ),
        },
        {
          id: "rights",
          title: "Your rights",
          body: (
            <>
              <LegalList
                items={[
                  "Access — to receive a copy of the data we hold about you;",
                  "Rectification — to have inaccurate or incomplete data corrected;",
                  "Erasure — to have your data deleted, in the cases provided by law;",
                  "Restriction — to limit processing in certain situations;",
                  "Portability — to receive your data in a structured, commonly used format;",
                  "Objection — to object to processing based on our legitimate interest;",
                  "Withdrawal of consent — at any time, without affecting processing done before the withdrawal.",
                ]}
              />
              <p>
                To exercise any of these rights, write to <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink>.
                We reply within one month. You also have the right to lodge a complaint with the Romanian data
                protection authority, <LegalLink href={anspdcp}>ANSPDCP</LegalLink>.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Security",
          body: (
            <p>
              We use encrypted connections (HTTPS), restricted access to the admin panel and infrastructure providers
              with recognised security measures. No system is completely secure, but we take reasonable steps to
              protect the data.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We may update this policy; the date of the last update is shown at the top of the page.</p>,
        },
      ]
    : [
        {
          id: "operator",
          title: "Cine suntem",
          body: (
            <>
              <p>
                {COMPANY.name} („{COMPANY.shortName}”, „noi”) este operatorul datelor personale prelucrate prin acest site,
                conform Regulamentului (UE) 2016/679 (GDPR).
              </p>
              <CompanyBlock en={false} />
            </>
          ),
        },
        {
          id: "date",
          title: "Ce date prelucrăm și de ce",
          body: (
            <>
              <LegalCard title="Mesajele pe care ni le trimiți">
                <p>
                  Când ne scrii prin formularul de contact, pe email sau la telefon: numele, emailul, telefonul,
                  compania și mesajul tău. Le folosim ca să-ți răspundem și, dacă e cazul, să-ți pregătim o ofertă.
                  Temei: demersuri făcute la cererea ta înainte de încheierea unui contract (art. 6 alin. (1) lit. b
                  GDPR) și interesul nostru legitim de a răspunde solicitărilor (lit. f).
                </p>
              </LegalCard>
              <LegalCard title="Date tehnice">
                <p>
                  Când accesezi site-ul, serverul de găzduire procesează automat adresa IP, tipul de browser, pagina
                  cerută și ora accesării, ca să livreze paginile și să protejeze site-ul împotriva abuzurilor. Nu
                  folosim aceste date ca să te identificăm sau să-ți facem un profil. Temei: interesul nostru legitim de
                  a opera un site sigur (lit. f).
                </p>
              </LegalCard>
              <LegalCard title="Conținut extern (Google Maps)">
                <p>
                  Doar dacă alegi să afișezi harta de pe pagina de contact: Google primește adresa ta IP și poate seta
                  cookie-uri, conform propriei politici. Temei: consimțământul tău (lit. a), pe care îl poți retrage
                  oricând din „Setări cookie”, în subsolul paginii.
                </p>
              </LegalCard>
              <LegalCard title="Conturile editorilor">
                <p>
                  Pentru persoanele care administrează conținutul site-ului: numele, emailul și datele de autentificare
                  în panoul de administrare. Temei: interesul nostru legitim de a administra site-ul în siguranță
                  (lit. f).
                </p>
              </LegalCard>
              <p>
                Nu folosim instrumente de analiză, de marketing sau de publicitate și nu vindem date personale. Ce se
                salvează în browserul tău găsești în <LegalLink href="/politica-cookies">Politica de cookies</LegalLink>.
              </p>
            </>
          ),
        },
        {
          id: "durata",
          title: "Cât timp păstrăm datele",
          body: (
            <LegalList
              items={[
                "Mesajele și corespondența: cât e necesar ca să răspundem și să gestionăm relația comercială, de regulă cel mult 3 ani de la ultima interacțiune.",
                "Contractele și documentele contabile: pe perioadele impuse de legislația fiscală și contabilă.",
                "Datele tehnice (jurnalele serverului): perioade scurte, conform setărilor furnizorului de găzduire.",
                "Alegerea ta privind cookie-urile: 12 luni, în propriul tău browser.",
              ]}
            />
          ),
        },
        {
          id: "destinatari",
          title: "Cine mai are acces la date",
          body: (
            <>
              <p>Lucrăm cu furnizori care prelucrează date în numele nostru, pe bază de contract și cu garanțiile cerute de GDPR:</p>
              <LegalList
                items={[
                  <><strong>Vercel Inc.</strong> (SUA) — găzduirea site-ului și stocarea imaginilor;</>,
                  <><strong>Turso</strong> — baza de date a panoului de administrare (conturile editorilor și conținutul site-ului);</>,
                  <><strong>Resend</strong> — trimiterea emailurilor automate, de exemplu resetarea parolei pentru editori;</>,
                  <><strong>Google</strong> — doar harta de pe pagina de contact și doar dacă alegi să o afișezi; pentru datele colectate prin hartă, Google acționează ca operator independent.</>,
                ]}
              />
              <p>Datele pot fi comunicate și autorităților publice, atunci când legea o cere.</p>
            </>
          ),
        },
        {
          id: "transferuri",
          title: "Transferuri în afara UE/SEE",
          body: (
            <p>
              Unii dintre acești furnizori au sediul sau servere în afara Spațiului Economic European, în special în
              SUA. Transferurile se fac în baza garanțiilor prevăzute de GDPR: Cadrul UE–SUA privind protecția datelor
              (Data Privacy Framework), pentru companiile certificate, sau clauzele contractuale standard aprobate de
              Comisia Europeană.
            </p>
          ),
        },
        {
          id: "drepturi",
          title: "Drepturile tale",
          body: (
            <>
              <LegalList
                items={[
                  "Dreptul de acces — să primești o copie a datelor pe care le deținem despre tine;",
                  "Dreptul la rectificare — să corectăm datele inexacte sau incomplete;",
                  "Dreptul la ștergere — să ștergem datele, în cazurile prevăzute de lege;",
                  "Dreptul la restricționare — să limităm prelucrarea în anumite situații;",
                  "Dreptul la portabilitate — să primești datele într-un format structurat, folosit în mod curent;",
                  "Dreptul la opoziție — să te opui prelucrării bazate pe interesul nostru legitim;",
                  "Dreptul de a-ți retrage consimțământul — oricând, fără să afecteze prelucrarea făcută înainte de retragere.",
                ]}
              />
              <p>
                Pentru oricare dintre aceste drepturi, scrie-ne la <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink>.
                Răspundem în cel mult o lună. Ai și dreptul să depui o plângere la Autoritatea Națională de
                Supraveghere a Prelucrării Datelor cu Caracter Personal (<LegalLink href={anspdcp}>ANSPDCP</LegalLink>).
              </p>
            </>
          ),
        },
        {
          id: "securitate",
          title: "Securitatea datelor",
          body: (
            <p>
              Folosim conexiuni criptate (HTTPS), acces restricționat la panoul de administrare și furnizori de
              infrastructură cu măsuri de securitate recunoscute. Niciun sistem nu e complet sigur, dar luăm măsuri
              rezonabile ca să protejăm datele.
            </p>
          ),
        },
        {
          id: "modificari",
          title: "Modificări ale politicii",
          body: <p>Putem actualiza această politică; data ultimei actualizări este afișată în partea de sus a paginii.</p>,
        },
      ];

  return (
    <LegalPage
      label="Legal"
      title={en ? "Privacy Policy" : "Politica de confidențialitate"}
      updated={en ? `Last updated: ${LEGAL_UPDATED.en}` : `Ultima actualizare: ${LEGAL_UPDATED.ro}`}
      sections={sections}
      backLabel={en ? "Back to the home page" : "Înapoi la pagina principală"}
    />
  );
}
