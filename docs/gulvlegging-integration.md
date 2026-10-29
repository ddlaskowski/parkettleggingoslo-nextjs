# Gulvlegging: related-page integration

The service page is published at `/gulvlegging`. It uses the shared Header,
the Footer inherited from the root layout, and `createPageMetadata`.
The homepage services section and global footer link to it.

## Existing destinations

| Purpose | Current link |
| --- | --- |
| Parkettlegging overview | `/` |
| Pricing and calculator | `/priser` and `/priser#pris` |
| Flooring photographs | `/#referanser` |
| Project index | `/prosjekter` |
| Herringbone service | `/fiskebensparkett` |
| Quote request | `/#kontakt` |

## Individual project integration

The related-work card now links to `/prosjekter`. Link the featured article to a
relevant individual project only after a verified project record is published.

Do not replace the shared Header's existing homepage anchors as part of these
content changes. Add each route to the sitemap only when it exists. Supply unique
metadata through `createPageMetadata` and preserve one H1 and the `main-content`
skip target on every new page.

No new prices, project details, material brands, or image provenance claims are
introduced on this service page. The hero reuses `/bg_01.jpg` from the existing
site without assigning it to a named project or location. Technical copy defers
product-specific installation requirements to the manufacturer's instructions.

Technical reference reviewed for terminology:
https://www.kahrs.com/globalassets/kahrs/consumer/documents/installation/woodloc-5g/kahrs-installation-guide-w5g-no.pdf
