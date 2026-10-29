"use client";

import { useLanguage } from "@/lib/i18n";
import { useConsent } from "@/lib/consent";
import { COMPANY, LEGAL_UPDATED } from "@/lib/company";
import { LegalCard, LegalLink, LegalList, LegalPage, LegalTable, type LegalSection } from "@/components/legal-page";

function SettingsButton({ label }: { label: string }) {
  const { openSettings } = useConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

export function CookiePolicyContent() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const googleCookies = "https://policies.google.com/technologies/cookies";
  const googlePrivacy = "https://policies.google.com/privacy";

  const sections: LegalSection[] = en
    ? [
        {
          id: "what",
          title: "What cookies are",
          body: (
            <p>
              Cookies are small text files that a website saves in your browser. Similar technologies, such as the
              browser’s local storage (localStorage), work in a similar way. In this policy we call all of them
              “cookies”.
            </p>
          ),
        },
        {
          id: "what-we-use",
          title: "What this site uses",
          body: (
            <>
              <LegalCard title="Strictly necessary — always on, no consent needed">
                <p>Without them the site cannot remember your choices or let editors log in.</p>
              </LegalCard>
              <LegalTable
                head={["Name", "Type", "Purpose", "Duration"]}
                rows={[
                  [<code key="n" className="whitespace-nowrap">fives-consent</code>, "Local storage", "Remembers your cookie choice", "12 months, then we ask again"],
                  [<code key="n" className="whitespace-nowrap">lang</code>, "Local storage", "Remembers the language you chose (RO/EN)", "Until you clear it in your browser"],
                  [
                    <code key="n" className="whitespace-nowrap">payload-token</code>,
                    "Cookie",
                    "Login to the admin panel — only for the site's editors, never for visitors",
                    "For the editing session (expires after 2 hours)",
                  ],
                ]}
              />
              <LegalCard title="External content — only with your consent">
                <p>
                  The Google Maps map on the contact page. If you show it, Google receives your IP address and may set
                  its own cookies, under its own rules (
                  <LegalLink href={googleCookies}>how Google uses cookies</LegalLink>,{" "}
                  <LegalLink href={googlePrivacy}>Google Privacy Policy</LegalLink>). Until then, nothing is loaded
                  from Google.
                </p>
              </LegalCard>
              <p>
                We do not use analytics (e.g. Google Analytics), marketing or advertising cookies. If we ever add such
                tools, we will list them here and ask for your consent before they run.
              </p>
            </>
          ),
        },
        {
          id: "consent",
          title: "How you give or withdraw consent",
          body: (
            <>
              <LegalList
                items={[
                  <>On your first visit you see a bar with three options: <strong>Accept all</strong>, <strong>Reject all</strong> and <strong>Customize</strong>. Nothing optional runs until you choose.</>,
                  <>You can change your choice at any time from the <strong>Cookie settings</strong> link at the bottom of every page — withdrawing consent is as easy as giving it.</>,
                  <>The map on the contact page can also be switched on directly with its <strong>Show map</strong> button, which saves your consent for external content.</>,
                  <>Your choice is kept for 12 months, after which we ask again.</>,
                ]}
              />
              <SettingsButton label="Open cookie settings" />
            </>
          ),
        },
        {
          id: "browser",
          title: "Deleting cookies in your browser",
          body: (
            <p>
              You can delete cookies and site data at any time from your browser settings (usually under Privacy or
              Cookies and site data). If you do, the site will ask for your choice again.
            </p>
          ),
        },
        {
          id: "third-party",
          title: "Other external resources",
          body: (
            <p>
              Apart from the Google Maps map (only with your consent), the site does not load resources from third
              parties: the fonts and the 3D element on the About page are served directly by this site.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about cookies or personal data: <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink>.
              More about how we handle personal data in the <LegalLink href="/confidentialitate">Privacy Policy</LegalLink>.
            </p>
          ),
        },
      ]
    : [
        {
          id: "ce-sunt",
          title: "Ce sunt cookie-urile",
          body: (
            <p>
              Cookie-urile sunt fișiere mici de text pe care un site le salvează în browserul tău. Tehnologiile
              similare, cum este spațiul de stocare local al browserului (localStorage), funcționează asemănător. În
              această politică le numim pe toate „cookie-uri”.
            </p>
          ),
        },
        {
          id: "ce-folosim",
          title: "Ce folosește acest site",
          body: (
            <>
              <LegalCard title="Strict necesare — mereu active, nu necesită acord">
                <p>Fără ele site-ul nu poate reține alegerile tale și nici nu le permite editorilor să se autentifice.</p>
              </LegalCard>
              <LegalTable
                head={["Denumire", "Tip", "Scop", "Durată"]}
                rows={[
                  [<code key="n" className="whitespace-nowrap">fives-consent</code>, "Stocare locală", "Reține alegerea ta privind cookie-urile", "12 luni, apoi te întrebăm din nou"],
                  [<code key="n" className="whitespace-nowrap">lang</code>, "Stocare locală", "Reține limba aleasă (RO/EN)", "Până o ștergi din browser"],
                  [
                    <code key="n" className="whitespace-nowrap">payload-token</code>,
                    "Cookie",
                    "Autentificarea în panoul de administrare — doar pentru editorii site-ului, niciodată pentru vizitatori",
                    "Pe durata sesiunii de lucru (expiră după 2 ore)",
                  ],
                ]}
              />
              <LegalCard title="Conținut extern — doar cu acordul tău">
                <p>
                  Harta Google Maps de pe pagina de contact. Dacă o afișezi, Google primește adresa ta IP și poate
                  seta propriile cookie-uri, după regulile sale (
                  <LegalLink href={googleCookies}>cum folosește Google cookie-urile</LegalLink>,{" "}
                  <LegalLink href={googlePrivacy}>Politica de confidențialitate Google</LegalLink>). Până atunci, nu se
                  încarcă nimic de la Google.
                </p>
              </LegalCard>
              <p>
                Nu folosim cookie-uri de analiză (de exemplu Google Analytics), de marketing sau de publicitate. Dacă
                vom adăuga vreodată astfel de instrumente, le vom trece aici și îți vom cere acordul înainte să pornească.
              </p>
            </>
          ),
        },
        {
          id: "acord",
          title: "Cum îți dai sau îți retragi acordul",
          body: (
            <>
              <LegalList
                items={[
                  <>La prima vizită vezi o bară cu trei opțiuni: <strong>Accept toate</strong>, <strong>Refuz toate</strong> și <strong>Personalizează</strong>. Nimic opțional nu pornește până nu alegi.</>,
                  <>Îți poți schimba oricând alegerea din linkul <strong>Setări cookie</strong> din subsolul fiecărei pagini — retragerea acordului e la fel de simplă ca acordarea lui.</>,
                  <>Harta de pe pagina de contact poate fi pornită și direct, din butonul <strong>Afișează harta</strong>, care salvează acordul pentru conținut extern.</>,
                  <>Alegerea se păstrează 12 luni, după care te întrebăm din nou.</>,
                ]}
              />
              <SettingsButton label="Deschide setările cookie" />
            </>
          ),
        },
        {
          id: "browser",
          title: "Ștergerea cookie-urilor din browser",
          body: (
            <p>
              Poți șterge oricând cookie-urile și datele salvate de site din setările browserului (de regulă la
              Confidențialitate sau Cookie-uri și date ale site-urilor). După aceea, site-ul îți va cere din nou
              alegerea.
            </p>
          ),
        },
        {
          id: "terti",
          title: "Alte resurse externe",
          body: (
            <p>
              În afară de harta Google Maps (doar cu acordul tău), site-ul nu încarcă resurse de la terți: fonturile și
              elementul 3D de pe pagina Despre noi sunt servite direct de pe acest site.
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Întrebări despre cookie-uri sau date personale: <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink>.
              Mai multe despre cum folosim datele personale găsești în{" "}
              <LegalLink href="/confidentialitate">Politica de confidențialitate</LegalLink>.
            </p>
          ),
        },
      ];

  return (
    <LegalPage
      label="Legal"
      title={en ? "Cookie Policy" : "Politica de cookies"}
      updated={en ? `Last updated: ${LEGAL_UPDATED.en}` : `Ultima actualizare: ${LEGAL_UPDATED.ro}`}
      intro={
        en ? (
          <p>
            This policy explains what this site saves on your device, why, and how you can change your choice. The
            site is operated by {COMPANY.name} (VAT ID {COMPANY.cui}).
          </p>
        ) : (
          <p>
            Această politică explică ce salvează acest site pe dispozitivul tău, de ce și cum îți poți schimba alegerea.
            Site-ul este operat de {COMPANY.name} (CUI {COMPANY.cui}).
          </p>
        )
      }
      sections={sections}
      backLabel={en ? "Back to the home page" : "Înapoi la pagina principală"}
    />
  );
}
