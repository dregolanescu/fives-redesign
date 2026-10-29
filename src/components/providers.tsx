"use client";

import { LanguageProvider } from "@/lib/i18n";
import { ConsentProvider } from "@/lib/consent";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ConsentProvider>{children}</ConsentProvider>
    </LanguageProvider>
  );
}
