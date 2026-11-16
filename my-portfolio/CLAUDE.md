# dreaminreality.co.uk — site refresh

Sole trader consultancy site for Simeon Campbell: DFM and 3D CAD consultancy (SolidWorks) for UK clients. This is a refresh of an existing site, not a rebuild. Work incrementally; one page or component per change.

## Stack
- Next.js App Router + Tailwind CSS. No inline CSS, no other CSS frameworks, no styled-components.
- All head content via the Next.js Metadata API (`export const metadata` or `generateMetadata`). Never hand-roll `<head>` tags.
- All images via `next/image` with meaningful `alt` text.
- Semantic HTML. Exactly one `<h1>` per page; heading levels never skip.

## Brand separation — hard rule
- dreaminreality is the trading identity. Siam Precision Partners Ltd (SPP) is a separate, non-trading company. NEVER reference SPP, merge its branding, or reuse its copy on this site.
- Thailand-side factory liaison / prototype coordination IS a dreaminreality service — describe it as a sole trader offering only.
- NEVER describe the UK–Thailand Enhanced Trade Partnership as an FTA, a trade deal, or as conferring tariff advantages. It is an MOU. If in doubt, omit it.

## Copy rules
- British English throughout (colour, optimise, litre, -ise endings).
- Nouns and verbs over adjectives. Banned words: passionate, cutting-edge, solutions, unlock, elevate, seamless, world-class, leverage (as a verb).
- Every claim concrete: what is delivered, in what file format (e.g. native SLDPRT/SLDASM, STEP, DXF, PDF drawing packs), for what kind of client.
- Fix typos found in existing copy when rewriting (e.g. "Testemonials" → "Testimonials").
- Testimonials: Microworkshops, Bambrella/ShadeSpecialists. Portfolio anchors: Halo Gym modular dumbbell system, trading-desk hardware visualisation. Do not invent clients, projects, or figures.

## SEO rules
- One page per service; each targets one primary keyword (e.g. "DFM consultancy UK", "SolidWorks design services", "3D CAD modelling services UK", "construction drawings for manufacturing").
- Every page: unique title tag (~55–60 chars), meta description (~150–160 chars), OpenGraph tags.
- JSON-LD via a shared component: ProfessionalService on the homepage, Service per service page, FAQPage where a FAQ exists.
- Insights/articles section is planned for content authority (reference model: PassageMaker/psschina.com — content-led, referral-based). Scaffold only when asked.

## Design system
- `DESIGN_SYSTEM.md` (produced by the style-auditor agent from the homepage/contact page) is the source of truth for palette, type, spacing, motion, and components. Every page shares this chassis.
- Within that chassis, each service page has its own signature visual element grounded in what the service actually involves — never a generic template with only copy swapped between pages. See the service-page skill's "Design intent" section.

## Workflow
- Before significant work, state the approach briefly, then build.
- One page per commit. Run `npm run build` before declaring a page done.
- Run the style-auditor agent once at the start of the styling refresh (and again if the homepage changes) to produce/refresh `DESIGN_SYSTEM.md`.
- Use the service-page skill when creating or rewriting a service page.
- Before committing a page, run copy-reviewer, seo-auditor, and design-reviewer agents on it.

## UI/UX skills

Taste, a11y, bans, voice, and icon library for this project live in `.ux-profile.md`.
Run `setup-ui-ux-skills` again only to change those defaults.
Before UI or microcopy work, read `.ux-profile.md`, then the matching domain skill (page-patterns, viewports, forms, surfaces, loaders, empty-states, copy, motion).
Before creating a new page, read `page-patterns` and name the pattern. Do not write page markup until the pattern is named.
Layouts must pass `viewports` at 375px and 1280px.
Before finishing UI, run `ux-audit`.
