"use client";

import { motion } from "framer-motion";
import { SignatureSvg, StepList, fade, svgText, usePlayOnce } from "./kit";

// Stage 03, Assembly and fit check: a block settles into a U-bracket at the
// top left of the station and a clearance callout appears. Kept clear of the
// route line, which meets the circle at x=160. Values are illustrative.

const MATES = [
  { name: "Concentric1" },
  { name: "Coincident1" },
  { name: "Distance1" },
];

export function Text() {
  return (
    <StepList
      title="Example mates"
      ariaLabel="Example mates in an assembly"
      items={MATES}
    />
  );
}

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  return (
    <SignatureSvg svgRef={ref}>
      {/* Fixed part: U-bracket */}
      <motion.path d="M20 54V28H44V40H80V28H104V54Z" {...fade(play, 0)} />
      {/* Moving part: block lowers into the slot */}
      <motion.rect
        x="48"
        y="12"
        width="28"
        height="24"
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
      />
      {/* Clearance callout */}
      <motion.g {...fade(play, 0.5)}>
        <path d="M78 34L92 20H112" />
        <text x="116" y="25" className={svgText}>
          0.2
        </text>
      </motion.g>
    </SignatureSvg>
  );
}
