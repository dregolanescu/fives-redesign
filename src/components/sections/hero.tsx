import { getHeroSlides } from "@/lib/payload";
import { HeroClient } from "./hero-client";
import type { HeroSlideData } from "./hero-client";

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export async function Hero() {
  let slides: HeroSlideData[] = [];

  try {
    const raw = await getHeroSlides();
    slides = raw.map((s: any) => ({
      type: s.type || "video",
      videoUrl: getMediaUrl(s.videoFile),
      imageUrl: getMediaUrl(s.image),
      posterUrl: getMediaUrl(s.posterImage),
      subtitle: s.subtitle || null,
      headline: s.headline,
      description: s.description || null,
      ctaPrimaryText: s.ctaPrimaryText || null,
      ctaPrimaryUrl: s.ctaPrimaryUrl || null,
      ctaSecondaryText: s.ctaSecondaryText || null,
      ctaSecondaryUrl: s.ctaSecondaryUrl || null,
    }));
  } catch (e) {
    // Fallback: HeroClient handles empty slides gracefully
    console.error("Failed to fetch hero slides:", e);
  }

  return <HeroClient slides={slides} />;
}
