"use client";

import { motion } from "framer-motion";
import {
  DimH,
  DimV,
  SignatureSvg,
  StepList,
  fade,
  svgText,
  useCountTo,
  usePlayOnce,
} from "./kit";

// Stage 02, Parametric 3D model: a feature tree under the chips and
// dimension callouts around the station. The width value counts 40 to 60 as
// the dashed ring scales in. Values are illustrative.

const FEATURES = [
  { name: "Sketch1" },
  {
    name: "Boss-Extrude1",
    children: [
      { name: "Fillet1" },
      { name: "Hole Wizard1" },
      { name: "Linear Pattern1" },
    ],
  },
];

export function Text() {
  return (
    <StepList
      title="Example feature tree"
      ariaLabel="Example feature tree of a parametric part"
      items={FEATURES}
    />
  );
}

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  const width = Math.round(useCountTo(play, { from: 40, to: 60 }));

  return (
    <SignatureSvg svgRef={ref}>
      <motion.circle
        cx="160"
        cy="160"
        r="116"
        strokeDasharray="4 6"
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <DimH x1={44} x2={276} y={296} label={width} motionProps={fade(play)} />
      <DimV x={300} y1={44} y2={276} label="24" motionProps={fade(play)} />
      <motion.g {...fade(play)}>
        <path d="M78 78L40 40H8" />
        <text x="8" y="32" className={svgText}>
          R3
        </text>
      </motion.g>
    </SignatureSvg>
  );
}
