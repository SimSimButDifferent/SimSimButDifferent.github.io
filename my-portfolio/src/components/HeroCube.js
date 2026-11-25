"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// Homepage hero visual. Back to front: a blueprint grid, a faint cyan glow that
// breathes behind the cube, the impossible-cube render (never turns: turning
// breaks the illusion), a light sweep masked to the cube's outline, and
// SolidWorks-style dimension callouts that draw in once on load (lg and up).
// Under prefers-reduced-motion: grid, steady glow, cube and finished
// dimensions; no sweep and no draw-in.

const CUTOUT = "/images/3d-logo/dir-logo-3d-cutout-1200.webp";

// Silhouette corners of the cutout, in image pixels (991 x 1200).
const LB = [7, 910]; // left edge, bottom
const FB = [615, 1199]; // front corner, bottom
const RT = [990, 284]; // right edge, top
const RB = [986, 971]; // right edge, bottom

const unit = ([x, y]) => {
  const l = Math.hypot(x, y);
  return [x / l, y / l];
};
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k];
const pt = ([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

// Isometric axes of the cube, from the silhouette corners.
const WIDTH = unit([FB[0] - LB[0], FB[1] - LB[1]]); // front-left bottom edge
const DEPTH = unit([RB[0] - FB[0], RB[1] - FB[1]]); // front-right bottom edge

// Dimension between p1 and p2 drawn the way SolidWorks draws it in an
// isometric view: extension lines run along another axis of the part (unit
// vector n), so they line up with its faces and edges; the dimension line is
// parallel to p1-p2. Values are illustrative (aria-hidden), proportional to
// the cube's edges.
function dimension(p1, p2, n, label, off = 90) {
  const dir = unit([p2[0] - p1[0], p2[1] - p1[1]]);
  const a = add(p1, n, off);
  const b = add(p2, n, off);
  const tick = unit([dir[0] + n[0], dir[1] + n[1]]);
  return {
    label,
    corners: [p1, p2],
    // Extension lines, drawn outward from each corner.
    exts: [
      `M${pt(add(p1, n, 14))}L${pt(add(p1, n, off + 18))}`,
      `M${pt(add(p2, n, 14))}L${pt(add(p2, n, off + 18))}`,
    ],
    line: `M${pt(a)}L${pt(b)}`,
    ticks: `M${pt(add(a, tick, -12))}L${pt(add(a, tick, 12))}M${pt(add(b, tick, -12))}L${pt(add(b, tick, 12))}`,
    mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
    // Where the dimension starts before it is pulled out: on the edge.
    from: [-n[0] * off, -n[1] * off],
  };
}

const dims = [
  // Width: extension lines along the depth axis, out to the front-left.
  dimension(LB, FB, [-DEPTH[0], -DEPTH[1]], "155"),
  // Depth: extension lines along the width axis, out to the front-right.
  dimension(FB, RB, WIDTH, "100"),
  // Height on the right edge (clear of the headline), extension lines along
  // the depth axis.
  dimension(RT, RB, DEPTH, "155"),
];

// Timing, in seconds. Each dimension is placed as in SolidWorks: the first
// corner engages, then the second, then the dimension is pulled out from the
// edge to its offset. The next one starts when this one is placed.
const FIRST = 0.4; // first corner of the first dimension
const STEP = 1.3; // one dimension, start to start
const SECOND = 0.3; // second corner, after the first
const PULL = 0.6; // pull-out starts, after the first corner
const PULL_TIME = 0.5;
const ease = [0.16, 1, 0.3, 1]; // out-soft

// Corner marker: a dot and a ring that snaps in, then fades once the
// dimension is placed.
function Corner({ at, delay, until }) {
  const span = until - delay;
  const k = (t) => Math.min(1, t / span);
  const times = [0, k(0.15), k(span - 0.2), 1];
  return (
    <g>
      <motion.circle
        cx={at[0]}
        cy={at[1]}
        className="fill-accent-visual stroke-none"
        initial={{ r: 0, opacity: 0 }}
        animate={{ r: [0, 10, 10, 10], opacity: [0, 1, 1, 0] }}
        transition={{ duration: span, times, delay, ease: "easeOut" }}
      />
      <motion.circle
        cx={at[0]}
        cy={at[1]}
        initial={{ r: 44, opacity: 0 }}
        animate={{ r: [44, 22, 22, 22], opacity: [0, 1, 1, 0] }}
        transition={{ duration: span, times, delay, ease: "easeOut" }}
      />
    </g>
  );
}

function Dimensions() {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="-110 -20 1230 1320"
      className="pointer-events-none absolute left-[-11.1%] top-[-1.667%] hidden h-[110%] w-[124.12%] overflow-visible fill-none stroke-accent-visual lg:block"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {dims.map((d, i) => {
        const start = FIRST + i * STEP;
        const pull = start + PULL;
        const done = start + STEP;
        const pullT = reduce
          ? { duration: 0 }
          : { duration: PULL_TIME, ease, delay: pull };
        return (
          <g key={i}>
            {!reduce && (
              <>
                <Corner at={d.corners[0]} delay={start} until={done} />
                <Corner at={d.corners[1]} delay={start + SECOND} until={done} />
              </>
            )}
            {d.exts.map((e) => (
              <motion.path
                key={e}
                d={e}
                className="opacity-60"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { ...pullT, opacity: { duration: 0.1, delay: pull } }
                }
              />
            ))}
            <motion.g
              initial={
                reduce ? false : { x: d.from[0], y: d.from[1], opacity: 0 }
              }
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { ...pullT, opacity: { duration: 0.1, delay: pull } }
              }
            >
              <path d={d.line} />
              <path d={d.ticks} />
              <rect
                x={d.mid[0] - 46}
                y={d.mid[1] - 26}
                width="92"
                height="52"
                className="fill-navy stroke-none"
              />
              <text
                x={d.mid[0]}
                y={d.mid[1] + 14}
                textAnchor="middle"
                fontSize="40"
                className="fill-accent-visual stroke-none"
              >
                {d.label}
              </text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}

export default function HeroCube() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 sm:items-center sm:justify-end sm:pb-0 sm:pr-6 lg:pr-24 xl:pr-28"
    >
      {/* Blueprint grid, fading out from the cube */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-line [mask-image:radial-gradient(ellipse_80%_55%_at_50%_80%,#000_15%,transparent_75%)] sm:[mask-image:radial-gradient(ellipse_55%_75%_at_75%_50%,#000_15%,transparent_75%)]"
      >
        <defs>
          <pattern id="hero-grid-minor" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" strokeWidth="1" className="opacity-50" />
          </pattern>
          <pattern id="hero-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="url(#hero-grid-minor)" stroke="none" />
            <path d="M120 0H0V120" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" stroke="none" />
      </svg>

      <div className="relative">
        {/* Glow behind the cube: opacity only */}
        <div
          aria-hidden="true"
          className="absolute -inset-[18%] animate-breathe rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.2),rgba(34,211,238,0.06)_60%,transparent)] motion-reduce:animate-none"
        />

        <Image
          src={CUTOUT}
          alt="Impossible cube — the Dream InReality logo rendered in 3D"
          width={991}
          height={1200}
          priority
          className="relative h-[30vh] w-auto sm:h-[42vh] lg:h-[52vh] xl:h-[60vh]"
        />

        {/* Light sweep, clipped to the cube's own outline */}
        <div
          aria-hidden="true"
          className="absolute inset-0 overflow-hidden [-webkit-mask-image:url('/images/3d-logo/dir-logo-3d-cutout-1200.webp')] [-webkit-mask-size:100%_100%] [mask-image:url('/images/3d-logo/dir-logo-3d-cutout-1200.webp')] [mask-size:100%_100%] motion-reduce:hidden"
        >
          <div className="absolute inset-y-[-10%] left-0 w-1/3 animate-sweep">
            <div className="h-full w-full -skew-x-[20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent mix-blend-screen" />
          </div>
        </div>

        <Dimensions />
      </div>
    </div>
  );
}
