"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedStat({
  item,
  index,
  isInView,
}: {
  item: StatItem;
  index: number;
  isInView: boolean;
}) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, item.value, {
      duration: 2,
      ease: [0.25, 0.4, 0.25, 1] as const,
      delay: index * 0.12,
    });
    return () => controls.stop();
  }, [isInView, motionValue, item.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const,
        delay: index * 0.1,
      }}
      className="text-center"
    >
      <div className="flex justify-center">
        <div className="w-8 h-px bg-gold mb-4" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        <motion.span>{rounded}</motion.span>
        <span>{item.suffix}</span>
      </div>
      <p className="text-label text-stone-400 font-sans">{item.label}</p>
    </motion.div>
  );
}

export function CredibilityStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  const { t } = useLanguage();

  const stats: StatItem[] = [
    { value: 30, suffix: "+", label: t.credibility.years },
    { value: 500, suffix: "+", label: t.credibility.events },
    { value: 4, suffix: "M€", label: t.credibility.equipment },
    { value: 40, suffix: "+", label: t.credibility.specialists },
    { value: 4, suffix: "", label: t.credibility.countries },
  ];

  return (
    <section ref={sectionRef} data-theme="dark" className="bg-stone-950 py-16">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((item, index) => (
            <AnimatedStat
              key={item.label}
              item={item}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
