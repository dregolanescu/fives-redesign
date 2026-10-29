"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { projectCategoryLabels } from "@/lib/categories";
import type { ResponsiveImage } from "@/lib/media";

type CategoryKey = "Toate" | "Corporate" | "Festival" | "Live" | "Sportiv" | "Artistic" | "Conferinta";

export interface ProjectItem {
  slug: string;
  category: string;
  year: string;
  image: ResponsiveImage | null;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
}

const categoryKeys: CategoryKey[] = [
  "Toate",
  "Corporate",
  "Festival",
  "Live",
  "Sportiv",
  "Artistic",
  "Conferinta",
];

// Card widths in the grid: 3 columns from lg (max container 1280px), 2 from md, 1 below.
const CARD_SIZES =
  "(min-width: 1280px) 380px, (min-width: 1024px) 31vw, (min-width: 768px) 46vw, 92vw";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25 },
  },
};

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function ProiecteClient({ projects }: { projects: ProjectItem[] }) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Toate");
  const gridRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-60px" });

  const labels = projectCategoryLabels[lang] || projectCategoryLabels.ro;

  // Only offer filters that actually have published projects behind them.
  const availableCategories = categoryKeys.filter(
    (key) => key === "Toate" || projects.some((p) => p.category === key)
  );

  const filteredProjects =
    activeCategory === "Toate"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const selectCategory = (key: CategoryKey) => {
    setActiveCategory(key);
    // If the visitor is already scrolled into the grid (the filter bar is sticky on
    // md+), bring the top of the filtered list back into view instead of leaving
    // them below a now-shorter list.
    const section = gridSectionRef.current;
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <section className="pt-32 pb-8 md:pb-12 bg-white">
        <div className="container-wide">
          <motion.span custom={0} variants={heroVariants} initial="hidden" animate="visible" className="text-label text-gold block">
            {t.projects.label}
          </motion.span>
          <motion.h1 custom={1} variants={heroVariants} initial="hidden" animate="visible" className="text-display font-bold text-stone-900 mt-4">
            {t.projects.heading}
          </motion.h1>
          <motion.p custom={2} variants={heroVariants} initial="hidden" animate="visible" className="text-body-lg text-stone-500 mt-4 max-w-2xl">
            {t.projects.body}
          </motion.p>
          {t.projects.bodyMore && (
            <motion.p custom={2} variants={heroVariants} initial="hidden" animate="visible" className="text-body-lg text-stone-500 mt-3 max-w-2xl">
              {t.projects.bodyMore}
            </motion.p>
          )}
          <motion.div custom={3} variants={heroVariants} initial="hidden" animate="visible" className="accent-line mt-6" />
        </div>
      </section>

      {/*
        Filter bar. The site header is `fixed` and 80px tall (h-20), so on md+ the bar
        sticks right BELOW it (top-20) instead of at top-0, where it used to slide under
        the glass header and leave the black "Toate" pill showing through it.
        On phones the pills wrap onto several rows, so the bar simply scrolls away.
      */}
      <section className="py-8 md:py-4 bg-white border-b border-stone-100 md:sticky md:top-20 md:z-30 md:bg-white/85 md:backdrop-blur-lg">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            className="flex flex-wrap gap-2"
          >
            {availableCategories.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectCategory(key)}
                aria-pressed={activeCategory === key}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === key
                    ? "bg-stone-900 text-white shadow-sm"
                    : "border border-stone-300 text-stone-600 hover:border-gold/40 hover:text-stone-900"
                }`}
              >
                {labels[key] || key}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        ref={gridSectionRef}
        className="pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 bg-white scroll-mt-10 md:scroll-mt-20"
      >
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              ref={gridRef}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.slug} variants={itemVariants}>
                  <ProjectCard project={project} isEn={isEn} labels={labels} viewLabel={t.projects.viewProject} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body text-stone-400">{t.projects.empty}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectCard({
  project,
  isEn,
  labels,
  viewLabel,
}: {
  project: ProjectItem;
  isEn: boolean;
  labels: Record<string, string>;
  viewLabel: string;
}) {
  const title = (isEn && project.titleEn) || project.title;
  const description = (isEn && project.descriptionEn) || project.description;

  return (
    <Link href={`/proiecte/${project.slug}`} className="group relative block overflow-hidden rounded-lg">
      <div className="aspect-[4/3] overflow-hidden bg-stone-200">
        {project.image ? (
          <img
            src={project.image.src}
            srcSet={project.image.srcSet}
            sizes={project.image.srcSet ? CARD_SIZES : undefined}
            alt={project.image.alt || title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-stone-300 flex items-center justify-center">
            <span className="text-stone-500 text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-label text-gold mb-2">{labels[project.category] || project.category}</span>
        <h3 className="text-title text-white font-bold leading-tight">{title}</h3>
        <p className="text-sm text-white/60 mt-2 line-clamp-2">{description}</p>
        <div className="flex items-center gap-1.5 mt-4 text-gold text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>{viewLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
