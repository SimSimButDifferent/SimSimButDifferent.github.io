# DESIGN_SYSTEM.md

Source of truth for palette, type, spacing, motion and components, extracted by the style-auditor from the homepage and contact page (2026-08-07 re-run, post palette-refresh). Every page shares this chassis. Re-run the style-auditor if the homepage changes.

Extracted from:
- `src/components/HomeContent.js`, `src/components/ContactContent.js`
- `src/styles/globals.css` (all custom classes)
- `src/components/{Navbar,Footer,ServiceCard,TestimonialCard,ScrollReveal,StaggeredGrid,TiltBox,AnimatedLogo,Map,StaticMap}.js`
- `src/hooks/useScrollAnimation.js`, `tailwind.config.js`, `src/app/layout.js`

Note: `StaticMap.js` was audited because it shares the map fallback-state pattern, but it is not currently rendered from `ContactContent.js` (which imports `Map.js` as `GoogleMap`) — it's only wired up in the unused `MapTest.js` harness. Treat it as a pattern reference, not live contact-page markup.

## 0. Dark theme (2026-11, in rollout)

The site is moving from "light base, dark as sections" to dark throughout, using the look of the three.js service scenes. Migrated so far: navbar, footer, `/services/dfm-consultancy`, `/services/solidworks-design`, `/services/cad-file-conversion`. **Sections 1 to 7 below describe pages that have not moved yet.** New work follows this section and `.ux-profile.md`.

- **Opt-in:** `<main className="page-dark">`. It out-ranks the legacy `main { color: black; width: 100vw }` rule, which stays until the last light page has gone.
- **Tokens added:** `surface` #1e293b (slate-800, panels), `line` #334155 (slate-700, 1px borders). Existing `navy`, `ink-inverse`, `muted-inverse`, `accent-visual` carry the rest. Cyan-400 is the only accent and, on navy, is also the link and CTA colour (the old hero exception is now the rule on dark pages).
- **Depth:** 1px `line` border and a one-step `surface` fill. No shadows, no cyan-300 frames.
- **Type scale (minor third):** `text-title-sm` 1.2rem, `text-title` 1.728rem, `text-display` 2.488rem, `text-display-lg` 2.986rem. Body `text-base font-light leading-normal`, max 70ch. Weights 300 and 600 only.
- **Component classes (`globals.css`):** `.page-dark`, `.panel`, `.eyebrow`, `.link-inverse`, `.btn-inverse`, `.chip`, `.nav-link`, `.focus-ring`.
- **Motion:** no entrance animations on text. 150ms colour transitions on links and buttons; 200ms opacity cross-fades. No hover scale.
- **Scroll scene pattern:** `ScrollScene` + `ScrollPane` (`src/components`). Text panes scroll on the left; a canvas is pinned on the right from `lg` up. Scroll chooses the pane; it does not drive the frames. Arriving at a pane plays the scene to that pane's target time on a timer (about five seconds forward, a quick rewind back; `src/lib/scrollTimeline.mjs`). Scenes live in `src/scenes/<slug>.js`, registered in `src/scenes/stage.js`, and are pure functions of time. three.js loads on demand, desktop only. Still frames in `public/images/scenes/` are the view below `lg`, under reduced motion, and without WebGL. Per page: `sceneConfig.js` with `targets`, `stills` (the scene at each target), `label`.
- **Snap frames:** `<main className="snap-page">` plus `.snap-frame` on each full-height section. From `lg` up the page snaps frame by frame (CSS `scroll-snap-type: y mandatory`, with `SnapScroll` turning one wheel gesture into one frame). Below `lg` it scrolls freely. Text sections after the scene ("Who it is for", FAQ) are each their own frame holding one `.panel`.
- **Process route (`ProcessPath`):** an ordered list of stages from design to production, the current service lit in cyan (dot and line up to it), client types as chips at the stage they arrive, neighbouring services as links. Vertical below `md`, horizontal from `md`. Used in "Who it is for" panels; reuse it on other service pages by moving the `current` stage.
- **`overflow-x: clip`, not `hidden`, on `html, body`:** `hidden` breaks `position: sticky`.
- **Logos:** the black nav mark and footer wordmark are inverted in CSS (`invert`, plus `mix-blend-screen` for the opaque PNG). Replace with light artwork when available.

## 1. Palette

The brand blue comes from the 3D logo render (`public/images/3d-logo/dir-logo-3d-cutout-1200.webp`) — a glossy, pale ice-blue-to-white glass render of the "impossible cube" mark. It is encoded as the **stock Tailwind cyan scale** plus semantic tokens defined in `tailwind.config.js` `theme.extend.colors` (`tailwind.config.js:10-22`). Every token value is a stock Tailwind colour (cyan for brand, slate for structure) — no invented hexes.

**Site structure:** light theme on a near-white base. Dark appears as *sections*, not site-wide — the homepage hero is a deep navy band (`bg-navy`, `HomeContent.js:54`) so the pale render sits on the dark surface it needs. Contact and the rest of the chassis stay light.

### Semantic tokens (`tailwind.config.js:13-21`)
| Token | Hex | Source | Role |
|---|---|---|---|
| `paper` | `#f8fafc` | slate-50 | Page background (**defined but not literally applied** anywhere in home/contact/shared markup — see §7) |
| `ink` | `#0f172a` | slate-900 | Primary text on light surfaces (`Map.js:58`, `StaticMap.js:39`) |
| `ink-inverse` | `#f8fafc` | slate-50 | Text on the navy band (`HomeContent.js:86,102,119`) |
| `muted` | `#475569` | slate-600 | Secondary text (`Map.js:61,65`, `StaticMap.js:42-43`) |
| `muted-inverse` | `#94a3b8` | slate-400 | Secondary text on navy (`HomeContent.js:78`) |
| `accent` | `#0e7490` | cyan-700 | **Interactive**: links, CTA backgrounds, focus rings. ≈5.1:1 on paper; white text on it ≈5.4:1 — both AA |
| `accent-hover` | `#155e75` | cyan-800 | Hover state for `accent` |
| `accent-visual` | `#22d3ee` | cyan-400 | **Decorative only**: SVG line-work, icon fills, signature-visual strokes, and the hero's navy-band CTA (see exception below) |
| `navy` | `#0f172a` | slate-900 | Dark section band background (`HomeContent.js:54`). **Identical hex to `ink`** — same colour, two semantic names for background vs. text roles |

### Decorative cyan family (raw stock utilities, no tokens)
| Class | Hex | Role |
|---|---|---|
| `cyan-100` | `#cffafe` | Section wrapper wash (testimonials, `HomeContent.js:262`); dropdown item hover (`Navbar.js:68`) |
| `cyan-200` | `#a5f3fc` | Quote block background in testimonial cards (`TestimonialCard.js:54`) |
| `cyan-300` | `#67e8f9` | "Frame" colour: outer wrapper around white cards (contact card frame `ContactContent.js:29`, testimonials band `HomeContent.js:268`, `.outerBox` in `globals.css:178-180`); hero CTA hover state (`hover:bg-cyan-300`, `HomeContent.js:119`) |
| `cyan-400` | `#22d3ee` | Same value as `accent-visual` — used as a raw utility (not the token) on service-page contact icons (`call_cyan_400.svg`, `mail_cyan_400.svg`, `ContactContent.js:48,70`) and service-page SVG line-work |

### Structural
| Token | Hex | Role |
|---|---|---|
| `black` | `#000000` | Body text (`main` rule, `globals.css:20`); logo/icon strokes (`dir-logo-01.svg`, `AnimatedLogo.js`) |
| `white` / `bg-white` | `#ffffff` | Card inner surfaces, nav dropdown, testimonial card |
| `gray-100` | `#f3f4f6` | Card/panel surface (usually `bg-opacity-95`), `.gridboxes` (`globals.css:92`) |
| `gray-200` (hover) | `#e5e7eb` | `.gridboxes` hover surface |
| `slate-100` (hover) | `#f1f5f9` | `.button` (nav link) hover surface |
| `gray-800` | `#1f2937` | Map/StaticMap address-overlay text on the **loaded map** (`Map.js:150`, `StaticMap.js:78`) — see §7 gap |
| `gray-600` | `#4b5563` | Map/StaticMap address-overlay secondary text, same locations (`Map.js:151`, `StaticMap.js:79`) |
| `red-400` | `#f87171` | Map error-state icon (`Map.js:93`) |
| `red-600` / `red-700` | `#dc2626` / `#b91c1c` | Map error-state body/heading text (`Map.js:106-107`) |

**Encoded rule — accent vs accent-visual (now sitewide, load-bearing):** interactive elements (links, buttons, anything clickable) use `accent` with `accent-hover`; the render blue (`accent-visual`, cyan-400) and the pale cyan family are decorative — SVG line-work, frames, washes, icon fills — and are **never** body-copy or link colour on light surfaces. This split reaches further than the homepage: it holds in the Map/StaticMap fallback states too — the decorative "location pin" SVG icon uses `text-accent-visual` (`Map.js:39`, `StaticMap.js:20`), plain informational text uses `text-ink`/`text-muted`, and the one real link in that block (to Google Cloud Console) uses `text-accent hover:text-accent-hover` (`Map.js:71`). **Cyan is never plain body text, even in off-brand utility/error states** — that discipline is now consistent everywhere it was checked.

Two sanctioned exceptions, both scoped to the navy band only (`HomeContent.js` hero):
1. Cyan display text passes AA on navy (cyan-400 on navy ≈ 9.8:1) and carries the hero keyword — `text-accent-visual` on "3D CAD Models" (`HomeContent.js:94`).
2. The hero CTA sitting directly on the navy band uses `bg-accent-visual text-ink hover:bg-cyan-300` (`HomeContent.js:119`) instead of the standard `bg-accent text-white` pattern — `accent` (cyan-700) only reaches ≈1.9:1 against `navy` (both very dark), which fails as a button surface, whereas `accent-visual` (cyan-400) against `ink` text is ≈9.8:1. **This is a deliberate, documented variant, not an inconsistency to fix.** It is scoped to CTAs sitting directly on the navy band; every other CTA on light surfaces uses the standard `accent`/`accent-hover` canon in §5, and this migration is now complete sitewide (verified: no `sky-*` classes remain in `src`).

## 2. Typography

**One family: Poppins** (`next/font/google`, `layout.js:3,7-12`), loaded at weights `200, 300, 400, 500, 600, 700, 900` (note: **800 is not loaded** — "200–900" is a range description, not a claim every weight exists), variable `--font-poppins`, mapped to `font-sans`. Every custom class re-declares the family. Base body: `main { font-weight: 300; line-height: 2rem; color: black }` (`globals.css:16-24`) — light Poppins is the body voice.

Custom type classes (`globals.css`). Each declares `line-height` twice; the later `line-height: 1.5` wins in all cases.

| Class | Size | Weight | Responsive additions | Used for |
|---|---|---|---|---|
| `.headertext` (`globals.css:169-172`) | `text-xl md:text-2xl lg:text-3xl xl:text-4xl` | inherits 300; `font-light`/`font-bold` per line | — | Hero strapline + hero CTA |
| `.headings` (`globals.css:42-48`) | 4.25rem | 400 | — | Contact page h1 |
| `.phoneheadings` (`globals.css:34-40`) | 2rem | 600 | pages add `md:text-2xl lg:text-4xl` etc. | Homepage section h2s; service page h1s |
| `.htags` (`globals.css:58-64`) | 1.75rem | 600 | — | (defined; unused on home/contact) |
| `.htags-light` (`globals.css:66-72`) | 1.75rem | 400 | — | Homepage h1 |
| `.subheadings` (`globals.css:50-56`) | 1.5rem | 300 | — | (defined; unused) |
| `h3` base rule (`globals.css:74-78`) | `lg:text-lg 2xl:text-2xl pb-2`, weight 600 | — | — | Card titles (ServiceCard overrides `text-xl`) |
| `.textlg` (`globals.css:100-105`) | 1.5rem | 300 | — | Testimonial name line |
| `.textsm` (`globals.css:107-114`) | 1.1rem | 300 | `lg:text-base xl:text-sm 2xl:text-xl` | Body copy, footer, quotes |
| `.textboxes` (`globals.css:116-123`) | 1.1rem, `font-normal` via @apply | 400 | `2xl:text-lg`, `text-justify`, `rounded-xl p-4` | Card body copy |
| `.contactText` (`globals.css:125-132`) | 1rem | 300 | `text-center md:text-start md:text-xl lg:text-2xl` | CTA buttons on service pages |
| `.navbar` (`globals.css:26-32`) | 1.25rem | 300 | — | Nav wrapper |

**New in this pass — the "eyebrow" label:** `text-sm font-semibold uppercase tracking-wide text-muted-inverse` above the hero headline (`HomeContent.js:78`, "Dream InReality"). This is the **only occurrence of `tracking-*` anywhere in the audited scope** — every other heading and body class is tracking-normal. It's also the only place plain Tailwind `text-sm`/`font-semibold`/`uppercase` utilities stand in for a custom class rather than one of the `.text*`/`.heading*` classes above; the Map/StaticMap fallback states do the same thing (`text-sm`, `text-xs`, `font-medium` — see §7).

Pattern: **headings 400–600, body 300, emphasis via inline `font-bold`**, line-height 1.5. No letter-spacing anywhere **except** the one hero eyebrow label above. Italic only in testimonial quotes.

## 3. Spacing and layout rhythm

- **Containers:** `max-w-7xl mx-auto` section container (home `HomeContent.js:134`, contact `ContactContent.js:20`). Text columns cap at `max-w-xl` (`HomeContent.js:86`). Service pages use a `max-w-4xl` reading column; pages with a two-column hero (text left, signature visual right) may widen the hero row to `max-w-5xl`, then return to `max-w-4xl` for the body.
- **Section padding:** `p-4 md:p-10` (`HomeContent.js:132`) or flat `p-10` (`ContactContent.js:19`); hero text column `px-5 sm:px-10 lg:px-16` (`HomeContent.js:75`), with an added mobile-only `pb-[30vh] sm:pb-0` so hero text clears the bottom-anchored cube on small screens. `pb-10`/`py-10` between headings and content (`HomeContent.js:191`, redundant — see §7). No single sitewide vertical token — padding lives on wrapper divs (`p-4`, `p-5`, `p-10` recur).
- **Card padding:** cyan-300 frame `p-4`; inner white card `p-4`–`p-5`; large feature panels `p-10`.
- **Grids:** two-column split `grid lg:grid-cols-2 grid-cols-1 gap-16` (`HomeContent.js:134`) or `flex flex-col md:flex-row gap-6 md:gap-10` (`ContactContent.js:21`). Services grid `grid grid-cols-1 px-10 pt-4 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center` (`StaggeredGrid.js:16`).
- **Section separation:** sections abut — separation comes from background changes + `shadow-xl`, not margins.
- **Corner radius scale:** `rounded-2xl` dominant for cards/frames/panels/testimonial cards/`.outerBox`; `rounded-lg` for buttons, chips, dropdown, and — notably — `.gridboxes` service cards (not `rounded-2xl`); `rounded-xl` for `.textboxes` and the `AnimatedLogo` container; `rounded-full` for testimonial logos and `.icons` when combined with `rounded-full`.
- **Footer:** `.footersect` = `flex flex-col py-5 justify-between items-center` (`globals.css:162-167`); wrapper `p-5` (`Footer.js:18`, on an undefined `.footer` class — see §7).

## 4. Motion

Framer Motion throughout; character is **soft, ease-out, 0.5–0.8s entrances, small-scale hovers**.

- **Entrance vocabulary** (`useScrollAnimation.js:16-98`): `fadeInUp/Down` (±60px y), `fadeInLeft/Right` (±60px x), `scale` (0.8→1, 0.5s), `rotate3D` (rotateY −15°, 0.7s); all `duration: 0.6` unless noted, `ease: "easeOut"`. `staggerContainer`: `staggerChildren: 0.1, delayChildren: 0.2`.
- **Scroll triggering:** `useScrollAnimation(threshold 0.1, triggerOnce)` with `-100px` bottom margin, via `<ScrollReveal variant="...">` and `<StaggeredGrid>`.
- **Hero sequence (reworked, `HomeContent.js:53-126`):** the entire navy band translates on scroll — `y = useTransform(scrollY, [0,500], [0,150])` is applied to the outer `motion.div` wrapping the whole hero (cube + text), not just a background layer as before. Inside it: the cube render fades/scales in independently (`opacity 0→1, scale 0.85→1, duration 0.8, easeOut`, `HomeContent.js:60-62`); the eyebrow label, then three headline lines, cascade left-to-right at `delay 0.1 / 0.3 / 0.5 / 0.7` with `x: -50 → 0`; the CTA scales in at `delay 0.2` (`scale 0.8→1`) and sits inside a `style={{ opacity }}` wrapper that fades the whole text block out over the first 300px of scroll (`opacity = useTransform(scrollY, [0,300], [1,0])`, `HomeContent.js:24,76`).
- **Contact mirrors** the old two-column pattern: left card x:−50 delay 0.2, right map column x:+50 delay 0.4 (`ContactContent.js:22-26, 88-92`); navbar y:−30 0.6s; footer staggered fade-up.
- **Hover conventions:** `whileHover={{ scale: 1.05 }}` standard (nav, cards, footer; service cards add `rotateY: 5, z: 50`, 0.3s). Large panels use `scale: 1.02`. Outlier: hero CTA 1.15 / tap 0.95 (unchanged from prior audit).
- **Parallax:** hero band itself now carries the scroll parallax (see above, replacing the old bg-image parallax on the hero); `bg-fixed` photographic parallax survives on two later sections, both using the same `bambrella-umbrella-hr.jpg` (`HomeContent.js:132,189`).
- **3D tilt:** `TiltBox` — desktop-only, rotateY ±15° / rotateX −10°, ±5° mouse-follow spring `{ stiffness: 300, damping: 20, mass: 0.5 }`, scale 1.05.
- **SVG draw-on:** `AnimatedLogo` draws the wireframe cube via `pathLength` 0→1 over 2s easeInOut, 0.1s stagger, replaying on scroll. This is the signature "CAD sketch resolving" motif.
- **CSS-side:** smooth scroll; `.gridboxes`/`.button`/`.icons` 0.2–0.3s ease transitions; `prefers-reduced-motion` kill-switch (`globals.css:151-159`) for CSS animations/transitions.
- **Reduced motion for JS animations:** the CSS kill-switch does **not** reach Framer-Motion-driven animation (`pathLength`, transforms, opacity set via JS). The reworked hero now honours this end-to-end — every motion element in `HomeContent.js` (cube, eyebrow, three headline lines, CTA) uses `initial={reduceMotion ? false : {...}}` sourced from `useReducedMotion()` (`HomeContent.js:27,60,79,87,95,103,111`), matching the pattern already used by `ScrollReveal` and the service-page signature components. **Gap:** `TestimonialCard.js` and `ContactContent.js`'s own entrance transforms (the two-column card slide-ins) do **not** call `useReducedMotion()` — they set `initial`/`animate` unconditionally. Copy the hero/`ScrollReveal` pattern, not these, for new work.

## 5. Components

- **Primary CTA (filled) — canon, now sitewide:** `bg-accent rounded-lg text-white font-bold hover:bg-accent-hover`, `px-4 py-2` minimum hit area. Verified in place on every service page, `not-found.js`, and `AboutContent.js`. The sky-300/sky-400 "not yet migrated" caveat from the prior audit is resolved — no `sky-*` class remains anywhere in `src`.
- **Sanctioned exception:** the hero CTA (`HomeContent.js:117-122`, on the navy band) uses `bg-accent-visual text-ink hover:bg-cyan-300` instead — see §1's second exception. This is the only CTA that departs from the canon, and it does so for a documented contrast reason, not by omission.
- **Nav/text button:** `.button` = `inline-block px-4 py-2 rounded-lg text-black hover:shadow-md hover:bg-slate-100` (`globals.css:134-138`), motion `whileHover 1.05 / whileTap 0.95`.
- **Text links — canon, now sitewide:** `text-accent hover:text-accent-hover` (`ContactContent.js:56,78`; confirmed on every service page and `not-found.js`). **Variant:** a link embedded inline inside a sentence of plain text (rather than standing alone, e.g. next to an icon) adds `underline` (`Map.js:71`) — colour alone isn't a sufficient link cue when it's surrounded by running prose (WCAG 1.4.1). Use the plain canon for standalone/icon-adjacent links; add `underline` for inline-in-copy links.
- **Service card:** `.gridboxes` = `rounded-lg bg-gray-100 bg-opacity-95 p-4 lg:p-2 font-bold shadow-xl hover:bg-gray-200` (`globals.css:91-98`), centred black SVG icon (80px, 60px variant), `h3.text-xl`, `.textboxes` body. Hover scale 1.05 + rotateY 5°.
- **Framed panel (signature container):** cyan-300 outer box (`p-4 rounded-2xl shadow-xl`, aka `.outerBox`, `globals.css:178-180`) wrapping a white `rounded-2xl shadow-xl` inner card. Used identically for the contact card (`ContactContent.js:29-30`) and the testimonials band (`HomeContent.js:268`).
- **Heading chip:** `phoneheadings bg-gray-100 bg-opacity-95 text-center p-5 rounded-2xl shadow-xl` (services heading, `HomeContent.js:192`) — headings sit in a rounded shadowed panel, not bare on the background. **Inconsistency:** the testimonials heading uses `bg-white` instead of `bg-gray-100 bg-opacity-95` for the same chip role (`HomeContent.js:264`) — see §7.
- **Testimonial card:** white `rounded-2xl shadow-xl p-5`, round logo (150–200px), `.textlg` name, italic `.textsm` quote on `bg-cyan-200 rounded-2xl shadow-xl`; alternating alignment/slide direction.
- **Shadows over borders:** `shadow-xl` on virtually everything in home/contact/shared; **no border utilities** in this scope — depth is shadow + colour-frame. (A service page, `construction-drawings`, deliberately breaks this — out of scope here but noted for continuity in §7-equivalent service-page conventions.)
- **Icons:** black line-style SVGs from `/images/*.svg` at 80px (services) / 30px (contact, `cyan-400` variants — `call_cyan_400.svg`, `mail_cyan_400.svg`); `.icons` adds `p-2` + 0.3s transition.
- **Nav:** right-aligned (centred mobile), 40px cube-wordmark logo (`dir-logo-01.svg`), Services dropdown `bg-white rounded-lg shadow-xl py-2`, items `px-4 py-2 hover:bg-cyan-100`.
- **Footer:** four `.footersect` columns, `.textsm`, `font-bold` column headings, staggered fade-up.
- **Map pin — resolved drift:** the Google Maps `<Pin>` now hard-codes `background="#0e7490"` (`Map.js:139`) and the Static Maps marker URL uses `color:0x0e7490` (`StaticMap.js:57`) — both exactly equal to the `accent` token's hex. The prior audit's "map pin hard-codes sky-500, converges on accent in Phase 2" divergence is now closed; no drift remains. (These are literal hex strings, not Tailwind classes, because they're passed as component/URL props rather than className — that's structurally unavoidable, not an inconsistency.)

## 6. Imagery and motif language

The motif is **"engineering wireframe meets finished product"** — and this pass surfaces a more specific structure to it: the same "impossible cube" geometry appears in exactly two material treatments across the site, never blended.

- **Black line-art wireframe** — the logo mark. `dir-logo-01.svg` (nav, 40px) and `dream_inreality_logo_footer.png` (footer) render it as a thin black outline wordmark; `AnimatedLogo.js` redraws the identical polygon/line geometry stroke-by-stroke (`stroke-black stroke-[8px]`, round caps) as a scroll-triggered "CAD sketch resolving" animation. This is the strongest, most extendable motif: technical line drawing / draw-on animation as a metaphor for CAD.
- **Glossy pale-cyan/white 3D glass render** — the same cube, this time fully rendered: `public/images/3d-logo/dir-logo-3d-cutout-1200.webp`, now the homepage hero's centrepiece image (previously the hero used a flat background image, `header-assembly-blue.png`, which is **no longer referenced anywhere** in `src` — it has been fully replaced by the cube render). The contact page header (`contact_header.png`) uses the identical glossy pale-cyan-to-white glass rendering *style* applied to 3D typography reading "CONTACT" — same material language, different subject. **Note:** the alt text for this image previously did not describe the actual image content — fixed opportunistically alongside this pass (§7).
- **Real shipped-product photography as fixed parallax backgrounds** — `bambrella-umbrella-hr.jpg` behind frosted (`bg-opacity-90/95`) panels, used on two homepage sections (`HomeContent.js:132,189`). Content floats on translucent panels over full-bleed photography.
- **Icon language** — simple black line pictograms per service; `cyan-400` variants for contact actions (call/mail icons literally filenamed `_cyan_400`, reinforcing that decorative icon colour = the `accent-visual`/cyan-400 family, never `accent`).

So the working rule for new work: **black line-art = structural/navigational brand mark and technical-drawing metaphor; glossy pale-cyan glass render = hero-weight "finished, tangible" moments.** Service-page signature elements (confirmed present for `solidworks-design`, `reverse-engineering`, `photorealistic-rendering`, `cad-file-conversion`, `construction-drawings`, `dfm-consultancy` — out of this audit's home/contact scope but consistent with the rule) already extend this via line-drawn SVG diagrams with `stroke-cyan-400`/`bg-cyan-100` decorative accents (e.g. `FormatFlow.js`) — never stock photos or a new illustration style.

## 7. Known divergences and gaps (conventions for new work)

Recorded so new pages follow the dominant convention rather than copying an outlier. Items resolved since the last audit are marked **[resolved]**; new findings from this pass are marked **[new]**.

1. **Two h1 scales** — homepage `.htags-light` (1.75rem) vs contact `.headings` (4.25rem). Service pages use `phoneheadings lg:text-2xl xl:text-4xl` — treat that as the service-page standard.
2. **[resolved] Buttons/links** — the accent migration flagged as "not yet migrated" in the prior audit is now complete sitewide: every CTA and text link in `src` uses `bg-accent`/`text-accent` with `-hover` states, except the one documented hero exception (§1, §5). No `sky-*` class remains anywhere.
3. **Hover scale** — 1.05 standard; 1.02 for large panels; do not reuse the hero's 1.15 elsewhere.
4. **`.textsm` responsive scale is non-monotonic** (shrinks at `xl`, jumps at `2xl`; `globals.css:107-114`) — pre-existing quirk, fix only in a dedicated pass.
5. **Dead/typo classes in existing markup** — `xl:5xl` (`HomeContent.js:192`, invalid Tailwind class, no-op), `p-10 py-10` (`HomeContent.js:191`, redundant), undefined `.footer` class (`Footer.js:18` — no such rule exists in `globals.css`), `width: 100vw` on `main` (`globals.css:21`). All still present; pre-existing, fix opportunistically when a file is already being edited.
6. **[resolved] Accent drift** — the map pin previously hard-coded `#0ea5e9` (sky-500); it now hard-codes `#0e7490`, exactly matching the `accent` token. No further migration needed.
7. **Emoji in UI** — the map overlay's 📍 is still present in both `Map.js:151` and `StaticMap.js:79` — an outlier; icon language is otherwise SVG-only.
8. **[resolved] Map/StaticMap "happy path" overlay text** — previously hard-coded `text-gray-800`/`text-gray-600` on the address overlay shown once a map loads; now uses `text-ink`/`text-muted` to match the rest of the map component's token usage.
9. **[new] Heading-chip background is inconsistent** — the services section heading chip uses `bg-gray-100 bg-opacity-95` (`HomeContent.js:192`); the testimonials heading chip uses plain `bg-white` for the same visual role (`HomeContent.js:264`). Both are otherwise identical (`phoneheadings ... text-center p-5 rounded-2xl shadow-xl`). Pre-existing, unrelated to the palette refresh — fix opportunistically.
10. **[new] `paper` token is declared but unused** — `tailwind.config.js` comments it as "page background," but no element in home/contact/nav/footer/Map/StaticMap actually applies `bg-paper`. The literal page background in this scope is the browser default white (no `background-color` is set on `body`/`main`), not the slate-50 `paper` value. If a future page relies on `bg-paper` for a genuine off-white background, note that it will read as a very subtle but real shift from every other "white" surface currently in use.
11. **[new] `navy` and `ink` share an identical hex** (`#0f172a`) — not a bug, just worth knowing: swapping one token for the other by mistake in code would be visually invisible today, but semantically wrong (background vs. text role).
12. **[resolved] Alt text mismatch on `contact_header.png`** — previously described a hand holding a phone; the actual image is a 3D-rendered glossy "CONTACT" wordmark. Corrected alongside this pass.
13. **[new] Reduced-motion coverage is uneven** — `HomeContent.js`'s hero and `ScrollReveal`-wrapped content correctly gate their entrance animations behind `useReducedMotion()`, but `TestimonialCard.js` and the two contact-page card wrappers in `ContactContent.js` do not. Copy the hero/`ScrollReveal` pattern for new components.
14. **Construction-drawings drawing sheet** (service page, out of this audit's home/contact scope but recorded for continuity) — `/services/construction-drawings` deliberately breaks the "no border utilities" convention: its signature element is a ruled drawing sheet (`border-2 border-black` frame + title-block grid), where real border lines *are* the subject matter. Sanctioned for that page only. The title-block field labels use `text-ink` (readable — see item 15; the original plan called for `text-cyan-400` here but that failed contrast).
15. **[resolved during Phase 2 review] SVG diagram annotation labels are never set in cyan.** The initial mechanical sky→cyan sweep carried `fill-sky-400`/`text-sky-400` straight over to `fill-cyan-400`/`text-cyan-400` on real text labels in three places — `DfmReviewSketch.js` ("wall thickness", "draft angle", "corner radius"), `ParametricFamily.js` (dimension labels), and the construction-drawings title block (item 14) — all at roughly 1.8:1 contrast on white, well under AA. Design-reviewer caught this; all three now use `text-ink`/`fill-ink`. The leader-lines and dimension strokes around them stay `stroke-cyan-400` — only the text that must actually be read moved to `ink`. Extends the §1 encoded rule ("cyan is never plain body text") to SVG diagram labels specifically, since that case isn't obviously "body copy" but has the identical readability requirement.
