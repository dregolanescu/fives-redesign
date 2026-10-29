/**
 * Helpers that turn a populated Payload `media` document into <img> attributes,
 * using the resized copies Payload already generates on upload
 * (see collections/Media.ts → imageSizes) instead of the full-size original.
 *
 *   thumbnail 400x300 (4:3 crop) · card 800x600 (4:3 crop)
 *   hero 1920x1080 "inside" (keeps the photo's own ratio) · og 1200x630 (crop)
 *
 * Pure functions, safe to call from server components; the returned objects are
 * plain JSON so they can be passed as props to client components.
 */

export type ResponsiveImage = {
  src: string;
  srcSet?: string;
  alt?: string;
};

type SizeEntry = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaDoc = SizeEntry & {
  alt?: string | null;
  sizes?: Record<string, SizeEntry | null | undefined> | null;
};

function asDoc(media: unknown): MediaDoc | null {
  return media && typeof media === "object" ? (media as MediaDoc) : null;
}

function cleanAlt(alt: string | null | undefined): string | undefined {
  const value = (alt || "").trim();
  return value || undefined;
}

/** "url 400w, url 800w" — skips missing sizes and duplicate widths; undefined if < 2 candidates. */
function buildSrcSet(entries: Array<SizeEntry | null | undefined>): string | undefined {
  const seen = new Set<number>();
  const parts: string[] = [];
  for (const entry of entries) {
    if (!entry?.url || !entry.width || seen.has(entry.width)) continue;
    seen.add(entry.width);
    parts.push(`${entry.url} ${entry.width}w`);
  }
  return parts.length > 1 ? parts.join(", ") : undefined;
}

/** 4:3 crops (400w + 800w) for listing cards that are displayed at 4:3. */
export function cardImage(media: unknown): ResponsiveImage | null {
  if (typeof media === "string") return { src: media };
  const doc = asDoc(media);
  if (!doc?.url) return null;
  const card = doc.sizes?.card;
  const thumbnail = doc.sizes?.thumbnail;
  return {
    src: card?.url || doc.url,
    srcSet: card?.url ? buildSrcSet([thumbnail, card]) : undefined,
    alt: cleanAlt(doc.alt),
  };
}

/** Uncropped (hero ≈1620w + original) for full-width heroes, galleries and large tiles. */
export function wideImage(media: unknown): ResponsiveImage | null {
  if (typeof media === "string") return { src: media };
  const doc = asDoc(media);
  if (!doc?.url) return null;
  const hero = doc.sizes?.hero;
  return {
    src: hero?.url || doc.url,
    srcSet: buildSrcSet([hero, { url: doc.url, width: doc.width }]),
    alt: cleanAlt(doc.alt),
  };
}

/** Full-size original — for the lightbox, where the visitor explicitly asks for detail. */
export function originalImageUrl(media: unknown): string | null {
  if (typeof media === "string") return media;
  return asDoc(media)?.url || null;
}

/** 1200x630 crop for Open Graph / social previews (falls back to hero, then original). */
export function ogImage(
  media: unknown,
): { url: string; width?: number; height?: number; alt?: string } | null {
  const doc = asDoc(media);
  if (!doc?.url) return null;
  const pick = [doc.sizes?.og, doc.sizes?.hero].find((entry) => entry?.url) || doc;
  return {
    url: pick.url as string,
    width: pick.width || undefined,
    height: pick.height || undefined,
    alt: cleanAlt(doc.alt),
  };
}
