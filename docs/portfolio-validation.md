# Phase 2.5B validation

This section records the Phase 2.5B snapshot. See the Phase 2.5C section below for
the current image-cache/content validation following owner image replacements.

Validated locally on 2026-10-29 against the production build (Next.js 16.1.6).

| Check | Result |
| --- | --- |
| `node node_modules/typescript/bin/tsc --noEmit --incremental false` | Passed |
| `npm.cmd run lint` | Passed, no errors or warnings |
| `npm.cmd run build` | Passed, 14 project detail paths statically generated |
| Published detail pages | All 14 return HTTP 200 |
| Index | 14 linked project cards |
| Unknown/unpublished URLs | `/prosjekter/unknown-project`, `/prosjekter/unpublished`, `/prosjekter/draft-only` return 404 |
| Draft filtering | In-memory unpublished copy excluded by the published-only lookup; no actual drafts remain after owner corrections |
| Static params | Exactly 14 published slugs |
| Metadata | 14 unique titles/descriptions; canonical and Open Graph cover checked against each registry record |
| Sitemap | All 14 published detail URLs included; unpublished test slug absent |
| Internal navigation | Project links, service links, prices, breadcrumbs, back links and homepage fragment targets resolve |
| Source images | All 42 return 200 and are readable |
| Next Image delivery | All 42 optimized responses return 200; decoded proportions match EXIF-aware dimensions |
| Original assets | SHA-256 hashes match the pre-edit inventory for every source photograph, logo and info.txt |
| Responsive overflow | Index and all 14 detail pages checked at 320, 375, 768 and 1440 px; no horizontal overflow |
| Detail structure | One H1 and three photographs on every project page |
| Keyboard | Card activation, back navigation, skip link focus and mobile menu Enter/Escape verified |
| Existing homepage gallery | Opens with Enter; Left/Right change images; Escape closes and restores trigger focus |
| Portrait delivery | Jar detail photographs loaded in browser with correct displayed orientation |
| Browser console | No warnings or errors observed during the browser review |
| Protected files | No diff in pricing configuration/calculator, analytics handlers/tracking or contact API |
| Whitespace | `git -c core.safecrlf=false diff --check` passed |

The project detail gallery retains its existing static layout, with all three
photographs in the document and no additional modal controls. No contact forms
were submitted. Validation was local; no deployment or git commit was made.

Temporary originals remain as supplied. Later owner replacements require another
dimensions/orientation check and build. Unspecified optional project facts are
listed in `portfolio-inventory.md`.

## Phase 2.5C validation — 2026-10-29

- TypeScript (`tsc --noEmit --incremental false`), ESLint and production build
  passed. The build generated all 14 published detail routes.
- All 14 served detail routes returned 200. Unknown/unpublished URLs returned
  404. Metadata, canonicals, sitemap entries and internal links/anchors passed.
- All 42 source-content hashes and EXIF-aware dimensions match the generated
  manifest. Each optimized 640px WebP response decoded to the same pixels as a
  fresh optimization of its current source file. AVIF negotiation also passed.
- Card covers, detail images and metadata use the same versioned registry URL.
  Production build and HTTP requests confirm Next.js 16 local query compatibility
  with the explicit localPatterns rule.
- An isolated fixture verified stable regeneration without output rewrites,
  stability when only mtime changes, different hashes/dimensions after replacement,
  and automatic regeneration by the recursive development watcher. No owner
  photograph was edited to perform this test.
- All original source hashes were recorded at task start. Four external Asker
  overview/material swaps occurred during implementation; those were incorporated
  into the final manifest/alt text and recorded in a second verification snapshot.
  The agent did not write to photographs or info.txt files.
- Index and all 14 detail pages passed overflow checks at 320, 375, 768 and
  1440px (60 page/viewport combinations). Each detail retained one H1 and three
  images. Jar, Oslo-01 and Oslo-02 replacements were compared visually with current
  source files on desktop/mobile. Portrait and landscape proportions are correct.
- No browser console warnings or errors were observed during the final review.
- All 14 descriptions were audited against owner notes and prior corrections.
  Image commentary is absent from main descriptions; alt text remains descriptive.
- Protected pricing, calculator, analytics and contact code have no diff.
  No dependencies, deployment or commits were added.

Local cache evidence and the ongoing replacement workflow are documented in
`portfolio-image-cache.md`. Production replacements require a new build/deploy;
development replacements refresh through `npm run dev`.
