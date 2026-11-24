"use client";

import { motion } from "framer-motion";
import { SignatureSvg, fade, usePlayOnce } from "./kit";

// Stage 07, Photorealistic renders: a dashed wireframe sphere around the
// station is followed by a solid line, outline to finished form.

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  return (
    <SignatureSvg svgRef={ref}>
      <motion.g strokeDasharray="4 6" {...fade(play, 0)}>
        <circle cx="160" cy="160" r="124" />
        <ellipse cx="160" cy="160" rx="124" ry="44" />
        <ellipse cx="160" cy="160" rx="44" ry="124" />
      </motion.g>
      <motion.circle
        cx="160"
        cy="160"
        r="124"
        strokeWidth="3"
        initial={reduce ? false : { scale: 0.92, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
      />
    </SignatureSvg>
  );
}
