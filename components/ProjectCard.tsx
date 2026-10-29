import Image from "next/image";
import Link from "next/link";
import { getProjectCover, type PublishedProject } from "@/lib/projects";

export default function ProjectCard({ project, priority = false }: { project: PublishedProject; priority?: boolean }) {
  const cover = getProjectCover(project);
  return (
    <article className="min-w-0 border border-gray-200 rounded-2xl bg-white">
      <Link href={`/prosjekter/${project.slug}`} className="block rounded-2xl [overflow-wrap:anywhere]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#F5F3EF]">
          <Image src={cover.src} alt={cover.alt} fill priority={priority} className="object-contain" sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 72px) / 2), 540px" />
        </div>
        <div className="p-6">
          {(project.location || project.floorType) && <p className="text-sm text-gray-600">{[project.location, project.floorType].filter(Boolean).join(" · ")}</p>}
          <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
          <span className="inline-block mt-5 text-sm underline underline-offset-4">Se prosjektet</span>
        </div>
      </Link>
    </article>
  );
}
