import Link from "next/link";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";
import { getPublishedProjects } from "@/lib/projects";

export const metadata = createPageMetadata({
  title: "Gulvprosjekter i Oslo, Bærum og Asker | Laskowski Bygg",
  description: "Se utførte gulvprosjekter i Oslo, Bærum og Asker: parkett, laminat, fiskeben og limt eikeparkett, med bilder og detaljer fra hvert oppdrag.",
  pathname: "/prosjekter",
});

export default function ProjectsPage() {
  const projects = getPublishedProjects().sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Forside</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Prosjekter</li>
            </ol>
          </nav>
          <p className="text-sm text-gray-600 mb-4">Mønster, tilpasning og avslutninger</p>
          <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight [overflow-wrap:anywhere]">Gulvprosjekter fra Laskowski Bygg</h1>
          <p className="mt-5 max-w-3xl text-lg text-gray-600">Et gulv skal passe både rommet og hverdagen. Her samler vi prosjektpresentasjoner med fotografier og opplysninger fra gulvarbeid i Oslo, Bærum, Asker og omegn.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Snakk med oss om ditt gulv</Link>
            <Link href="/#referanser" className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm">Se bildegalleriet</Link>
          </div>
        </section>

        {projects.length ? (
          <section aria-labelledby="prosjektoversikt" className="max-w-6xl mx-auto px-6 pb-20">
            <h2 id="prosjektoversikt" className="text-3xl font-semibold mb-10">Utførte prosjekter</h2>
            <div className="grid md:grid-cols-2 gap-8">{projects.map((project, index) => <ProjectCard key={project.id} project={project} priority={index === 0} />)}</div>
          </section>
        ) : (
          <section aria-labelledby="presentasjoner" className="bg-[#F5F3EF] border-y border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
              <h2 id="presentasjoner" className="text-3xl font-semibold">Prosjekter under klargjøring</h2>
              <div>
                <p className="text-gray-600">Vi klargjør presentasjoner med bilder og opplysninger om de enkelte oppdragene. I mellomtiden kan du se gulvbilder i bildegalleriet på forsiden.</p>
                <p className="mt-4 text-gray-600">Har du et gulvprosjekt i tankene, kan du sende oss ønsket gulvtype, omtrent areal og hvor boligen ligger. Vi vurderer løsning og arbeidsomfang sammen med deg.</p>
                <Link href="/#referanser" className="inline-block mt-6 text-sm underline underline-offset-4">Til bilder av gulvarbeid</Link>
              </div>
            </div>
          </section>
        )}

        <section aria-labelledby="gulvtjenester" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="gulvtjenester" className="text-3xl font-semibold">Fra idé til ferdig gulv</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { href: "/gulvlegging", title: "Gulvlegging", text: "Les om parkett, laminat, vinyl og arbeidet fra undergulv til siste list." },
              { href: "/fiskebensparkett", title: "Fiskebensparkett", text: "Se hvordan materiale, mønster og leggemetode henger sammen." },
              { href: "/priser", title: "Priser og tilbud", text: "Beregn et veiledende arbeidsestimat og send oss opplysningene om ditt prosjekt." },
            ].map((item) => (
              <div key={item.href} className="min-w-0 border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold [overflow-wrap:anywhere]"><Link href={item.href} className="underline underline-offset-4">{item.title}</Link></h3>
                <p className="mt-3 text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
