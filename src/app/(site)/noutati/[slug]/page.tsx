import { getArticleBySlug, getPublishedArticles } from "@/lib/payload";
import { ArticleClient } from "./article-client";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return notFound();

  // Get all articles for prev/next navigation
  const allArticles = await getPublishedArticles();
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
