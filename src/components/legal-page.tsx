"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/*
 * Shared layout + typography for the legal pages (cookies, privacy, terms),
 * using the site's own palette (stone + gold) instead of undefined theme tokens.
 *
 * Copy in these pages: avoid HTML entities (&apos;, &ldquo; ...) in multi-line JSX text. Next 16.2's SWC drops
 * the leading space of such a text chunk, gluing it to the previous word ("S.R.L.sau"). Use literal
 * characters (’ “ ” „) or {COMPANY.brand} / {COMPANY.shortName} instead.
 */

export type LegalSection = { id: string; title: string; body: ReactNode };

const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

export function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
  backLabel,
}: {
  label: string;
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  backLabel: string;
}) {
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 bg-white">
      <div className="container-wide">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="text-label text-gold block mb-3">{label}</span>
            <h1 className="text-display font-bold text-stone-900">{title}</h1>
            <p className="mt-4 text-sm text-stone-400">{updated}</p>
            {intro && <div className="mt-8 text-base md:text-lg leading-relaxed text-stone-600">{intro}</div>}
            <div className="accent-line mt-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-12 space-y-12"
          >
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="text-xl md:text-2xl font-semibold text-stone-900 mb-4">
                  {i + 1}. {section.title}
                </h2>
                <div className="space-y-4 text-[15px] md:text-base leading-relaxed text-stone-600">{section.body}</div>
              </section>
            ))}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-stone-200">
            <Link href="/" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
              ← {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalCard({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-5">
      <p className="font-semibold text-stone-900 mb-1.5">{title}</p>
      <div className="text-sm leading-relaxed text-stone-600 space-y-2">{children}</div>
    </div>
  );
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  const className = "text-gold-dark underline underline-offset-2 hover:text-gold";
  if (!external) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const newTab = href.startsWith("http");
  return (
    <a href={href} className={className} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

/** Simple responsive table: stacks into cards on small screens. */
export function LegalTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="rounded-xl border border-stone-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="hidden md:table-header-group bg-stone-50 text-left">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold text-stone-900 align-top">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="block md:table-row border-t border-stone-200 first:border-t-0 md:first:border-t">
              {row.map((cell, c) => (
                <td key={c} className="block md:table-cell px-4 py-1.5 md:py-3 align-top text-stone-600 first:pt-3 last:pb-3">
                  <span className="md:hidden block text-[11px] uppercase tracking-wider text-stone-400">{head[c]}</span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
