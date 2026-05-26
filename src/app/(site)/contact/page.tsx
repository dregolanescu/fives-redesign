"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [tipEveniment, setTipEveniment] = useState("");
  const { t } = useLanguage();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-80px" });

  const contactInfo = [
    { icon: Mail, label: t.contact.info.email, value: "office@fives.ro", href: "mailto:office@fives.ro" },
    { icon: Phone, label: t.contact.info.phone, value: "(+4) 031 401 1971", href: "tel:+40314011971" },
    { icon: MapPin, label: t.contact.info.address, value: "Bd. Timișoara 173, Sector 6, București", href: null },
    { icon: Clock, label: t.contact.info.hours, value: t.contact.info.hoursValue, href: null },
  ];

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container-wide">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p variants={fadeUp} className="text-label text-gold mb-4">
              {t.contact.label}
            </motion.p>
            <motion.div variants={fadeUp}>
              <div className="accent-line mb-6" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-display font-bold text-stone-900 mb-6">
              {t.contact.heading}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-lg text-stone-500 max-w-2xl">
              {t.contact.body}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding-sm">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Form */}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="lg:col-span-7"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-gold" />
                  </div>
                  <h2 className="text-title font-bold text-stone-900 mb-3">
                    {t.contact.success.heading}
                  </h2>
                  <p className="text-body text-stone-500 max-w-md mx-auto">
                    {t.contact.success.body}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nume + Companie */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm text-stone-700">
                        {t.contact.form.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder={t.contact.form.namePlaceholder}
                        required
                        className="h-11 rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm text-stone-700">
                        {t.contact.form.company}
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder={t.contact.form.companyPlaceholder}
                        className="h-11 rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30"
                      />
                    </div>
                  </motion.div>

                  {/* Email + Telefon */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-stone-700">
                        {t.contact.form.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t.contact.form.emailPlaceholder}
                        required
                        className="h-11 rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm text-stone-700">
                        {t.contact.form.phone}
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t.contact.form.phonePlaceholder}
                        className="h-11 rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30"
                      />
                    </div>
                  </motion.div>

                  {/* Tip eveniment */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <Label className="text-sm text-stone-700">{t.contact.form.eventType}</Label>
                    <Select value={tipEveniment} onValueChange={(val) => setTipEveniment(val ?? "")}>
                      <SelectTrigger className="w-full h-11 rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30">
                        <SelectValue placeholder={t.contact.form.eventTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {t.contact.form.eventTypes.map((type, i) => (
                          <SelectItem key={i} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  {/* Detalii */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <Label htmlFor="details" className="text-sm text-stone-700">
                      {t.contact.form.details}
                    </Label>
                    <Textarea
                      id="details"
                      name="details"
                      placeholder={t.contact.form.detailsPlaceholder}
                      rows={4}
                      className="rounded-lg border-stone-200 focus-visible:border-gold focus-visible:ring-gold/30"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white py-3.5 rounded-full text-sm font-medium hover:bg-stone-800 active:translate-y-px transition-all duration-200"
                    >
                      <Send className="w-4 h-4" />
                      {t.contact.form.submit}
                    </button>
                  </motion.div>
                </form>
              )}
            </motion.div>

            {/* Right: Contact info */}
            <motion.div
              ref={infoRef}
              initial="hidden"
              animate={infoInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="lg:col-span-5"
            >
              <motion.div variants={fadeUp} className="space-y-0">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 py-5 border-b border-stone-200">
                      <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <p className="text-label text-stone-400 mb-1">{item.label}</p>
                        <p className="text-body text-stone-900 font-medium">{item.value}</p>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <motion.a
                        key={item.label}
                        variants={fadeUp}
                        href={item.href}
                        className="block hover:bg-stone-50 -mx-3 px-3 rounded-lg transition-colors"
                      >
                        {content}
                      </motion.a>
                    );
                  }
                  return (
                    <motion.div key={item.label} variants={fadeUp}>
                      {content}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Map */}
              <motion.div
                variants={fadeUp}
                className="mt-8 relative aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden border border-stone-200"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d847.1765798473645!2d25.984179671497166!3d44.421861048636146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b200f24f24eda3%3A0xd2e63dbd84155ac6!2sFive's%20International%20SRL!5e0!3m2!1sen!2sro!4v1774311296389!5m2!1sen!2sro"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FIVE'S International — Locație"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
