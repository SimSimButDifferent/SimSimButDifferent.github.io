// Playback maths for snap-scrolling scenes. Each pane of a ScrollScene owns a
// target time on the scene timeline; when the pane snaps into view the scene
// plays to that time on a timer. Pure functions, tested with `node --test`.

// A forward move of this many scene-seconds or more is paced to FORWARD
// seconds; shorter ones run in real time. Scrolling back is a quick rewind.
const LONG_MOVE = 3;
const FORWARD = 5;
const REWIND = 0.8;

// Index of the pane the reader is on: the last pane whose top edge has
// reached the middle of the viewport. `tops` are viewport-relative pixels.
export function activePane(tops, viewportHeight) {
  let index = 0;
  for (let i = 0; i < tops.length; i++) {
    if (tops[i] <= viewportHeight / 2) index = i;
  }
  return index;
}

// Seconds to take playing the scene forward by `distance` scene-seconds.
function pace(distance) {
  return distance >= LONG_MOVE ? FORWARD : distance;
}

const EPSILON = 1e-6;

// The moves that take the scene to a pane's beat ({ start, end } in scene
// time), as a list of { to, duration } played in order.
//   cameFrom "none"    first arrival: jump to the start, play to the end
//   cameFrom "earlier" scrolled down: if the scene is outside the beat,
//                      rewind quickly to its start; then play to its end
//   cameFrom "later"   scrolled up: go quickly to the beat's end
export function planBeat(clock, beat, cameFrom) {
  const { start, end } = beat;
  const moves = [];

  if (cameFrom === "later") {
    if (Math.abs(clock - end) > EPSILON) moves.push({ to: end, duration: REWIND });
    return moves;
  }

  let at = clock;
  const inside =
    Number.isFinite(at) && at >= start - EPSILON && at <= end + EPSILON;
  if (cameFrom === "none" || !inside) {
    moves.push({ to: start, duration: cameFrom === "none" ? 0 : REWIND });
    at = start;
  }
  if (end - at > EPSILON) moves.push({ to: end, duration: pace(end - at) });
  return moves;
}

// Where one wheel step should scroll to. `points` are the page's snap
// positions (ascending px), `y` the current scroll position, `direction` +1
// down or -1 up. Returns null at either end. A frame taller than the
// viewport is paged through 80% of a viewport at a time so no content is
// skipped.
export function nextSnap(points, y, direction, viewportHeight) {
  const slack = 2;
  const next =
    direction > 0
      ? points.find((p) => p > y + slack)
      : [...points].reverse().find((p) => p < y - slack);
  if (next === undefined) return null;
  // 1.25: the first frame is a viewport plus the navbar and is not "tall".
  if (Math.abs(next - y) > viewportHeight * 1.25) {
    return Math.round(y + direction * viewportHeight * 0.8);
  }
  return next;
}
