import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProjectDetail from "@/components/ProjectDetail";
import { createPageMetadata } from "@/lib/metadata";
import { getProjectBySlug, getProjectCover, getPublishedProjects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// An empty registry must still reach our published-only lookup and notFound().
export const dynamic = "force-static";

export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const image = getProjectCover(project);
  return createPageMetadata({
    title: `${project.title} | Laskowski Bygg`,
    description: (project.introduction ?? project.description).replace(/\s+/g, " ").trim().slice(0, 160),
    pathname: `/prosjekter/${project.slug}`,
    image: { url: image.src, alt: image.alt, width: image.width, height: image.height },
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  return <><Header /><ProjectDetail project={project} /></>;
}
