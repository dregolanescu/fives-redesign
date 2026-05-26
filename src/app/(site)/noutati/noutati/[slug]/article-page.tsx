"use client";

import { use, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import { allArticles } from "./data";

/* ────────────────────────────────────────────────────────
   Animation variants
   ──────────────────────────────────────────────────────── */

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

/* ────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────── */

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const article = allArticles.find((a) => a.slug === slug) ?? allArticles[0];

  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const bodyRef = useRef<HTMLDivElement>(null);
  const bodyInView = useInView(bodyRef, { once: true, margin: "-80px" });

  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-50px" });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <>
      {/* ── Cover Image ────────────────────────────────── */}
      <div className="relative aspect-[21/9] w-full overflow-hidden mt-20">
        <Image
          src="https://www.fives.ro/files/up/1193.jpg"
          alt={article.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
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
            Înapoi la noutăți
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
                {article.readTime} citire
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
                {article.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">
                {article.author.name}
              </p>
              <p className="text-sm text-stone-500">{article.author.role}</p>
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
          {article.body.map((paragraph, i) => (
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
        {article.gallery && (
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
              Galerie foto
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "https://www.fives.ro/files/up/1206.jpg",
                "https://www.fives.ro/files/up/1193.jpg",
                "https://www.fives.ro/files/up/1152.jpg",
                "https://www.fives.ro/files/up/1133.jpg",
                "https://www.fives.ro/files/up/1164.jpg",
                "https://www.fives.ro/files/up/1184.jpg",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`${article.title} — foto ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
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
            Ai un eveniment în plan?
          </h2>
          <p className="text-body text-stone-500 mb-6 max-w-lg mx-auto">
            Echipa noastră este pregătită să transforme viziunea ta într-o
            experiență tehnică impecabilă.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-stone-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
          >
            Contactează-ne
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Previous / Next Navigation */}
        <nav className="border-t border-stone-200 pt-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Previous */}
            <div>
              {prevArticle ? (
                <Link
                  href={`/noutati/${prevArticle.slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3" />
                    Anterior
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {prevArticle.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Next */}
            <div className="text-right">
              {nextArticle ? (
                <Link
                  href={`/noutati/${nextArticle.slug}`}
                  className="group block"
                >
                  <span className="text-label text-stone-400 mb-2 flex items-center justify-end gap-1">
                    Următor
                    <ArrowRight className="w-3 h-3" />
                  </span>
                  <p className="text-sm font-bold text-stone-700 group-hover:text-gold-dark transition-colors line-clamp-2">
                    {nextArticle.title}
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
