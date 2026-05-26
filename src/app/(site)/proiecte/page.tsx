"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type CategoryKey = "Toate" | "Festival" | "Corporate" | "Concert" | "Lansare" | "Conferinta";

interface ProjectMeta {
  slug: string;
  category: Exclude<CategoryKey, "Toate">;
  gradient: string;
  heroImage: number | string;
}

const categoryKeys: CategoryKey[] = [
  "Toate",
  "Festival",
  "Corporate",
  "Concert",
  "Lansare",
  "Conferinta",
];

const projectsMeta: ProjectMeta[] = [
  { slug: "untold-festival-2025",    category: "Festival",   gradient: "from-amber-800 via-stone-700 to-stone-900",   heroImage: "/untold.jpg" },
  { slug: "gala-banca-transilvania", category: "Corporate",  gradient: "from-blue-900 via-stone-800 to-stone-900",    heroImage: 1130 },
  { slug: "lansare-samsung",         category: "Lansare",    gradient: "from-stone-600 via-indigo-900 to-stone-900",  heroImage: 390 },
  { slug: "concert-filarmonica",     category: "Concert",    gradient: "from-stone-700 via-amber-900 to-stone-900",   heroImage: 1193 },
  { slug: "tech-conference-2024",    category: "Conferinta", gradient: "from-emerald-900 via-stone-800 to-stone-900", heroImage: 1242 },
  { slug: "electric-castle",         category: "Festival",   gradient: "from-violet-900 via-stone-700 to-stone-900",  heroImage: "/electric_castle.jpg" },
];

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

export default function ProiectePage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Toate");
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, margin: "-60px" });

  const projects = projectsMeta.map((meta, i) => ({
    ...meta,
    title: t.projects.projectTitles[i],
    description: t.projects.projectDescriptions[i],
  }));

  const filteredProjects =
    activeCategory === "Toate"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="pt-32 pb-8 bg-white">
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
                {t.projects.categories[key]}
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
                  <ProjectCard
                    project={project}
                    viewProjectLabel={t.projects.viewProject}
                    categoryLabel={t.projects.categories[project.category]}
                  />
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
  viewProjectLabel,
  categoryLabel,
}: {
  project: { slug: string; title: string; description: string; gradient: string; heroImage: number | string };
  viewProjectLabel: string;
  categoryLabel: string;
}) {
  return (
    <Link href={`/proiecte/${project.slug}`} className="group relative block overflow-hidden rounded-lg">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={typeof project.heroImage === "string" ? project.heroImage : `https://www.fives.ro/files/up/${project.heroImage}_med.jpg`}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-label text-gold mb-2">{categoryLabel}</span>
        <h3 className="text-title text-white font-bold leading-tight">{project.title}</h3>
        <p className="text-sm text-white/60 mt-2 line-clamp-2">{project.description}</p>
        <div className="flex items-center gap-1.5 mt-4 text-gold text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span>{viewProjectLabel}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}