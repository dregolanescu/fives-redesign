export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'

const articles = [
  {
    title: "UNTOLD 2025 — Cum am construit cea mai mare scenă din istoria festivalului",
    slug: "untold-2025-behind-the-scenes",
    category: "Festival",
    status: "published",
    publishedDate: "2026-03-15",
    excerpt: "Festivalul UNTOLD a reprezentat întotdeauna un reper pentru industria de evenimente din România. Ediția din 2025 nu a făcut excepție — scena principală a fost cel mai ambițios proiect tehnic realizat de echipa FIVE'S.",
    content: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "Festivalul UNTOLD a reprezentat întotdeauna un reper pentru industria de evenimente din România. Ediția din 2025 nu a făcut excepție — ba chiar a ridicat ștacheta la un nivel fără precedent.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Totul a început cu 6 luni înainte de festival. Brieful era simplu în aparență: «Vrem ceva ce nu s-a mai văzut în Europa de Est.» Din acel moment, echipa noastră de proiectanți, ingineri structurali și designeri de lighting au început să transforme această viziune în realitate.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Procesul de montaj a durat 14 zile. Am lucrat cu 280 de tone de echipament — de la structuri de rigging și truss-uri, la sisteme audio line array și peste 1.200 de corpuri de iluminat inteligente.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Am folosit un LED wall curbat de 240 de metri pătrați, alimentat de servere media redundante care procesau conținut în timp real. Rezoluția totală depășea 8K.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Rezultatul? O experiență imersivă care a lăsat fără cuvinte peste 90.000 de spectatori în fiecare seară. UNTOLD 2025 ne-a confirmat încă o dată că producția tehnică de evenimente este, în esență, o artă a preciziei și a colaborării.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
        ],
        direction: "ltr", format: "", indent: 0, version: 1,
      },
    },
    metaTitle: "UNTOLD 2025 Behind the Scenes | FIVE'S",
    metaDescription: "Cum am construit cea mai mare scenă din istoria festivalului UNTOLD.",
  },
  {
    title: "Tendințe în lighting design pentru evenimente corporate în 2026",
    slug: "tendinte-iluminat-2026",
    category: "Tehnologie",
    status: "published",
    publishedDate: "2026-03-02",
    excerpt: "Lighting design-ul pentru evenimente corporate a evoluat dramatic. Descoperă tendințele anului 2026: LED volumetric, proiecții adaptive și palete cromatice sofisticate.",
    content: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "Lighting design-ul pentru evenimente corporate a evoluat dramatic în ultimii ani. Astăzi este o componentă esențială a branding-ului și a experienței de eveniment.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Una dintre cele mai importante tendințe ale anului 2026 este LED-ul volumetric. Barele și panourile LED cu densitate mare de pixeli creează volume și texturi de lumină tridimensională.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Proiecțiile adaptive reprezintă o altă direcție fascinantă. Lumina urmărește literalmente mișcarea prezentatorilor sau a obiectelor de pe scenă.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "La FIVE'S, am implementat deja aceste tendințe. Fiecare eveniment este o oportunitate de a explora limitele tehnologiei și de a crea experiențe de lumină memorabile.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
        ],
        direction: "ltr", format: "", indent: 0, version: 1,
      },
    },
    metaTitle: "Tendințe Lighting Design 2026 | FIVE'S",
    metaDescription: "LED volumetric, proiecții adaptive și palete cromatice sofisticate — tendințele de lighting design 2026.",
  },
  {
    title: "FIVE'S devine partener strategic AV Alliance pentru Europa de Est",
    slug: "parteneriat-av-alliance",
    category: "Companie",
    status: "published",
    publishedDate: "2026-02-18",
    excerpt: "FIVE'S a fost acceptat ca partener strategic al AV Alliance, cea mai prestigioasă rețea globală de companii de producție tehnică de evenimente.",
    content: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "Suntem mândri să anunțăm că FIVE'S a fost acceptat ca partener strategic al AV Alliance, cea mai prestigioasă rețea globală de companii de producție tehnică de evenimente.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "AV Alliance reunește companii care respectă cele mai înalte standarde de calitate, siguranță și profesionalism. Procesul de evaluare a durat aproape un an.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Ce înseamnă pentru clienții noștri? Acces la o rețea globală de echipamente și expertiză. Putem coordona producția tehnică prin partenerii AV Alliance cu aceleași standarde de calitate.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Acest parteneriat confirmă viziunea noastră: să fim nu doar cei mai buni din România, ci un jucător relevant pe piața europeană.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
        ],
        direction: "ltr", format: "", indent: 0, version: 1,
      },
    },
    metaTitle: "FIVE'S Partener AV Alliance | FIVE'S",
    metaDescription: "FIVE'S devine partener strategic AV Alliance — acces la o rețea globală de producție tehnică de evenimente.",
  },
  {
    title: "Tech Summit București — Studiu de caz în producția audio-video",
    slug: "conferinta-tech-summit",
    category: "Corporate",
    status: "published",
    publishedDate: "2026-02-05",
    excerpt: "Tech Summit București 2026: 3.000 de participanți, transmisiune live în 4 țări, zero întreruperi tehnice.",
    content: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "Tech Summit București 2026 a fost una dintre cele mai complexe producții corporate din acest an. Cu 3.000 de participanți și transmisiune live simultană în 4 țări.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Sistemul audio L-Acoustics K2 a fost conceput pentru inteligibilitate perfectă a vorbirii și un mix broadcast de calitate studio.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Producția video a inclus 8 camere mixate prin switcher Grass Valley. Latența medie sub 3 secunde, calitate 1080p60 pentru toate stream-urile.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Evenimentul s-a desfășurat impecabil pe parcursul a două zile, fără nicio întrerupere tehnică.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
        ],
        direction: "ltr", format: "", indent: 0, version: 1,
      },
    },
    metaTitle: "Tech Summit București Case Study | FIVE'S",
    metaDescription: "Studiu de caz: producția audio-video pentru Tech Summit București 2026.",
  },
  {
    title: "Echipa FIVE'S crește: 5 specialiști noi în departamentul tehnic",
    slug: "echipa-noua-membri",
    category: "Companie",
    status: "published",
    publishedDate: "2026-01-20",
    excerpt: "La începutul anului, echipa FIVE'S s-a extins cu cinci noi specialiști în departamentul tehnic.",
    content: {
      root: {
        type: "root",
        children: [
          { type: "paragraph", children: [{ type: "text", text: "La începutul acestui an, echipa FIVE'S s-a extins cu cinci noi specialiști în departamentul tehnic. Fiecare aduce experiență internațională.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Noii colegi acoperă domenii esențiale: inginer de sunet, lighting designer, doi tehnicieni video și un inginer de rigging certificat internațional.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
          { type: "paragraph", children: [{ type: "text", text: "Investiția în oameni este prioritatea noastră numărul unu. Tehnologia evoluează rapid, dar expertiza umană rămâne diferențiatorul care transformă un eveniment bun într-unul extraordinar.", version: 1 }], direction: "ltr", format: "", indent: 0, version: 1, textFormat: 0, textStyle: "" },
        ],
        direction: "ltr", format: "", indent: 0, version: 1,
      },
    },
    metaTitle: "Echipa FIVE'S Crește | FIVE'S",
    metaDescription: "5 specialiști noi s-au alăturat departamentului tehnic FIVE'S.",
  },
]

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    const log: string[] = []

    // Seed articles
    for (const article of articles) {
      const existing = await payload.find({ collection: 'articles', where: { slug: { equals: article.slug } }, limit: 1 })
      if (existing.docs.length > 0) {
        log.push(`⏭ Article "${article.slug}" already exists`)
        continue
      }
      await payload.create({ collection: 'articles', data: article as any })
      log.push(`✅ Created: ${article.title}`)
    }

    // Seed hero slide
    const existingSlides = await payload.find({ collection: 'hero-slides', limit: 1 })
    if (existingSlides.docs.length === 0) {
      await payload.create({
        collection: 'hero-slides',
        data: {
          headline: "Construim experiențe tehnice la cele mai înalte standarde",
          subtitle: "Producție Tehnică de Evenimente",
          description: "Cu peste 30 de ani de experiență în producția tehnică de evenimente, FIVE'S livrează soluții complete de sunet, lumini, video și scenotehnică pentru festivaluri, conferințe și evenimente corporate la nivel internațional.",
          type: "video",
          ctaPrimaryText: "Solicită ofertă",
          ctaPrimaryUrl: "/contact",
          ctaSecondaryText: "Vezi proiecte",
          ctaSecondaryUrl: "/proiecte",
          order: 1,
          active: true,
        } as any,
      })
      log.push('✅ Created hero slide')
    } else {
      log.push('⏭ Hero slide already exists')
    }

    // Seed hero config global
    await payload.updateGlobal({
      slug: 'hero-config',
      data: {
        displayMode: 'single',
        transitionDuration: 8,
        transitionType: 'crossfade',
        autoplay: true,
        showNavigation: true,
      },
    })
    log.push('✅ Updated hero config global')

    return NextResponse.json({ success: true, log })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
