# Phase 2.5D — navigation and homepage discoverability

## Reproduced scroll problem

On the pre-change production build, opening the last project card from the index
left the detail page at approximately scrollY 2106. Using its back-to-projects
link left the index at approximately scrollY 4328 instead of the top.

Inspection found no `scroll={false}` props or custom route scroll effects. The
global stylesheet sets `html { scroll-behavior: smooth }`, but the root HTML
element lacked `data-scroll-behavior="smooth"`.

Installed Next.js 16.1.6 uses that attribute in
`disableSmoothScrollDuringRouteTransition`. Without it, the router's normal
scroll/focus operations run under CSS smooth scrolling, causing competing animated
positions during page changes. The fix adds the attribute to the existing root
HTML element. Next temporarily uses instant scrolling for route changes and keeps
same-page hash scrolling smooth. No pathname effect, scroll reset, history listener
or `history.scrollRestoration` override was introduced.

## Homepage and shared navigation

- Three full-card links replace the small service links, using the requested
  titles, descriptions and CTAs. Existing four service cards remain below.
- Cards use the current border, radius, neutral background and gold/brown accents.
  The layout is one column below 768px and three columns from 768px. Native links
  provide keyboard activation; existing 3px focus outlines remain visible.
- The gallery CTA receives a number from the server homepage's
  `getPublishedProjects().length`. Only that number is passed to the client gallery;
  the registry and image manifest are not imported into the client component.
  Singular and empty-count wording are also supported. Photographs, ordering,
  optimizer settings and lightbox logic are unchanged.
- The five-slot header now links “Prosjekter” to `/prosjekter` in place of
  “Referanser”. “Tjenester” leads to the homepage's prominent service cards.
  The footer adds Fiskebensparkett and retains a “Galleri” link to `/#referanser`.
- A homepage wrapper adds `#priser` as an alias at the same position as the existing
  `#pris`. The original calculator/hero links and contact handoff stay intact.

## Small-screen validation fix

At 320px, the existing 48px homepage headline forced its grid wider than the
viewport, and the calculator's waste-option rows also overflowed. Scoped CSS below
375px reduces the headline to 36px and lets homepage calculator labels/prices wrap.
Hero imagery and calculator source/configuration/formulas are unchanged. The
adjustment does not affect layouts at 375px and above.

## Validation — 2026-10-29

- `tsc --noEmit --incremental false`, `npm run lint` and `npm run build` passed.
- Real browser link navigation opened at the top for homepage → Gulvlegging,
  Gulvlegging → Fiskebensparkett, Fiskebensparkett → Prosjekter, index → lower
  project card, detail → index, and Priser → Prosjekter. Keyboard activation and
  mobile menu navigation also opened their destination at the top.
- Settled Back restored the lower project index (approximately scrollY 3927 after
  clicking that card); Forward restored the detail page at scrollY 0. Native
  restoration may animate under the existing CSS smooth-scroll preference.
- `/#kontakt`, `/#referanser` and `/#tjenester` landed at approximately 80px below
  the viewport top. Direct `/#priser` and the original `#pris` have the same
  approximately 80px target position. All IDs remain unique.
- The existing calculator inquiry button populated the contact message with the
  selected flooring/area and scrolled the contact section to approximately 80px.
  No contact form was submitted.
- Mobile menu Enter/Escape, expanded state, Escape focus restoration and project
  navigation passed. The gallery opened with Enter, Left/Right changed images,
  Escape closed it and restored the original trigger focus.
- Service-card keyboard focus retained a solid 3px outline. Compiled CSS includes
  the reduced-motion rules for scrolling/animation and new transitions. The test
  browser's OS preference was not reduced; an OS preference switch was not emulated.
- Homepage, both service pages, prices, project index and a project detail passed
  overflow checks at 320, 375, 768 and 1440px (24 combinations). Service cards and
  the portfolio CTA were visually reviewed on desktop/mobile.
- HTTP checks verified five main pages and 174 internal links/anchors, including
  the new cards, dynamic count, original anchors and added alias. All recorded
  portfolio source hashes match the Phase 2.5C verification snapshot.
- No browser console errors/warnings were observed. Protected pricing, calculator,
  analytics and contact files have no diff. No dependencies or commits were added.

Checks were local against the production build. No deployment was performed.
