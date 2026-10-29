"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Cookie / external-content consent (no third-party consent platform).
 *
 * Categories
 * - necessary: always on (language choice, this consent record, CMS login cookie for editors)
 * - external:  third-party embeds that can set their own cookies (Google Maps on /contact).
 *              Off until the visitor opts in.
 *
 * The choice is stored in localStorage with a version and a timestamp and is asked again
 * after CONSENT_MAX_AGE_DAYS or when CONSENT_VERSION changes (e.g. a new category is added).
 */

export const CONSENT_STORAGE_KEY = "fives-consent";
const LEGACY_KEY = "cookie-consent"; // old one-button banner ("OK") — not a valid choice, ask again
export const CONSENT_VERSION = 1;
const CONSENT_MAX_AGE_DAYS = 365;

type StoredConsent = { v: number; external: boolean; ts: string };

type ConsentContextValue = {
  /** true once the stored choice has been read (avoids loading embeds before we know) */
  ready: boolean;
  /** true when the visitor has made a (still valid) choice */
  decided: boolean;
  /** consent for third-party embeds (Google Maps) */
  external: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (prefs: { external: boolean }) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  ready: false,
  decided: false,
  external: false,
  acceptAll: () => {},
  rejectAll: () => {},
  save: () => {},
  settingsOpen: false,
  openSettings: () => {},
  closeSettings: () => {},
});

/* ---------- a tiny external store over localStorage ---------- */

// Snapshot used on the server and during hydration: "we don't know yet".
const NOT_READ = "__not-read__";
// Used only when localStorage refuses writes (some private modes): the choice still applies for this visit.
let memoryFallback: string | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): string | null {
  if (memoryFallback !== null) return memoryFallback;
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return NOT_READ;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Keep several open tabs in sync (the storage event only fires in the *other* tabs).
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY || e.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function writeConsent(next: StoredConsent) {
  const raw = JSON.stringify(next);
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, raw);
    localStorage.removeItem(LEGACY_KEY);
    memoryFallback = null;
  } catch {
    memoryFallback = raw;
  }
  listeners.forEach((notify) => notify());
}

function parseConsent(raw: string | null): StoredConsent | null {
  if (!raw || raw === NOT_READ) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed.v !== CONSENT_VERSION || typeof parsed.external !== "boolean" || typeof parsed.ts !== "string") return null;
    const ageDays = (Date.now() - new Date(parsed.ts).getTime()) / 86_400_000;
    if (!Number.isFinite(ageDays) || ageDays > CONSENT_MAX_AGE_DAYS) return null;
    return { v: parsed.v, external: parsed.external, ts: parsed.ts };
  } catch {
    return null;
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = raw !== NOT_READ;
  const stored = useMemo(() => parseConsent(raw), [raw]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const save = useCallback((prefs: { external: boolean }) => {
    writeConsent({ v: CONSENT_VERSION, external: prefs.external, ts: new Date().toISOString() });
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ready,
      decided: stored !== null,
      external: stored?.external ?? false,
      acceptAll: () => save({ external: true }),
      rejectAll: () => save({ external: false }),
      save,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [ready, stored, save, settingsOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  return useContext(ConsentContext);
}
