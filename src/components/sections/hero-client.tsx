"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export type HeroSlideData = {
  type: "video" | "image";
  videoUrl: string | null;
  imageUrl: string | null;
  posterUrl: string | null;
  overlayStrength: "none" | "light" | "medium" | "strong";
  /* RO fields */
  subtitle: string | null;
  headline: string;
  description: string | null;
  ctaPrimaryText: string | null;
  ctaSecondaryText: string | null;
  /* EN fields */
  subtitleEn: string | null;
  headlineEn: string | null;
  descriptionEn: string | null;
  ctaPrimaryTextEn: string | null;
  ctaSecondaryTextEn: string | null;
  /* Shared links */
  ctaPrimaryUrl: string | null;
  ctaSecondaryUrl: string | null;
};

export type HeroConfigData = {
  displayMode: "single" | "slider";
  transitionDuration: number;
  transitionType: "crossfade" | "fade-through-black";
  autoplay: boolean;
  showNavigation: boolean;
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

/* Final tuned values from Phase 1 debug panel — applied to VIDEO only */
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

const VIDEO_FILTER = `blur(${V.blur}px) contrast(${V.contrast}) brightness(${V.brightness}) saturate(${V.saturate})`;

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${V.noiseFreq}' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

const OVERLAY_BG = `linear-gradient(to bottom, rgba(0,0,0,${V.overlayOpacity * 0.6}) 0%, rgba(0,0,0,${V.overlayOpacity}) 50%, rgba(0,0,0,${V.overlayOpacity * 1.4}) 100%)`;

/* Per-slide overlay strength values */
const OVERLAY_STRENGTH: Record<string, number> = {
  none: 0,
  light: 0.3,
  medium: 0.5,
  strong: 0.7,
};

function getSlideOverlay(strength: string, isVideo: boolean): string {
  if (isVideo) return OVERLAY_BG; // videos keep the tuned overlay from Phase 1
  const o = OVERLAY_STRENGTH[strength] ?? OVERLAY_STRENGTH.medium;
  return `linear-gradient(to bottom, rgba(0,0,0,${o * 0.7}) 0%, rgba(0,0,0,${o}) 50%, rgba(0,0,0,${o * 1.2}) 100%)`;
}

/* ── Slide background renderer ───────────────────────────── */
function SlideBackground({
  slide,
  videoRef,
}: {
  slide: HeroSlideData;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}) {
  const isVideo = slide.type === "video";
  const videoSrc = slide.videoUrl || "/clip_website_landscape.mp4?v=2";
  const imageSrc = slide.imageUrl;

  if (isVideo) {
    return (
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={slide.posterUrl || undefined}
        className="w-full h-full object-cover object-center"
        style={{ filter: VIDEO_FILTER, transform: `scale(${V.scale})` }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt={slide.headline}
        className="w-full h-full object-cover object-center"
      />
    );
  }

  return null;
}

/* ── Slide text content ──────────────────────────────────── */
function SlideContent({
  slide,
  isInView,
  fallback,
}: {
  slide: HeroSlideData;
  isInView: boolean;
  fallback: { eyebrow: string; heading: string; body: string; ctaPrimary: string; ctaSecondary: string };
}) {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  // Pick the right language — fall back to RO if EN is empty
  const subtitle = (isEn && slide.subtitleEn) || slide.subtitle || fallback.eyebrow;
  const headline = (isEn && slide.headlineEn) || slide.headline || fallback.heading;
  const description = (isEn && slide.descriptionEn) || slide.description || fallback.body;
  const ctaPrimaryText = (isEn && slide.ctaPrimaryTextEn) || slide.ctaPrimaryText || fallback.ctaPrimary;
  const ctaPrimaryUrl = slide.ctaPrimaryUrl || "/contact";
  const ctaSecondaryText = (isEn && slide.ctaSecondaryTextEn) || slide.ctaSecondaryText || fallback.ctaSecondary;
  const ctaSecondaryUrl = slide.ctaSecondaryUrl || "/proiecte";

  return (
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
  );
}

/* ── Crossfade transition variants ───────────────────────── */
const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" as const } },
  exit: { opacity: 0, transition: { duration: 1.2, ease: "easeInOut" as const } },
};

const fadeThroughBlack = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeIn" as const } },
  exit: { opacity: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

/* ── Main Hero component ─────────────────────────────────── */
export function HeroClient({
  slides,
  config,
}: {
  slides: HeroSlideData[];
  config?: HeroConfigData;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const isSlider = (config?.displayMode === "slider") && slides.length > 1;
  const duration = config?.transitionDuration || 8;
  const autoplay = config?.autoplay ?? true;
  const showNav = config?.showNavigation ?? true;
  const transitionVariants = config?.transitionType === "fade-through-black" ? fadeThroughBlack : crossfade;

  const [current, setCurrent] = useState(0);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // Auto-advance for slider mode
  useEffect(() => {
    if (!isSlider || !autoplay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [isSlider, autoplay, duration, slides.length]);

  // Ensure video autoplay works after hydration
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  // Fallback text from translations
  const fallback = {
    eyebrow: t.hero.eyebrow,
    heading: t.hero.heading,
    body: t.hero.body,
    ctaPrimary: t.hero.ctaPrimary,
    ctaSecondary: t.hero.ctaSecondary,
  };

  // Fallback slide only if CMS has zero active slides (safety net)
  const activeSlides: HeroSlideData[] = slides.length > 0 ? slides : [{
    type: "image",
    videoUrl: null,
    imageUrl: null,
    posterUrl: null,
    overlayStrength: "strong" as const,
    subtitle: null,
    headline: t.hero.heading,
    description: null,
    ctaPrimaryText: null,
    ctaSecondaryText: null,
    subtitleEn: null,
    headlineEn: null,
    descriptionEn: null,
    ctaPrimaryTextEn: null,
    ctaSecondaryTextEn: null,
    ctaPrimaryUrl: "/contact",
    ctaSecondaryUrl: "/proiecte",
  }];

  const activeSlide = activeSlides[current] || activeSlides[0];

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background media */}
      <div className="absolute inset-0 z-0 bg-black">
        {isSlider ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={transitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <SlideBackground
                slide={activeSlide}
                videoRef={activeSlide.type === "video" ? videoRef : undefined}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <SlideBackground
            slide={activeSlide}
            videoRef={activeSlide.type === "video" ? videoRef : undefined}
          />
        )}
      </div>

      {/* Layer 2 — Gradient overlay (per-slide strength) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-all duration-1000"
        style={{ background: getSlideOverlay(activeSlide.overlayStrength, activeSlide.type === "video") }}
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
        {isSlider ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
            >
              <SlideContent slide={activeSlide} isInView={true} fallback={fallback} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <SlideContent slide={activeSlide} isInView={isInView} fallback={fallback} />
        )}

        {/* Navigation dots */}
        {isSlider && showNav && (
          <div className="flex items-center gap-2 mt-10">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "bg-gold w-8"
                    : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
