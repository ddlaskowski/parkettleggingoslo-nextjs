# Phase 2.6B — homepage implementation

Implemented and checked locally on 2026-10-29. No deployment or git commit.

## Exact copy

### Metadata and hero

Title (including Open Graph and Twitter title):

> Gulvlegging og parkettlegging i Oslo | Laskowski Bygg

Meta, Open Graph and Twitter description:

> Gulvlegging og parkettlegging i Oslo, Bærum og Asker. Vi legger parkett, laminat og fiskebensparkett. Se prosjekter, beregn pris og be om tilbud.

H1:

> Gulvlegging og parkettlegging i Oslo

Hero lead:

> Laskowski Bygg legger parkett, laminat, klikkvinyl og heltre i Oslo, Bærum og Asker. Vi utfører også fiskebensparkett og limte parkettgulv.

Qualification below the unchanged hero buttons:

> Vi legger nye gulv og utfører tilhørende gulvarbeid. For mindre oppdrag gjelder minimumsprisen som vises i kalkulatoren.

Social image alt:

> Gulvlegging og parkettlegging – Laskowski Bygg

### Practical expertise

Introduction:

> Vi vurderer undergulvet, leggemetoden og overgangene mellom rommene før arbeidet starter. Gulvlister og avslutninger avklares i tilbudet.

| Card | Description |
| --- | --- |
| Arbeidsomfang og tilbud | Vi avklarer gulvtype, areal og tilhørende arbeid før vi gir tilbud. |
| Valg av leggemetode | Klikk eller liming vurderes ut fra gulvproduktet og undergulvet. |
| Undergulv og forarbeid | Behovet for fjerning av gammelt gulv og avretting vurderes på befaring. |
| Tilpasninger og avslutninger | Gulvlister, døråpninger og overganger avklares før vi gir tilbud. |

New compact H3:

> Erfaring med fiskebensparkett

Paragraph:

> Et oppdrag på Grünerløkka omfattet eikestaver i fiskeben med ramme, limt til undergulvet. Det er ett av gulvprosjektene du kan lese mer om i porteføljen vår.

Links:

- “Se fiskebensgulvet med ramme på Grünerløkka →” points to
  `/prosjekter/limt-eik-fiskeben-ramme-grunerlokka` through the published registry
  lookup. The block is omitted if that project is unpublished.
- “Les om legging av fiskebensparkett →” points to `/fiskebensparkett`.

Facts were checked against the existing oslo-06 record: oak staves, herringbone,
border and glue to the subfloor. No registry data was changed or full description
copied, and no sanding work was claimed as completed.

### Contact and calculator guidance

Persistent contact introduction, also associated with the textarea using
`aria-describedby`:

> Oppgi gulvtype, omtrent areal, hvilke rom det gjelder og hvor boligen ligger. Fortell også om gammelt gulv skal fjernes og om du ønsker nye gulvlister.

Message placeholder:

> Gulvtype, omtrent areal, rom og område

Homepage-only explanation outside PriceCalculator:

> Velg gulvtype, areal og tilvalg for å få et veiledende arbeidsestimat. «Send forespørsel» overfører valgene til kontaktskjemaet, der du kan legge til opplysninger før du sender.

`HomeClient` accepts an optional `explainCalculator` flag, enabled only by the
homepage. The pricing page keeps its existing surrounding explanation without
duplicating this paragraph. Calculator prefill generation is unchanged.

### Headings, reviews and local information

- Gallery: “Referanser” → “Bilder fra gulvprosjekter”. ID `referanser` retained.
- Reviews: “Referanser” → “Kundeomtaler”. ID `kundeomtaler` retained.
- Removed only the two accidental literal backticks around Malin's review.
- Local H2: “Parkettlegging i Oslo, Bærum og Asker” →
  “Gulvlegging i Oslo, Bærum og Asker”.

Local paragraphs (the first occurrence of “gulvlegging” links to `/gulvlegging`):

> Vi utfører gulvlegging i Oslo, Bærum og Asker. Arbeidet kan omfatte parkett og laminat i flere rom, fjerning av gammelt gulv og montering av gulvlister. Vi avklarer hva som skal gjøres før vi gir tilbud.

> Ved fiskebensparkett og andre mønstre vurderes leggemetoden ut fra produktet og undergulvet. Oppgi rom, omtrent areal og ønsket gulvtype når du tar kontakt, så har vi et utgangspunkt for befaringen.

The company name, organisation number and address paragraph is unchanged.

Sticky mobile response text: “Rask svar i dag” → “Raskt svar i dag”. The existing
weekday/time selection and “Svar neste arbeidsdag” alternative are retained;
no response promise was added or expanded.

## Descriptive image alternatives

All 13 source photographs were visually inspected. No location, manufacturer,
product model or installation method was inferred for their new alternatives.

| Existing image | New alt |
| --- | --- |
| bg_01.jpg | Gulv i stue og spisestue med grå sofa og hvit trapp |
| bg_02.jpg | Lyst gulv i åpen stue med spiseplass og vindusrekke |
| bg_03.jpg | Brede gulvbord i stue med kjøkken og åpning mot terrassen |
| work/parkettleggingoslo_01.jpg | Fiskebensmønster gjennom en dobbel døråpning |
| work/parkettleggingoslo_02.jpg | Fiskebensgulv i gang med hvite gulvlister |
| work/parkettleggingoslo_03.jpg | Overgang med nivåforskjell mellom to gulvflater |
| work/parkettleggingoslo_04.jpg | Gulvpakke på lyst fiskebensgulv |
| work/parkettleggingoslo_05.jpg | Brunt fiskebensgulv med stablede gulvpakker |
| work/parkettleggingoslo_06.jpg | Fiskebensgulv og hvite gulvlister mot mønstret tapet |
| work/parkettleggingoslo_07.jpg | Fiskebensgulv foran bokhyller og glassdør |
| work/parkettleggingoslo_08.jpg | Gulvpakke på lyse gulvbord i rett mønster |
| work/parkettleggingoslo_09.jpg | Lyst fiskebensgulv gjennom flere rom under arbeid |
| work/parkettleggingoslo_10.jpg | Fiskebensmønster med ramme langs veggen under legging |

Photographs, ordering, responsive image properties and hero/lightbox animations
remain unchanged.

## Mobile and accessibility changes

- The existing sticky CTA component, including its spacer, now renders after the
  homepage FAQ. Its 80px spacer no longer precedes the hero. Visibility, contact
  observer, inert state, keyboard handling and analytics callbacks are unchanged.
- Hero H1 uses a clamped 34–48px size: 34px at 320px, approximately 39.4px at
  375px and the original 48px at 768/1440px. Visual review found the original
  narrow-screen sizing stranded “og” on its own line; the adjustment groups the
  wording into three lines on the tested phone widths without document overflow.
  The obsolete 320px-only H1 override was removed; calculator wrapping CSS remains.
- The sole PriceCalculator source change is the range input attribute
  `aria-label="Areal i kvadratmeter"`.

## Validation

| Check | Result |
| --- | --- |
| TypeScript (`tsc --noEmit --incremental false`) | Passed |
| ESLint | Passed without errors or warnings |
| Production build | Passed; existing routes and 14 project detail paths generated |
| Pricing regression | 210 before/after cases match HEAD, including five floor types, area boundaries, waste choices, VAT inputs and selected pattern/add-on combinations |
| Calculator source restriction | Exact diff contains only the approved slider attribute |
| Contact contract | State, validation and submission code unchanged; isolated mocked tests match the original payload and success event |
| Contact mocked cases | Initial/updated prefill, manual editing, invalid phone, consent gating, ignored-response error and accepted-response success checked |
| Real browser calculator | Area changed to 46 by keyboard; parquet/herringbone selected; removal suggested old-floor waste; excluding VAT updated displayed values and prefill |
| Browser form | Prefill remained editable; invalid phone disabled submission; valid fields enabled it; removing consent disabled it; no form submitted |
| Metadata | Exact approved homepage title/descriptions; canonical/base/OG URL unchanged; all four main route-specific metadata objects match HEAD |
| Links and anchors | 35 homepage link instances/anchors resolve, including the verified project and existing IDs; IDs remain unique |
| Responsive layout | Homepage and shared pricing/contact composition checked at 320, 375, 768 and 1440px; no horizontal overflow |
| Sticky CTA | Hidden/inert at page top and contact; visible while scrolling other content; hero heading starts at 112px rather than 192px on mobile |
| Keyboard/gallery | Named slider, mobile menu Escape focus, real project link, lightbox Left/Right and Escape focus restoration passed |
| Scroll behavior | Existing native scroll attribute retained; project navigation lands at top; gallery/contact anchors retain approximately 80px offsets |
| Console | No browser warnings/errors observed during review |
| Protected assets/systems | Pricing config, registry, generated image data, public assets, APIs, tracking, metadata helper and route-specific page files unchanged |

All submission-handler tests used mocked fetch and tracking functions. No real
test inquiry was sent to the production or local contact API. Existing analytics
events from ordinary local browser interactions were not disabled or altered.

Canonical-host consistency remains deliberately deferred, as requested. No new
routes, dependencies, pricing rules or project data were introduced.
