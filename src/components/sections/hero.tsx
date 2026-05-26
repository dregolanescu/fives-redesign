"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: i * 0.15,
    },
  }),
};

/* Final tuned values from Phase 1 debug panel */
const V = {
  blur: 1,
  contrast: 1.15,
  brightness: 1.1,
  saturate: 0.65,
  scale: 1.0,
  overlayOpacity: 0.1,
  noiseOpacity: 0.09,
  noiseFreq: 0.5,
} as const;

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${V.noiseFreq}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const OVERLAY_BG = `linear-gradient(to bottom, rgba(0,0,0,${V.overlayOpacity * 0.6}) 0%, rgba(0,0,0,${V.overlayOpacity}) 50%, rgba(0,0,0,${V.overlayOpacity * 1.4}) 100%)`;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Video background */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          style={{
            filter: `blur(${V.blur}px) contrast(${V.contrast}) brightness(${V.brightness}) saturate(${V.saturate})`,
            transform: `scale(${V.scale})`,
          }}
        >
          <source src="/clip_website_landscape.mp4?v=2" type="video/mp4" />
        </video>
      </div>

      {/* Layer 2 — Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: OVERLAY_BG }}
      />

      {/* Layer 3 — Noise texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: NOISE_BG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: V.noiseOpacity,
          mixBlendMode: "overlay",
        }}
      />

      {/* Hero content */}
      <div className="container-wide relative z-[3] w-full pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-label text-gold mb-6"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-display text-white max-w-2xl"
          >
            {t.hero.heading}
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="accent-line my-8"
          />

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-body-lg text-white/70 max-w-xl leading-relaxed"
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium bg-gold text-stone-900 rounded-full hover:bg-gold-light transition-all duration-300"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/proiecte"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white border border-white/30 rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-300"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
