import test from "node:test";
import assert from "node:assert/strict";
import { timeAt, stillAt } from "./scrollTimeline.mjs";

const stops = [
  { p: 0, t: 1.5 },
  { p: 0.2, t: 3.0 },
  { p: 0.7, t: 10.6 },
  { p: 1, t: 12.5 },
];

test("timeAt hits the stops", () => {
  assert.equal(timeAt(0, stops), 1.5);
  assert.equal(timeAt(0.2, stops), 3.0);
  assert.equal(timeAt(1, stops), 12.5);
});

test("timeAt interpolates between stops", () => {
  assert.ok(Math.abs(timeAt(0.45, stops) - 6.8) < 1e-9);
});

test("timeAt clamps and survives bad input", () => {
  assert.equal(timeAt(-0.3, stops), 1.5);
  assert.equal(timeAt(1.4, stops), 12.5);
  assert.equal(timeAt(NaN, stops), 1.5);
});

test("stillAt picks the last still whose start time has passed", () => {
  const starts = [0, 3.0, 10.6];
  assert.equal(stillAt(1.5, starts), 0);
  assert.equal(stillAt(3.0, starts), 1);
  assert.equal(stillAt(10.59, starts), 1);
  assert.equal(stillAt(12.5, starts), 2);
  assert.equal(stillAt(-1, starts), 0);
});
