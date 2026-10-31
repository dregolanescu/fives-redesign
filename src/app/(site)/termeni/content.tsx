"use client";

import { useLanguage } from "@/lib/i18n";
import { COMPANY, LEGAL_UPDATED, displayPhone } from "@/lib/company";
import { LegalLink, LegalPage, type LegalSection } from "@/components/legal-page";

export function TermsContent() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const contactBlock = (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-5 text-sm space-y-1">
      <p className="font-semibold text-stone-900">{COMPANY.name}</p>
      <p>
        {en ? "VAT ID" : "CUI"} {COMPANY.cui} · {en ? "Trade Register no." : "Nr. Reg. Com."} {COMPANY.regCom}
      </p>
      <p>{en ? COMPANY.addressEn : COMPANY.addressRo}</p>
      <p>
        Email: <LegalLink href={`mailto:${COMPANY.email}`}>{COMPANY.email}</LegalLink> · {en ? "Phone" : "Telefon"}:{" "}
        <LegalLink href={COMPANY.phoneHref}>{displayPhone(lang)}</LegalLink>
      </p>
    </div>
  );

  const sections: LegalSection[] = en
    ? [
        {
          id: "general",
          title: "General information",
          body: (
            <p>
              This website is operated by {COMPANY.name}, VAT ID {COMPANY.cui}, Trade Register no. {COMPANY.regCom},
              with its registered office at {COMPANY.addressEn}. By using the site you accept the terms below. If you
              do not agree with them, please do not use the site.
            </p>
          ),
        },
        {
          id: "services",
          title: "Our services",
          body: (
            <p>
              {COMPANY.brand} provides technical production services for events — sound, lighting, video
              and stage engineering. The information on this site is for presentation purposes only and is not a
              binding offer. No contracts are concluded and nothing is sold online: every commitment is agreed in
              contractual documents signed by both parties, and prices and equipment availability are confirmed
              following a formal request for proposal.
            </p>
          ),
        },
        {
          id: "ip",
          title: "Intellectual property",
          body: (
            <p>
              The content of this site — texts, images, graphics, logos, videos and audiovisual materials — belongs
              to {COMPANY.name} or to its licensors and is protected by Romanian and international copyright law.
              Reproducing, distributing, modifying or using any material from this site for commercial purposes
              without prior written consent from {COMPANY.brand} is prohibited.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Limitation of liability",
          body: (
            <p>
              We do our best to keep the information on the site accurate and up to date, but we cannot guarantee
              that it is complete or current at all times, and we may change it without notice. To the extent
              permitted by law, {COMPANY.brand} is not liable for damage resulting from the use of the site
              or from the inability to use it.
            </p>
          ),
        },
        {
          id: "links",
          title: "External links",
          body: (
            <p>
              The site may contain links to other websites. We have no control over their content or their privacy
              practices and are not responsible for them.
            </p>
          ),
        },
        {
          id: "law",
          title: "Applicable law",
          body: (
            <p>
              These terms are governed by Romanian law. Any dispute arising from the use of the site will be settled
              by the competent courts in Romania.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: (
            <p>
              We may change these terms at any time; the date of the last update is shown at the top of the page.
              Personal data is handled as described in the <LegalLink href="/confidentialitate">Privacy Policy</LegalLink>{" "}
              and the <LegalLink href="/politica-cookies">Cookie Policy</LegalLink>.
            </p>
          ),
        },
        { id: "contact", title: "Contact", body: contactBlock },
      ]
    : [
        {
          id: "informatii",
          title: "Informații generale",
          body: (
            <p>
              Acest site este operat de {COMPANY.name}, CUI {COMPANY.cui}, Nr. Reg. Com. {COMPANY.regCom}, cu sediul
              în {COMPANY.addressRo}. Folosind site-ul, accepți termenii de mai jos. Dacă nu ești de acord cu ei, te
              rugăm să nu folosești site-ul.
            </p>
          ),
        },
        {
          id: "servicii",
          title: "Serviciile noastre",
          body: (
            <p>
              {COMPANY.brand} oferă servicii de producție tehnică pentru evenimente — sunet, lumini, video
              și scenotehnică. Informațiile de pe acest site au rol de prezentare și nu reprezintă o ofertă fermă. Pe
              site nu se încheie contracte și nu se vinde nimic online: orice angajament se stabilește prin documente
              contractuale semnate de ambele părți, iar prețurile și disponibilitatea echipamentelor se confirmă în
              urma unei cereri de ofertă.
            </p>
          ),
        },
        {
          id: "proprietate",
          title: "Proprietate intelectuală",
          body: (
            <p>
              Conținutul acestui site — texte, imagini, grafică, logo-uri, clipuri video și materiale audiovizuale —
              aparține {COMPANY.name} sau deținătorilor de licențe și este protejat de legislația română și
              internațională privind dreptul de autor. Este interzisă reproducerea, distribuirea, modificarea sau
              folosirea în scop comercial a oricărui material de pe site fără acordul scris prealabil al {COMPANY.brand}.
            </p>
          ),
        },
        {
          id: "raspundere",
          title: "Limitarea răspunderii",
          body: (
            <p>
              Facem tot ce putem ca informațiile de pe site să fie corecte și actuale, dar nu putem garanta că sunt
              complete sau la zi în orice moment și le putem modifica fără notificare. În limitele permise de lege,
              {COMPANY.brand} nu răspunde pentru prejudicii rezultate din folosirea site-ului sau din
              imposibilitatea de a-l folosi.
            </p>
          ),
        },
        {
          id: "linkuri",
          title: "Linkuri externe",
          body: (
            <p>
              Site-ul poate conține linkuri către alte site-uri. Nu avem control asupra conținutului sau a practicilor
              lor de confidențialitate și nu răspundem pentru acestea.
            </p>
          ),
        },
        {
          id: "legislatie",
          title: "Legislația aplicabilă",
          body: (
            <p>
              Acești termeni sunt guvernați de legislația română. Orice litigiu legat de folosirea site-ului se
              soluționează de instanțele competente din România.
            </p>
          ),
        },
        {
          id: "modificari",
          title: "Modificarea termenilor",
          body: (
            <p>
              Putem modifica oricând acești termeni; data ultimei actualizări este afișată în partea de sus a
              paginii. Datele personale sunt tratate conform <LegalLink href="/confidentialitate">Politicii de
              confidențialitate</LegalLink> și <LegalLink href="/politica-cookies">Politicii de cookies</LegalLink>.
            </p>
          ),
        },
        { id: "contact", title: "Contact", body: contactBlock },
      ];

  return (
    <LegalPage
      label="Legal"
      title={en ? "Terms & Conditions" : "Termeni și condiții"}
      updated={en ? `Last updated: ${LEGAL_UPDATED.en}` : `Ultima actualizare: ${LEGAL_UPDATED.ro}`}
      sections={sections}
      backLabel={en ? "Back to the home page" : "Înapoi la pagina principală"}
    />
  );
}
