# Real project portfolio

## Publication state

The registry in `lib/projects.ts` contains 14 published owner-documented projects
from `public/portfolio/`, with three photographs each. See
`portfolio-inventory.md` for the source inventory and owner corrections. The
existing homepage gallery remains independent. The empty-state layout is retained
for use if all projects are later unpublished.

## Owner information needed

For each project, provide:

- A verified title and a factual description of the work performed.
- Which original photographs belong together, their intended order and the cover.
- Permission to publish the photographs, including any identifiable private details.
- A description of what each photograph shows for alt text; optional captions.
- Any known approximate location, floor type, pattern, installation method,
  manufacturer and product name. Leave unknown fields absent.
- Confirmation of any work mentioned in the description, such as preparation,
  glued/floating installation or skirting-board installation.
- Which relevant service pages to link: gulvlegging, parkettlegging or fiskebensparkett.

No project size, date, exact address or customer testimonial is required.
Do not infer manufacturers, construction, method or location from photographs.

## Data model

`Project` is a discriminated union of `DraftProject` and `PublishedProject`.
Both require `id`, a unique URL-safe `slug`, `title`, `images` and `published`.
Drafts can have no images and no description while documentation is collected.
Publication requires a nonempty verified description, at least one image and a
`featuredImage` that references an image ID in that same project.

Optional fields: `location`, `floorType`, `pattern`, `installationMethod`,
`manufacturer`, `productName`, `featured`, `services`, `introduction`,
`approximateAreaM2`, and image `caption`.
Optional facts are omitted from the UI when absent; no guessed defaults are shown.

Each `ProjectImage` has `id`, local `src`, meaningful `alt`, `width` and `height`.
Dimensions and content versions are generated from the original files, accounting
for EXIF orientation. Preserve the originals; Next Image handles
responsive optimized delivery. Cards show complete images with `object-contain`.
The cover and detail gallery support portrait and landscape images without cropping.
The first index cover and each detail cover load eagerly; other images load
lazily with responsive size hints. The gallery is static: all photographs are
visible without a modal or gallery controls.

`featured` puts a published project first on the index. It never overrides
`published: false`. `services` is an explicit list of verified relevant categories;
when omitted, the general gulvlegging page is linked.

## Adding a project

1. Confirm the facts, image grouping and publication permission with the owner.
2. Keep original photographs in the owner's `public/portfolio/<id>` folder;
   do not edit source photographs automatically. Preserve filename case.
3. Add the factual record to `projects` with `published: false` while incomplete.
4. Run `npm run images:refresh`, then check spelling, alt text, cover selection
   and service links. The helper reads generated image versions and dimensions.
5. Set `published: true` only after owner verification. Rebuild and deploy.

`validateProjectRegistry` rejects duplicate IDs/slugs, invalid image metadata and
incomplete published records. Verification of factual accuracy remains an owner
editorial step; the validator cannot establish it.

## Routing and SEO

The index, static params, slug lookup and sitemap share `getPublishedProjects`.
Drafts are excluded everywhere. Unknown and unpublished slugs return 404.
The detail route uses `force-static` with a published-only lookup and `notFound()`.
Adding or unpublishing registry records requires a rebuild.
An empty registry produces no detail-page URLs in the sitemap.

The existing metadata helper creates index and per-project canonicals, Open Graph
and Twitter metadata. Meta descriptions use the unique verified introduction
(falling back to the description for records without an introduction);
the social preview uses that project's cover. Index cards show titles and optional
location/floor type rather than duplicating detail-page descriptions.

The homepage gallery remains separate and functional. Its navigation target
`#referanser` is preserved. The homepage and both service pages link to `/prosjekter`.
The pre-existing service-page photographs are not reassigned to these projects.

## Replacing temporary photographs

The owner will supply corrected/compressed originals and optional watermarks
later. No such edits were made during Phase 2.5B or 2.5C. Keep the same filenames;
`npm run dev` watches replacements and refreshes versions and EXIF-aware dimensions.
`npm run build` refreshes them before generating pages. Update alt text if the
subject changes. Do not hand-edit `lib/portfolio-images.generated.json`. See
`portfolio-image-cache.md` for the cache investigation and workflow. Logos are
inventoried but not displayed. Exact product variants, dates and customer details
remain absent unless the owner supplies them.
