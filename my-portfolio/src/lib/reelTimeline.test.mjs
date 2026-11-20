import test from "node:test";
import assert from "node:assert/strict";
import { reelCut } from "./reelTimeline.mjs";

const CUT = 0.05;
const near = (a, b) => Math.abs(a - b) < 1e-9;

// Steps the reel through a list of [wanted, spin] calls, returning each frame.
const run = (calls) => {
  let state = null;
  return calls.map(([wanted, spin]) => {
    const frame = reelCut(state, wanted, spin, CUT);
    state = frame.state;
    return frame;
  });
};

test("reelCut starts on the chosen subject at full size", () => {
  const [first] = run([[2, 0]]);
  assert.equal(first.index, 2);
  assert.equal(first.scale, 1);
  assert.equal(first.turn, 0);
});

test("reelCut holds and turns the shown subject", () => {
  const frames = run([
    [0, 0],
    [0, 1],
    [0, 7],
  ]);
  assert.equal(frames[2].index, 0);
  assert.equal(frames[2].scale, 1);
  assert.ok(near(frames[2].turn, 7));
});

test("reelCut shrinks the old subject out, then grows the new one in", () => {
  const frames = run([
    [0, 0],
    [1, 1],
    [1, 1 + CUT / 2],
    [1, 1 + CUT],
    [1, 1 + CUT * 1.5],
    [1, 1 + CUT * 3],
  ]);
  assert.equal(frames[1].index, 0);
  assert.equal(frames[1].scale, 1);
  assert.equal(frames[2].index, 0);
  assert.ok(near(frames[2].scale, 0.5));
  assert.equal(frames[3].index, 1);
  assert.equal(frames[3].scale, 0);
  assert.ok(near(frames[4].scale, 0.5));
  assert.equal(frames[5].scale, 1);
  assert.ok(near(frames[5].turn, CUT * 2));
});

test("reelCut reverses a grow without a jump in size", () => {
  const frames = run([
    [0, 0],
    [1, 1],
    [1, 1 + CUT],
    [1, 1 + CUT * 1.25],
    [2, 1 + CUT * 1.25],
  ]);
  assert.equal(frames[3].index, 1);
  assert.equal(frames[4].index, 1);
  assert.ok(near(frames[3].scale, frames[4].scale));
});

test("reelCut shows the chosen subject at once when the loop restarts", () => {
  const frames = run([
    [0, 5],
    [3, 5.01],
    [3, 0],
  ]);
  assert.equal(frames[2].index, 3);
  assert.equal(frames[2].scale, 1);
  assert.equal(frames[2].turn, 0);
});

test("reelCut survives bad input", () => {
  const frame = reelCut(null, 1, NaN, CUT);
  assert.equal(frame.index, 1);
  assert.equal(frame.scale, 1);
});
