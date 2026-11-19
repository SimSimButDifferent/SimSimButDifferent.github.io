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
  assert.ok(Math.abs(late.turn - 0.5 * SLOT) < 1e-6);
});
test("reelSlot scales in and out at slot edges", () => {
  assert.equal(reelSlot(0, 5, SLOT, CUT).scale, 0);
  assert.equal(reelSlot(0.5 * SLOT, 5, SLOT, CUT).scale, 1);
  assert.ok(near(reelSlot(SLOT - CUT / 2, 5, SLOT, CUT).scale, 0.5));
});
test("reelSlot survives bad input", () => {
  assert.deepEqual(reelSlot(NaN, 5, SLOT, CUT), { index: 0, turn: 0, scale: 1 });
});
