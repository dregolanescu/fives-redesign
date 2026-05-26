"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import type { Lang } from "@/lib/translations";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { href: "/despre", label: t.nav.about },
    { href: "/proiecte", label: t.nav.projects },
    { href: "/noutati", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark section detection via IntersectionObserver
  useEffect(() => {
    const NAV_HEIGHT = 80;
    const activeDarkSections = new Set<Element>();

    const createObserver = () => {
      const bottomMargin = -(window.innerHeight - NAV_HEIGHT);
      return new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeDarkSections.add(entry.target);
            } else {
              activeDarkSections.delete(entry.target);
            }
          });
          setIsOverDark(activeDarkSections.size > 0);
        },
        { rootMargin: `0px 0px ${bottomMargin}px 0px` }
      );
    };

    let observer = createObserver();
    const darkSections = document.querySelectorAll('[data-theme="dark"]');
    darkSections.forEach((section) => observer.observe(section));

    const handleResize = () => {
      observer.disconnect();
      activeDarkSections.clear();
      observer = createObserver();
      const sections = document.querySelectorAll('[data-theme="dark"]');
      sections.forEach((section) => observer.observe(section));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ── Language Toggle ── */
  function LangToggle({ dark }: { dark?: boolean }) {
    return (
      <div
        className={cn(
          "flex items-center gap-0.5 text-xs font-medium rounded-full border px-2.5 py-1.5 transition-all duration-300",
          dark
            ? "bg-white/10 backdrop-blur-[6px] border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white/60"
            : "bg-white/50 backdrop-blur-[6px] border-stone-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_3px_rgba(0,0,0,0.06)] text-stone-400"
        )}
      >
        {(["ro", "en"] as Lang[]).map((l, i) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={cn(
              "uppercase tracking-wide transition-colors duration-150 cursor-pointer px-1",
              lang === l
                ? dark
                  ? "text-white font-semibold"
                  : "text-stone-900 font-semibold"
                : dark
                  ? "hover:text-white/80"
                  : "hover:text-stone-600"
            )}
          >
            {l}
            {i === 0 && (
              <span className={cn("ml-1", dark ? "text-white/20" : "text-stone-300")}>
                /
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? isOverDark
              ? "bg-stone-950/70 backdrop-blur-lg border-b border-white/10"
              : "bg-white/70 backdrop-blur-lg border-b border-stone-200/60"
            : "bg-transparent"
        )}
      >
        <nav className="container-wide flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src={isOverDark ? "/logo_website_fives_white.svg" : "/logo_website_fives_grey.svg"}
              alt="FIVE'S Production"
              width={140}
              height={36}
              className="h-8 md:h-9 w-auto transition-opacity duration-300"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? isOverDark
                        ? "text-white"
                        : "text-stone-900"
                      : isOverDark
                        ? "text-white/70 hover:text-white"
                        : "text-stone-500 hover:text-stone-900"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-4 right-4 h-px bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA + Lang toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <LangToggle dark={isOverDark} />
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-200",
                isOverDark
                  ? "bg-gold text-stone-900 hover:bg-gold-light"
                  : "bg-stone-900 text-white hover:bg-stone-800"
              )}
            >
              {t.nav.cta}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile: Lang toggle + Burger */}
          <div className="lg:hidden flex items-center gap-2">
            <LangToggle dark={isOverDark} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-10 p-2 -mr-2 cursor-pointer"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-stone-900" />
              ) : (
                <Menu
                  className={cn(
                    "w-5 h-5",
                    isOverDark ? "text-white" : "text-stone-900"
                  )}
                />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 py-3 text-lg font-medium transition-colors",
                            isActive
                              ? "text-stone-900"
                              : "text-stone-400 hover:text-stone-900"
                          )}
                        >
                          {isActive && <span className="w-6 h-px bg-gold" />}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-6">
                  <div className="h-px bg-stone-200" />
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"
                  >
                    {t.nav.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <div className="text-center space-y-1">
                    <p className="text-sm text-stone-500">office@fives.ro</p>
                    <p className="text-sm text-stone-500">(+4) 031 401 1971</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
