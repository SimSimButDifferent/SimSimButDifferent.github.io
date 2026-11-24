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
