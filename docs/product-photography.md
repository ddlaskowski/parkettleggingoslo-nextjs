# Phase 3.0B.1 — Product photography, galleries and specifications

Verified and implemented on 16 November 2026. No deployment, commit, dependency
installation, homepage change or original-image modification was performed.
Earlier uncommitted Phase 3.0B work was preserved.

## Asset inventory and visual inspection

All 12 files were opened and visually inspected. Dimensions were read from the
originals using the already-installed Sharp package. Aspect ratios are width
divided by height. File names and original bytes are preserved.

| Directory | File | Dimensions | Ratio | Bytes | Content and decision |
| --- | --- | --- | --- | --- | --- |
| `public/sale/meister/` | `01.jpg` | 1920 × 1280 | 1.5000 | 364513 | Living room, fireplace and oak herringbone; primary, position 1 |
| `public/sale/meister/` | `02.jpg` | 1920 × 1280 | 1.5000 | 364513 | Exact byte duplicate of 01; retained on disk, omitted from gallery |
| `public/sale/meister/` | `03.jpg` | 600 × 900 | 0.6667 | 156249 | Kitchen combining herringbone and adjacent straight planks; retained, omitted to avoid presenting the other floor as this package |
| `public/sale/meister/` | `04.jpg` | 600 × 848 | 0.7075 | 109321 | Herringbone pattern and grain detail; position 2 |
| `public/sale/bjelin/` | `01.webp` | 1600 × 1200 | 1.3333 | 123660 | Overhead plank surface and grain; position 6 |
| `public/sale/bjelin/` | `02.webp` | 1600 × 1200 | 1.3333 | 276984 | Floor beside rug and dog; position 8 |
| `public/sale/bjelin/` | `03.webp` | 1600 × 1200 | 1.3333 | 122096 | Grain detail beside wooden chair; position 7 |
| `public/sale/bjelin/` | `04.webp` | 1600 × 1200 | 1.3333 | 158160 | Dining area, wide planks and kitchen; primary, position 1 |
| `public/sale/bjelin/` | `05.webp` | 1977 × 2971 | 0.6654 | 284490 | Portrait view of kitchen island and floor; position 3 |
| `public/sale/bjelin/` | `06.webp` | 1600 × 1200 | 1.3333 | 101308 | Plank joints near kitchen island; position 4 |
| `public/sale/bjelin/` | `07.webp` | 1600 × 1200 | 1.3333 | 34004 | Hallway and continuous plank direction; position 2 |
| `public/sale/bjelin/` | `08.webp` | 1600 × 1200 | 1.3333 | 237762 | Close view of joints and grain; position 5 |

Meister 01/02 have identical SHA-256:
`826100dafdef5616648d43bab179d5067df83d9a91b5284b7101b9e4f751b36c`.
The eight Bjelin files are distinct. Several show the same interior or floor
surface, but different angles, framing or detail; none was identified as a
duplicate/near-duplicate that needed removal. No replacement images were fetched.

Final gallery orders:

- **Meister:** `01.jpg → 04.jpg`.
- **Bjelin:** `04.webp → 07.webp → 05.webp → 06.webp → 08.webp → 01.webp → 03.webp → 02.webp`.

The room views establish the overall appearance before the galleries move to
layout, grain and joint details. Both products receive the same primary frame
and reserved thumbnail-panel height, despite different photograph counts.

## Manufacturer verification

Both `link.txt` files exactly match the brief's expected official URLs; no URL
discrepancy was found. The product pages and their linked installation/care
documents were used instead of supplier retail descriptions.

| Product | Published facts |
| --- | --- |
| Meister Lindura HS 500 Classic Oak | MEISTER; Lindura HS 500; 140 × 700 mm; 11 mm; oak, Classic grading; brushed ultramatt Duratec Nature lacquer; UniZip; real wood surface, wood-powder layers and HDF core; manufacturer use class 23/32 |
| Bjelin Woodura Planks Larvik 3.0 XXL | Bjelin; Woodura Planks 3.0 XXL; 271 × 2378 mm; approved 11.2 mm (displayed as 11,2 in Norwegian); oak, Select grading; Powder White; brushed matt lacquer; HDF core; Välinge 5G Dry |

Sources:

- [MEISTER product page](https://www.meister.com/en/products/lindura-wood-flooring-hs-500-classic-oak-08925-ultra-matt-lacquered.html)
- [MEISTER installation and care instructions, January 2026](https://www.meister.com/_Resources/Persistent/a/4/b/0/a4b01bac64c194233107dc02ee1b7ce6484cb391/EN_Compact_installation_parquet_Lindura_UniZip_M_0126.pdf)
- [Bjelin Norwegian product page, article 30087](https://no.bjelin.com/no/shop/gulv--woodura-planks/30087-woodura-planks-larvik-3-0-xxl)
- [Bjelin Woodura 3.0 installation instructions](https://cdn.bjelin.se/uploads/2026/09/14/WO-NO---5GDry-Instruction-2025-JPG_screen_uid_6aa7e1d43b469.pdf)
- [Bjelin maintenance instructions for matt/brushed lacquer](https://cdn.bjelin.se/uploads/2023/11/13/HW-NO---Pro-matt--Brushed-Maintenance_uid_6551e6b607f07.pdf)

The separate MEISTER product-datasheet download did not load in the web reader;
the required published facts were available on the official product page and
accessible installation/care instructions. No claim relies on that unavailable
download. Installation constraints and conservative care guidance are presented
in expandable product details, rather than implying suitability for every
subfloor or promising a damage-proof surface. No warranties, certification
badges or comparative hardness claims were added.

## Implemented Norwegian descriptions

**Meister:**

> Varm eik i klassisk fiskebensmønster. Børstingen fremhever trestrukturen, mens Classic-sorteringen kombinerer roligere staver med naturlige kvister og variasjon. Den ultramatte lakken gir en dempet overflate.

**Bjelin:**

> Lyse, brede eikeplanker i Powder White med et rolig uttrykk. Select-sorteringen og de lange bordene gir et sammenhengende gulvbilde, mens børstet mattlakk lar trestrukturen komme frem.

Manufacturer product facts and external links are separated from the commercial
service package. Price text explicitly names Laskowski Bygg as the delivery and
installation provider. Rates remain 1490/1390 NOK per m² including VAT, minimum
10 integer m². Material allowance, carrying, transport, exclusions and the
existing inquiry message contract are unchanged. Stable product IDs are retained.

## Gallery implementation and performance

`PackageProductGallery` is a small client component with independent image state:

- Previous/next buttons, numbered position and thumbnail controls.
- `aria-pressed` active state, named group and image controls, unique image IDs,
  meaningful primary-image alt text, decorative thumbnail alt text.
- ArrowLeft/ArrowRight and Home/End navigation; Tab remains ordinary navigation.
- Horizontal touch-swipe handling with a minimum distance and direction check;
  vertical gestures and cancelled touches do not change the image.
- No modal, focus trap, autoplay, dependency or global listeners.

The card wrapper is an article, with a separate radio label for selection. Gallery
buttons, details and manufacturer links are not nested inside a selection label.
Viewing photographs cannot accidentally choose a product. Manufacturer links use
the exact `link.txt` URLs, `target="_blank"` and `rel="noopener noreferrer"`, with
new-tab guidance and secondary styling.

Next.js Image uses original dimensions, responsive `sizes` and lazy loading.
Primary images use `object-contain` in equal 4:3 frames so portrait/detail images
are not cropped. Thumbnail previews use `object-cover`. No original bytes are
edited; Next.js performs its normal optimized delivery. In the desktop browser,
a primary was delivered at 640 px and thumbnails at smaller responsive sizes.
No gallery preloads or all-slide full-resolution mounts were introduced. Border
transitions obey existing reduced-motion rules; there is no slide animation.

## Validation results

| Check | Result |
| --- | --- |
| `npx.cmd tsc --noEmit` | Pass |
| `npm.cmd run lint` | Pass; no ESLint errors or warnings |
| `npm.cmd run build` | Pass; 29 static pages generated |
| `node --test tests/package-offers.test.mjs` | 9/9 pass; original pricing/contact tests retained, photography and gallery tests added |
| Protected-file/asset comparison | All 29 saved hashes match, including package calculator logic, contact form/APIs, analytics, homepage, installation engine and supplied assets |
| Images | All 10 gallery photographs and thumbnails load; Meister duplicates/mixed-floor view intentionally omitted |
| Gallery navigation | Both galleries, all thumbnails, previous/next and keyboard navigation checked; photo browsing does not alter package selection |
| Responsive | 320, 375, 768 and 1440 px: no horizontal overflow; equal main-image dimensions for the two products |
| Touch targets | Previous/next controls 44 × 44 px; thumbnails at least 48 px high and approximately 49.75 px wide at the smallest tested viewport |
| Expanded mobile details | Readable and no horizontal overflow at 320 px |
| Keyboard | Visible focus; thumbnail/arrow/Home/End navigation; ordinary Tab exits controls without a trap |
| Calculator/contact | 35 m² yields 52 150 NOK for Meister and 48 650 NOK for Bjelin; new product names appear in summary; notes survive image browsing and product switches |
| Existing installation calculator | `/priser` renders; Parkett (klikk) selection still generates its existing inquiry prefill |
| Manufacturer links | Exact expected official destinations; new tab and safe rel attributes verified |
| SEO | Existing non-www canonical preserved |
| Browser console | No warnings or errors observed |

Touch gesture direction/cancellation is covered by automated handler tests;
physical-device swipe testing was not performed. Reduced-motion behavior uses
unchanged global CSS; no OS preference was changed. All contact submissions in
the automated suite are mocked; no real inquiry was sent.

The build emits the existing non-blocking Node `module.register()` deprecation
warning. This does not prevent compilation, type checking or page generation.

## Files and follow-up

Created:

- `components/PackageProductGallery.tsx`
- `docs/product-photography.md`

Modified in this phase:

- `lib/packageProducts.ts`
- `components/PackageProductCard.tsx`
- `tests/package-offers.test.mjs`
- `docs/package-offers.md`

Screenshots and the protected-file baseline are stored outside the repository:
`C:/Users/ddlas/.codex/visualizations/2026/10/29/01a18658-f221-7673-924b-495e77c78582/phase30b1-desktop.jpg`
and `phase30b1-baseline.json` in the same directory.

No blocking issue remains for this phase. Homepage integration, incoming links
and sitemap inclusion remain Phase 3.0C work. Original duplicate/omitted files
remain available for owner review.
