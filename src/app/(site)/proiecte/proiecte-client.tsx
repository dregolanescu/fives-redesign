"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type CategoryKey = "Toate" | "Festival" | "Corporate" | "Concert" | "Lansare" | "Conferinta";

export interface ProjectItem {
  slug: string;
  category: string;
  year: string;
  heroImage: string | null;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
}

const categoryKeys: CategoryKey[] = [
  "Toate",
  "Festival",
  "Corporate",
  "Concert",
  "Lansare",
  "Conferinta",
];

const categoryLabels: Record<string, Record<string, string>> = {
  ro: { Toate: "Toate", Festival: "Festival", Corporate: "Corporate", Concert: "Concert", Lansare: "Lansare", Conferinta: "Conferinta" },
  en: { Toate: "All", Festival: "Festival", Corporate: "Corporate", Concert: "Concert", Lansare: "Launch", Conferinta: "Conference" },
};

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
  const isInView = useInView(gridRef, { once: true, margin: "-60px" });

  const labels = categoryLabels[lang] || categoryLabels.ro;

  const filteredProjects =
    activeCategory === "Toate"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-8 bg-white">
        <div className="container-wide">
          <motion.span custom={0} variants={heroVariants} initial="hidden" animate="visible" className="text-label text-gold block">
            {isEn ? "Portfolio" : t.projects.label}
          </motion.span>
          <motion.h1 custom={1} variants={heroVariants} initial="hidden" animate="visible" className="text-display font-bold text-stone-900 mt-4">
            {isEn ? "Our Projects" : t.projects.heading}
          </motion.h1>
          <motion.p custom={2} variants={heroVariants} initial="hidden" animate="visible" className="text-body-lg text-stone-500 mt-4 max-w-2xl">
            {isEn
              ? "Discover events brought to life by FIVE'S — from festival stages to corporate galas."
              : t.projects.body}
          </motion.p>
          <motion.div custom={3} variants={heroVariants} initial="hidden" animate="visible" className="accent-line mt-6" />
        </div>
      </section>

      <section className="py-8 bg-white sticky top-0 z-30 border-b border-stone-100">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            className="flex flex-wrap gap-2"
          >
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
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

      <section className="section-padding-sm bg-white">
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
                  <ProjectCard project={project} isEn={isEn} labels={labels} viewLabel={isEn ? "View project" : t.projects.viewProject} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-body text-stone-400">
                {isEn ? "No projects in this category yet." : t.projects.empty}
              </p>
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
        {project.heroImage ? (
          <img
            src={project.heroImage}
            alt={title}
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
