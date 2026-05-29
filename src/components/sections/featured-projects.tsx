"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface FeaturedProjectItem {
  slug: string;
  title: string;
  titleEn: string | null;
  category: string;
  heroImage: string | null;
}

const categoryLabels: Record<string, Record<string, string>> = {
  ro: { Corporate: "Corporate", Festival: "Festival", Live: "Muzica live", Sportiv: "Sportiv", Artistic: "Artistic", Conferinta: "Conferinta" },
  en: { Corporate: "Corporate", Festival: "Festival", Live: "Live Music", Sportiv: "Sports", Artistic: "Artistic", Conferinta: "Conference" },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// Bento layout — only applied when exactly 4 featured projects are present.
const bentoCol = ["md:col-span-2", "md:col-span-1 md:row-span-2", "md:col-span-1", "md:col-span-1"];
const bentoAspect = ["aspect-[16/9]", "aspect-[3/4] md:aspect-auto md:h-full", "aspect-[4/3]", "aspect-[4/3]"];

export function FeaturedProjects({ projects = [] }: { projects?: FeaturedProjectItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { lang, t } = useLanguage();
  const labels = categoryLabels[lang] || categoryLabels.ro;

  // Nothing flagged for the homepage yet — hide the section entirely.
  if (!projects.length) return null;

  const items = projects.slice(0, 4);
  const isBento = items.length === 4;

  return (
    <section className="bg-white section-padding">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-label text-gold">{t.featuredProjects.label}</span>
            <h2 className="text-headline font-bold text-stone-900 mt-3">
              {t.featuredProjects.heading}
            </h2>
          </div>
          <Link
            href="/proiecte"
            className="group inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-gold transition-colors duration-200"
          >
            {t.featuredProjects.viewAll}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={isBento ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"}
        >
          {items.map((p, i) => (
            <motion.div key={p.slug} variants={itemVariants} className={isBento ? bentoCol[i] : ""}>
              <ProjectCard
                project={p}
                title={(lang === "en" && p.titleEn) || p.title}
                categoryLabel={labels[p.category] || p.category}
                aspectClass={isBento ? bentoAspect[i] : "aspect-[4/3]"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  title,
  categoryLabel,
  aspectClass,
}: {
  project: FeaturedProjectItem;
  title: string;
  categoryLabel: string;
  aspectClass: string;
}) {
  return (
    <Link
      href={`/proiecte/${project.slug}`}
      className={`group relative block overflow-hidden rounded-lg bg-stone-200 ${aspectClass}`}
    >
      {project.heroImage ? (
        <img
          src={project.heroImage}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-300" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-label text-gold mb-2">{categoryLabel}</span>
        <h3 className="text-title text-white font-bold">{title}</h3>
      </div>
    </Link>
  );
}
