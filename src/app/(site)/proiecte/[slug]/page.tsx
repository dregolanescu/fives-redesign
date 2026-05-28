import { getProjectBySlug, getPublishedProjects } from "@/lib/payload";
import { ProjectClient } from "./project-client";
import { notFound } from "next/navigation";

function getMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || null;
}

export async function generateStaticParams() {
  try {
    const projects = await getPublishedProjects();
    return projects.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return notFound();

  const p = project as any;

  const data = {
    slug: p.slug,
    category: p.category || "",
    year: p.year || "",
    heroImage: getMediaUrl(p.heroImage),
    title: p.title || "",
    titleEn: p.titleEn || null,
    description: p.description || "",
    descriptionEn: p.descriptionEn || null,
    location: p.location || "",
    locationEn: p.locationEn || null,
    context: p.context || "",
    contextEn: p.contextEn || null,
    challenge: p.challenge || "",
    challengeEn: p.challengeEn || null,
    solution: p.solution || "",
    solutionEn: p.solutionEn || null,
    services: (p.services || []).map((s: any) => s.name || ""),
    metrics: (p.metrics || []).map((m: any) => ({
      value: m.value || "",
      label: m.label || "",
      labelEn: m.labelEn || null,
    })),
    gallery: (p.gallery || []).map((g: any) => ({
      url: getMediaUrl(g.image),
      caption: g.caption || null,
    })).filter((g: any) => g.url),
  };

  return <ProjectClient project={data} />;
}
