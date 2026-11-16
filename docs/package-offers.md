# Phase 3.0B — Product landing page and package calculator

The Phase 3.0C homepage/link/sitemap integration is now implemented. See
[homepage package integration](homepage-package-integration.md) for the current
integration details and validation. The original Phase 3.0B scope below records
the landing-page implementation.

## Scope

`/parkett-med-montering` is a server-rendered landing page with a small client
composition for product selection, whole-square-metre calculation and contact
state. Shared Header and global Footer remain in use. The homepage, navigation,
installation pricing engine, APIs, analytics payloads and portfolio records are
unchanged. Nothing was deployed or committed.

## Commercial configuration

`lib/packageProducts.ts` is the source of truth for the two product rates:

| Product | NOK/m² incl. VAT | Minimum package, 10 m² |
| --- | --- | --- |
| Meister Lindura HS 500 Classic Oak | 1 490 | 14 900 NOK |
| Bjelin Woodura Planks Larvik 3.0 XXL | 1 390 | 13 900 NOK |

Shared `packageTerms` defines the minimum area, VAT, service areas, inclusions and
exclusions. Necessary material allowance, supplier collection/transport,
delivery into the home, installation and VAT are included. No additional waste
calculation, quantity discount, transport or carrying surcharge is applied.
Underlay, skirting, skirting installation, subfloor preparation and other agreed
extras are excluded and assessed separately. Totals are indicative, subject to
confirmation of project conditions.

`lib/packagePricing.ts` uses integer NOK arithmetic and strict digit-only area
validation. Empty, negative, fractional, comma/point, exponent, malformed,
below-minimum and unsafe-range inputs cannot produce a valid estimate. Values
are neither rounded nor clamped. Prices use `Intl.NumberFormat` with `nb-NO` and
currency NOK. Product minimum prices and the hero's starting rate are derived.

## Contact integration

`PackageOfferClient` owns product and area state, derives a summary and passes it
to the optional `ContactForm.packageSummary` prop:

- `undefined`: existing installation/general contact behavior.
- `null`: incomplete or invalid package; package submission is disabled.
- A string: visible, generated summary that is combined with customer notes
  only while preparing the existing request's `message` field.

Customer name, telephone, location and editable message stay mounted and are not
overwritten by changes to the package. Existing installation `prefill` behavior
is retained. Existing validation, consent, honeypot, response handling and
`contact_submit_success` event are preserved. No API payload keys were added.
The new composition follows the existing one-time handshake convention and
introduces no calculator analytics event or changed analytics payload.

## Images and related work

Phase 3.0B.1 replaces the placeholders with ordered `images` arrays referencing
the supplied originals under `public/sale/meister/` and `public/sale/bjelin/`.
`PackageProductGallery` uses a stable 4:3 frame, thumbnails, previous/next controls
and keyboard/touch navigation. No originals are altered, deleted or replaced.
See [the photography inventory and verification](product-photography.md) for
image choices, exclusions, source references and tests. Verified thickness is now
published: 11 mm for Meister and the approved 11.2 mm for Bjelin.

Phase 3.0D adapts the existing related-work section to show the Meister projects
on Bekkestua and in Oslo sentrum. Copy explicitly states they are not confirmed
installations of the exact Classic Oak 08925 product. Their records and original
images are unchanged. See [Meister portfolio integration](meister-portfolio-integration.md)
for the installation-method distinction, selected photographs and validation.

## SEO and accessibility

The existing metadata helper supplies a unique title, description, Open Graph
and Twitter metadata and canonical
`https://parkettleggingoslo.no/parkett-med-montering`. The page has one H1,
logical section headings, WebPage/BreadcrumbList JSON-LD and the inherited
business schema. It contains no Product/Offer markup or invented availability,
return policy, shipping policy or reviews.

Native radio inputs and a synchronized native select expose product state. Area
input has labels, inline Norwegian validation and `aria-invalid`. A polite live
region announces calculated prices. Product selection also shows “Valgt”, so it
does not depend on color. New controls and links have generous touch targets.
Global focus outlines, scroll offsets and reduced-motion CSS are retained. The
calculator CTA focuses the local contact heading and uses the existing CSS
scroll behavior, respecting the reduced-motion preference.

## Validation

Run the repeatable mocked tests with:

```text
node --test tests/package-offers.test.mjs
```

The nine tests cover both products' approved totals at 10/20/35/50 m², invalid
inputs, product/area summary changes, unchanged contact request keys, note
preservation, invalidation, consent, mocked API/network/ignored responses,
success analytics, legacy installation prefill and the actual HomeClient
calculator callback, local image records/manufacturer URLs, and gallery
keyboard/thumbnail/swipe navigation. No test contact inquiry is sent to a live backend.

TypeScript, ESLint and the production build pass. Local browser checks cover
320/375/768/1440 px with empty and populated calculator state and no horizontal
overflow; native radio keyboard selection, focus outlines, mobile menu Escape,
strict validation, product switching, preserved notes, focus/scroll placement,
loaded portfolio images, canonical/OG and parsed JSON-LD. No browser console
warnings or errors were observed. Reduced-motion support follows the unchanged
global CSS; an OS-level preference toggle was not performed.

An older external Phase 2.4 QA script predates HomeClient's props signature and
fails when invoking it without a props object. The new regression test invokes
the real callback with React-compatible props and passes; no application change
was made to accommodate that obsolete script.

## Phase 3.0C — completed

- Homepage promotion immediately after Services and before WhyUs.
- Contextual incoming links from `/gulvlegging`, `/fiskebensparkett` and `/priser`.
- Sitemap inclusion and link/metadata checks across 20 published pages.
- Two primary product photos on the homepage, with existing branded Open Graph
  imagery and social metadata verified. Product galleries remain on the package page.

The route is discoverable through the homepage and service pages in the local
preview. Global navigation remains unchanged. No deployment was performed.
