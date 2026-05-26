"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Wrench, Users, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const icons = [Globe, Wrench, Users, Award];

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

export function WhyFives() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="bg-stone-50 section-padding">
      <div className="container-wide">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-label text-gold mb-4"
        >
          {t.whyFives.label}
        </motion.p>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-headline font-bold text-stone-900 mb-12 lg:mb-16"
        >
          {t.whyFives.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {t.whyFives.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={item.title}
                custom={index + 2}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">{item.title}</h3>
                  <p className="text-stone-500 text-sm mt-1">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
