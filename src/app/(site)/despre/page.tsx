"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Volume2,
  Lightbulb,
  MonitorPlay,
  Layers,
  Target,
  Handshake,
  Sparkles,
  Leaf,
  Award,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const capabilityIcons = [Volume2, Lightbulb, MonitorPlay, Layers];
const capabilitySlugs = ["sunet", "lumini", "video", "scenotehnica"];
const capabilityHighlights = [
  ["L-Acoustics K2 / A15", "DiGiCo SD Series", "Shure Axient Digital"],
  ["Robe ESPRITE / T1", "Ayrton Perseo", "grandMA3 Control"],
  ["Barco UDX / UDM", "Disguise d3", "ROE Visual LED"],
  ["Prolyte Structures", "CM Lodestar Motors", "Efecte speciale certificate"],
];

const teamMemberNames = [
  "Alexandru Popescu",
  "Maria Ionescu",
  "Cristian Dumitrescu",
  "Elena Vasilescu",
  "Andrei Marinescu",
  "Diana Georgescu",
];

const principleIcons = [Target, Handshake, Sparkles, Leaf];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      delay: i * 0.15,
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

function PageHero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="pt-32 pb-16">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-label text-gold mb-6">
            {t.about.hero.label}
          </motion.p>
          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-display font-bold text-stone-900">
            {t.about.hero.heading}
          </motion.h1>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="accent-line my-8" />
          <motion.p custom={3} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-body-lg text-stone-500 max-w-2xl leading-relaxed">
            {t.about.hero.body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="section-padding">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-label text-gold mb-4">
              {t.about.story.label}
            </motion.p>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-headline font-bold text-stone-900 mb-6">
              {t.about.story.heading}
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-5">
              <p className="text-body text-stone-600 leading-relaxed">{t.about.story.p1}</p>
              <p className="text-body text-stone-600 leading-relaxed">{t.about.story.p2}</p>
              <p className="text-body text-stone-600 leading-relaxed">{t.about.story.p3}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.95, x: 40 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border border-gold/20 rounded-2xl" />
              <div
                className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(145deg, #292524 0%, #1c1917 40%, #0c0a09 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 20%, rgba(212,168,67,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(212,168,67,0.08) 0%, transparent 50%)
                    `,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-12 h-px bg-gold/40 mb-4" />
                  <span className="text-label text-stone-500">Company Photo</span>
                  <div className="w-12 h-px bg-gold/40 mt-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section id="servicii" className="bg-stone-50 section-padding">
      <div className="container-wide">
        <div className="max-w-2xl mb-14">
          <span className="text-label text-gold">{t.about.capabilities.label}</span>
          <h2 className="text-headline font-bold text-stone-900 mt-3 mb-4">
            {t.about.capabilities.heading}
          </h2>
          <p className="text-body-lg text-stone-500">{t.about.capabilities.body}</p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {t.about.capabilities.items.map((cap, i) => {
            const Icon = capabilityIcons[i];
            const slug = capabilitySlugs[i];
            const highlights = capabilityHighlights[i];
            return (
              <motion.div
                key={cap.title}
                id={slug}
                variants={staggerItem}
                className="group relative p-8 lg:p-10 bg-white border border-stone-200 rounded-lg hover:border-gold/40 transition-colors duration-300 scroll-mt-28"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg" />
                <Icon className="w-8 h-8 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-bold text-title text-stone-900 mb-3">{cap.title}</h3>
                <p className="text-body text-stone-500 leading-relaxed mb-5">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span key={item} className="inline-block px-3 py-1 text-xs font-medium text-stone-600 bg-stone-100 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="section-padding">
      <div className="container-wide">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-label text-gold mb-4">
          {t.about.team.label}
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-headline font-bold text-stone-900 mb-4">
          {t.about.team.heading}
        </motion.h2>
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-body-lg text-stone-500 max-w-2xl mb-12 lg:mb-16">
          {t.about.team.body}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {teamMemberNames.map((name, i) => (
            <motion.div key={name} variants={staggerItem} className="text-center">
              <div className="relative mx-auto w-28 h-28 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-stone-200 to-stone-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-label text-stone-400 text-[10px]">Foto</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-gold/30 transition-colors duration-300" />
              </div>
              <h3 className="font-bold text-sm font-medium text-stone-900">{name}</h3>
              <p className="text-xs text-stone-500 mt-1">{t.about.team.memberRoles[i]}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="section-padding-sm bg-stone-50">
      <div className="container-wide">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-label text-gold mb-4">
          {t.about.principles.label}
        </motion.p>
        <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-headline font-bold text-stone-900 mb-12 lg:mb-16">
          {t.about.principles.heading}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t.about.principles.items.map((item, i) => {
            const Icon = principleIcons[i];
            return (
              <motion.div key={item.title} variants={staggerItem}>
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-bold text-lg font-medium text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AffiliationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section ref={ref} className="section-padding-sm">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="relative p-10 lg:p-14 border border-stone-200 rounded-2xl text-center"
        >
          <div className="absolute top-0 left-0 w-16 h-px bg-gold/40" />
          <div className="absolute top-0 left-0 w-px h-16 bg-gold/40" />
          <div className="absolute bottom-0 right-0 w-16 h-px bg-gold/40" />
          <div className="absolute bottom-0 right-0 w-px h-16 bg-gold/40" />

          <Award className="w-10 h-10 text-gold mx-auto mb-6" strokeWidth={1.5} />
          <div className="px-4 py-2 border border-stone-300 rounded-md inline-block mb-6">
            <span className="text-label text-stone-700 tracking-widest">AV ALLIANCE</span>
          </div>
          <h3 className="font-bold text-title text-stone-900 mb-4">{t.about.avAlliance.label}</h3>
          <p className="text-body text-stone-500 max-w-xl mx-auto leading-relaxed">{t.about.avAlliance.body}</p>
        </motion.div>
      </div>
    </section>
  );
}

function BottomCta() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section ref={ref} data-theme="dark" className="bg-stone-950 text-white py-24 md:py-32">
      <div className="max-w-2xl mx-auto text-center px-6">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-12 h-px bg-gold mx-auto mb-8" />
        <motion.h2 custom={1} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="font-bold text-headline text-white">
          {t.about.cta.heading}
        </motion.h2>
        <motion.p custom={2} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-body-lg text-stone-400 mt-4 mb-10">
          {t.about.cta.body}
        </motion.p>
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 bg-gold text-stone-900 hover:bg-gold-light rounded-full px-8 py-3.5 font-medium transition-colors duration-300"
          >
            {t.about.cta.button}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function DespreNoiPage() {
  return (
    <>
      <PageHero />
      <StorySection />
      <CapabilitiesSection />
      <TeamSection />
      <ValuesSection />
      <AffiliationsSection />
      <BottomCta />
    </>
  );
}
