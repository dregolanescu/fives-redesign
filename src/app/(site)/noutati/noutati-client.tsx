"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export type ArticleItem = {
  slug: string;
  title: string;
  titleEn: string | null;
  excerpt: string;
  excerptEn: string | null;
  category: string;
  publishedDate: string;
  readTime: number | null;
  featuredImage?: { url: string } | null;
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
  visible: { transition: { staggerChildren: 0.1 } },
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-label text-gold bg-gold-muted px-3 py-1 rounded-full">
      {category}
    </span>
  );
}

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

function FeaturedCard({
  article,
  readArticleLabel,
  readTimeLabel,
  lang,
}: {
  article: ArticleItem;
  readArticleLabel: string;
  readTimeLabel: string;
  lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const imgSrc = article.featuredImage?.url || "/untold.jpg";
  const isEn = lang === "en";
  const title = (isEn && article.titleEn) || article.title;
  const excerpt = (isEn && article.excerptEn) || article.excerpt;

  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp}>
      <Link href={`/noutati/${article.slug}`} className="group block">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CategoryBadge category={article.category} />
              <span className="text-label text-stone-400">
                {article.readTime || 5} min {readTimeLabel}
              </span>
            </div>
            <h2 className="text-title font-bold text-stone-900 group-hover:text-gold-dark transition-colors duration-300">
              {title}
            </h2>
            <p className="text-body-lg text-stone-500 leading-relaxed">{excerpt}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-stone-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(article.publishedDate, lang)}</span>
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
  article,
  lang,
}: {
  article: ArticleItem;
  lang: string;
}) {
  const imgSrc = article.featuredImage?.url || "/untold.jpg";
  const isEn = lang === "en";
  const title = (isEn && article.titleEn) || article.title;
  const excerpt = (isEn && article.excerptEn) || article.excerpt;

  return (
    <motion.div variants={fadeUp}>
      <Link href={`/noutati/${article.slug}`} className="group block h-full">
        <div className="h-full flex flex-col">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <CategoryBadge category={article.category} />
              <span className="text-label text-stone-400">{article.readTime || 5} min</span>
            </div>
            <h3 className="text-title font-bold text-stone-900 group-hover:text-gold-dark transition-colors duration-300 flex-1">
              {title}
            </h3>
            <p className="text-body text-stone-500 line-clamp-2">{excerpt}</p>
            <div className="flex items-center gap-2 text-stone-400 pt-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(article.publishedDate, lang)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function NoutatiClient({ articles }: { articles: ArticleItem[] }) {
  const { t, lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });

  const featured = articles[0];
  const rest = articles.slice(1);

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
              article={featured}
              readArticleLabel={t.news.readArticle}
              readTimeLabel={t.news.readTime}
              lang={lang}
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
                <ArticleCard article={article} lang={lang} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
