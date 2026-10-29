import portfolioImages from "@/lib/portfolio-images.generated.json";

export type ProjectImage = {
  id: string;
  /** Original local asset path plus a stable source-content version. */
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ProjectService = "gulvlegging" | "parkettlegging" | "fiskebensparkett";

type ProjectBase = {
  id: string;
  slug: string;
  title: string;
  introduction?: string;
  approximateAreaM2?: number;
  location?: string;
  floorType?: string;
  pattern?: string;
  installationMethod?: string;
  manufacturer?: string;
  productName?: string;
  featured?: boolean;
  services?: readonly ProjectService[];
};

export type PublishedProject = ProjectBase & {
  published: true;
  description: string;
  images: readonly [ProjectImage, ...ProjectImage[]];
  /** ID of an image in this project's images array. */
  featuredImage: string;
};

export type DraftProject = ProjectBase & {
  published: false;
  description?: string;
  images: readonly ProjectImage[];
  featuredImage?: string;
};

export type Project = PublishedProject | DraftProject;

/** Generated from current source bytes; the same URL/dimensions feed every view. */
function photographs(folder: keyof typeof portfolioImages, alts: readonly [string, string, string]): [ProjectImage, ProjectImage, ProjectImage] {
  const images = portfolioImages[folder].map((image, index) => ({
    id: image.id,
    src: `${image.src}?v=${image.version}` as `/${string}`,
    alt: alts[index],
    width: image.width,
    height: image.height,
  }));
  return [images[0], images[1], images[2]];
}

/** Facts: public/portfolio/<id>/info.txt, with the owner's Phase 2.5B corrections.
 * Logos and photographed packaging are not independent sources of product facts. */
export const projects: readonly Project[] = [
  {
    id: "asker-01", slug: "pergo-lofoten-asker", title: "Pergo Lofoten-parkett i Asker",
    introduction: "Klikkparkett fra Pergo i en stue og to soverom i Asker, med et samlet areal på omtrent 75 m².",
    description: "I Asker la vi Pergo Lofoten-parkett i stuen og to soverom, til sammen cirka 75 m². Parketten ble lagt i rett mønster som et flytende klikkgulv.",
    location: "Asker", floorType: "Parkett", pattern: "Rett", installationMethod: "Flytende klikkgulv",
    manufacturer: "Pergo", productName: "Lofoten", approximateAreaM2: 75,
    services: ["gulvlegging", "parkettlegging"], published: true, featuredImage: "overview",
    images: photographs("asker-01", ["Pergo Lofoten-emballasje på den lagte parketten i Asker", "Rette parkettbord og gulvpakker i stuen", "Lys parkett i stue med vinduer og gulvpakker på gulvet"]),
  },
  {
    id: "asker-02", slug: "fiskebenslaminat-asker", title: "Fiskebenslaminat fra Kronotex i Asker",
    introduction: "Laminat i fiskebensmønster fordelt på tre soverom i Asker, til sammen cirka 50 m².",
    description: "Tre soverom i Asker fikk fiskebenslaminat fra Kronotex. Vi la gulvet flytende over et samlet areal på omtrent 50 m².",
    location: "Asker", floorType: "Laminat", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Kronotex", approximateAreaM2: 50,
    services: ["gulvlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("asker-02", ["Kronotex Herringbone-pakke på laminatgulvet i Asker", "Fiskebensmønster i laminat med sollys over deler av gulvet", "Brunt fiskebenslaminat i et soverom sett fra døråpningen"]),
  },
  {
    id: "bekkestua", slug: "fiskebensparkett-bekkestua", title: "Fiskebensparkett på Bekkestua",
    introduction: "Omtrent 65 m² parkett fra Meister i to stuer på Bekkestua, med forarbeid og montering av gulvlister.",
    description: "På Bekkestua omfattet oppdraget avretting, montering av gulvvarme og legging av Meister-parkett i to stuer, cirka 65 m². Parketten ble lagt i fiskebensmønster med lim mellom bordene, som et flytende gulv uten liming til undergulvet. Vi monterte også gulvlister.",
    location: "Bekkestua, Bærum", floorType: "Parkett", pattern: "Fiskeben",
    installationMethod: "Flytende, med lim mellom bordene", manufacturer: "Meister", approximateAreaM2: 65,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("bekkestua", ["Fiskebensparkett i stue på Bekkestua med bokhyller og glassdør", "Parkett og hvite gulvlister i stue med mønstret tapet", "Løse parkettbord med synlige skjøtekanter fra prosjektet"]),
  },
  {
    id: "hovik", slug: "fiskebensparkett-hovik", title: "Fiskebensparkett på Høvik",
    introduction: "Flytende klikkparkett i fiskebensmønster i en stue på Høvik, med et gulvareal på cirka 55 m².",
    description: "I stuen på Høvik la vi cirka 55 m² klikkparkett fra PROFAG i fiskebensmønster. Gulvet ble lagt flytende.",
    location: "Høvik, Bærum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende klikkgulv",
    manufacturer: "PROFAG", approximateAreaM2: 55,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("hovik", ["Lys fiskebensparkett i stuen på Høvik under arbeid", "Gulvpakke på fiskebensparketten i stuen", "Nærbilde av gulvemballasje og parkettens trestruktur"]),
  },
  {
    id: "jar", slug: "herdet-tregulv-fiskeben-jar", title: "Herdet tregulv i fiskeben på Jar",
    introduction: "Et flytende gulv fra Bjelin lagt i fiskebensmønster på Jar i Bærum, over omtrent 60 m².",
    description: "På Jar la vi omtrent 60 m² herdet tregulv fra Bjelin. Gulvet ble montert flytende i fiskebensmønster.",
    location: "Jar, Bærum", floorType: "Herdet tregulv", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Bjelin", approximateAreaM2: 60,
    services: ["gulvlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("jar", ["Bjelin-emballasje på fiskebensgulvet på Jar", "Nærbilde av trestruktur og skjøter i det herdede tregulvet", "Bjelin-pakke og trestruktur i fiskebensgulvet"]),
  },
  {
    id: "oslo-01", slug: "barlinek-fiskeben-oslo-sentrum", title: "Barlinek-fiskebensparkett i Oslo sentrum",
    introduction: "Fiskebensparkett fra Barlinek og montering av gulvlister i to stuer i Oslo sentrum, til sammen cirka 55 m².",
    description: "To stuer i Oslo sentrum fikk Barlinek-parkett i fiskebensmønster. Oppdraget omfattet cirka 55 m² flytende parkett og montering av gulvlister.",
    location: "Oslo sentrum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Barlinek", approximateAreaM2: 55,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-01", ["Lys fiskebensparkett sett gjennom en dobbel døråpning i Oslo sentrum", "Parkettmønster som fortsetter mellom de to stuene", "Nærbilde av trestruktur og skjøter i fiskebensparketten"]),
  },
  {
    id: "oslo-02", slug: "meister-fiskeben-oslo-sentrum", title: "Meister-parkett i fiskeben gjennom flere rom",
    introduction: "Gang, to soverom og stue i Oslo sentrum fikk fiskebensparkett fra Meister, med et samlet areal på cirka 75 m².",
    description: "Gang, to soverom og stue var del av dette parkettarbeidet i Oslo sentrum. Vi la omtrent 75 m² Meister-parkett flytende i fiskebensmønster og monterte gulvlister.",
    location: "Oslo sentrum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Meister", approximateAreaM2: 75,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-02", ["Gulvovergang ved en døråpning med fiskebensparkett i Oslo sentrum", "Nærbilde av trestruktur i den lyse fiskebensparketten", "Fiskebensparkett i en smal gang under arbeid"]),
  },
  {
    id: "oslo-03", slug: "north-wood-fiskeben-oslo-sentrum", title: "North Wood-fiskebensparkett i Oslo sentrum",
    introduction: "Klikkparkett i fiskebensmønster i en stue på omtrent 40 m² i Oslo sentrum.",
    description: "Stuen på cirka 40 m² fikk North Wood-parkett i fiskebensmønster. Parketten ble montert med klikkskjøter og lagt flytende i boligen i Oslo sentrum.",
    location: "Oslo sentrum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende klikkgulv",
    manufacturer: "PROFAG", productName: "North Wood", approximateAreaM2: 40,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-03", ["Lys North Wood-fiskebensparkett i stue i Oslo sentrum", "Parkett ved en vegg med gulvpakke ved siden av", "North Wood-emballasje på den lagte parketten"]),
  },
  {
    id: "oslo-04", slug: "fiskebensparkett-grunerlokka", title: "Flytende fiskebensparkett på Grünerløkka",
    introduction: "Parkett i fiskebensmønster på Grünerløkka, lagt flytende over et areal på cirka 40 m².",
    description: "På Grünerløkka monterte vi cirka 40 m² parkett i fiskebensmønster. Gulvet ble lagt flytende.",
    location: "Grünerløkka, Oslo", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Parkett & interiør", approximateAreaM2: 40,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-04", ["Brun fiskebensparkett på Grünerløkka med gulvpakker på flaten", "Fiskebensparkett mot kjøkkenet under legging", "Trestruktur i parketten ved stablede gulvpakker"]),
  },
  {
    id: "oslo-05", slug: "parky-fiskeben-oslo-sentrum", title: "Parky-fiskeben med gulvlister i Oslo sentrum",
    introduction: "Omtrent 65 m² flytende parkett fra Parky, lagt i fiskebensmønster med tilhørende listarbeid.",
    description: "Vi la cirka 65 m² Parky-parkett i Oslo sentrum og monterte gulvlister. Parketten ble lagt flytende i fiskebensmønster.",
    location: "Oslo sentrum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende",
    manufacturer: "Parky", approximateAreaM2: 65,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-05", ["Lys Parky-parkett i fiskebensmønster gjennom to rom i Oslo sentrum", "Parky-emballasje på fiskebensgulvet", "Gulvpakke og nærbilde av Parky-parketten"]),
  },
  {
    id: "oslo-06", slug: "limt-eik-fiskeben-ramme-grunerlokka", title: "Limt eikeparkett med ramme på Grünerløkka",
    introduction: "Eikestaver limt til undergulvet i fiskebensmønster med ramme, i et rom på omtrent 30 m².",
    description: "I et rom på cirka 30 m² på Grünerløkka la vi eikestaver i fiskeben med ramme rundt mønsteret. Stavene ble limt til undergulvet og lagt for etterfølgende sliping.",
    location: "Grünerløkka, Oslo", floorType: "Eikeparkett", pattern: "Fiskeben med ramme", installationMethod: "Limt til undergulvet",
    approximateAreaM2: 30, featured: true,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-06", ["Eikestaver i fiskebensmønster med ramme under legging på Grünerløkka", "Parkettramme tilpasset en buet flislagt avslutning", "Eikestaver under liming til undergulvet"]),
  },
  {
    id: "oslo-07", slug: "pergo-laminat-oslo-sentrum", title: "Pergo-laminat i leilighet i Oslo sentrum",
    introduction: "Flytende laminat i hele leiligheten, med avretting ved kjøkkenovergangen og montering av gulvlister på cirka 70 m².",
    description: "Gulvet i overgangen mellom stue og kjøkken ble avrettet før vi la Pergo-laminat i hele leiligheten i Oslo sentrum. Laminatet ble lagt flytende i rett mønster. Arbeidet omfattet omtrent 70 m² og montering av gulvlister.",
    location: "Oslo sentrum", floorType: "Laminat", pattern: "Rett", installationMethod: "Flytende",
    manufacturer: "Pergo", approximateAreaM2: 70,
    services: ["gulvlegging"], published: true, featuredImage: "overview",
    images: photographs("oslo-07", ["Lyst laminat i rette bord i leilighet i Oslo sentrum", "Laminatgulv og gulvlister under montering", "Gulvet gjennom en døråpning mot et rom med ildsted"]),
  },
  {
    id: "oslo-08", slug: "sekskantparkett-grunerlokka", title: "Eikeparkett med sekskantmønster på Grünerløkka",
    introduction: "Et geometrisk sekskantmønster av eikestaver, limt til undergulvet over cirka 60 m² på Grünerløkka.",
    description: "Dette gulvet på Grünerløkka ble lagt med eikestaver i sekskantmønster, limt direkte til undergulvet. Oppdraget omfattet cirka 60 m², lagt for etterfølgende sliping.",
    location: "Grünerløkka, Oslo", floorType: "Eikeparkett", pattern: "Sekskantmønster", installationMethod: "Limt til undergulvet",
    approximateAreaM2: 60, featured: true,
    services: ["gulvlegging", "parkettlegging"], published: true, featuredImage: "overview",
    images: photographs("oslo-08", ["Eikeparkett i geometrisk sekskantmønster under arbeid på Grünerløkka", "Sekskantmønster over gulvflaten og gjennom en døråpning", "Hender som legger eikestaver i lim på undergulvet"]),
  },
  {
    id: "oslo-09", slug: "fiskebensparkett-listarbeid-oslo-sentrum", title: "Fiskebensparkett med listarbeid i Oslo sentrum",
    introduction: "Flytende fiskebensparkett og gulvlister på omtrent 50 m² i Oslo sentrum.",
    description: "I Oslo sentrum la vi cirka 50 m² flytende fiskebensparkett. Montering av gulvlister inngikk i oppdraget.",
    location: "Oslo sentrum", floorType: "Parkett", pattern: "Fiskeben", installationMethod: "Flytende",
    approximateAreaM2: 50,
    services: ["gulvlegging", "parkettlegging", "fiskebensparkett"], published: true, featuredImage: "overview",
    images: photographs("oslo-09", ["Fiskebensparkett med hvite gulvlister i Oslo sentrum", "Nærbilde av trestruktur og skjøter i fiskebensparketten", "Parkett ved en døråpning under arbeid"]),
  },
];

export function validateProjectRegistry(registry: readonly Project[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const project of registry) {
    if (!project.id.trim() || !project.title.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
      throw new Error("Projects require an ID, title and lowercase URL-safe slug");
    }
    if (ids.has(project.id) || slugs.has(project.slug)) {
      throw new Error(`Duplicate project ID or slug: ${project.slug}`);
    }
    ids.add(project.id);
    slugs.add(project.slug);
    const imageIds = new Set<string>();
    for (const image of project.images) {
      const localSource = image.src.match(/^(\/(?!\/)[^?#\\]+)(?:\?v=[a-f0-9]{64})?$/);
      if (!image.id.trim() || imageIds.has(image.id) || !image.alt.trim() ||
          !localSource || localSource[1].split("/").includes("..") ||
          !Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width <= 0 || image.height <= 0) {
        throw new Error(`Invalid image in project: ${project.slug}`);
      }
      imageIds.add(image.id);
    }
    if (project.featuredImage && !imageIds.has(project.featuredImage)) {
      throw new Error(`Featured image does not belong to project: ${project.slug}`);
    }
    if (project.published && (!project.description.trim() || !project.images.length || !project.featuredImage)) {
      throw new Error(`Published project is incomplete: ${project.slug}`);
    }
  }
}

validateProjectRegistry(projects);

/** One publication filter is shared by the index, detail routes and sitemap. */
export function getPublishedProjects(registry: readonly Project[] = projects): PublishedProject[] {
  return registry.filter((project): project is PublishedProject => project.published);
}

export function getProjectBySlug(slug: string, registry: readonly Project[] = projects) {
  return getPublishedProjects(registry).find((project) => project.slug === slug);
}

export function getProjectCover(project: PublishedProject): ProjectImage {
  const image = project.images.find((item) => item.id === project.featuredImage);
  if (!image) throw new Error(`Missing featured image: ${project.slug}`);
  return image;
}

export const projectServiceLinks: Record<ProjectService, { href: string; label: string }> = {
  gulvlegging: { href: "/gulvlegging", label: "Gulvlegging" },
  parkettlegging: { href: "/", label: "Parkettlegging" },
  fiskebensparkett: { href: "/fiskebensparkett", label: "Fiskebensparkett" },
};
