import test from "node:test";
import assert from "node:assert/strict";
import { activePane, planBeat } from "./scrollTimeline.mjs";

test("activePane is the last pane whose top has reached the viewport middle", () => {
  assert.equal(activePane([69, 869, 1669], 800), 0);
  assert.equal(activePane([-400, 400, 1200], 800), 1);
  assert.equal(activePane([-800, 0, 800], 800), 1);
  assert.equal(activePane([-1600, -800, 0], 800), 2);
});

test("activePane stays on the last pane once the scene has scrolled past", () => {
  assert.equal(activePane([-4000, -3200, -2400], 800), 2);
});

test("activePane falls back to the first pane", () => {
  assert.equal(activePane([900, 1700, 2500], 800), 0);
  assert.equal(activePane([], 800), 0);
});

// DFM beats: a showcase of the finished part, then the review, then the fixes.
const hero = { start: 12.5, end: 12.5 };
const review = { start: 2.6, end: 6.7 };
const fixes = { start: 6.7, end: 12.5 };

test("planBeat opens on a pane by jumping straight to its start", () => {
  assert.deepEqual(planBeat(0, hero, "none"), [{ to: 12.5, duration: 0 }]);
  assert.deepEqual(planBeat(0, review, "none"), [
    { to: 2.6, duration: 0 },
    { to: 6.7, duration: 5 },
  ]);
});

test("planBeat scrolling down from outside a beat rewinds to its start, then plays it", () => {
  assert.deepEqual(planBeat(12.5, review, "earlier"), [
    { to: 2.6, duration: 0.8 },
    { to: 6.7, duration: 5 },
  ]);
});

test("planBeat scrolling down into the next beat plays on from where it is", () => {
  assert.deepEqual(planBeat(6.7, fixes, "earlier"), [{ to: 12.5, duration: 5 }]);
  // A short remainder runs in real time.
  assert.deepEqual(planBeat(11, fixes, "earlier"), [{ to: 12.5, duration: 1.5 }]);
});

test("planBeat scrolling back up goes quickly to the beat's end", () => {
  assert.deepEqual(planBeat(12.5, review, "later"), [{ to: 6.7, duration: 0.8 }]);
  assert.deepEqual(planBeat(6.7, hero, "later"), [{ to: 12.5, duration: 0.8 }]);
});

test("planBeat has nothing to do when the scene is already at the beat's end", () => {
  assert.deepEqual(planBeat(12.5, hero, "earlier"), []);
  assert.deepEqual(planBeat(6.7, review, "later"), []);
});

test("planBeat treats a non-finite clock as needing the beat's start", () => {
  assert.deepEqual(planBeat(NaN, review, "earlier"), [
    { to: 2.6, duration: 0.8 },
    { to: 6.7, duration: 5 },
  ]);
});

// Snap points for a 800px viewport: navbar, panes 2 and 3, two frames, end.
const points = [0, 869, 1669, 2469, 3269, 3719];

test("nextSnap steps one frame in the wheel direction", async () => {
  const { nextSnap } = await import("./scrollTimeline.mjs");
  assert.equal(nextSnap(points, 0, 1, 800), 869);
  assert.equal(nextSnap(points, 869, 1, 800), 1669);
  assert.equal(nextSnap(points, 1669, -1, 800), 869);
});

test("nextSnap leaves a mid-frame position for the nearest point that way", async () => {
  const { nextSnap } = await import("./scrollTimeline.mjs");
  assert.equal(nextSnap(points, 900, 1, 800), 1669);
  assert.equal(nextSnap(points, 900, -1, 800), 869);
});

test("nextSnap has nowhere to go at either end", async () => {
  const { nextSnap } = await import("./scrollTimeline.mjs");
  assert.equal(nextSnap(points, 0, -1, 800), null);
  assert.equal(nextSnap(points, 3719, 1, 800), null);
});

test("nextSnap pages through a frame taller than the viewport", async () => {
  const { nextSnap } = await import("./scrollTimeline.mjs");
  const tall = [0, 869, 2600];
  assert.equal(nextSnap(tall, 869, 1, 800), 869 + 640);
  assert.equal(nextSnap(tall, 2600, -1, 800), 2600 - 640);
});
