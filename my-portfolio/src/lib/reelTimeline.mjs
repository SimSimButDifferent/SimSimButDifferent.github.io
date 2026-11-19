// Slot maths for a reel: one subject at a time, each shown for one slot of
// the showcase turn, with a short scale cut at each end of its slot.
//
// reelSlot(spin, count, slotAngle, cutAngle) -> { index, turn, scale }
//   index  which subject is showing, 0 to count - 1 (wraps both ways)
//   turn   angle into the current slot, 0 <= turn < slotAngle
//   scale  0 -> 1 over the first cutAngle, 1 in the middle, 1 -> 0 over the
//          last cutAngle, smoothstep-eased
const smoothstep = (x) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};

export function reelSlot(spin, count, slotAngle, cutAngle) {
  if (!Number.isFinite(spin)) return { index: 0, turn: 0, scale: 1 };
  const slot = Math.floor(spin / slotAngle);
  const index = ((slot % count) + count) % count;
  const turn = Math.min(Math.max(spin - slot * slotAngle, 0), slotAngle);
  const edge = Math.min(turn, slotAngle - turn);
  const scale = cutAngle > 0 ? smoothstep(edge / cutAngle) : 1;
  return { index, turn, scale };
}
