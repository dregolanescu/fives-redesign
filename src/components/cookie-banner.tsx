"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950 border-t border-white/10"
        >
          <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <p className="text-sm text-white/70 text-center sm:text-left">
              {t.cookieBanner.text}{" "}
              <Link
                href="/politica-cookies"
                className="text-gold underline underline-offset-2 hover:text-gold-light transition-colors"
              >
                {t.cookieBanner.learnMore}
              </Link>
              .
            </p>
            <button
              onClick={accept}
              className="shrink-0 px-5 py-2 text-sm font-medium rounded-full bg-gold text-stone-900 hover:bg-gold-light transition-colors cursor-pointer"
            >
              {t.cookieBanner.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
