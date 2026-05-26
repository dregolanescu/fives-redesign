"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const articleConfig = [
  { slug: "untold-2025-behind-the-scenes", authorName: "Andrei Popescu", gallery: true, heroImage: "/untold.jpg" as number | string, galleryImages: [1057, 1037, 1062, 576, 1071, 542] },
  { slug: "tendinte-iluminat-2026", authorName: "Maria Ionescu", gallery: false, heroImage: 1178 as number | string, galleryImages: [] as number[] },
  { slug: "parteneriat-av-alliance", authorName: "Radu Marinescu", gallery: false, heroImage: 1099 as number | string, galleryImages: [] as number[] },
  { slug: "conferinta-tech-summit", authorName: "Cristian Dinu", gallery: true, heroImage: 1190 as number | string, galleryImages: [1164, 1133, 1112, 1152, 573, 600] },
  { slug: "echipa-noua-membri", authorName: "Radu Marinescu", gallery: false, heroImage: 1206 as number | string, galleryImages: [] as number[] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export function ArticleClient({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const nd = t.news.detail;

  const index = articleConfig.findIndex((a) => a.slug === slug) ?? 0;
  const config = articleConfig[index];
  const article = t.news.articles[index];
  const detail = t.news.articleDetails[index];

  const prevIndex = index > 0 ? index - 1 : null;
  const nextIndex = index < articleConfig.length - 1 ? index + 1 : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });

  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-50px" });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const heroSrc = typeof config.heroImage === "string" ? config.heroImage : `https://www.fives.ro/files/up/${config.heroImage}.jpg`;

  return (
    <>
      {/* ── Cover Image ────────────────────────────────── */}
      <div data-theme="dark" className="relative min-h-[500px] h-[70vh] w-full overflow-hidden">
        <img
          src={heroSrc}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ── Article Content ────────────────────────────── */}
      <article className="container-narrow py-16 md:py-24">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          }}
          className="mb-12"
        >
          <Link
            href="/noutati"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {nd.backToNews}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="inline-block text-label text-gold bg-gold-muted px-3 py-1 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-stone-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {articleConfig[index].slug === "untold-2025-behind-the-scenes" ? "8" : articleConfig[index].slug === "tendinte-iluminat-2026" ? "5" : articleConfig[index].slug === "parteneriat-av-alliance" ? "4" : articleConfig[index].slug === "conferinta-tech-summit" ? "6" : "3"} min {nd.readSuffix}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-display font-bold text-stone-900 mb-8"
          >
            {article.title}
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center">
              <span className="text-sm font-medium text-stone-600">
                {config.authorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">
                {config.authorName}
              </p>
              <p className="text-sm text-stone-500">{detail.authorRole}</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="accent-line mt-8" />
          </motion.div>
        </motion.header>

        {/* Body */}
        <motion.div
          ref={bodyRef}
          initial="hidden"
          animate={bodyInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="space-y-6 mb-16"
        >
          {detail.body.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-body-lg text-stone-600 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Gallery (optional) */}
        {config.gallery && config.galleryImages.length > 0 && (
          <motion.div
            ref={galleryRef}
            initial="hidden"
            animate={galleryInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-title font-bold text-stone-900 mb-6"
            >
              {nd.galleryTitle}
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {config.galleryImages.map((imageId, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <img
                    src={`https://www.fives.ro/files/up/${imageId}_med.jpg`}
                    alt={`${article.title} — ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center mb-16"
        >
          <h2 className="text-title font-bold text-stone-900 mb-3">
            {nd.ctaTitle}
          </h2>
          <p className="text-body text-stone-500 mb-6 max-w-lg mx-auto">
            {nd.ctaBody}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            {nd.ctaButton}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Previous / Next Navigation */}
        <nav className="border-t border-stone-200 pt-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              {prevIndex !== null ? (
                <Link
                  href={`/noutati/${articleConfig[prevIndex].slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" />
                    {nd.prevArticle}
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {t.news.articles[prevIndex].title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="text-right">
              {nextIndex !== null ? (
                <Link
                  href={`/noutati/${articleConfig[nextIndex].slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center justify-end gap-1">
                    {nd.nextArticle}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {t.news.articles[nextIndex].title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </nav>
      </article>
    </>
  );
}
