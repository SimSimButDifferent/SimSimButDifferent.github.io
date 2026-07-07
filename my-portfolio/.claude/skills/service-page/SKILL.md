---
name: service-page
description: Create or rewrite a service page for dreaminreality.co.uk. Use whenever adding a new service route or refreshing an existing one (DFM review, parametric modelling, construction drawings, rendering, reverse engineering, CAD conversion, Thailand liaison, etc.).
---

# Service page pattern

Every service page follows this structure. Ask for the target keyword and route slug if not given; propose one from the CLAUDE.md keyword list otherwise.

## Design intent — do this before writing any code

Read `DESIGN_SYSTEM.md` (produced by the style-auditor agent) first. It defines the fixed chassis every page shares: palette, type scale, spacing rhythm, motion character, and component patterns (buttons, cards, nav/footer). Never deviate from these — the site must read as one business.

Within that chassis, state one paragraph: this page's single signature element, grounded in what the service actually involves, not decoration bolted onto a template. Draw it from the real vocabulary of the work:

- **DFM review** — blueprint annotation language: dimension lines, tolerance callouts, section-cut marks, red-pen review marginalia.
- **Reverse engineering** — an exploded-view reveal (parts separating apart) applied as a scroll or hover interaction on the page itself.
- **Photorealistic rendering** — a light/material transition: matte-to-rendered, wireframe-to-photoreal, as the page's own visual argument.
- **Construction drawings** — the drawing-sheet frame and title block as a genuine layout device, not just an image in a box.
- **Parametric modelling** — a parameter that visibly drives a shape (a slider-like visual, or a family of variants shown side by side).
- **Assembly modelling** — parts-list / BOM aesthetic, numbered call-outs tying an image to a list.
- **Thailand liaison** — factory-floor photography treatment or a shipment/handoff visual thread; never borrow SPP branding.
- **CAD file conversion / design optimisation** — before/after or format-to-format visual pairing.

If a service doesn't fit one of these, invent the equivalent by asking: what does a client actually see or receive from this service? That's where the signature comes from.

Apply the frontend-design skill's brainstorm-then-critique process to this signature element specifically — not to the whole page, since the chassis is already fixed. Sanity check: would this signature element make sense on a different service page with only the copy swapped? If yes, it's not grounded enough yet.

## Route and metadata
1. Route: `app/services/<slug>/page.tsx`. Slug matches the keyword where sensible (e.g. `dfm-consultancy`, `construction-drawings`).
2. `export const metadata`: title `<Service> | Dream in Reality` fitted to the primary keyword (~55–60 chars); description ~150–160 chars stating deliverable + client type; `openGraph` with title, description, url, and image.
3. JSON-LD `Service` schema via the shared `<JsonLd>` component: `serviceType`, `provider` (the ProfessionalService entity), `areaServed: "GB"`, `description`. Add `FAQPage` schema only if the page has a FAQ section.

## Page structure (one H1)
1. **H1** containing the primary keyword naturally.
2. **Opening paragraph** — who this is for and what they get. No adjectival warm-up. First sentence must name a concrete deliverable.
3. **What's delivered** — file formats and artefacts (e.g. native SLDPRT/SLDASM, STEP/IGES, DXF, dimensioned PDF drawing packs, render sets). This section is mandatory.
4. **How it works** — 3–5 step process from brief to handover.
5. **Who it's for** — client types: product startups, small manufacturers, workshop businesses, inventors.
6. **Relevant proof** — link to a portfolio item or testimonial ONLY where genuinely relevant; never fabricate.
7. **FAQ** — 3–5 real questions (lead time, file ownership, revision rounds, NDA handling). Match FAQPage schema exactly to visible copy.
8. **CTA** — plain: "Send your drawings/brief" linking to contact. No urgency theatrics.
9. **Internal links** — link to 2–3 adjacent service pages in body copy.

## Constraints
- All CLAUDE.md copy and SEO rules apply. British English, banned-word list, concrete claims.
- Thailand liaison page: sole trader offering; ETP is an MOU, never an FTA or tariff claim.
- After writing copy: run `npm run build`, then invoke the service-page-stylist agent on this page (requires `docs/design-system.md` to exist — run design-auditor once first if it doesn't). Then run copy-reviewer and seo-auditor before commit.
