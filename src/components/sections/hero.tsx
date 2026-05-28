import { getHeroSlides, getHeroConfig } from "@/lib/payload";
import { HeroClient } from "./hero-client";
import type { HeroSlideData, HeroConfigData } from "./hero-client";

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export async function Hero() {
  let slides: HeroSlideData[] = [];
  let config: HeroConfigData = {
    displayMode: "single",
    transitionDuration: 8,
    transitionType: "crossfade",
    autoplay: true,
    showNavigation: true,
  };

  try {
    const [raw, rawConfig] = await Promise.all([
      getHeroSlides(),
      getHeroConfig(),
    ]);

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

    if (rawConfig) {
      config = {
        displayMode: rawConfig.displayMode || "single",
        transitionDuration: rawConfig.transitionDuration || 8,
        transitionType: rawConfig.transitionType || "crossfade",
        autoplay: rawConfig.autoplay ?? true,
        showNavigation: rawConfig.showNavigation ?? true,
      };
    }
  } catch (e) {
    console.error("Failed to fetch hero data:", e);
  }

  return <HeroClient slides={slides} config={config} />;
}
