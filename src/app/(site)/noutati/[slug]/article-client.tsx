"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export type ArticleData = {
  title: string;
  slug: string;
  category: string;
  publishedDate: string;
  readTime: number;
  excerpt: string;
  featuredImageUrl: string | null;
  bodyParagraphs: string[];
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

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
  visible: { transition: { staggerChildren: 0.08 } },
};

function formatDate(dateStr: string, lang: string) {
  try {
    return new Date(dateStr).toLocaleDateString(lang === "en" ? "en-GB" : "ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function ArticleClient({ article }: { article: ArticleData }) {
  const { t, lang } = useLanguage();
  const nd = t.news.detail;

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const heroSrc = article.featuredImageUrl || "/untold.jpg";

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
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
                {formatDate(article.publishedDate, lang)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readTime} min {nd.readSuffix}
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-display font-bold text-stone-900 mb-8"
          >
            {article.title}
          </motion.h1>

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
          {article.bodyParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-body-lg text-stone-600 leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

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
              {article.prev ? (
                <Link
                  href={`/noutati/${article.prev.slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" />
                    {nd.prevArticle}
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {article.prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
            <div className="text-right">
              {article.next ? (
                <Link
                  href={`/noutati/${article.next.slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center justify-end gap-1">
                    {nd.nextArticle}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {article.next.title}
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
