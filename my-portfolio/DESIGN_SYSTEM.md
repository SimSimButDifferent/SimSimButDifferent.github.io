# DESIGN_SYSTEM.md

Source of truth for palette, type, spacing, motion and components, extracted by the style-auditor from the homepage and contact page (2026-07-07). Every page shares this chassis. Re-run the style-auditor if the homepage changes.

Extracted from:
- `src/components/HomeContent.js`, `src/components/ContactContent.js`
- `src/styles/globals.css` (all custom classes)
- `src/components/{Navbar,Footer,ServiceCard,TestimonialCard,ScrollReveal,StaggeredGrid,TiltBox,AnimatedLogo,Map}.js`
- `src/hooks/useScrollAnimation.js`, `tailwind.config.js`, `src/app/layout.js`

## 1. Palette

The brand blue comes from the 3D logo render (`public/images/3d-logo/DIR-logo-3d-Beauty.png`) — a cool, glossy ice blue. It is encoded as the **stock Tailwind cyan scale** plus semantic tokens defined in `tailwind.config.js` `theme.extend.colors`. Every token value is a stock Tailwind colour (cyan for brand, slate for structure) — no invented hexes.

**Site structure:** light theme on a near-white base. Dark appears as *sections*, not site-wide — the homepage hero is a deep navy band (`navy`) so the pale render sits on the dark surface it needs. Service pages keep light backgrounds.

### Semantic tokens (tailwind.config.js)
| Token | Hex | Source | Role |
|---|---|---|---|
| `paper` | `#f8fafc` | slate-50 | Page background |
| `ink` | `#0f172a` | slate-900 | Primary text on light surfaces |
| `ink-inverse` | `#f8fafc` | slate-50 | Text on the navy band |
| `muted` | `#475569` | slate-600 | Secondary text |
| `muted-inverse` | `#94a3b8` | slate-400 | Secondary text on navy |
| `accent` | `#0e7490` | cyan-700 | **Interactive**: links, CTA backgrounds, focus rings. 5.1:1 on paper; white text on it 5.4:1 — both AA |
| `accent-hover` | `#155e75` | cyan-800 | Hover state for `accent` |
| `accent-visual` | `#22d3ee` | cyan-400 | **Decorative only**: SVG line-work, icon fills, signature-visual strokes |
| `navy` | `#0f172a` | slate-900 | Dark section band background |

### Decorative cyan family (raw stock utilities, no tokens)
| Token | Hex | Role |
|---|---|---|
| `cyan-100` | `#cffafe` | Section wrapper washes (testimonials); dropdown item hover |
| `cyan-200` | `#a5f3fc` | Quote block background in testimonial cards |
| `cyan-300` | `#67e8f9` | "Frame" colour: outer wrapper around white cards (contact card frame, testimonials band, `.outerBox`) |

### Structural
| Token | Hex | Role |
|---|---|---|
| `black` | `#000000` | Body text (`main` rule, globals.css); logo strokes |
| `white` / `bg-white` | `#ffffff` | Card inner surfaces, nav dropdown, testimonial card |
| `gray-100` | `#f3f4f6` | Card/panel surface (usually `bg-opacity-95`), `.gridboxes` |
| `gray-200` (hover) | `#e5e7eb` | `.gridboxes` hover surface |
| `slate-100` (hover) | `#f1f5f9` | `.button` (nav link) hover surface |

Utility only (not brand): `red-400/600/700` and `gray-800/600` in Map.js states.

**Encoded rule — accent vs accent-visual:** interactive elements (links, buttons, anything clickable) use `accent` with `accent-hover`; the render blue (`accent-visual`, cyan-400) and the pale cyan family are decorative — SVG line-work, frames, washes — and are **never** body-copy or link colour on light surfaces. Two sanctioned exceptions, both scoped to the navy band only:
1. Cyan display text passes AA on navy (cyan-400 on navy ≈ 9.8:1) and may carry the hero keyword (`HomeContent.js`, "3D CAD Models").
2. The hero CTA sitting directly on the navy band uses `bg-accent-visual text-ink hover:bg-cyan-300` instead of the standard `bg-accent text-white` pattern — `accent` (cyan-700) only reaches ≈1.9:1 against `navy` (both very dark), which fails as a button surface, whereas `accent-visual` (cyan-400) against `ink` text is ≈9.8:1. This swap is scoped to CTAs on the navy band; every other CTA on light surfaces still uses the standard `accent`/`accent-hover` canon in §5.

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

- **Containers:** `max-w-7xl mx-auto` section container (home + contact). Text columns cap at `max-w-xl`. Service pages use a `max-w-4xl` reading column; pages with a two-column hero (text left, signature visual right) may widen the hero row to `max-w-5xl`, then return to `max-w-4xl` for the body.
- **Section padding:** `p-4 md:p-10` or flat `p-10`; hero text column `px-5 sm:px-10 lg:px-16`. `pb-10`/`py-10` between headings and content. No single sitewide vertical token — padding lives on wrapper divs (`p-4`, `p-5`, `p-10` recur).
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
- **CSS-side:** smooth scroll; `.gridboxes`/`.button`/`.icons` 0.2–0.3s ease transitions; `prefers-reduced-motion` kill-switch (globals.css:165–174) for CSS animations/transitions.
- **Reduced motion for JS animations:** the CSS kill-switch does **not** reach Framer-Motion-driven animation (`pathLength`, transforms, opacity set via JS). Every component that choreographs its own entrance must call `useReducedMotion()` and render the final state immediately when it returns true (`initial={reduceMotion ? false : "hidden"}`). `ScrollReveal` and all service-page signature components do this — copy that pattern for new work.

## 5. Components

- **Primary CTA (filled) — canon:** `bg-accent rounded-lg text-white font-bold hover:bg-accent-hover`, `px-4 py-2` minimum hit area. **Exception:** the hero CTA (`HomeContent.js`, on the navy band) uses `bg-accent-visual text-ink hover:bg-cyan-300` instead — see §1's second sanctioned exception. **Not yet migrated:** service pages still use `bg-sky-300 hover:bg-sky-500 text-black` — converges on the accent spec in Phase 2 of the palette refresh.
- **Nav/text button:** `.button` = `inline-block px-4 py-2 rounded-lg text-black hover:shadow-md hover:bg-slate-100`, motion `whileHover 1.05 / whileTap 0.95`.
- **Text links — canon:** `text-accent hover:text-accent-hover`. **Not yet migrated:** current code uses `text-sky-400 hover:text-sky-600` (some pages sky-500) pending the same Phase 2 sweep.
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
2. **Buttons** — canonical primary CTA: filled `accent`, white text, `rounded-lg`, `hover:bg-accent-hover`, `px-4 py-2` minimum (mid-refresh: existing CTAs still show sky-400/sky-300 until each page's Phase 2 sweep). `.button` is the secondary/nav style.
3. **Hover scale** — 1.05 standard; 1.02 for large panels; do not reuse the hero's 1.15 elsewhere.
4. **`.textsm` responsive scale is non-monotonic** (shrinks at xl, jumps at 2xl; globals.css:121–128) — pre-existing quirk, fix only in a dedicated pass.
5. **Dead/typo classes in existing markup** (`xl:5xl`, `pt-2 pt-10`, `p-10 py-10`, undefined `footer` class, `width: 100vw` on main) — pre-existing; fix opportunistically when a file is already being edited.
6. **Accent drift** — map pin currently hard-codes `#0ea5e9` (sky-500); interactive accent is being migrated to `accent`/`accent-hover` (cyan-700/800). Use those tokens for anything new; the map pin's hex converges on `accent` in Phase 2.
7. **Emoji in UI** — the map overlay's 📍 is an outlier; icon language is SVG only.
8. **Construction-drawings drawing sheet** — `/services/construction-drawings` deliberately breaks §5's "no border utilities" rule: its signature element is a ruled drawing sheet (`border-2 border-black` frame + title-block grid), where real border lines *are* the subject matter. Sanctioned for that page only — do not copy borders elsewhere, and do not "fix" them away there. The title-block field labels carry sky-400 so the hero keeps the brand accent.
