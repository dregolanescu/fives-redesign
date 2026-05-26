import { ArticleClient } from "./article-client";

const slugs = [
  "untold-2025-behind-the-scenes",
  "tendinte-iluminat-2026",
  "parteneriat-av-alliance",
  "conferinta-tech-summit",
  "echipa-noua-membri",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleClient slug={slug} />;
}
