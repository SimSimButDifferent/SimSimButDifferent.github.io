import test from "node:test";
import assert from "node:assert/strict";
import { stopAt, meanderSegments, travelMs, mobileRoute } from "./meander.mjs";

test("stopAt counts stages whose top has reached mid-viewport", () => {
  assert.equal(stopAt([900, 1700, 2500], 800), 0);
  assert.equal(stopAt([240, 1040, 1840], 800), 1);
  assert.equal(stopAt([-560, 240, 1040], 800), 2);
  assert.equal(stopAt([-2000, -1200, -400], 800), 3);
  assert.equal(stopAt([400, 1200], 800), 1); // exactly at the middle counts
});
test("stopAt survives bad input", () => {
  assert.equal(stopAt([], 800), 0);
  assert.equal(stopAt([NaN, 100], 800), 1);
});
test("meanderSegments draws S-curves with vertical tangents", () => {
  assert.deepEqual(
    meanderSegments({ x: 600, y: 200 }, [{ x: 850, y: 550 }, { x: 350, y: 1300 }]),
    ["M600 200 C600 375 850 375 850 550", "M850 550 C850 925 350 925 350 1300"]
  );
});
test("meanderSegments rounds and handles no nodes", () => {
  assert.deepEqual(meanderSegments({ x: 0.4, y: 0.6 }, [{ x: 10.5, y: 21 }]), [
    "M0 1 C0 11 11 11 11 21",
  ]);
  assert.deepEqual(meanderSegments({ x: 0, y: 0 }, []), []);
});
test("travelMs is one fixed duration per direction", () => {
  assert.equal(travelMs(2, 2), 0);
  assert.equal(travelMs(2, 3), 1200);
  assert.equal(travelMs(0, 8), 1200);
  assert.equal(travelMs(5, 4), 600);
  assert.equal(travelMs(8, 0), 600);
});
test("mobileRoute runs down each gutter, then crosses to the next station", () => {
  assert.deepEqual(
    mobileRoute({ x: 180, y: 100 }, [
      { x: 28, top: 200, bottom: 256, turn: 600 },
      { x: 332, top: 700, bottom: 756, turn: 1100 },
    ]),
    [
      "M180 100 C180 185 28 115 28 200",
      "M28 256 L28 600 C28 685 332 615 332 700",
      "M332 756 L332 1100",
    ]
  );
});
test("mobileRoute rounds, never runs upwards, and handles no stations", () => {
  assert.deepEqual(mobileRoute({ x: 0.4, y: 0.6 }, [{ x: 10.5, top: 21, bottom: 40.2, turn: 30 }]), [
    "M0 1 C0 18 11 4 11 21",
    "M11 40 L11 40",
  ]);
  assert.deepEqual(mobileRoute({ x: 0, y: 0 }, []), []);
});
