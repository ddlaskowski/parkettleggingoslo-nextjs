# Phase 2.6C — Canonical host consistency

## Outcome

Production is **resolved and verified** following the owner's manual Vercel
domain correction. **Phase 2.6C can be closed.** The preferred origin,
`https://parkettleggingoslo.no`, serves pages directly; www permanently redirects
to it with 308, preserving paths and query parameters.

The owner reports the apex is connected to Production and www is configured as a
308 redirect to the apex. Public HTTP verification independently confirms the
resulting behavior. No application change, deployment, dependency installation
or commit was performed by the agent. Earlier uncommitted work was preserved.

## Final production verification — passed

Verified on **29 October 2026, 16:11 CET**, with evidence timestamp
`2026-10-29T15:11:21.580Z`. All **33 read-only production GET requests passed**.
Here, apex means `parkettleggingoslo.no` and www means
`www.parkettleggingoslo.no`.

| Initial request | Complete observed chain | Redirects | Final destination |
| --- | --- | --- | --- |
| `http://parkettleggingoslo.no/` | 308 → HTTPS apex → 200 | 1 | `https://parkettleggingoslo.no/` |
| `https://parkettleggingoslo.no/` | 200 | 0 | `https://parkettleggingoslo.no/` |
| `http://www.parkettleggingoslo.no/` | 308 → HTTPS www → 308 → HTTPS apex → 200 | 2 | `https://parkettleggingoslo.no/` |
| `https://www.parkettleggingoslo.no/` | 308 → HTTPS apex → 200 | 1 | `https://parkettleggingoslo.no/` |

All four origins were also tested with **both** of these nested URLs:

```text
/gulvlegging?canonical_probe=phase26c-final&note=one%20two&item=1&item=2
/prosjekter/limt-eik-fiskeben-ramme-grunerlokka?canonical_probe=phase26c-final&note=one%20two&item=1&item=2
```

Each followed the same chain as its origin in the table. Every hop retained the
pathname and exact query string, including the encoded space and repeated
parameter. All final responses were 200 on HTTPS non-www. No temporary redirect,
loop, path loss, query loss or fixed-homepage redirect was observed.

HTTP www has two permanent hops: an HTTPS upgrade on www, followed by hostname
normalization. This is the observed Vercel hosting sequence, with no additional
application or trailing-slash redirect on the tested paths. HTTPS www already
uses one hop, HTTP apex uses one, and HTTPS apex uses none. No extra chain needs
an application correction; no claim is made that the dashboard can combine the
two HTTP www hops.

### Final production SEO and rendering checks

| Check | Actual result |
| --- | --- |
| Homepage | 200 directly on HTTPS apex; canonical and OG URL are `https://parkettleggingoslo.no` |
| `/gulvlegging`, `/fiskebensparkett`, `/priser` | 200; canonical and OG URL match each non-www pathname |
| `/prosjekter` and all 14 published project detail pages | 200; unique corresponding non-www canonical and OG URLs |
| All 19 published pages | Correct canonical/OG pathname; no tracking queries in either declaration |
| Twitter and OG images | Absolute HTTPS non-www URLs on inspected pages; no conflicting Twitter URL |
| Structured data | Parses on all 19 pages; all site URL references use HTTPS non-www |
| HTML site references | No www site URL found in any of the 19 rendered page documents |
| `/sitemap.xml` | 200 directly on HTTPS apex; all 19 locations use HTTPS non-www |
| `/robots.txt` | 200 directly on HTTPS apex; sitemap declaration is `https://parkettleggingoslo.no/sitemap.xml` |
| Redirects | All four origins tested on root, service and project paths; correct final host, permanent redirects, preserved queries, no loops |

Canonical root forms with and without a trailing slash are equivalent. The
sitemap's actual 19 locations were used to request and verify every published
page, rather than inferring their metadata from source alone.

Final evidence is stored outside the repository, preserving the initial audit:

```text
C:/Users/ddlas/.codex/visualizations/2026/10/29/01a18658-f221-7673-924b-495e77c78582/
  phase26c-final.cjs
  phase26c-final-evidence/results.json
  phase26c-final-evidence/*-headers.txt
  phase26c-final-evidence/*-body.txt
```

No further manual configuration is required for this phase. TypeScript, ESLint
and the production build passed during the initial investigation below; they
were not rerun for this documentation-only follow-up. The checks above are fresh
production results after the owner's hosting correction, not local results.

The following sections retain the **historical investigation and pre-fix
results**. Their old redirect behavior and manual instructions have been
superseded by the passing final verification above.

## Initial investigation and root cause (historical)

Inspected `next.config.ts`, `lib/siteConfig.ts`, `lib/metadata.ts`,
`app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, route metadata, deployment
documentation, environment-variable references and the generated
`.next/routes-manifest.json`.

- No `vercel.json`, Vercel project linkage, middleware or proxy file is present.
- Next.js has no configured hostname redirect or rewrite. Its generated manifest
  contains only the internal trailing-slash normalization redirect.
- `siteConfig.url` and the root `metadataBase` use the HTTPS non-www origin.
- No public URL environment override was found in source or the names of local
  environment variables. Remote Vercel environment settings were not accessible.
- Responses identify `Server: Vercel`; the HTTPS 307 includes `X-Vercel-Id`.
  For example, the apex response has `Location: https://www.parkettleggingoslo.no/`.

The confirmed mismatch is between the live redirect direction and the existing
canonical declarations. A Vercel domain redirect is the likely source, rather
than the application configuration inspected here. Headers alone cannot prove
the exact saved dashboard rule or exclude a different deployed application
revision or another Vercel routing rule. No authenticated Vercel configuration
was available, so the owner must verify the rule before changing it.

Adding a reverse Next.js redirect while the apex-to-www redirect remains active
could create an apex-to-www-to-apex loop. No such application override was added.

## Initial production observations (before correction)

Read-only GET requests with redirect following were recorded on **29 October
2026, 15:58 CET** (evidence timestamp `2026-10-29T14:58:05.416Z`).
In the following table, apex means `parkettleggingoslo.no` and www means
`www.parkettleggingoslo.no`. Every final hostname is www.

| Initial request | Complete observed chain | Redirects |
| --- | --- | --- |
| `http://parkettleggingoslo.no/` | 308 → HTTPS apex → 307 → HTTPS www → 200 | 2 |
| `https://parkettleggingoslo.no/` | 307 → HTTPS www → 200 | 1 |
| `http://www.parkettleggingoslo.no/` | 308 → HTTPS www → 200 | 1 |
| `https://www.parkettleggingoslo.no/` | 200 | 0 |

All four chains return HTML whose canonical is
`https://parkettleggingoslo.no` (the root without a trailing slash is equivalent
to the root with a slash). Its Open Graph URL uses the same non-www origin.

The same four origins were tested with:

```text
/gulvlegging?canonical_probe=phase26c&note=one%20two&item=1&item=2
```

The chains match the table above, preserving the pathname and exact query string
at every hop, including the encoded space and repeated parameter. No redirect
loops occurred. This verifies preservation in the **current** configuration; it
does not verify a replacement rule that has not been applied.

The following additional HTTPS www endpoints returned 200:

- `/fiskebensparkett`
- `/priser`
- `/prosjekter`
- `/prosjekter/limt-eik-fiskeben-ramme-grunerlokka` with the query above
- `/sitemap.xml`
- `/robots.txt`

The inspected homepage, service, portfolio index and project HTML all declare
the corresponding non-www canonical and Open Graph URL, without query strings.
Twitter images use non-www URLs; there is no separate Twitter URL field.
Structured data parses successfully and contains no www site URL. No www site
reference was found in these returned HTML documents. The live sitemap contains
19 non-www page URLs, and robots declares
`Sitemap: https://parkettleggingoslo.no/sitemap.xml`.

The live homepage title differs from the local, uncommitted Phase 2.6B work.
Production and local verification therefore describe separate versions; this
phase did not change titles or descriptions or deploy that earlier work.

## Manual Vercel correction procedure (completed by owner)

Perform these steps in the project currently serving these domains:

1. Open **Project → Settings → Domains** and inspect both domains. Confirm which
   rule currently sends the apex to www. If it is not a domain redirect, locate
   the equivalent hosting redirect before proceeding.
2. Edit `parkettleggingoslo.no`. Remove its redirect to www and connect it to the
   project's **Production** environment/current production deployment. Verify
   `https://parkettleggingoslo.no/` serves 200 before adding a reverse redirect.
3. Edit `www.parkettleggingoslo.no`. Set **Redirect to**
   `parkettleggingoslo.no` and select **308 Permanent Redirect** (301 is also
   acceptable). Use whole-domain forwarding that retains the original path and
   query, rather than a fixed homepage redirect.
4. If an opposite redirect exists elsewhere in project routing or Firewall,
   remove or correct that conflicting rule as part of the same configuration
   change. This report does not assert those additional rules exist.
5. Retain HTTPS enforcement and valid certificates for both names. Do not change
   DNS records merely to implement an HTTP redirect.
6. Re-run the four-origin and nested-query checks below. Do not leave both
   directions active. Prefer a single hop to HTTPS apex where hosting permits;
   Vercel's HTTP-to-HTTPS upgrade may precede the domain redirect for HTTP www.
   Confirm the actual chain after saving rather than assuming a single hop.

Vercel documents the domain editor and redirect destination under
[Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).
Its [redirect documentation](https://vercel.com/docs/routing/redirects) also
describes permanent redirects, hostname scoping and testing nested URLs.

Required final results:

| Request | Acceptance criterion |
| --- | --- |
| HTTPS apex | 200, no hostname redirect |
| HTTPS www | 301/308 to HTTPS apex, then 200 |
| HTTP apex | Permanent redirect(s) to HTTPS apex, then 200 |
| HTTP www | Permanent redirect(s) to HTTPS apex, then 200 |

For each row, test both `/` and the `/gulvlegging` query example above; also test
a published project path. Every Location must retain the path and query. No
307, cycle, dropped query or fixed-homepage redirect should remain. Recheck the
canonical and Open Graph URL in the final HTML, sitemap and robots after saving.

An example PowerShell-compatible inspection command (repeat for each origin):

```powershell
curl.exe --silent --show-error --location --max-redirs 8 --dump-header - --output NUL 'https://www.parkettleggingoslo.no/gulvlegging?canonical_probe=phase26c&note=one%20two&item=1&item=2'
```

## Local validation

All checks completed successfully against the existing application:

| Check | Result |
| --- | --- |
| `npx.cmd tsc --noEmit` | Exit 0 |
| `npm.cmd run lint` | Exit 0, no errors or warnings |
| `npm.cmd run build` | Exit 0; 28 static pages generated |
| Production server on localhost:3012 | Started successfully from the build |
| All 19 sitemap page routes | 200, including all 14 published project details |
| Canonical and Open Graph | Correct non-www origin and corresponding pathname on all 19 pages |
| Query handling | Query requests render; canonical and OG omit tracking queries |
| Twitter and OG images | Non-www absolute image URLs on all 19 pages |
| Structured data | Parses on all 19 pages; site URL references use non-www |
| Internal absolute site references | No www reference found in source search or rendered page HTML |
| Sitemap and robots | 200; 19 non-www sitemap URLs; non-www sitemap declaration |
| Unknown project | `/prosjekter/phase26c-unknown` returns 404 |

Local HTTP verification completed at `2026-10-29T15:03:09.987Z` (16:03 CET).
Local Next.js does not reproduce Vercel domain configuration, so these results
do not validate the desired production redirect direction.

Read-only QA scripts, raw production headers/bodies, production results and local
results are stored outside the repository under:

```text
C:/Users/ddlas/.codex/visualizations/2026/10/29/01a18658-f221-7673-924b-495e77c78582/
  phase26c-production.cjs
  phase26c-http-evidence/results.json
  phase26c-http-evidence/*-headers.txt
  phase26c-http-evidence/*-body.txt
  phase26c-local.cjs
  phase26c-local-results.json
```

## Changes and closure

Only this report, `docs/canonical-host-consistency.md`, was created in the
repository during the initial Phase 2.6C investigation and updated in the final
verification follow-up. No application file was changed. Pricing, contact,
analytics, portfolio data, content, components and navigation behavior were
preserved. No deployment or commit was made.

The owner completed the manual hosting correction. Final production checks
confirm the desired canonical hostname and permanent redirects, with no remaining
blocker for Phase 2.6C. **Phase 2.6C can be closed.**
