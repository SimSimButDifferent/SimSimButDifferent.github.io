import test from "node:test";
import assert from "node:assert/strict";
import { activePane, playback } from "./scrollTimeline.mjs";

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

test("playback gives a long forward move about five seconds", () => {
  assert.equal(playback(6.7, 12.5).duration, 5);
  assert.equal(playback(2.6, 6.7).duration, 5);
});

test("playback runs a short forward move in real time", () => {
  assert.ok(Math.abs(playback(0, 2.6).duration - 2.6) < 1e-9);
});

test("playback rewinds quickly", () => {
  assert.equal(playback(12.5, 6.7).duration, 0.8);
});

test("playback has nothing to play when already there or given bad input", () => {
  assert.equal(playback(6.7, 6.7).duration, 0);
  assert.equal(playback(NaN, 6.7).duration, 0);
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
