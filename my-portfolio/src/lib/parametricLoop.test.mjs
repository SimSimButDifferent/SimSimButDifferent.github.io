import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CHANGES,
  PERIOD,
  rebuildingFeature,
  shownWidth,
  widthAt,
} from "./parametricLoop.mjs";

test("W holds at each value between changes", () => {
  assert.equal(widthAt(0.5), 60);
  assert.equal(widthAt(3.0), 90);
  assert.equal(widthAt(5.0), 120);
  assert.equal(widthAt(7.5), 60);
});

test("W eases between values and the loop wraps", () => {
  const mid = widthAt((CHANGES[0].start + CHANGES[0].end) / 2);
  assert.ok(mid > 60 && mid < 90);
  assert.equal(widthAt(PERIOD + 5.0), widthAt(5.0));
  assert.equal(widthAt(-3), widthAt(PERIOD - 3));
});

test("shown W jumps to the new value when a change starts", () => {
  assert.equal(shownWidth(1.1), 60);
  assert.equal(shownWidth(1.2), 90);
  assert.equal(shownWidth(6.5), 60);
});

test("rebuild lights the features in order during each change", () => {
  assert.equal(rebuildingFeature(1.0), -1);
  assert.equal(rebuildingFeature(1.25), 0);
  assert.equal(rebuildingFeature(1.45), 1);
  assert.equal(rebuildingFeature(1.65), 2);
  assert.equal(rebuildingFeature(1.85), 3);
  assert.equal(rebuildingFeature(2.5), -1);
  assert.equal(rebuildingFeature(3.65), 0);
});
