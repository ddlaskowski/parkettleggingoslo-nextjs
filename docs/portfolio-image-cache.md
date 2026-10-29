# Portfolio image cache and content refinement — Phase 2.5C

## Confirmed cause

All registry paths and the shared ProjectCard, ProjectDetail and ProjectGallery
references pointed to the correct public files. Six source hashes differed from
the Phase 2.5B baseline: overview and detail in jar, oslo-01 and oslo-02.

The disk optimizer cache still held old unversioned 640px responses for all six.
Those cached responses differed from optimization of the current source bytes;
their dimensions also showed the previous portrait/landscape orientation.

| Folder | Current overview display size | Current detail display size |
| --- | --- | --- |
| jar | 4000×2252 | 2252×4000 |
| oslo-01 | 4000×2252 | 2252×4000 |
| oslo-02 | 4000×2252 | 2252×4000 |

The third photographs in those three folders are unchanged. The old registry hardcoded orientation and
therefore supplied stale dimensions even when a fresh image was delivered.

Installed Next.js 16.1.6 keys optimized images by source URL, width, quality and
negotiated format, without the public source file's content or modification time.
The default minimum TTL is 14,400 seconds. Disk caches survive server restarts;
expired entries may be served stale while revalidation occurs. Static production
HTML also retains its generated URLs/dimensions until the next build.

## Solution

`scripts/portfolio-images.mjs` reads source bytes and metadata without writing to
the photographs. It generates `lib/portfolio-images.generated.json` with SHA-256
content versions, exact filename case and EXIF-aware display dimensions. Identical
bytes retain their version, even if modification time changes. The generated file
is replaced atomically only when its contents change.

The existing registry helper produces `/portfolio/<folder>/<file>?v=<sha256>`.
Cards, detail covers, galleries and Open Graph metadata all share that source URL
and dimensions. Original filenames, folders and photographs remain intact.

Compatibility was checked against the installed optimizer and image loader, then
through the production build and real optimizer requests. Next.js 16 rejects local
query strings unless `images.localPatterns` explicitly permits them. The config
permits queries for `/portfolio/**` only; the other local images retain a no-query
pattern. Registry validation accepts only a single 64-character hexadecimal `v`
parameter. WebP and AVIF negotiation is enabled; responsive sizes, priority cover
loading and lazy gallery loading remain in the existing components.

## Replacing a photograph

1. Replace the file in its existing `public/portfolio/<id>` location.
2. During development, use `npm run dev`. Its wrapper refreshes the manifest on
   startup and watches source replacement/rename events. Next reloads the imported
   manifest when versions or dimensions change. Do not bypass it with `next dev`.
3. To refresh manually, run `npm run images:refresh`.
4. For production, run `npm run build` and deploy/restart the new build. The
   `prebuild` hook refreshes the manifest before static pages are generated.
5. Check alt text if the photograph's subject changes. Dimensions need no manual
   edits. The generated JSON contains asset metadata, not a second project registry.

No timestamp/random cache busting, runtime filesystem dependency, image editing or
new packages were introduced. The generator uses Sharp already supplied by Next.

## Local cleanup

Removed 35 matching unversioned optimizer-cache directories for the nine image
paths in the three affected folders, across `.next/cache/images` and
`.next/dev/cache/images`. Keys were calculated using installed Next.js cache-key
logic and configured/default widths, quality 75 and negotiated formats. Absolute
paths and exact parent cache roots were checked before removal. Other image-cache
entries, build caches, public files and unrelated project files were retained.
Future source changes get new cache keys and do not require this cleanup.

## Content audit

All 14 main descriptions were rewritten as concise accounts of the actual work.
Image commentary was removed entirely rather than replaced with filler. Source
facts and the owner's Phase 2.5B corrections remain authoritative. In particular,
Bekkestua is floating with glued joints; Asker-02 and Oslo-07 are laminates. No
completed sanding is claimed for Oslo-06/08. Alt text remains descriptive; Jar and
Oslo-02 entries were adjusted where replaced images changed subjects. During
implementation, overview/material files in both Asker folders were also swapped
externally. Their new content versions were detected and their alt text was
updated to match; the generator never writes to source files.

Before (Oslo-02): “Bildene dokumenterer både gulvflatene og en overgang ved en
døråpning.”

After: “Gang, to soverom og stue var del av dette parkettarbeidet i Oslo sentrum.
Vi la omtrent 75 m² Meister-parkett flytende i fiskebensmønster og monterte
gulvlister.”

Before (Oslo-06): “Bildene viser leggingen og rammen, blant annet ved en buet
flislagt avslutning.”

After: “I et rom på cirka 30 m² på Grünerløkka la vi eikestaver i fiskeben med
ramme rundt mønsteret. Stavene ble limt til undergulvet og lagt for etterfølgende
sliping.”
