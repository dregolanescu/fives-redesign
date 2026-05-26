"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, Layers } from "lucide-react";
import { projectData } from "./data";

/* ─── Animation Variants ──────────────────────────────────── */

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
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  },
};

/* ─── Helper ──────────────────────────────────────────────── */

function getAdjacentProjects(slug: string) {
  const index = projectData.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projectData[index - 1] : projectData[projectData.length - 1];
  const next = index < projectData.length - 1 ? projectData[index + 1] : projectData[0];
  return { prev, next };
}

/* ─── Page Component ──────────────────────────────────────── */

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = projectData.find((p) => p.slug === slug);
  const { prev, next } = getAdjacentProjects(slug);

  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });
  const galleryInView = useInView(galleryRef, { once: true, margin: "-80px" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-80px" });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-headline font-bold text-stone-900 mb-4">
            Proiect negăsit
          </h1>
          <p className="text-body text-stone-500 mb-8">
            Ne pare rău, proiectul căutat nu există.
          </p>
          <Link
            href="/proiecte"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la proiecte
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-wide pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
              }}
            >
              <Link
                href="/proiecte"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Toate proiectele
              </Link>
            </motion.div>

            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-label text-gold block"
            >
              {project.category}
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-display font-bold text-white mt-3"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* ── Content + Sidebar ────────────────────────────── */}
      <section className="section-padding-sm bg-white">
        <div className="container-narrow">
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16"
          >
            {/* Left — Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">
                  Context
                </h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">
                  {project.context}
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">
                  Provocarea
                </h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>

              <motion.div variants={staggerItem}>
                <h2 className="text-title font-bold text-stone-900 mb-4">
                  Soluția tehnică
                </h2>
                <div className="accent-line-short mb-4" />
                <p className="text-body-lg text-stone-600 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>

            {/* Right — Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                variants={staggerItem}
                className="sticky top-28 space-y-6"
              >
                {/* Category */}
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">Categorie</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">
                    {project.category}
                  </p>
                </div>

                {/* Location */}
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">Locație</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">
                    {project.location}
                  </p>
                </div>

                {/* Year */}
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">An</span>
                  </div>
                  <p className="text-body font-medium text-stone-900">
                    {project.year}
                  </p>
                </div>

                {/* Services */}
                <div className="p-5 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-gold" />
                    <span className="text-label text-stone-400">Servicii</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gold-muted text-gold-dark border border-gold/20"
                      >
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

      {/* ── Gallery ──────────────────────────────────────── */}
      <section className="section-padding-sm bg-stone-50">
        <div className="container-wide">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
            }}
            className="text-headline font-bold text-stone-900 mb-10 text-center"
          >
            Galerie
          </motion.h2>

          <motion.div
            ref={galleryRef}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {project.galleryImages.map((image, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image}
                    alt={`${project.title} — galerie ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────── */}
      <section className="section-padding-sm bg-stone-900">
        <div className="container-wide">
          <motion.div
            ref={metricsRef}
            initial="hidden"
            animate={metricsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {project.metrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={staggerItem}
                className="text-center"
              >
                <span className="block text-display font-bold text-gold-gradient">
                  {metric.value}
                </span>
                <span className="text-label text-stone-400 mt-2 block">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ───────────────────────── */}
      <section className="bg-white border-t border-stone-100">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            {/* Previous */}
            <Link
              href={`/proiecte/${prev.slug}`}
              className="group flex items-center gap-4 py-10 md:pr-10 transition-colors hover:bg-stone-50/50"
            >
              <ArrowLeft className="w-5 h-5 text-stone-400 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-gold" />
              <div>
                <span className="text-label text-stone-400 block">
                  Proiect anterior
                </span>
                <span className="text-title font-bold text-stone-900 group-hover:text-gold transition-colors">
                  {prev.title}
                </span>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/proiecte/${next.slug}`}
              className="group flex items-center justify-end gap-4 py-10 md:pl-10 text-right transition-colors hover:bg-stone-50/50"
            >
              <div>
                <span className="text-label text-stone-400 block">
                  Proiect următor
                </span>
                <span className="text-title font-bold text-stone-900 group-hover:text-gold transition-colors">
                  {next.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
