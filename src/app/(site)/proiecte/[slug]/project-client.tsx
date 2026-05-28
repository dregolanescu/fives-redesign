"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Tag, Layers, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface ProjectData {
  slug: string;
  category: string;
  year: string;
  heroImage: string | null;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  location: string;
  locationEn: string | null;
  context: string;
  contextEn: string | null;
  challenge: string;
  challengeEn: string | null;
  solution: string;
  solutionEn: string | null;
  services: string[];
  metrics: { value: string; label: string; labelEn: string | null }[];
  gallery: { url: string; caption: string | null }[];
}

const categoryLabels: Record<string, Record<string, string>> = {
  ro: { Festival: "Festival", Corporate: "Corporate", Concert: "Concert", Lansare: "Lansare", Conferinta: "Conferinta" },
  en: { Festival: "Festival", Corporate: "Corporate", Concert: "Concert", Lansare: "Launch", Conferinta: "Conference" },
};

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

/* ── Lightbox component ──────────────────────────────── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: { url: string; caption: string | null }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const img = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-black/90" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-10 text-sm text-white/60">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative z-[1] max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={img.url}
            alt={img.caption || ""}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          {img.caption && (
            <p className="mt-3 text-sm text-white/60 text-center">{img.caption}</p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main project detail component ──────────────────── */
export function ProjectClient({ project }: { project: ProjectData }) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const labels = categoryLabels[lang] || categoryLabels.ro;

  const title = (isEn && project.titleEn) || project.title;
  const description = (isEn && project.descriptionEn) || project.description;
  const location = (isEn && project.locationEn) || project.location;
  const context = (isEn && project.contextEn) || project.context;
  const challenge = (isEn && project.challengeEn) || project.challenge;
  const solution = (isEn && project.solutionEn) || project.solution;
  const categoryLabel = labels[project.category] || project.category;

  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : project.gallery.length - 1) : null
    );
  }, [project.gallery.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev < project.gallery.length - 1 ? prev + 1 : 0) : null
    );
  }, [project.gallery.length]);

  return (
    <>
      {/* Hero */}
      <section data-theme="dark" className="relative">
        <div className="relative min-h-[500px] h-[70vh] w-full overflow-hidden">
          {project.heroImage ? (
            <img src={project.heroImage} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-stone-800" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-wide pb-12 md:pb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/proiecte" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                {isEn ? "All projects" : "Toate proiectele"}
              </Link>
            </motion.div>
            <motion.span custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-label text-gold block">
              {categoryLabel}
            </motion.span>
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="text-display font-bold text-white mt-3">
              {title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding-sm bg-white">
        <div className="container-narrow">
          <motion.div ref={contentRef} initial="hidden" animate={contentInView ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-10">
              {context && (
                <motion.div variants={staggerItem}>
                  <h2 className="text-title font-bold text-stone-900 mb-4">{isEn ? "Context" : "Context"}</h2>
                  <div className="accent-line-short mb-4" />
                  <p className="text-body-lg text-stone-600 leading-relaxed">{context}</p>
                </motion.div>
              )}
              {challenge && (
                <motion.div variants={staggerItem}>
                  <h2 className="text-title font-bold text-stone-900 mb-4">{isEn ? "The Challenge" : "Provocarea"}</h2>
                  <div className="accent-line-short mb-4" />
                  <p className="text-body-lg text-stone-600 leading-relaxed">{challenge}</p>
                </motion.div>
              )}
              {solution && (
                <motion.div variants={staggerItem}>
                  <h2 className="text-title font-bold text-stone-900 mb-4">{isEn ? "Our Solution" : "Soluția noastră"}</h2>
                  <div className="accent-line-short mb-4" />
                  <p className="text-body-lg text-stone-600 leading-relaxed">{solution}</p>
                </motion.div>
              )}
            </div>
            <div className="lg:col-span-1">
              <motion.div variants={staggerItem} className="sticky top-28 space-y-6">
                {categoryLabel && (
                  <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-gold" />
                      <span className="text-label text-stone-400">{isEn ? "Category" : "Categorie"}</span>
                    </div>
                    <p className="text-body font-medium text-stone-900">{categoryLabel}</p>
                  </div>
                )}
                {location && (
                  <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gold" />
                      <span className="text-label text-stone-400">{isEn ? "Location" : "Locație"}</span>
                    </div>
                    <p className="text-body font-medium text-stone-900">{location}</p>
                  </div>
                )}
                {project.year && (
                  <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="text-label text-stone-400">{isEn ? "Year" : "An"}</span>
                    </div>
                    <p className="text-body font-medium text-stone-900">{project.year}</p>
                  </div>
                )}
                {project.services.length > 0 && (
                  <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-gold" />
                      <span className="text-label text-stone-400">{isEn ? "Services" : "Servicii"}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span key={service} className="px-3 py-1 text-xs font-medium rounded-full bg-gold-muted text-gold-dark border border-gold/20">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery with lightbox */}
      {project.gallery.length > 0 && (
        <section className="section-padding-sm bg-stone-50">
          <div className="container-wide">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-headline font-bold text-stone-900 mb-10 text-center"
            >
              {isEn ? "Gallery" : "Galerie"}
            </motion.h2>
            <motion.div
              ref={galleryRef}
              initial="hidden"
              animate={galleryInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {project.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.url}
                    alt={img.caption || `${title} — ${i + 1}`}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <section data-theme="dark" className="section-padding-sm bg-stone-900">
          <div className="container-wide">
            <motion.div ref={metricsRef} initial="hidden" animate={metricsInView ? "visible" : "hidden"} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {project.metrics.map((metric) => (
                <motion.div key={metric.label} variants={staggerItem} className="text-center">
                  <span className="block text-display font-bold text-gold-gradient">{metric.value}</span>
                  <span className="text-label text-stone-400 mt-2 block">
                    {(isEn && metric.labelEn) || metric.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Back to projects */}
      <section className="bg-white border-t border-stone-100">
        <div className="container-wide py-10 text-center">
          <Link
            href="/proiecte"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? "Back to all projects" : "Înapoi la toate proiectele"}
          </Link>
        </div>
      </section>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={project.gallery}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
