"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, Lightbulb, MonitorPlay, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const icons = [Volume2, Lightbulb, MonitorPlay, Layers];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export function Capabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <section id="servicii" className="bg-white section-padding">
      <div className="container-wide">
        <div className="max-w-2xl mb-14">
          <span className="text-label text-gold">{t.capabilities.label}</span>
          <h2 className="text-headline font-bold text-stone-900 mt-3 mb-4">
            {t.capabilities.heading}
          </h2>
          <p className="text-body-lg text-stone-500">{t.capabilities.body}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.capabilities.items.map((cap, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={cap.title}
                variants={cardVariants}
                className="group relative p-8 border border-stone-200 rounded-lg hover:border-gold/40 transition-colors duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-lg" />
                <Icon className="w-7 h-7 text-gold mb-5" strokeWidth={1.5} />
                <h3 className="font-bold text-title text-stone-900 mb-3">{cap.title}</h3>
                <p className="text-body text-stone-500 leading-relaxed">{cap.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
