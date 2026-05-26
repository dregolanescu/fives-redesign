"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

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

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const { t } = useLanguage();

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative overflow-hidden bg-stone-950 text-white py-24 md:py-32"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/favicon_ideogram_fives-01.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 w-48 md:w-64 opacity-[0.14]"
      />

      <div className="relative max-w-2xl mx-auto text-center px-6">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-12 h-px bg-gold mx-auto mb-8"
        />

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="font-bold text-headline text-white"
        >
          {t.finalCta.heading}
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-body-lg text-stone-400 mt-4 mb-10"
        >
          {t.finalCta.body}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="bg-gold text-stone-900 hover:bg-gold-light rounded-full px-8 py-3 font-medium transition-colors duration-300"
          >
            {t.finalCta.ctaPrimary}
          </Link>
          <Link
            href="/proiecte"
            className="border border-stone-700 text-white hover:border-stone-500 rounded-full px-8 py-3 transition-colors duration-300"
          >
            {t.finalCta.ctaSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
