import type { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";
import { SITE_URL } from "@/lib/site";

// Regenerated at most once an hour, so newly published projects/articles show up on their own.
export const revalidate = 3600;

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/despre", changeFrequency: "monthly", priority: 0.8 },
  { path: "/proiecte", changeFrequency: "weekly", priority: 0.9 },
  { path: "/noutati", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/confidentialitate", changeFrequency: "yearly", priority: 0.2 },
  { path: "/politica-cookies", changeFrequency: "yearly", priority: 0.2 },
  { path: "/termeni", changeFrequency: "yearly", priority: 0.2 },
];

type SitemapDoc = { slug?: string | null; updatedAt?: string | null };

function toDate(value: unknown): Date | undefined {
  if (typeof value !== "string" || !value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  try {
    const payload = await getPayloadClient();
    const [projects, articles] = await Promise.all([
      payload.find({
        collection: "projects",
        where: { status: { equals: "published" } },
        sort: "order",
        limit: 500,
        depth: 0,
        pagination: false,
      }),
      payload.find({
        collection: "articles",
        where: { status: { equals: "published" } },
        sort: "-publishedDate",
        limit: 500,
        depth: 0,
        pagination: false,
      }),
    ]);

    for (const doc of projects.docs as unknown as SitemapDoc[]) {
      if (!doc?.slug) continue;
      entries.push({
        url: `${SITE_URL}/proiecte/${doc.slug}`,
        lastModified: toDate(doc.updatedAt),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
    for (const doc of articles.docs as unknown as SitemapDoc[]) {
      if (!doc?.slug) continue;
      entries.push({
        url: `${SITE_URL}/noutati/${doc.slug}`,
        lastModified: toDate(doc.updatedAt),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  } catch (e) {
    // CMS unreachable: still serve the static pages rather than an error.
    console.error("sitemap: could not load projects/articles", e);
  }

  return entries;
}
