# Dark contact page with a reactive glass "CONTACT" scene

## Context

`/contact` is one of the last light pages. It shows a pre-rendered PNG of the word CONTACT in glass lettering with cyan light channels (`public/images/contact_header.png`), then a cyan-framed white card (phone, email) beside a light Google map. It breaks the dark theme rules in `DESIGN_SYSTEM.md` §0 and `.ux-profile.md`: shadows, cyan-300 frames, entrance animations, hover scale, `backdrop-blur`, an emoji, and "Get in touch today!" copy.

Goal: move the page to the dark theme, keep it simple (one screen of content), and replace the PNG with a live three.js version of the same lettering whose internal lights brighten near the mouse.

Decisions made with Simeon (2026-11-20):
- **Map:** keep the live Google map, in Google's dark colour scheme, in a slate panel.
- **Hover:** proximity glow. The light follows the cursor: the letter under the pointer brightens most, neighbours a little, easing back on leave.

Calls made by the planner (change if they look wrong in the browser):
- No contact form (the site is a static export; phone and email only).
- Lights rest at a steady level. Nothing animates until the pointer moves (no decorative loops).
- No bloom or post-processing (neon glows are banned). "Light" is emissive brightness plus a faint floor pool.
- Below `lg`, under reduced motion and without WebGL: a still frame, as on every other scene.
- Letters are hand-built geometry, not a loaded font file.

## Before building

1. Copy this plan to `docs/superpowers/plans/2026-11-20-dark-contact.md` (repo convention).
2. Read `.ux-profile.md`, `DESIGN_SYSTEM.md` §0, then the `page-patterns` skill and **name the page pattern** before writing markup. Read `viewports`, `motion`, `reduced-motion`, `errors` as they come up.
3. Open `public/images/contact_header.png` as the visual reference, and `src/app/about/page.js` + `src/components/ServiceReel.js` as the code reference for a dark, non-service page with a canvas.

## Files

| File | Change |
|---|---|
| `src/scenes/contact.js` | New scene (below) |
| `src/scenes/stage.js` | Register `contact`; three small additive changes (below) |
| `src/components/ContactScene.js` | New client component hosting the canvas and still |
| `src/app/contact/page.js` | Becomes the page itself (server component), dark layout, JSON-LD |
| `src/components/Map.js` | `"use client"`, dark restyle, visitor-safe fallbacks |
| `src/components/JsonLd.js` | Add `contactPageSchema`, modelled on `aboutPageSchema` (line 58) |
| `src/components/ContactContent.js` | Delete |
| `public/images/scenes/contact-01.webp` | New still frame |
| `DESIGN_SYSTEM.md` | Add `/about` and `/contact` to the "Migrated so far" list; note the contact scene |

Leave `public/images/contact_header.png` in place (Simeon's render); it is just no longer referenced.

## 1. Stage changes (`src/scenes/stage.js`)

All additive; the six existing scenes must behave exactly as before.

- Add `contact: () => import("./contact")` to `loaders`.
- Pass `renderer` into `create({ THREE, tokens, fontFamily, renderer })` so the scene can build an environment map (glass needs something to reflect).
- New handle method `pointer(x, y)` (normalised device coords, or `pointer(null)` on leave): set a `THREE.Raycaster` from the stage camera and call `part.pointer?.(raycaster | null)`, then start the frame loop.
- Frame loop: today `tick` runs only while `showcaseOn`. Extend it so it also runs while `part.step?.(dt)` returns `true` (the scene is still easing), and stops when it returns `false`. With no `step`, behaviour is unchanged.

## 2. The scene (`src/scenes/contact.js`)

Contract as the other scenes: `create(ctx)` returns `{ object, update(t), view(), camera, dispose() }`, plus `pointer(raycaster)` and `step(dt)`.

**Subject.** Seven upright letters, C O N T A C T, standing on the blueprint floor, matching the render: a rounded geometric sans, each letter a clear glass body with cyan light channels running inside it along the letter's stroke.

- Build five letterforms (C, O, N, T, A) once and reuse them. Glass body: a hand-authored `THREE.Shape` per letter (O = ring; C = ring sector with round ends; T, N = polygons; A = polygon with a triangular hole), `ExtrudeGeometry` with a small rounded bevel. Light channels: `TubeGeometry` along the letter's centreline (arcs for C/O, line segments for N/T/A), two or three stacked through the depth as in the render.
- Glass: `MeshPhysicalMaterial`, ice-blue tint from `tokens.render`, low roughness, clearcoat, with an environment map from `RoomEnvironment` + `PMREMGenerator` (`three/examples/jsm`) set on the material's `envMap` (not `scene.environment`, so other scenes are untouched). **Try `transmission` first; the renderer has a transparent clear colour, so check it does not render the glass black.** If it does, fall back to `transparent: true`, opacity about 0.25, `depthWrite: false`. Pick whichever reads as glass on navy.
- Channels: one `MeshStandardMaterial` per letter, `emissive: tokens.cyan`; `emissiveIntensity` is the letter's brightness. Under each letter, a small floor pool (reuse the radial-gradient canvas texture idea from `blueprintFloor`) whose opacity follows the same brightness.
- Optional, only if cheap and clean: a faint mirrored copy below the floor for the render's reflection.

**Camera.** Fixed. `swing: 0`, no `at`, never in showcase. Rotate the letter group about Y so the word runs on a diagonal like the render, seen from above. Tune `distance`/`elevation`/`target` so the word fills about 80% of a wide (roughly 21:9) canvas with no clipping at 1024 px.

**Proximity glow.**
- `pointer(raycaster)`: intersect the ray with a vertical plane through the word (not the meshes: it gives a continuous position and costs nothing). Store the hit position along the word axis, or `null` if the pointer left or the hit is well outside the word.
- Target brightness per letter: `REST + (1 - REST) * exp(-(d / SIGMA)^2)`, `d` = distance from the hit to the letter's centre. Start with `REST = 0.55`, `SIGMA` = one letter pitch. No pointer: all targets `REST`.
- `step(dt)`: move each letter's brightness towards its target with exponential smoothing (about 150 ms rising, 300 ms falling), apply to emissive intensity and pool opacity, return `true` until every letter is within 0.001 of target.
- `update(t)` is a no-op (no story). The scene renders on demand only.

## 3. Canvas host (`src/components/ContactScene.js`)

Copy the lifecycle from `ServiceReel.js` rather than refactoring it (one page per change): reduced-motion check, `lg` media query, lazy `import("@/scenes/stage")`, `ResizeObserver` fit, `IntersectionObserver` start, `canvasKey` on dispose, still image underneath cross-fading at `duration-200`.

- After mount call `handle.seek(0)` once; do not call `setShowcase(true)`.
- `onPointerMove` on the box: convert to NDC, call `handle.pointer(x, y)`. `onPointerLeave` / `onPointerCancel`: `handle.pointer(null)`. This also covers touch on large tablets.
- Canvas `role="img"` with `aria-label="The word CONTACT in glass lettering lit from inside in cyan"`; the still uses the same text as `alt`. The scene is decoration plus signature; the real heading is the `h1`.
- Box: full column width, wide aspect (about `aspect-[21/9]`; taller below `sm` if the still needs it).

## 4. The page (`src/app/contact/page.js`)

Server component. `<main className="page-dark min-h-screen">`, `max-w-7xl` container, no snap frames (one screen).

```
┌──────────────────────────────────────────────┐
│        C O N T A C T   (ContactScene)        │
├───────────────────────┬──────────────────────┤
│ CONTACT (eyebrow)     │                      │
│ h1 Contact Dream      │   Google map, dark   │
│    InReality          │   (panel, no pad)    │
│ What to send (1 para) │                      │
│ Phone / Email / Addr  │                      │
└───────────────────────┴──────────────────────┘
below lg: still, text, map stacked
```

- `h1`: `Contact <span class="font-semibold text-accent-visual whitespace-nowrap">Dream InReality</span>`, `text-display font-light lg:text-display-lg`. The only `h1`.
- Paragraph (draft; copy-reviewer has the final say): "Send a sketch, photos of a sample or an existing model, and say what you need back: native SLDPRT/SLDASM models, a DFM review, STEP or DXF exports, or a PDF drawing pack for manufacture."
- Details as a `<dl>` with visible labels: **Phone** `+44 (0)1233 234583` → `tel:+441233234583` (the only valid number); **Email** `dreaminrealitycad@gmail.com` → `mailto:`; **Address** "Swan Lane, Sellindge, Ashford, Kent". Links use `link-inverse` with a 44 px hit height; the email needs `break-all` at 375 px. Icons, if kept, are inline SVG with `aria-hidden`.
- No entrance animations, no hover scale, no framer-motion on this page. No invented reply times or claims.
- Metadata: keep the existing `metadata` export (title, description, OG, canonical). Add `<JsonLd schema={contactPageSchema({ description, url: "/contact" })} />` (`ContactPage` linked to the business `@id`).

## 5. Map (`src/components/Map.js`)

- Add `"use client"`.
- `colorScheme="DARK"` on `<Map>` (supported by `@vis.gl/react-google-maps` 1.5; confirm it takes effect with `DEMO_MAP_ID`, and if not, say so rather than hack around it).
- Wrapper: `rounded-lg border border-line overflow-hidden`, `h-80 lg:h-full lg:min-h-[24rem]`. No shadow, no white card.
- Remove the address overlay (blur, emoji), the `console.log`, and the developer-facing "API key required" message. Missing key and load error share one visitor-safe fallback in a `.panel`: "The map did not load." plus a `link-inverse` "Open Swan Lane, Sellindge in Google Maps".
- Pin: `tokens` cyan background (#22d3ee), navy glyph and border.

## 6. Still frame

On a scratch route (deleted before commit), mount the scene, call `handle.pose(0, 0, 0)` at rest brightness, screenshot at the box's aspect ratio (1920 px wide), convert to WebP with `sharp`, save as `public/images/scenes/contact-01.webp`. Same method as Task 2 of `docs/superpowers/plans/2026-11-19-dark-about.md`.

## Verification

1. `npm test` and `npm run build` pass.
2. `npm run dev`, `/contact` at 1280×800: the letters render as glass on navy; moving the pointer across the word brightens the nearest letter with a soft falloff; leaving eases all seven back to rest; with the pointer still, no frames are being drawn (check with a counter or the Performance panel).
3. Compare with `contact_header.png`: same word, same letter style, same diagonal view.
4. At 375 px: no canvas and no three.js chunk requested; still, text, map stacked; `document.documentElement.scrollWidth === 375`; phone and email links at least 44 px tall.
5. Emulated `prefers-reduced-motion`: still only, no three.js request.
6. Map shows in dark colours; with `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` unset, the fallback panel and link show.
7. Regression: `/about` reel and `/services/dfm-consultancy` scene play as before; go between `/contact` and `/about` five times with no "too many active WebGL contexts" warning.
8. Run the `ux-audit` skill, then the copy-reviewer, seo-auditor and design-reviewer agents on the page; fix findings.
9. One commit for the page. Add to `USER-TODO.md` only if something needs Simeon (for example, a production Map ID if dark styling needs one).
