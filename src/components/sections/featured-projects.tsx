"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const projects = [
  {
    title: "UNTOLD Festival 2025",
    category: "Festival",
    slug: "untold-festival-2025",
    image: "/untold.jpg",
  },
  {
    title: "Electric Castle",
    category: "Festival",
    slug: "electric-castle",
    image: "/electric_castle.jpg",
  },
  {
    title: "Tech Conference 2024",
    category: "Conferință",
    slug: "tech-conference-2024",
    image: "https://www.fives.ro/files/up/1242.jpg",
  },
  {
    title: "Samsung Launch",
    category: "Lansare",
    slug: "lansare-samsung",
    image: "https://www.fives.ro/files/up/390.jpg",
  },
];

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

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

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
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <ProjectCard project={projects[0]} aspectClass="aspect-[16/9]" />
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
            <ProjectCard
              project={projects[1]}
              aspectClass="aspect-[3/4] md:aspect-auto md:h-full"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-1">
            <ProjectCard project={projects[2]} aspectClass="aspect-[4/3]" />
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-1">
            <ProjectCard project={projects[3]} aspectClass="aspect-[4/3]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  aspectClass,
}: {
  project: (typeof projects)[number];
  aspectClass: string;
}) {
  return (
    <Link
      href={`/proiecte/${project.slug}`}
      className={`group relative block overflow-hidden rounded-lg ${aspectClass}`}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <span className="text-label text-gold mb-2">{project.category}</span>
        <h3 className="text-title text-white font-bold">{project.title}</h3>
      </div>
    </Link>
  );
}
