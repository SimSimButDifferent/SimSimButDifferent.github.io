// Cut maths for a reel: one subject at a time, turning, until another is
// chosen. Choosing one plays a short scale cut: the shown subject shrinks out
// over `cut`, the chosen one grows in over `cut`, then it holds and turns.
// The showcase spin is the clock, so the cut runs at the turn's pace.
//
// reelCut(state, wanted, spin, cut) -> { state, index, turn, scale }
//   state   the previous call's state, or null to start
//   wanted  the chosen subject's index
//   spin    showcase spin angle; a drop (the loop restarted) shows `wanted`
//           straight away at full size
//   cut     angle each half of the cut takes
//   index   which subject to show
//   turn    angle the shown subject has turned since it came in
//   scale   0 to 1, smoothstep-eased across each half of the cut
const smoothstep = (x) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};

const hold = (shown, since) => ({ shown, since, phase: "hold", from: since });

export function reelCut(state, wanted, spin, cut) {
  if (!Number.isFinite(spin)) {
    return { state, index: state?.shown ?? wanted, turn: 0, scale: 1 };
  }
  let s = state && spin >= state.since ? state : hold(wanted, spin);
  const progress = () => (cut > 0 ? (spin - s.from) / cut : 1);

  if (s.phase === "in" && wanted !== s.shown) {
    // Chosen again mid-grow: shrink back out from the current size.
    const x = Math.min(progress(), 1);
    s = { ...s, phase: "out", from: spin - (1 - x) * cut };
  }
  if (s.phase === "hold" && wanted !== s.shown) {
    s = { ...s, phase: "out", from: spin };
  }
  if (s.phase === "out" && progress() >= 1) {
    s = { shown: wanted, since: spin, phase: "in", from: spin };
  }
  if (s.phase === "in" && progress() >= 1) {
    s = { ...s, phase: "hold" };
  }

  const x = progress();
  const scale =
    s.phase === "out" ? 1 - smoothstep(x) : s.phase === "in" ? smoothstep(x) : 1;
  return { state: s, index: s.shown, turn: spin - s.since, scale };
}
