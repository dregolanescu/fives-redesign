"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export type HeroSlideData = {
  type: "video" | "image";
  videoUrl: string | null;
  imageUrl: string | null;
  posterUrl: string | null;
  subtitle: string | null;
  headline: string;
  description: string | null;
  ctaPrimaryText: string | null;
  ctaPrimaryUrl: string | null;
  ctaSecondaryText: string | null;
  ctaSecondaryUrl: string | null;
};

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

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export function HeroClient({ slides }: { slides: HeroSlideData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  // Use first active slide, or fall back to translations
  const slide = slides[0] || null;

  const subtitle = slide?.subtitle || t.hero.eyebrow;
  const headline = slide?.headline || t.hero.heading;
  const description = slide?.description || t.hero.body;
  const ctaPrimaryText = slide?.ctaPrimaryText || t.hero.ctaPrimary;
  const ctaPrimaryUrl = slide?.ctaPrimaryUrl || "/contact";
  const ctaSecondaryText = slide?.ctaSecondaryText || t.hero.ctaSecondary;
  const ctaSecondaryUrl = slide?.ctaSecondaryUrl || "/proiecte";

  // Determine background media
  const isVideo = slide?.type === "video" || (!slide && true); // default to video
  const videoSrc = slide?.videoUrl || "/clip_website_landscape.mp4?v=2";
  const imageSrc = slide?.imageUrl || null;
  const posterSrc = slide?.posterUrl || null;

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background media */}
      <div className="absolute inset-0 z-0 bg-black">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc || undefined}
            className="w-full h-full object-cover object-center"
            style={{
              filter: `blur(${V.blur}px) contrast(${V.contrast}) brightness(${V.brightness}) saturate(${V.saturate})`,
              transform: `scale(${V.scale})`,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={headline}
            className="w-full h-full object-cover object-center"
          />
        ) : null}
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
            {subtitle}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-display text-white max-w-2xl"
          >
            {headline}
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="accent-line my-8"
          />

          {description && (
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-body-lg text-white/70 max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            {ctaPrimaryText && (
              <Link
                href={ctaPrimaryUrl}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium bg-gold text-stone-900 rounded-full hover:bg-gold-light transition-all duration-300"
              >
                {ctaPrimaryText}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}

            {ctaSecondaryText && (
              <Link
                href={ctaSecondaryUrl}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white border border-white/30 rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-300"
              >
                {ctaSecondaryText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
