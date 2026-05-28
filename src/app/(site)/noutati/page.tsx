import { getPublishedArticles } from "@/lib/payload";
import { NoutatiClient, type ArticleItem } from "./noutati-client";

export const dynamic = "force-dynamic";

export default async function NoutatiPage() {
  const docs = await getPublishedArticles();

  const articles: ArticleItem[] = docs.map((doc: any) => ({
    slug: doc.slug,
    title: doc.title,
    titleEn: doc.titleEn || null,
    excerpt: doc.excerpt,
    excerptEn: doc.excerptEn || null,
    category: doc.category,
    publishedDate: doc.publishedDate,
    readTime: doc.readTime,
    featuredImage: doc.featuredImage
      ? { url: typeof doc.featuredImage === "object" ? doc.featuredImage.url : `/api/media/${doc.featuredImage}` }
      : null,
  }));

  return <NoutatiClient articles={articles} />;
}
