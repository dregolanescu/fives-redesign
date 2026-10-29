/**
 * Public base URL of the site, without a trailing slash.
 *
 * Same source as Payload's `serverURL` (payload.config.ts): set
 * NEXT_PUBLIC_SERVER_URL in Vercel when the site moves to its final domain
 * (e.g. https://www.fives.ro). Until then it falls back to the preview domain.
 */
const FALLBACK_SITE_URL = "https://fives-preview.advanguard.ro";

function normalise(url: string | undefined): string {
  const candidate = (url || "").trim().replace(/\/+$/, "");
  try {
    return new URL(candidate).origin === "null" ? FALLBACK_SITE_URL : candidate;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const SITE_URL = normalise(process.env.NEXT_PUBLIC_SERVER_URL);
