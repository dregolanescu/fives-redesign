"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const testimonialAuthors = [
  { name: "Maria Popescu", company: "Banca Transilvania" },
  { name: "Andrei Ionescu", company: "EventPro România" },
  { name: "Elena Vasilescu", company: "Samsung România" },
];

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

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="bg-white section-padding">
      <div className="container-wide">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-label text-gold mb-4"
        >
          {t.testimonials.label}
        </motion.p>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-headline font-bold text-stone-900 mb-12 lg:mb-16"
        >
          {t.testimonials.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.items.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index + 2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="p-8 border border-stone-200 rounded-lg hover:shadow-lg hover:border-gold/20 transition-all duration-300"
            >
              <span className="text-5xl font-bold text-gold/30 leading-none mb-4 block">
                &bdquo;
              </span>
              <p className="text-body text-stone-600 italic">{testimonial.quote}</p>
              <div className="accent-line my-6" />
              <p className="font-medium text-stone-900">{testimonialAuthors[index].name}</p>
              <p className="text-sm text-stone-500">
                {testimonial.role}, {testimonialAuthors[index].company}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
