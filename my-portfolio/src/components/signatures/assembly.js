"use client";

import { motion } from "framer-motion";
import { SignatureSvg, StepList, fade, svgText, usePlayOnce } from "./kit";

// Stage 03, Assembly and fit check: a block settles into a U-bracket above
// the station and a clearance callout appears. Values are illustrative.

const MATES = [
  { name: "Concentric1" },
  { name: "Coincident1" },
  { name: "Distance1" },
];

export function Text() {
  return (
    <StepList
      title="Mates"
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
      <motion.path d="M96 52V28H128V40H192V28H224V52Z" {...fade(play, 0)} />
      {/* Moving part: block lowers into the slot */}
      <motion.rect
        x="132"
        y="12"
        width="56"
        height="24"
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      {/* Clearance callout */}
      <motion.g {...fade(play, 0.8)}>
        <path d="M130 34L112 16H84" />
        <text x="52" y="21" className={svgText}>
          0.2
        </text>
      </motion.g>
    </SignatureSvg>
  );
}
