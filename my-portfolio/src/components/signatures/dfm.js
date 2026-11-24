"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DimV,
  SignatureSvg,
  StepList,
  fade,
  svgText,
  usePlayOnce,
} from "./kit";

// Stage 05, DFM review: a drafted boss with its draft angle above the
// station, and a wall-thickness dimension beside it that is corrected from
// 0.8 to 2.0 and ticked. A report panel lists example changes. All values are
// illustrative.

const CHANGES = [
  { name: "Wall 0.8 → 2.0" },
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
  const { ref, show, reduce } = play;
  const [wall, setWall] = useState(reduce ? 2.0 : 0.8);

  useEffect(() => {
    if (reduce || !show) return undefined;
    const controls = animate(0.8, 2.0, {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut",
      onUpdate: (v) => setWall(v),
    });
    return () => controls.stop();
  }, [show, reduce]);

  return (
    <SignatureSvg svgRef={ref}>
      {/* Drafted boss and draft angle */}
      <motion.g {...fade(play, 0)}>
        <path d="M114 52L118 12H202L206 52" />
        <path d="M118 12V52" strokeDasharray="3 4" />
        <text x="214" y="36" className={svgText}>
          5°
        </text>
      </motion.g>

      {/* Wall thickness, corrected then ticked */}
      <DimV
        x={300}
        y1={110}
        y2={210}
        label={wall.toFixed(1)}
        motionProps={fade(play, 0.2)}
      />
      <motion.path
        d="M284 232L292 240L308 220"
        initial={reduce ? false : { pathLength: 0 }}
        animate={show ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut", delay: 1.1 }}
      />
    </SignatureSvg>
  );
}
