// Maths for the homepage timeline route: a line that swings from side to side
// between the stage stations, with a light that travels one segment per stage.
// Pure functions, tested with `node --test`.

const FORWARD_MS = 1200;
const BACK_MS = 600;

// How many stages the reader has reached: the number of stage tops
// (viewport-relative px) at or above the middle of the viewport.
export function stopAt(tops, viewportHeight) {
  const middle = viewportHeight / 2;
  return tops.filter((top) => Number.isFinite(top) && top <= middle).length;
}

const round = ({ x, y }) => ({ x: Math.round(x), y: Math.round(y) });

// One SVG path per node: a cubic S-curve from the previous point, leaving it
// straight down and entering the node from straight above.
export function meanderSegments(start, nodes) {
  let from = round(start);
  return nodes.map((node) => {
    const to = round(node);
    const mid = Math.round((from.y + to.y) / 2);
    const d = `M${from.x} ${from.y} C${from.x} ${mid} ${to.x} ${mid} ${to.x} ${to.y}`;
    from = to;
    return d;
  });
}

// Milliseconds for the light to travel from one stop to another. Fixed per
// direction, so a jump across several stages is one move, not a queue.
export function travelMs(from, to) {
  if (from === to) return 0;
  return to > from ? FORWARD_MS : BACK_MS;
}

// Handle length of the mobile crossings, as a share of the crossing's height.
// At 0.5 the handles meet in the middle and the line bends at a ~12px radius
// at each end; longer handles spread the bend into a broad sweep. Must stay
// under 1, or the curve doubles back upwards.
const SWEEP = 0.85;

// The static route below lg. Stations alternate left and right with the stage
// text underneath, so each segment leaves the previous station (or the
// header) straight down, runs down the gutter beside that stage's text to its
// `turn` y, S-curves across the gap and enters the next station from above.
// A last run takes the line down past the final stage's text.
//   start     { x, y }  bottom centre of the header
//   stations  [{ x, top, bottom, turn }]  centre x, circle top/bottom, and the
//             y just below the stage's text where the line crosses over
// Returns one SVG path string per segment (stations.length + 1, or [] if none).
export function mobileRoute(start, stations) {
  if (stations.length === 0) return [];
  const r = Math.round;
  let x = r(start.x);
  let y = r(start.y);
  let turn = y;
  const paths = stations.map((s) => {
    const to = { x: r(s.x), y: r(s.top) };
    const reach = r((to.y - turn) * SWEEP);
    const run = turn > y ? ` L${x} ${turn}` : "";
    const d = `M${x} ${y}${run} C${x} ${turn + reach} ${to.x} ${to.y - reach} ${to.x} ${to.y}`;
    x = to.x;
    y = r(s.bottom);
    turn = Math.max(y, r(s.turn));
    return d;
  });
  paths.push(`M${x} ${y} L${x} ${turn}`);
  return paths;
}
