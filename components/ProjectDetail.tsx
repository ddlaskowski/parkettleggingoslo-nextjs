import Image from "next/image";
import Link from "next/link";
import ProjectGallery from "@/components/ProjectGallery";
import { getProjectCover, projectServiceLinks, type PublishedProject } from "@/lib/projects";

export default function ProjectDetail({ project }: { project: PublishedProject }) {
  const cover = getProjectCover(project);
  const facts = [
    ["Område", project.location], ["Gulvtype", project.floorType],
    ["Mønster", project.pattern], ["Leggemetode", project.installationMethod],
    ["Produsent", project.manufacturer], ["Produkt", project.productName],
    ["Areal", project.approximateAreaM2 ? `Ca. ${project.approximateAreaM2} m²` : undefined],
  ].filter(([, value]) => value);
  const services = [...new Set(project.services ?? ["gulvlegging" as const])];
  const remainingImages = project.images.filter((image) => image.id !== cover.id);
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600">
          <ol className="flex flex-wrap gap-2 [overflow-wrap:anywhere]">
            <li><Link href="/" className="underline underline-offset-4">Forside</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/prosjekter" className="underline underline-offset-4">Prosjekter</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0">{project.title}</li>
          </ol>
        </nav>
        <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight [overflow-wrap:anywhere]">{project.title}</h1>
        {project.introduction && <p className="mt-5 max-w-3xl text-lg text-gray-600 leading-relaxed">{project.introduction}</p>}
        {facts.length > 0 && (
          <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 [overflow-wrap:anywhere]">
            {facts.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-sm text-gray-600">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div>)}
          </dl>
        )}
        <figure className="mt-10">
          <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} priority sizes="(max-width: 1152px) calc(100vw - 48px), 1104px" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl bg-[#F5F3EF]" />
          {cover.caption && <figcaption className="mt-3 text-sm text-gray-600 [overflow-wrap:anywhere]">{cover.caption}</figcaption>}
        </figure>
        <div className="mt-10 max-w-3xl">
          <h2 className="text-3xl font-semibold">Om arbeidet</h2>
          {project.description.split(/\n\s*\n/).map((paragraph, index) => <p key={index} className="mt-4 text-gray-600 leading-relaxed [overflow-wrap:anywhere]">{paragraph}</p>)}
        </div>
      </section>
      {remainingImages.length > 0 && (
        <section aria-labelledby="prosjektbilder" className="max-w-6xl mx-auto px-6 pb-20">
          <h2 id="prosjektbilder" className="text-3xl font-semibold mb-8">Bilder fra prosjektet</h2>
          <ProjectGallery images={remainingImages} />
        </section>
      )}
      <section aria-labelledby="planlegg" className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-[#F5F3EF] border border-gray-200 rounded-3xl p-6 md:p-10">
          <h2 id="planlegg" className="text-3xl font-semibold">Planlegger du nytt gulv?</h2>
          <p className="mt-4 max-w-3xl text-gray-600">Fortell hvor boligen ligger, omtrent areal og hvilken type gulv du ønsker. Vi avklarer arbeidet på gratis befaring før endelig tilbud.</p>
          <div className="mt-8 flex flex-wrap gap-6 items-center">
            <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Be om tilbud</Link>
            <Link href="/priser" className="text-sm underline underline-offset-4">Se priser og kalkulator</Link>
            {services.map((service) => <Link key={service} href={projectServiceLinks[service].href} className="text-sm underline underline-offset-4">{projectServiceLinks[service].label}</Link>)}
          </div>
        </div>
        <Link href="/prosjekter" className="inline-block mt-8 text-sm underline underline-offset-4">Tilbake til alle prosjekter</Link>
      </section>
    </main>
  );
}
