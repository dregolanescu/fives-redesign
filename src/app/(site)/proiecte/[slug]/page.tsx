import type { Metadata } from "next";
import { getProjectBySlug, getPublishedProjects } from "@/lib/payload";
import { ogImage, originalImageUrl, wideImage } from "@/lib/media";
import { ProjectClient } from "./project-client";
import { notFound } from "next/navigation";

export const revalidate = 300; // ISR: cached HTML, regenerated >=5min OR on-demand via Payload revalidatePath hooks

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const projects = await getPublishedProjects();
    return projects.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// SEO / social previews from the project's own SEO fields (CMS → SEO), with fallbacks.
// Romanian fields only: the site has a single URL per page and Romanian is the default language.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let p: Awaited<ReturnType<typeof getProjectBySlug>> | null = null;
  try {
    p = await getProjectBySlug(slug);
  } catch {
    // The page itself logs the error and 404s.
  }
  if (!p) return {};

  const baseTitle: string = (p.metaTitle || "").trim() || p.title || "";
  // Meta titles written in the CMS already end in "| FIVE'S"; plain titles get the suffix here.
  // (Absolute, because the section layout's own title stops the root "%s | FIVE'S" template.)
  const title = /five['’]?s/i.test(baseTitle) ? baseTitle : `${baseTitle} | FIVE'S`;
  const description: string | undefined =
    (p.metaDescription || "").trim() || (p.description || "").trim() || undefined;
  const image = ogImage(p.heroImage);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "article",
      siteName: "FIVE'S",
      locale: "ro_RO",
      url: `/proiecte/${slug}`,
      title,
      description,
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt || p.title }]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  let project: any = null;
  try {
    project = await getProjectBySlug(slug);
  } catch (e) {
    console.error("Failed to fetch project:", e);
  }

  if (!project) return notFound();

  const p = project as any;

  const data = {
    slug: p.slug,
    category: p.category || "",
    year: p.year || "",
    heroImage: wideImage(p.heroImage),
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
    services: Array.isArray(p.services) ? p.services : [],
    metrics: (p.metrics || []).map((m: any) => ({
      value: m.value || "",
      label: m.label || "",
      labelEn: m.labelEn || null,
    })),
    gallery: (p.gallery || [])
      .map((g: any) => {
        const image = wideImage(g.image);
        if (!image) return null;
        return {
          image,
          full: originalImageUrl(g.image) || image.src,
          caption: g.caption || null,
        };
      })
      .filter(Boolean),
  };

  return <ProjectClient project={data} />;
}
