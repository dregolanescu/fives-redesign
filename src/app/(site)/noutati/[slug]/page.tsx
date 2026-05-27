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
    slug: article.slug,
    category: article.category,
    publishedDate: article.publishedDate,
    readTime: article.readTime || 5,
    excerpt: article.excerpt,
    featuredImageUrl: article.featuredImage
      ? typeof article.featuredImage === "object"
        ? (article.featuredImage as any).url
        : null
      : null,
    // Pass the raw Lexical content for proper rendering
    content: article.content || null,
    prev: prevArticle ? { slug: (prevArticle as any).slug, title: (prevArticle as any).title } : null,
    next: nextArticle ? { slug: (nextArticle as any).slug, title: (nextArticle as any).title } : null,
  };

  return <ArticleClient article={articleData} />;
}
