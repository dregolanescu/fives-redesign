"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useConsent } from "@/lib/consent";

/*
 * Cookie consent: first-layer banner (Personalizează / Refuz toate / Accept toate, the last two
 * equally prominent) + a settings dialog that can be reopened anytime from the footer.
 * State lives in src/lib/consent.tsx.
 */

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

const goldButton =
  "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-gold text-stone-900 hover:bg-gold-light transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";
const ghostButton =
  "inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full border border-white/25 text-white hover:border-gold hover:text-gold-light transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950";

export function CookieBanner() {
  const consent = useConsent();
  const showBanner = consent.ready && !consent.decided && !consent.settingsOpen;

  return (
    <>
      <AnimatePresence>{showBanner && <ConsentBanner key="banner" />}</AnimatePresence>
      <AnimatePresence>{consent.settingsOpen && <ConsentSettings key="settings" />}</AnimatePresence>
    </>
  );
}

function ConsentBanner() {
  const { t } = useLanguage();
  const { acceptAll, rejectAll, openSettings } = useConsent();
  const c = t.cookieBanner;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
      role="region"
      aria-label={c.settingsTitle}
    >
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-stone-950/85 backdrop-blur-xl text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 p-5 sm:p-6">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-gold border border-gold/40 rounded-full px-2.5 py-0.5">
              {c.label}
            </span>
            <p className="mt-3 text-lg font-semibold text-white">{c.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{c.text}</p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link href="/politica-cookies" className="text-white/70 underline underline-offset-2 hover:text-gold-light">
                {c.policyLink}
              </Link>
              <Link href="/confidentialitate" className="text-white/70 underline underline-offset-2 hover:text-gold-light">
                {c.privacyLink}
              </Link>
            </p>
          </div>
          {/* Mobile: Reject | Accept side by side, Customize full width below. sm+: one row. */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row lg:shrink-0">
            <button type="button" onClick={openSettings} className={`${ghostButton} col-span-2 order-last sm:order-none`}>
              {c.customize}
            </button>
            <button type="button" onClick={rejectAll} className={goldButton}>
              {c.rejectAll}
            </button>
            <button type="button" onClick={acceptAll} className={goldButton}>
              {c.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConsentSettings() {
  const { t } = useLanguage();
  const consent = useConsent();
  const c = t.cookieBanner;
  const [external, setExternal] = useState(consent.external);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus the dialog, keep Tab inside it, lock page scroll, close on Escape, give focus back on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        consent.closeSettings();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== "Tab" || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-6"
      onClick={consent.closeSettings}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        tabIndex={-1}
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-stone-950/95 backdrop-blur-xl text-white shadow-2xl outline-none"
      >
        <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/10">
          <div>
            <h2 id="cookie-settings-title" className="text-lg font-semibold text-white">
              {c.settingsTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{c.settingsIntro}</p>
          </div>
          <button
            type="button"
            onClick={consent.closeSettings}
            aria-label={c.close}
            className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <CategoryRow title={c.necessaryTitle} description={c.necessaryDesc} checked locked lockedLabel={c.alwaysOn} />
          <CategoryRow
            title={c.externalTitle}
            description={c.externalDesc}
            checked={external}
            onChange={setExternal}
          />
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
            <Link
              href="/politica-cookies"
              onClick={consent.closeSettings}
              className="text-white/70 underline underline-offset-2 hover:text-gold-light"
            >
              {c.policyLink}
            </Link>
            <Link
              href="/confidentialitate"
              onClick={consent.closeSettings}
              className="text-white/70 underline underline-offset-2 hover:text-gold-light"
            >
              {c.privacyLink}
            </Link>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-5 sm:p-6 border-t border-white/10">
          <button type="button" onClick={() => consent.save({ external })} className={ghostButton}>
            {c.save}
          </button>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
            <button type="button" onClick={consent.rejectAll} className={goldButton}>
              {c.rejectAll}
            </button>
            <button type="button" onClick={consent.acceptAll} className={goldButton}>
              {c.acceptAll}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  onChange,
  locked = false,
  lockedLabel,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  locked?: boolean;
  lockedLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/60">{description}</p>
      </div>
      <div className="shrink-0 flex flex-col items-end gap-1.5">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          disabled={locked}
          onClick={() => onChange?.(!checked)}
          className={`relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light ${
            checked ? "bg-gold" : "bg-white/20"
          } ${locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        {locked && lockedLabel && <span className="text-[11px] text-white/50">{lockedLabel}</span>}
      </div>
    </div>
  );
}
