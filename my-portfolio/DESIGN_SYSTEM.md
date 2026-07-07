# DESIGN_SYSTEM.md

Source of truth for palette, type, spacing, motion and components, extracted by the style-auditor from the homepage and contact page (2026-07-07). Every page shares this chassis. Re-run the style-auditor if the homepage changes.

Extracted from:
- `src/components/HomeContent.js`, `src/components/ContactContent.js`
- `src/styles/globals.css` (all custom classes)
- `src/components/{Navbar,Footer,ServiceCard,TestimonialCard,ScrollReveal,StaggeredGrid,TiltBox,AnimatedLogo,Map}.js`
- `src/hooks/useScrollAnimation.js`, `tailwind.config.js`, `src/app/layout.js`

## 1. Palette

No custom colours in `tailwind.config.js` — default Tailwind tokens only. The brand axis is **sky blue on white/light grey with black text**.

### Structural
| Token | Hex | Role | Where |
|---|---|---|---|
| `black` | `#000000` | Body text, all copy (`main` rule, globals.css:34); logo strokes | everywhere |
| `white` / `bg-white` | `#ffffff` | Card inner surfaces, nav dropdown, contact card inner, map card, testimonial card | HomeContent.js:125, ContactContent.js:19,30, Navbar.js |
| `gray-100` | `#f3f4f6` | Card/panel surface (usually `bg-opacity-95`), service card background via `.gridboxes` | globals.css:106, HomeContent.js:125,139,174 |
| `gray-200` (hover) | `#e5e7eb` | `.gridboxes` hover surface | globals.css:106 |
| `slate-100` (hover) | `#f1f5f9` | `.button` (nav link) hover surface | globals.css:149 |

### Accent (sky family — the only brand colour)
| Token | Hex | Role | Where |
|---|---|---|---|
| `sky-100` | `#e0f2fe` | Section wrapper background (testimonials); dropdown item hover | HomeContent.js:236, Navbar.js |
| `sky-200` | `#bae6fd` | Quote block background in testimonial cards | TestimonialCard.js:54 |
| `sky-300` | `#7dd3fc` | "Frame" colour: outer wrapper around white cards (contact card frame, testimonials band, `.outerBox`) | ContactContent.js:29, HomeContent.js:242, globals.css:193 |
| `sky-400` | `#38bdf8` | Primary accent: hero keyword text, CTA button background, contact link text, icon fill | HomeContent.js:76,101; ContactContent.js:56,78 |
| `sky-500` | `#0ea5e9` | Map pin background (hard-coded hex) — accent drift, do not extend | Map.js:139 |
| `sky-600` | `#0284c7` | Hover state for sky-400 (`hover:bg-sky-600`, `hover:text-sky-600`) | HomeContent.js:101, ContactContent.js:56,78 |

Utility only (not brand): `red-400/600/700` and `gray-800/600` in Map.js states.

**Encoded rule:** black text on white/gray-100 cards; sky-300 frames white content; **sky-400 is the interactive/emphasis colour with sky-600 hover**.

## 2. Typography

**One family: Poppins** (`next/font`, weights 200–900, `--font-poppins`, mapped to `font-sans`). Every custom class re-declares the family. Base body: `main { font-weight: 300; line-height: 2rem; color: black }` — light Poppins is the body voice.

Custom type classes (globals.css). Each declares `line-height` twice; the later `line-height: 1.5` wins in all cases.

| Class | Size | Weight | Responsive additions | Used for |
|---|---|---|---|---|
| `.headertext` | `text-xl md:text-2xl lg:text-3xl xl:text-4xl` | inherits 300; `font-light`/`font-bold` per line | — | Hero strapline + hero CTA |
| `.headings` | 4.25rem | 400 | — | Contact page h1 |
| `.phoneheadings` | 2rem | 600 | pages add `md:text-2xl lg:text-4xl` etc. | Homepage section h2s; service page h1s |
| `.htags` | 1.75rem | 600 | — | (defined; unused on home/contact) |
| `.htags-light` | 1.75rem | 400 | — | Homepage h1 |
| `.subheadings` | 1.5rem | 300 | — | (defined; unused) |
| `h3` base rule | `lg:text-lg 2xl:text-2xl pb-2`, weight 600 | — | — | Card titles (ServiceCard overrides `text-xl`) |
| `.textlg` | 1.5rem | 300 | — | Testimonial name line |
| `.textsm` | 1.1rem | 300 | `lg:text-base xl:text-sm 2xl:text-xl` | Body copy, footer, quotes |
| `.textboxes` | 1.1rem, `font-normal` via @apply | 400 | `2xl:text-lg`, `text-justify`, `rounded-xl p-4` | Card body copy |
| `.contactText` | 1rem | 300 | `text-center md:text-start md:text-xl lg:text-2xl` | CTA buttons on service pages |
| `.navbar` | 1.25rem | 300 | — | Nav wrapper |

Pattern: **headings 400–600, body 300, emphasis via inline `font-bold`**, line-height 1.5. No letter-spacing anywhere. Italic only in testimonial quotes.

## 3. Spacing and layout rhythm

- **Containers:** `max-w-7xl mx-auto` section container (home + contact). Text columns cap at `max-w-xl`. Service pages use a `max-w-4xl` reading column.
- **Section padding:** `p-4 md:p-10` or flat `p-10`; hero `px-5 pt-10`. `pb-10`/`py-10` between headings and content. No single sitewide vertical token — padding lives on wrapper divs (`p-4`, `p-5`, `p-10` recur).
- **Card padding:** sky-300 frame `p-4`; inner white card `p-4`–`p-5`; large feature panels `p-10`.
- **Grids:** two-column split `grid lg:grid-cols-2 grid-cols-1 gap-16` or `flex flex-col md:flex-row gap-6 md:gap-10`. Services grid `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10 pt-4 text-center` (StaggeredGrid).
- **Section separation:** sections abut — separation comes from background changes + `shadow-xl`, not margins.
- **Corner radius scale:** `rounded-2xl` cards/frames (dominant); `rounded-lg` buttons/chips/dropdown; `rounded-xl` `.textboxes`; `rounded-full` testimonial logos.
- **Footer:** `.footersect` = `flex flex-col py-5 justify-between items-center`; wrapper `p-5`.

## 4. Motion

Framer Motion throughout; character is **soft, ease-out, 0.5–0.8s entrances, small-scale hovers**.

- **Entrance vocabulary** (useScrollAnimation.js): `fadeInUp/Down` (±60px y), `fadeInLeft/Right` (±60px x), `scale` (0.8→1, 0.5s), `rotate3D` (rotateY −15°, 0.7s); all `duration: 0.6` unless noted, `ease: "easeOut"`. `staggerContainer`: `staggerChildren: 0.1, delayChildren: 0.2`.
- **Scroll triggering:** `useScrollAnimation(threshold 0.1, triggerOnce)` with `-100px` bottom margin, via `<ScrollReveal variant="...">` and `<StaggeredGrid>`.
- **Page-load sequences:** hero lines cascade `delay 0.3/0.5/0.7`, x:−50 slide-in; contact mirrors (left x:−50 delay 0.2, right x:+50 delay 0.4); navbar y:−30 0.6s; footer staggered fade-up.
- **Hover conventions:** `whileHover={{ scale: 1.05 }}` standard (nav, cards, footer; service cards add `rotateY: 5, z: 50`, 0.3s). Large panels use `scale: 1.02`. Outlier: hero CTA 1.15 / tap 0.95.
- **Parallax:** hero background y 0→150px over 500px scroll, strapline opacity fade; `bg-fixed` photographic parallax on later sections.
- **3D tilt:** `TiltBox` — desktop-only, rotateY ±15° / rotateX −10°, ±5° mouse-follow spring `{ stiffness: 300, damping: 20, mass: 0.5 }`, scale 1.05.
- **SVG draw-on:** `AnimatedLogo` draws the wireframe cube via `pathLength` 0→1 over 2s easeInOut, 0.1s stagger, replaying on scroll. This is the signature "CAD sketch resolving" motif.
- **CSS-side:** smooth scroll; `.gridboxes`/`.button`/`.icons` 0.2–0.3s ease transitions; full `prefers-reduced-motion` kill-switch (globals.css:165–174) — every new animation must respect it (framer-motion animations are covered by the global media query).

## 5. Components

- **Primary CTA (filled):** `bg-sky-400 rounded-lg text-white font-bold hover:bg-sky-600` (hero, HomeContent.js:99–104). Service pages currently use `bg-sky-300 hover:bg-sky-500 text-black` CTAs — when restyling, converge on the sky-400/sky-600 white-text spec with `px-4 py-2` minimum hit area.
- **Nav/text button:** `.button` = `inline-block px-4 py-2 rounded-lg text-black hover:shadow-md hover:bg-slate-100`, motion `whileHover 1.05 / whileTap 0.95`.
- **Text links:** `text-sky-400 hover:text-sky-600`. (Some service pages use sky-500 — converge on sky-400 when touched.)
- **Service card:** `.gridboxes` = `rounded-lg bg-gray-100 bg-opacity-95 p-4 lg:p-2 font-bold shadow-xl hover:bg-gray-200`, centred black SVG icon (80px, 60px variant), `h3.text-xl`, `.textboxes` body. Hover scale 1.05 + rotateY 5°.
- **Framed panel (signature container):** sky-300 outer box (`p-4 rounded-2xl shadow-xl`, aka `.outerBox`) wrapping a white `rounded-2xl shadow-xl` inner card.
- **Heading chip:** `phoneheadings bg-gray-100 bg-opacity-95 text-center p-5 rounded-2xl shadow-xl` — headings sit in a rounded shadowed panel, not bare on the background.
- **Testimonial card:** white `rounded-2xl shadow-xl p-5`, round logo (150–200px), `.textlg` name, italic `.textsm` quote on `bg-sky-200 rounded-2xl shadow-xl`; alternating alignment/slide direction.
- **Shadows over borders:** `shadow-xl` on virtually everything; **no border utilities anywhere** — depth is shadow + colour-frame.
- **Icons:** black line-style SVGs from `/images/*.svg` at 80px (services) / 30px (contact, sky-400 variants); `.icons` adds `p-2` + 0.3s transition.
- **Nav:** right-aligned (centred mobile), 40px cube logo, Services dropdown `bg-white rounded-lg shadow-xl py-2`, items `px-4 py-2 hover:bg-sky-100`.
- **Footer:** four `.footersect` columns, `.textsm`, `font-bold` column headings, staggered fade-up.

## 6. Imagery and motif language

The motif is **"engineering wireframe meets finished product"**:

- **Isometric wireframe cube** — the logo, redrawn stroke-by-stroke by `AnimatedLogo` like a CAD sketch resolving. Black 8px round-capped strokes on white. The strongest, most extendable motif: technical line drawing / draw-on animation as a metaphor for CAD.
- **CAD assembly renders as hero art** — `header-assembly-blue.png`, blue-toned exploded assembly.
- **Real shipped-product photography as fixed parallax backgrounds** — e.g. `bambrella-umbrella-hr.jpg` behind frosted (`bg-opacity-90/95`) panels. Content floats on translucent panels over full-bleed photography.
- **Icon language** — simple black line pictograms per service; sky-400 variants for contact actions.

Service-page signature elements should extend this language — line-drawn/draw-on technical illustration, blue CAD renders, real project photography behind frosted panels — never stock photos or a new illustration style.

## 7. Known divergences (conventions for new work)

Recorded so new pages follow the dominant convention rather than copying an outlier:

1. **Two h1 scales** — homepage `.htags-light` (1.75rem) vs contact `.headings` (4.25rem). Service pages use `phoneheadings lg:text-2xl xl:text-4xl` — treat that as the service-page standard.
2. **Buttons** — canonical primary CTA: filled sky-400, white text, `rounded-lg`, `hover:bg-sky-600`, `px-4 py-2` minimum. `.button` is the secondary/nav style.
3. **Hover scale** — 1.05 standard; 1.02 for large panels; do not reuse the hero's 1.15 elsewhere.
4. **`.textsm` responsive scale is non-monotonic** (shrinks at xl, jumps at 2xl; globals.css:121–128) — pre-existing quirk, fix only in a dedicated pass.
5. **Dead/typo classes in existing markup** (`xl:5xl`, `pt-2 pt-10`, `p-10 py-10`, undefined `footer` class, `width: 100vw` on main) — pre-existing; fix opportunistically when a file is already being edited.
6. **Accent drift** — map pin hard-codes sky-500; interactive accent is sky-400. Use sky-400/600 for anything new.
7. **Emoji in UI** — the map overlay's 📍 is an outlier; icon language is SVG only.
