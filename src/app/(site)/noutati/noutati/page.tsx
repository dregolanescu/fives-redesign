"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const articlesMeta = [
  { slug: "untold-2025-behind-the-scenes", readTime: "8 min", featured: true, heroImage: "/untold.jpg" as number | string },
  { slug: "tendinte-iluminat-2026",         readTime: "5 min", heroImage: 1178 as number | string },
  { slug: "parteneriat-av-alliance",        readTime: "4 min", heroImage: 1099 as number | string },
  { slug: "conferinta-tech-summit",         readTime: "6 min", heroImage: 1190 as number | string },
  { slug: "echipa-noua-membri",             readTime: "3 min", heroImage: 1206 as number | string },
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
  visible: { transition: { staggerChildren: 0.1 } },
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-label text-gold bg-gold-muted px-3 py-1 rounded-full">
      {category}
    </span>
  );
}

function FeaturedCard({
  slug, title, excerpt, category, date, readTime,
  readArticleLabel, readTimeLabel, heroImage,
}: {
  slug: string; title: string; excerpt: string; category: string;
  date: string; readTime: string; readArticleLabel: string;
  readTimeLabel: string; heroImage: number | string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp}>
      <Link href={`/noutati/${slug}`} className="group block">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={typeof heroImage === "string" ? heroImage : `https://www.fives.ro/files/up/${heroImage}.jpg`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CategoryBadge category={category} />
              <span className="text-label text-stone-400">{readTime} {readTimeLabel}</span>
            </div>
            <h2 className="text-title font-bold text-stone-900 group-hover:text-gold-dark transition-colors duration-300">
              {title}
            </h2>
            <p className="text-body-lg text-stone-500 leading-relaxed">{excerpt}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-stone-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{date}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 group-hover:text-gold-dark transition-colors duration-300">
                {readArticleLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleCard({
  slug, title, excerpt, category, date, readTime, heroImage,
}: {
  slug: string; title: string; excerpt: string; category: string;
  date: string; readTime: string; heroImage: number | string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/noutati/${slug}`} className="group block h-full">
        <div className="h-full flex flex-col">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <img
              src={typeof heroImage === "string" ? heroImage : `https://www.fives.ro/files/up/${heroImage}_med.jpg`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <CategoryBadge category={category} />
              <span className="text-label text-stone-400">{readTime}</span>
            </div>
            <h3 className="text-title font-bold text-stone-900 group-hover:text-gold-dark transition-colors duration-300 flex-1">
              {title}
            </h3>
            <p className="text-body text-stone-500 line-clamp-2">{excerpt}</p>
            <div className="flex items-center gap-2 text-stone-400 pt-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function NoutatiPage() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const articles = articlesMeta.map((meta, i) => ({
    ...meta,
    ...t.news.articles[i],
  }));

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <>
      <section className="pt-32 pb-8">
        <div className="container-wide">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-label text-gold mb-4">
              {t.news.label}
            </motion.p>
            <motion.div variants={fadeUp}>
              <div className="accent-line mb-6" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-display font-bold text-stone-900 mb-6">
              {t.news.heading}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-lg text-stone-500 max-w-2xl">
              {t.news.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {featured && (
        <section className="section-padding-sm">
          <div className="container-wide">
            <FeaturedCard
              slug={featured.slug}
              title={featured.title}
              excerpt={featured.excerpt}
              category={featured.category}
              date={featured.date}
              readTime={featured.readTime}
              readArticleLabel={t.news.readArticle}
              readTimeLabel={t.news.readTime}
              heroImage={featured.heroImage}
            />
            <div className="border-b border-stone-200 mt-16" />
          </div>
        </section>
      )}

      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {rest.map((article) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <ArticleCard
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={article.date}
                  readTime={article.readTime}
                  heroImage={article.heroImage}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}