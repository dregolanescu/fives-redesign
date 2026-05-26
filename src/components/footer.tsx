"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const socialLinks = [
  { href: "https://www.facebook.com/FivesInternational", icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/fivesinternational/", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/fivesinternational/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.youtube.com/@fivesinternational7241", icon: Youtube, label: "YouTube" },
];

const legalLinks = [
  { href: "/politica-cookies", label: "Politica cookies" },
  { href: "/termeni", label: "Termeni și condiții" },
  { href: "/confidentialitate", label: "Confidențialitate" },
  { href: "https://anpc.ro", label: "ANPC", external: true },
  { href: "https://ec.europa.eu/consumers/odr", label: "Soluționarea litigiilor", external: true },
];

export function Footer() {
  const { t } = useLanguage();
  const navLinks = [
    { href: "/despre", label: t.nav.about },
    { href: "/proiecte", label: t.nav.projects },
    { href: "/noutati", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];
  return (
    <footer data-theme="dark" className="bg-stone-950 text-stone-300">
      {/* Main footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <Image
                src="/logo_website_fives_white.svg"
                alt="FIVE'S Production"
                width={140}
                height={36}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed text-stone-400 max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-stone-800 text-stone-400 hover:text-gold hover:border-gold/40 transition-colors duration-200 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-stone-500 mb-4 font-sans">{t.footer.nav}</h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-label text-stone-500 mb-4 font-sans">{t.footer.services}</h4>
            <nav className="flex flex-col gap-2.5">
              {t.footer.serviceItems.map((s) => (
                <Link
                  key={s.slug}
                  href={`/despre#${s.slug}`}
                  className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                >
                  {s.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4">
            <h4 className="text-label text-stone-500 mb-4 font-sans">{t.footer.contact}</h4>
            <div className="space-y-3">
              <a
                href="mailto:office@fives.ro"
                className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors" />
                office@fives.ro
              </a>
              <a
                href="tel:+40314011971"
                className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition-colors duration-200 group"
              >
                <Phone className="w-4 h-4 text-gold/70 group-hover:text-gold transition-colors" />
                (+4) 031 401 1971
              </a>
              <div className="flex items-start gap-3 text-sm text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5 text-gold/70 shrink-0" />
                <span>
                  Bd. Timișoara 173,<br />
                  Sector 6, București
                </span>
              </div>
            </div>

            {/* AV Alliance Badge */}
            <div className="mt-6 pt-6 border-t border-stone-800">
              <p className="text-xs tracking-wide text-stone-500 uppercase">{t.footer.member}</p>
              <a href="https://avalliance.com/" target="_blank" rel="noopener noreferrer" className="inline-block mt-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo_av_alliance.svg" alt="AV Alliance" className="h-8 opacity-80 hover:opacity-100 transition-opacity duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800/60">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy;{" "}{new Date().getFullYear()}{" "}by FIVE&apos;S International
          </p>
          <nav className="flex flex-wrap items-center gap-4">
            {legalLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 hover:text-stone-300 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs text-stone-500 hover:text-stone-300 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
