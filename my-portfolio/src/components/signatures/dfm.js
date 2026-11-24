"use client";

import { motion } from "framer-motion";
import {
  DimV,
  SignatureSvg,
  StepList,
  fade,
  svgText,
  useCountTo,
  usePlayOnce,
} from "./kit";

// Stage 05, DFM review: a drafted boss with its draft angle above the
// station, and a wall-thickness dimension beside it that is corrected from
// 0.8 to 2.0 and ticked. A report panel lists example changes. All values are
// illustrative.

const CHANGES = [
  { name: "Wall 0.8 → 2.0 mm" },
  { name: "Draft 0° → 2°" },
  { name: "Undercut removed" },
];

export function Text() {
  return (
    <StepList
      title="Example report lines"
      ariaLabel="Example changes listed in a DFM report"
      items={CHANGES}
    />
  );
}

export function Overlay() {
  const play = usePlayOnce();
  const { ref } = play;
  const wall = useCountTo(play, { from: 0.8, to: 2.0, delay: 0.3 });

  return (
    <SignatureSvg svgRef={ref}>
      {/* Boss drafted at 2 degrees (about 1.4px over its 40px height) */}
      <motion.g {...fade(play, 0)}>
        <path className="fill-navy" d="M117 52L118.4 12H201.6L203 52Z" />
        <text x="214" y="36" className={svgText}>
          2°
        </text>
      </motion.g>

      {/* Wall thickness, corrected then ticked */}
      <DimV
        x={20}
        y1={110}
        y2={210}
        label={wall.toFixed(1)}
        motionProps={fade(play, 0.2)}
      />
      <motion.path d="M4 232L12 240L28 220" {...fade(play, 0.6)} />
    </SignatureSvg>
  );
}
