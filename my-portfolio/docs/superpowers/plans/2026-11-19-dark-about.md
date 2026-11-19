# Dark theme About page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `/about` to the dark snap-frame template, with a "service reel" landing loop, tightened copy, and a short paragraph on supplier liaison in Thailand and Vietnam.

**Architecture:** One new scene, `about-reel`, builds the five finished service subjects from the existing scene modules. It shows one at a time in showcase mode, each turning for 5 s, with a 0.2 s scale cut between them. It sits in a one-pane `ScrollScene`, so frame 01 behaves like every service page. Frames 02 to 04 are text panels with no canvas. The page becomes a server component, and `AboutContent.js` is left for the clean-up phase.

**Tech Stack:** Next.js 16 App Router (static export), Tailwind 3.3, three.js (already a dependency), framer-motion 12, `node --test`.

**Spec:** this document, plus `claude/dark-theme-sitewide-plan.md` sections 2, 3, 5 and 7 (template, landing loop rules, scene contract, working method). This plan replaces section 6.6 for the About page only.

**Save a copy to:** `my-portfolio/docs/superpowers/plans/2026-11-19-dark-about.md` (inside `my-portfolio/`, not the repo root).

## Decisions taken (19 Nov, with Sim)

- Frame 01 is a **service reel**, not a still: About covers the whole practice, so it shows all five services' finished subjects.
- Copy is **tightened, not kept verbatim**. The facts stay, Microworkshops is named, "we" becomes "Simeon" (sole operator), and the liaison paragraph is added.
- **Kent stays** in the metadata and footer. It matches the business address in `JsonLd.js`, and NAP consistency matters for local SEO. The page does not say where Simeon lives.
- No globe or UK to Thailand arc: section 6.6 of the sitewide plan reserves that for the future liaison page.
- No FAQ on this page. Adding one would mean new claims, which are out of scope.

## Global Constraints

- All files inside `my-portfolio/`. Branch `claude/dark-about` from `siteupdate2026`, which already contains `ScrollScene` and all five service scenes. npm, not yarn.
- App Router, Tailwind classes only, no inline CSS. Dark classes from `globals.css`: `page-dark`, `snap-page`, `snap-frame`, `panel`, `eyebrow`, `link-inverse`, `btn-inverse`, `chip`.
- British English. Banned: passionate, cutting-edge, solutions, unlock, elevate, seamless, world-class, leverage. Never mention Siam Precision Partners. Never describe the UK–Thailand Enhanced Trade Partnership; it is not needed on this page.
- Exactly one `<h1>`; headings never skip a level.
- Do not change `ScrollScene`, `SnapScroll`, `scrollTimeline.mjs`, `stage.js` (beyond one `loaders` entry) or any service scene. If the reel cannot be built without changing one, stop and report.
- Landing loop rules from sitewide plan section 3 apply to each subject in the reel: ice-blue finish, no callouts, bright showcase lighting.
- Sandbox notes from sitewide plan section 7 apply: local Poppins for builds and screenshots only, never committed; swiftshader flags for headless WebGL; no scratch route in any commit.

## Review Focus

1. **A one-pane `ScrollScene`.** Every existing page has three panes. Expected: the canvas shows the reel on load, stays put for frame 01, and the snap to frame 02 releases it cleanly with no blank pinned column. Tested in Task 3, step 5.
2. **Five scenes in one WebGL context.** Expected: no "too many active WebGL contexts" warning after moving between `/about` and `/services/dfm-consultancy` five times, and `dispose()` frees every sub-scene. Tested in Task 2, step 6.
3. **Spin values far from zero.** The stage's `spin` grows for as long as the page is open, and starts at `showcaseSpin`. Expected: the slot index stays in 0–4 and no subject jumps after an hour. Tested in Task 1.
4. **Reduced motion, no WebGL, below 1024 px.** Expected: the reel still image shows, three.js is never requested, and there is no horizontal scroll at 375 px. Tested in Task 3, step 5.
5. **No JavaScript (crawlers).** Expected: one `h1`, every paragraph, all six service links and one `application/ld+json` script in the exported HTML. Tested in Task 3, step 4.

---

### Task 0: Preflight (no commit)

- [ ] **Step 1:** `git checkout -b claude/dark-about origin/siteupdate2026`. `git log -1` shows the reverse engineering merge (`efbdc27`) or later.
- [ ] **Step 2:** Read `src/scenes/stage.js`, `src/components/ScrollScene.js`, `ScrollPane.js`, `src/app/services/dfm-consultancy/page.js` and `sceneConfig.js`, the five service scenes' `create()` return values, and `src/app/about/page.js` and `src/components/AboutContent.js`.
- [ ] **Step 3:** For each of the five scenes, record its story end time, `camera.showcaseSpin`, `camera.showcaseElevation`, `camera.showcaseFloor`, and whether `view()` assumes `update(END)` has already run.

**Stop and report if:** a scene's `create()` needs anything beyond `{ THREE, tokens, fontFamily }`, or `ScrollScene` assumes more than one pane, for example by indexing `beats[1]`.

---

### Task 1: Reel slot maths

**Files:**
- Create: `src/lib/reelTimeline.mjs`
- Test: `src/lib/reelTimeline.test.mjs` (already picked up by `npm test`)

**Interfaces:**
- Produces: `reelSlot(spin: number, count: number, slotAngle: number, cutAngle: number): { index: number, turn: number, scale: number }`
  - `index`: `floor(spin / slotAngle)` wrapped into `0 .. count-1`, also for negative spin.
  - `turn`: angle into the current slot, `0 <= turn < slotAngle`.
  - `scale`: 0 to 1 over the first `cutAngle` of the slot, 1 in the middle, 1 to 0 over the last `cutAngle`, smoothstep-eased. Non-finite `spin` returns `{ index: 0, turn: 0, scale: 1 }`.

- [ ] **Step 1: Write the failing test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { reelSlot } from "./reelTimeline.mjs";

const SLOT = (2 * Math.PI) / 5;
const CUT = SLOT * (0.2 / 5);
const near = (a, b) => Math.abs(a - b) < 1e-9;

test("reelSlot steps through the subjects and wraps", () => {
  assert.equal(reelSlot(0.5 * SLOT, 5, SLOT, CUT).index, 0);
  assert.equal(reelSlot(1.5 * SLOT, 5, SLOT, CUT).index, 1);
  assert.equal(reelSlot(5.5 * SLOT, 5, SLOT, CUT).index, 0);
});
test("reelSlot handles negative and very large spin", () => {
  assert.equal(reelSlot(-0.5 * SLOT, 5, SLOT, CUT).index, 4);
  const late = reelSlot(10000 * SLOT + 0.5 * SLOT, 5, SLOT, CUT);
  assert.equal(late.index, 0);
  assert.ok(near(late.turn, 0.5 * SLOT));
});
test("reelSlot scales in and out at slot edges", () => {
  assert.equal(reelSlot(0, 5, SLOT, CUT).scale, 0);
  assert.equal(reelSlot(0.5 * SLOT, 5, SLOT, CUT).scale, 1);
  assert.ok(near(reelSlot(SLOT - CUT / 2, 5, SLOT, CUT).scale, 0.5));
});
test("reelSlot survives bad input", () => {
  assert.deepEqual(reelSlot(NaN, 5, SLOT, CUT), { index: 0, turn: 0, scale: 1 });
});
```

- [ ] **Step 2:** `npm test`. Expected: FAIL, module not found.
- [ ] **Step 3:** Implement `reelSlot` in `src/lib/reelTimeline.mjs`.
- [ ] **Step 4:** `npm test`. Expected: the 13 existing tests and the 4 new ones all pass.
- [ ] **Step 5:** Commit: `feat: add slot maths for the About service reel`.

---

### Task 2: The `about-reel` scene and its still

**Files:**
- Create: `src/scenes/about-reel.js`
- Modify: `src/scenes/stage.js` (one entry in `loaders`: `"about-reel": () => import("./about-reel")`)
- Create: `public/images/scenes/about-reel-01.webp`

**Interfaces:**
- Consumes: `reelSlot` (Task 1); `create` from the five service scenes (statically imported in this order: `solidworks-design`, `dfm-consultancy`, `construction-drawings`, `cad-file-conversion`, `reverse-engineering`, which follows the design-to-production route).
- Produces: the scene contract from sitewide plan section 5. `create({ THREE, tokens, fontFamily })` returns `{ object, update(t), view({ spin, showcase }), camera, dispose() }`.

**Behaviour:**
- On create: build all five sub-scenes, call each one's `update(END)` with its own end time, and call `view({ spin: its showcaseSpin, showcase: 1 })`. Then wrap each sub-scene's `object` in a holder group, scaled and centred so that its bounding box fits a sphere of diameter `REEL_SIZE`, centred on the reel's camera target. Choose `REEL_SIZE` and the camera so the largest subject (the drawing sheet behind the housing) fills about 70% of the 4:3 frame.
- `update(t)` does nothing. The reel has no story.
- `view({ spin, showcase })`: compute `reelSlot(spin, 5, TURN / 5, (TURN / 5) * 0.04)`. Show only holder `index`, set its uniform scale to `scale`, and call that sub-scene's `view({ spin: its showcaseSpin + turn, showcase })`.
- `camera`: `spinPeriod: 25` (each subject gets 5 s and turns 72°, close to the service pages' 15° per second), with `showcaseElevation` set to 30°. Set `showcaseFloor` to 1, or to 0 if the floor fights the drawing sheet (see step 4).
- `dispose()` calls every sub-scene's `dispose()`.

- [ ] **Step 1:** Write `about-reel.js` and register it in `loaders`.
- [ ] **Step 2:** On a scratch route (`src/app/reel-test/page.js`, deleted before commit), mount it and call `handle.pose(0, spin, 1)` at the middle of each slot: `spin = (i + 0.5) * TURN / 5` for i = 0 to 4. Screenshot all five at 1280×960.
- [ ] **Step 3:** Compare each screenshot with that service's `-01.webp` still. Expected: the same subject and finish, no callouts, labels readable (for example `W = 60`), and every subject at a similar on-screen size.
- [ ] **Step 4:** Check construction drawings against the floor. If the grid shows through or crowds the sheet, set `showcaseFloor: 0` and re-check all five.
- [ ] **Step 5:** Render `about-reel-01.webp` from slot 0 (SolidWorks design) at the middle of its slot: 1280×960, WebP quality 82, under 120 KB.
- [ ] **Step 6: Context check.** With `setShowcase(true)` running on the scratch route, move between it and `/services/dfm-consultancy` five times. Expected: no WebGL context warning in the console, and the reel cycles 0 → 4 → 0 over 25 s.
- [ ] **Step 7:** Delete the scratch route. `npm run build` passes. Commit: `feat: add the About service reel scene`.

---

### Task 3: Rebuild the About page

**Files:**
- Modify: `src/app/about/page.js` (becomes the whole page, a server component)
- Create: `src/app/about/sceneConfig.js`
- Modify: `src/components/JsonLd.js` (add one export)
- Leave: `src/components/AboutContent.js` (no longer imported; it is deleted in clean-up 6.7)

**Interfaces:**
- Consumes: `ScrollScene`, `ScrollPane`, `SnapScroll`, `JsonLd`; the `about-reel` slug (Task 2).
- Produces: `aboutPageSchema({ description: string, url: string })` in `JsonLd.js`, which returns `{ "@context", "@type": "AboutPage", name: "About Dream InReality", description, url: SITE_URL + url, about: { "@id": BUSINESS["@id"] }, mainEntity: { "@type": "Person", name: "Simeon Campbell", jobTitle: "CAD design engineer", worksFor: { "@id": BUSINESS["@id"] }, knowsAbout: ["SolidWorks", "Design for manufacture", "Construction drawings", "Reverse engineering", "CAD file conversion"] } }`.
- `sceneConfig.js` exports `beats = [{ start: 0, end: 0, showcase: true }]`, `stills = [{ src: "/images/scenes/about-reel-01.webp", alt: "Ice-blue slotted bracket family, the first of five finished service models shown in turn" }]` and `label = "Animated reel of five finished CAD models, one per service: a bracket family, a moulded cup with its DFM report, a housing with its drawing sheet, an unfolded sheet-metal bracket and an exploded housing"`.

**Metadata:** keep `title` as it is. Replace `description` with:

> Simeon Campbell's SolidWorks CAD consultancy in Kent: DFM, 3D models and drawing packs for UK product businesses, with supplier liaison in Thailand and Vietnam.

**Page structure** (`<main className="page-dark snap-page min-h-screen">`, then `<JsonLd schema={aboutPageSchema(...)} />`, then `<SnapScroll />`):

| Frame | Wrapper | Content (exact copy) |
|---|---|---|
| 01 | `ScrollScene slug="about-reel"` with one `ScrollPane step="01 · About" still={stills[0]} snap={false}` | `h1`: `About <span class="font-semibold text-accent-visual">Dream InReality</span>`. Paragraph A. `btn-inverse` link to `/contact`: "Send your brief" |
| 02 | `section.snap-frame` + `.panel` (DFM "Who it is for" classes, left-aligned) | eyebrow "02 · Background", `h2` "Background", paragraph B, paragraph C |
| 03 | same | eyebrow "03 · The work", `h2` "Services", the services list, the format chips |
| 04 | same | eyebrow "04 · Suppliers abroad", `h2` "Manufacturing in Thailand and Vietnam", paragraph D, then a closing `pt-12 text-center` row with "Send your brief" |

Eyebrows on frames 02 to 04 use the photorealistic page's form: `<p className="eyebrow mb-4"><span className="text-accent-visual">…</span></p>`.

**Copy:**

- **A:** Dream InReality is the SolidWorks CAD practice of Simeon Campbell. It takes a product from a sketch, sample or existing model to files a factory can quote against: native SLDPRT/SLDASM models, STEP and DXF exports, PDF drawing packs and photorealistic renders. Clients are UK product businesses, from inventors with a first prototype to manufacturers taking on a client's design.
- **B:** From 2018 to 2021 Simeon was a CAD design engineer at Microworkshops, a 3D printing company in London. The work covered products from garden furniture to musical equipment: modelling parts that print reliably, and producing the construction drawings that take a design into mass production.
- **C:** Recent projects include a modular heavy-duty dumbbell system for Halo Gym and hardware visualisation for a trading desk. Microworkshops and Bambrella / ShadeSpecialists have both given testimonials, which are on the <Link href="/" className="link-inverse">home page</Link>.
- **Services list** (`ul`, `max-w-[70ch] list-disc space-y-3 pl-6 marker:text-accent-visual`), each item a `link-inverse` link with the page's own name: DFM consultancy, SolidWorks design, Construction drawings, Reverse engineering, CAD file conversion, Photorealistic rendering, linking to `/services/<slug>`.
- **Chips** (`ul aria-label="File formats delivered"`, DFM chip classes): SLDPRT, SLDASM, STEP, DXF, PDF.
- **D:** For UK clients whose parts are made in South-East Asia, Simeon also handles supplier liaison in Thailand and Vietnam: sending drawings and technical questions to the factory, coordinating prototypes and samples, and reporting back on what arrives. **[Sim to confirm this list before merge.]**

- [ ] **Step 1:** Add `aboutPageSchema` to `JsonLd.js`.
- [ ] **Step 2:** Write `sceneConfig.js` and rewrite `page.js` to the structure above. Remove the `AboutContent` import. No `"use client"`.
- [ ] **Step 3: Copy check.** Run `grep -inE "passionate|cutting-edge|solutions|unlock|elevate|seamless|world-class|leverag|siam|precision partners|\bwe\b"` on the page. Expected: no matches.
- [ ] **Step 4: Static HTML check.** `npm run build`, then in `out/about.html` (or `out/about/index.html`): exactly one `<h1`; one `application/ld+json` script containing `"AboutPage"`; all six `/services/` links; the words "Microworkshops" and "Vietnam" present.
- [ ] **Step 5: Viewport check.** At 1280×800 in headless Chrome: the reel turns on load and changes subject every 5 s; one wheel step snaps to frame 02 and the canvas is gone; each further step lands on a frame; scrolling back to the top restarts the reel. At 375 px: no canvas, the still sits above the h1, `scrollWidth === 375`, and both CTAs are at least 44 px tall. Under emulated reduced motion, no request for a three.js chunk.
- [ ] **Step 6: Keyboard check.** Tab order: CTA, home-page link, six service links, closing CTA, each with a visible cyan ring.
- [ ] **Step 7:** Commit: `feat: rebuild About page on the dark theme with a service reel`.

---

### Task 4: Review, regressions, push

**Files:**
- Modify: project doc `claude/dark-theme-sitewide-plan.md` section 6.6 (mark About done; point to this plan)

- [ ] **Step 1:** Run `ux-audit` on `/about` at 375 and 1280. Fix hard-rule fails.
- [ ] **Step 2:** Run copy-reviewer, seo-auditor and design-reviewer on `/about`. Address findings, except where they ask to change a decision in "Decisions taken"; report those instead.
- [ ] **Step 3: Regression.** `/services/dfm-consultancy` and `/services/construction-drawings` still play all three frames. `npm test` and `npm run build` pass.
- [ ] **Step 4:** Commit any fixes, push `claude/dark-about`, and check that `git log -1` shows the intended message. No pull request.
- [ ] **Step 5:** Report with screenshots of all five reel subjects, frames 02 to 04 at 1280, and the 375 px view. Say what was checked, what was not, and anything that looks weak.

## Needed from Sim

- Confirm paragraph D: what the liaison actually covers, and whether Vietnam is offered on the same terms as Thailand.
- Confirm "CAD design engineer" as the job title for the schema and paragraph B.
- Later: once the Thailand liaison page exists, paragraph D gets a link to it.
