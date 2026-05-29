import { getPublishedProjects } from "@/lib/payload";
import { ProiecteClient } from "./proiecte-client";

export const revalidate = 300; // ISR: cached HTML, regenerated >=5min OR on-demand via Payload revalidatePath hooks

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export default async function ProiectePage() {
  let raw: any[] = [];
  try {
    raw = await getPublishedProjects();
  } catch (e) {
    console.error("Failed to fetch projects:", e);
  }

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
