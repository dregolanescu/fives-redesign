"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const projectConfig = [
  { slug: "untold-festival-2025", year: "2025", heroImage: "/untold.jpg" as number | string, galleryImages: [1035, 1057, 1037, 1062] },
  { slug: "gala-banca-transilvania", year: "2024", heroImage: 1130 as number | string, galleryImages: [1107, 1089, 1084, 1080] },
  { slug: "lansare-samsung", year: "2024", heroImage: 390 as number | string, galleryImages: [419, 563, 566, 553] },
  { slug: "concert-filarmonica", year: "2023", heroImage: 1193 as number | string, galleryImages: [302, 319, 355, 366] },
  { slug: "tech-conference-2024", year: "2024", heroImage: 1242 as number | string, galleryImages: [1190, 1104, 1076, 1067] },
  { slug: "electric-castle", year: "2024", heroImage: "/electric_castle.jpg" as number | string, galleryImages: [1160, 612, 1054, 325] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

export function ProjectClient({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const d = t.projects.detail;
  const index = projectConfig.findIndex((p) => p.slug === slug);
  const config = projectConfig[index];
  const detail = t.projects.projectDetails[index];
  const title = t.projects.projectTitles[index];

  const prevIndex = index > 0 ? index - 1 : projectConfig.length - 1;
  const nextIndex = index < projectConfig.length - 1 ? index + 1 : 0;

  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  if (!config || !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-headline font-bold text-stone-900 mb-4">{d.notFound}</h1>
          <p className="text-body text-stone-500 mb-8">{d.notFoundBody}</p>
          <Link href="/proiecte" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {d.backToProjects}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section data-theme="dark" className="relative">
        <div className="relative min-h-[500px] h-[70vh] w-full overflow-hidden">
          <img
            src={typeof config.heroImage === "string" ? config.heroImage : `https://www.fives.ro/files/up/${config.heroImage}.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-wide pb-12 md:pb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}>
              <Link href="/proiecte" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                {d.allProjects}
              </Link>
            </motion.div>
            <motion.span custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-label text-gold block">
              {detail.category}
            </motion.span>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-display font-bold text-white mt-3">
              {title}
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-white">
        <div className="container-narrow">
          <motion.div ref={contentRef} initial="hidden" animate={contentInView ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-10">
              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">{d.sectionContext}</h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">{detail.context}</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">{d.sectionChallenge}</h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">{detail.challenge}</p>
              </motion.div>
              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">{d.sectionSolution}</h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">{detail.solution}</p>
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              <motion.div variants={staggerItem} className="sticky top-28 space-y-6">
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">{d.labelCategory}</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">{detail.category}</p>
                </div>
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">{d.labelLocation}</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">{detail.location}</p>
                </div>
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">{d.labelYear}</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">{config.year}</p>
                </div>
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">{d.labelServices}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {detail.services.map((service) => (
                      <span key={service} className="px-3 py-1 text-xs font-medium rounded-full bg-gold-muted text-gold-dark border border-gold/20">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding-sm bg-stone-50">
        <div className="container-wide">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={galleryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }} className="text-headline font-bold text-stone-900 mb-10 text-center">
            {d.sectionGallery}
          </motion.h2>
          <motion.div ref={galleryRef} initial="hidden" animate={galleryInView ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.galleryImages.map((imageId, i) => (
              <motion.div key={i} variants={staggerItem} className="overflow-hidden rounded-lg">
                <img
                  src={`https://www.fives.ro/files/up/${imageId}_med.jpg`}
                  alt={`${title} — ${i + 1}`}
                  className="aspect-[16/10] w-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section data-theme="dark" className="section-padding-sm bg-stone-900">
        <div className="container-wide">
          <motion.div ref={metricsRef} initial="hidden" animate={metricsInView ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {detail.metrics.map((metric) => (
              <motion.div key={metric.label} variants={staggerItem} className="text-center">
                <span className="block text-display font-bold text-gold-gradient">{metric.value}</span>
                <span className="text-label text-stone-400 mt-2 block">{metric.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-t border-stone-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            <Link href={`/proiecte/${projectConfig[prevIndex].slug}`} className="group flex items-center gap-4 py-10 md:pr-10 transition-colors hover:bg-stone-50/50">
              <ArrowLeft className="w-5 h-5 text-stone-400 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-gold" />
              <div>
                <span className="text-label text-stone-400 block">{d.prevProject}</span>
                <span className="text-title font-bold text-stone-900 group-hover:text-gold transition-colors">{t.projects.projectTitles[prevIndex]}</span>
              </div>
            </Link>
            <Link href={`/proiecte/${projectConfig[nextIndex].slug}`} className="group flex items-center justify-end gap-4 py-10 md:pl-10 text-right transition-colors hover:bg-stone-50/50">
              <div>
                <span className="text-label text-stone-400 block">{d.nextProject}</span>
                <span className="text-title font-bold text-stone-900 group-hover:text-gold transition-colors">{t.projects.projectTitles[nextIndex]}</span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
