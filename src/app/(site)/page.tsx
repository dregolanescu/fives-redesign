export const revalidate = 300; // ISR: cached HTML, regenerated >=5min OR on-demand via Payload revalidatePath hooks

import { Hero } from "@/components/sections/hero";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { Capabilities } from "@/components/sections/capabilities";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { WhyFives } from "@/components/sections/why-fives";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { getFeaturedProjects } from "@/lib/payload";
import { cardImage, wideImage } from "@/lib/media";

export default async function HomePage() {
  let featured: any[] = [];
  try {
    featured = await getFeaturedProjects();
  } catch (e) {
    console.error("Failed to fetch featured projects:", e);
  }

  const featuredProjects = featured.map((p: any) => ({
    slug: p.slug,
    title: p.title || "",
    titleEn: p.titleEn || null,
    category: p.category || "Corporate",
    image: cardImage(p.heroImage),
    wideImage: wideImage(p.heroImage),
  }));

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Capabilities />
      <FeaturedProjects projects={featuredProjects} />
      <InstagramFeed />
      <WhyFives />
      <Testimonials />
      <FinalCta />
    </>
  );
}
