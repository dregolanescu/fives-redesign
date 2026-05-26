"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const posts = [
  { id: "1", image: "https://www.fives.ro/files/up/1190.jpg", likes: 142, comments: 8 },
  { id: "2", image: "https://www.fives.ro/files/up/1184.jpg", likes: 217, comments: 14 },
  { id: "3", image: "https://www.fives.ro/files/up/1167.jpg", likes: 189, comments: 11 },
  { id: "4", image: "https://www.fives.ro/files/up/1184.jpg", likes: 98, comments: 5 },
  { id: "5", image: "https://www.fives.ro/files/up/1190.jpg", likes: 163, comments: 9 },
  { id: "6", image: "https://www.fives.ro/files/up/1167.jpg", likes: 204, comments: 17 },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function InstagramFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section data-theme="dark" className="section-padding bg-stone-950">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <Instagram className="w-4 h-4 text-gold" />
              <span className="text-label text-gold">{t.instagram.label}</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-title font-bold text-white">
              {t.instagram.heading}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm text-stone-400 mt-1">
              @fivesinternational
            </motion.p>
          </div>

          <motion.div variants={fadeUp}>
            <a
              href="https://www.instagram.com/fivesinternational/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-900 rounded-full bg-gold hover:bg-gold-light transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
              {t.instagram.follow}
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2"
        >
          {posts.map((post) => (
            <motion.a
              key={post.id}
              variants={fadeUp}
              href="https://www.instagram.com/fivesinternational/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-sm bg-stone-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-5 text-white">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <Heart className="w-4 h-4 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <MessageCircle className="w-4 h-4 fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
