import { ProjectClient } from "./project-client";

const slugs = [
  "untold-festival-2025",
  "gala-banca-transilvania",
  "lansare-samsung",
  "concert-filarmonica",
  "tech-conference-2024",
  "electric-castle",
];

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectClient slug={slug} />;
}
