import type { Metadata } from "next";
import { getArticleBySlug, getPublishedArticles } from "@/lib/payload";
import { ogImage } from "@/lib/media";
import { ArticleClient } from "./article-client";
import { notFound } from "next/navigation";

export const revalidate = 300; // ISR: cached HTML, regenerated >=5min OR on-demand via Payload revalidatePath hooks

type Props = { params: Promise<{ slug: string }> };

// SEO / social previews from the article's SEO fields (CMS → SEO), with fallbacks.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let a: Awaited<ReturnType<typeof getArticleBySlug>> | null = null;
  try {
    a = await getArticleBySlug(slug);
  } catch {
    // The page itself 404s.
  }
  if (!a) return {};

  const baseTitle: string = (a.metaTitle || "").trim() || a.title || "";
  // Meta titles written in the CMS already end in "| FIVE'S"; plain titles get the suffix here.
  // (Absolute, because the section layout's own title stops the root "%s | FIVE'S" template.)
  const title = /five['’]?s/i.test(baseTitle) ? baseTitle : `${baseTitle} | FIVE'S`;
  const description: string | undefined =
    (a.metaDescription || "").trim() || (a.excerpt || "").trim() || undefined;
  const image = ogImage(a.featuredImage);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "article",
      siteName: "FIVE'S",
      locale: "ro_RO",
      url: `/noutati/${slug}`,
      title,
      description,
      publishedTime: a.publishedDate || undefined,
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.alt || a.title }]
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article: Awaited<ReturnType<typeof getArticleBySlug>> | null = null;
  try {
    article = await getArticleBySlug(slug);
  } catch (e) {
    console.error("Failed to fetch article:", e);
  }

  if (!article) return notFound();

  // Get all articles for prev/next navigation
  let allArticles: Awaited<ReturnType<typeof getPublishedArticles>> = [];
  try {
    allArticles = await getPublishedArticles();
  } catch (e) {
    console.error("Failed to fetch articles:", e);
  }
  const currentIndex = allArticles.findIndex((a: any) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const articleData = {
    title: article.title,
    titleEn: (article as any).titleEn || null,
    slug: article.slug,
    category: article.category,
    publishedDate: article.publishedDate,
    readTime: article.readTime || 5,
    excerpt: article.excerpt,
    excerptEn: (article as any).excerptEn || null,
    featuredImageUrl: article.featuredImage
      ? typeof article.featuredImage === "object"
        ? (article.featuredImage as any).url
        : null
      : null,
    content: article.content || null,
    contentEn: (article as any).contentEn || null,
    prev: prevArticle ? { slug: (prevArticle as any).slug, title: (prevArticle as any).title, titleEn: (prevArticle as any).titleEn || null } : null,
    next: nextArticle ? { slug: (nextArticle as any).slug, title: (nextArticle as any).title, titleEn: (nextArticle as any).titleEn || null } : null,
  };

  return <ArticleClient article={articleData} />;
}
