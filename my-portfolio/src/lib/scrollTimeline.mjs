// Maps scroll progress (0 to 1) onto scene time for scroll-driven scenes.
// Pure functions so they can be tested with `node --test`.

// Piecewise-linear lookup through `stops` ([{ p, t }], ascending p).
// Out-of-range and non-finite progress clamp to the nearest end.
export function timeAt(progress, stops) {
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (!Number.isFinite(progress) || progress <= first.p) return first.t;
  if (progress >= last.p) return last.t;
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1];
    const b = stops[i];
    if (progress <= b.p) {
      return a.t + ((progress - a.p) / (b.p - a.p)) * (b.t - a.t);
    }
  }
  return last.t;
}

// Index of the last still whose start time is at or before `t`.
export function stillAt(t, starts) {
  let index = 0;
  for (let i = 0; i < starts.length; i++) {
    if (t >= starts[i]) index = i;
  }
  return index;
}
