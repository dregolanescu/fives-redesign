"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import { useConsent } from "@/lib/consent";
import { useLanguage } from "@/lib/i18n";

/**
 * Google Maps embed that only loads after "Conținut extern" consent.
 * Until then nothing is requested from Google: the visitor sees a placeholder that explains
 * what happens if the map is shown, a button that gives that consent, and a plain link to
 * open the location in Google Maps instead.
 * Meant to sit in a `relative` box with a fixed aspect ratio (it fills it with `absolute inset-0`).
 */
export function ConsentMap({ src, title, openUrl }: { src: string; title: string; openUrl: string }) {
  const { ready, external, save } = useConsent();
  const { t } = useLanguage();
  const c = t.cookieBanner;

  if (ready && external) {
    return (
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, position: "absolute", inset: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
      style={{
        backgroundColor: "#f5f5f4",
        backgroundImage:
          "linear-gradient(rgba(120,113,108,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,113,108,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <span className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center">
        <MapPin className="w-5 h-5 text-gold-dark" />
      </span>
      <div className="max-w-sm">
        <p className="text-base font-semibold text-stone-900">{c.embedTitle}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{c.embedBody}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={() => save({ external: true })}
          disabled={!ready}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer disabled:opacity-60"
        >
          {c.embedShow}
        </button>
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-gold-dark underline underline-offset-2"
        >
          {c.embedOpen}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
