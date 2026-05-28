export const dynamic = "force-dynamic";

import { Hero } from "@/components/sections/hero";
import { CredibilityStrip } from "@/components/sections/credibility-strip";
import { Capabilities } from "@/components/sections/capabilities";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { WhyFives } from "@/components/sections/why-fives";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Capabilities />
      <FeaturedProjects />
      <InstagramFeed />
      <WhyFives />
      <Testimonials />
      <FinalCta />
    </>
  );
}
