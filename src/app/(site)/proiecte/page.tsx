import { getPublishedProjects } from "@/lib/payload";
import { ProiecteClient } from "./proiecte-client";

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export default async function ProiectePage() {
  const raw = await getPublishedProjects();

  const projects = raw.map((p: any) => ({
    slug: p.slug,
    category: p.category || "Corporate",
    year: p.year || "",
    heroImage: getMediaUrl(p.heroImage),
    title: p.title || "",
    titleEn: p.titleEn || null,
    description: p.description || "",
    descriptionEn: p.descriptionEn || null,
  }));

  return <ProiecteClient projects={projects} />;
}
