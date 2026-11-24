"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DimH,
  DimV,
  SignatureSvg,
  StepList,
  fade,
  svgText,
  usePlayOnce,
} from "./kit";

// Stage 02, Parametric 3D model: a feature tree under the chips and
// dimension callouts around the station. The width value counts 40 to 60 as
// the dashed ring scales in. Values are illustrative.

const FEATURES = [
  { name: "Sketch1" },
  { name: "Boss-Extrude1" },
  { name: "Fillet1", depth: 1 },
  { name: "Hole Wizard1", depth: 1 },
  { name: "Linear Pattern1", depth: 1 },
];

export function Text() {
  return (
    <StepList
      title="Feature tree"
      ariaLabel="Example feature tree of a parametric part"
      items={FEATURES}
    />
  );
}

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  const [width, setWidth] = useState(reduce ? 60 : 40);

  useEffect(() => {
    if (reduce || !show) return undefined;
    const controls = animate(40, 60, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setWidth(Math.round(v)),
    });
    return () => controls.stop();
  }, [show, reduce]);

  return (
    <SignatureSvg svgRef={ref}>
      <motion.circle
        cx="160"
        cy="160"
        r="116"
        strokeDasharray="4 6"
        style={{ transformOrigin: "160px 160px" }}
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
