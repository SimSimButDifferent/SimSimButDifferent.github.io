// Timing for the homepage parametric plate (IntroFigure): one driving
// dimension W loops 60 -> 90 -> 120 -> 60, and each change rebuilds the
// features in order, as SolidWorks does. The three.js scene
// (src/scenes/parametric-plate.js) and the HTML feature tree both read this,
// so the part and the tree stay in step. Pure functions, tested with
// `node --test`.

export const PERIOD = 8; // seconds, one full loop

// Each change of W: when it starts and ends (seconds into the loop).
export const CHANGES = [
  { start: 1.2, end: 2.0, from: 60, to: 90 },
  { start: 3.6, end: 4.4, from: 90, to: 120 },
  { start: 6.0, end: 7.0, from: 120, to: 60 },
];

export const FEATURES = ["Sketch1", "Boss-Extrude1", "Cut-Extrude1", "Fillet1"];

// Rebuild: each feature lights for LIT seconds, the next one STAGGER later.
const STAGGER = 0.2;
const LIT = 0.35;

const smooth = (x) => x * x * (3 - 2 * x);
const wrap = (t) => {
  const u = t % PERIOD;
  return u < 0 ? u + PERIOD : u;
};

// W at loop time t (any t; it wraps).
export function widthAt(t) {
  const u = wrap(t);
  let width = CHANGES[0].from;
  for (const { start, end, from, to } of CHANGES) {
    if (u >= end) width = to;
    else if (u > start) {
      return from + (to - from) * smooth((u - start) / (end - start));
    }
  }
  return width;
}

// The W shown in text: the value being changed to, from the moment the
// change starts (as when a new value is typed into the dimension).
export function shownWidth(t) {
  const u = wrap(t);
  let width = CHANGES[0].from;
  for (const { start, to } of CHANGES) if (u >= start) width = to;
  return width;
}

// Index of the feature lit by the rebuild at loop time t, or -1.
export function rebuildingFeature(t) {
  const u = wrap(t);
  for (const { start } of CHANGES) {
    for (let i = FEATURES.length - 1; i >= 0; i--) {
      const on = start + i * STAGGER;
      if (u >= on && u < on + LIT) return i;
    }
  }
  return -1;
}
