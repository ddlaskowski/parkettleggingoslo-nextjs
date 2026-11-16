# Phase 3.0C — Homepage integration, internal linking and SEO

Implemented and verified locally on 16 November 2026. No deployment, commit or
dependency installation was performed. Existing uncommitted work from Phases
3.0B and 3.0B.1 was preserved.

## Homepage integration

`HomePackageOffers` is a server-rendered component placed immediately after
`Services` and before `WhyUs` in `app/page.tsx`. The other sections keep their
existing order, hero, content and behavior.

The heading is “Parkett med levering og montering”. It introduces two selected
flooring packages with transport/carrying into the home and professional
installation. Each preview obtains its name, category, rate, primary photo and
image dimensions from `lib/packageProducts.ts`; no product prices or photo paths
are duplicated in the homepage component. Minimum area and VAT also come from
shared `packageTerms`. Prices remain 1490 NOK/m² for Meister and 1390 NOK/m² for
Bjelin, minimum 10 m². Material allowance is included; underlay, skirting,
skirting installation and subfloor preparation are separately assessed/priced.

Only the primary Meister `01.jpg` and Bjelin `04.webp` photographs render in this
section. Next.js Image supplies responsive sizes and lazy loading. No product
gallery, calculator, client selection state or new sticky element was added.
Existing original image files are unchanged.

The previews have equal image frames, rounded white cards on the warm neutral
surface, aligned desktop prices and vertically stacked mobile layouts. Product
names wrap naturally. Both entire preview cards and the main “Se parkett og
beregn pris” CTA link to `/parkett-med-montering`. No new individual product
fragments or automatic product preselection were introduced. The secondary
“Har du eget gulv? Beregn kun arbeidspris” link retains the existing `/#pris`
target and distinguishes installation-only pricing.

## Contextual links and search intent

| Route | Addition | Intent retained |
| --- | --- | --- |
| `/gulvlegging` | Short paragraph after the flooring-type cards introducing supplied flooring, allowance, carrying and installation, with a package-page link | General flooring installation services |
| `/fiskebensparkett` | A short callout within the existing pricing-factors section names the Meister package and reads its rate from shared configuration; explicitly says it is not a general herringbone labour rate | Herringbone installation expertise |
| `/priser` | A compact note beside the introduction distinguishes the existing work estimate from a material/delivery/installation package and links to the latter | Installation-only pricing and estimates |
| `/parkett-med-montering` | Existing landing-page content and outgoing service/project links retained | Selection of specific flooring packages |

The existing service-page metadata declarations and H1 markup are unchanged.
No large copy block is duplicated across these pages. Global navigation,
scroll-restoration logic, both calculators, contact submission, analytics and
portfolio data remain unchanged.

## SEO verification

The sitemap now includes exactly one entry for
`https://parkettleggingoslo.no/parkett-med-montering`, using `siteConfig.url`.
There are 20 unique sitemap locations: homepage, four service/commercial pages,
portfolio index and 14 published project details. Existing project slugs and
publication filtering are preserved. Robots continues to declare the same
non-www sitemap URL.

The existing metadata helper remains unchanged. The package-page output was
verified:

- Title: “Parkett med montering i Oslo – fra 1 390 kr/m² | Laskowski Bygg”.
- Description: “Velg mellom to parkettgulv med levering og montering i Oslo,
  Bærum og Asker. Fra 1 390 kr/m² inkl. mva. Minimum 10 m². Beregn pris og be om
  tilbud.”
- Canonical and Open Graph URL:
  `https://parkettleggingoslo.no/parkett-med-montering`.
- Open Graph and Twitter title/description are page-specific; the existing
  absolute non-www branded `/og.png` preview is retained.
- One WebPage and one BreadcrumbList entity, plus exactly one globally supplied
  HomeAndConstructionBusiness entity. The WebPage description accurately
  describes the service package. No additional Service entity was needed.
- No Product/Offer rich-result markup, availability, checkout, return policies,
  delivery deadlines, discounts or reviews were added.

All 20 sitemap page routes return 200 locally, with one H1, unique IDs and the
corresponding non-www canonical and Open Graph URLs. Social metadata is present.
Checks of 163 internal links/fragment targets across the homepage, the three
service/pricing pages and package page pass. All three contextual CTAs and the
homepage primary CTA also reached the package page through actual browser
navigation.

## Responsive and accessibility verification

The homepage, `/gulvlegging`, `/fiskebensparkett`, `/priser` and package page were
checked at 320, 375, 768 and 1440 px: all 20 page/width combinations have no
horizontal overflow and one H1.

Both homepage photographs load successfully through the Next.js optimizer. At
1440 px the two price baselines match. The card links are full-card targets and
the two text/button CTAs are at least 44 px high. Keyboard Tab moves between
previews with a visible global focus outline. The new component uses the
existing reduced-motion CSS; no OS preference was changed. Existing mobile
navigation and sticky CTA were not modified. No browser console warnings or
errors were observed.

## Automated and regression checks

| Check | Result |
| --- | --- |
| `npx.cmd tsc --noEmit` | Pass |
| `npm.cmd run lint` | Pass, no ESLint warnings/errors |
| `npm.cmd run build` | Pass, 29 static pages generated |
| `node --test tests/package-offers.test.mjs` | 9/9 pass |
| Protected baseline | All 39 saved file hashes match, covering both pricing engines/calculators, package data/page, contact, analytics/APIs, navigation, hero, layout/metadata and supplied image assets |
| Source metadata/H1 comparison | Existing three service/pricing metadata declarations and H1s match their original versions |
| Local HTTP audit | 20 sitemap pages, unique sitemap locations, 163 links/fragment targets, canonical/social metadata and package schema pass |
| Browser regression | Package product switching retains notes and returns 48 650 NOK for 35 m² Larvik; installation calculator still produces its existing Parkett (klikk) inquiry prefill |

The existing automated contact tests use mocked requests. No real contact
inquiry was sent. The build emits the existing non-blocking Node
`module.register()` deprecation warning; compilation and validation succeed.

Audit scripts/results and screenshots are stored outside the repository under:

```text
C:/Users/ddlas/.codex/visualizations/2026/10/29/01a18658-f221-7673-924b-495e77c78582/
  phase30c-baseline.json
  phase30c-check.cjs
  phase30c-results.json
  phase30c-browser-results.json
  phase30c-home-desktop.jpg
  phase30c-home-mobile.jpg
```

## Files changed in this phase

Created:

- `components/HomePackageOffers.tsx`
- `docs/homepage-package-integration.md`

Modified:

- `app/page.tsx`
- `app/gulvlegging/page.tsx`
- `app/fiskebensparkett/page.tsx`
- `app/priser/page.tsx`
- `app/sitemap.ts`
- `docs/package-offers.md`

No blocking issue remains for local Phase 3.0C completion. These are local
production-build results; the work has not been deployed or checked as a new
production release.
