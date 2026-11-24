"use client";

import { motion } from "framer-motion";
import { DimH, SignatureSvg, fade, usePlayOnce } from "./kit";

// Stage 06, Construction drawings: a drawing sheet appears around the
// station (border, then title block), then a tolerance dimension. The value
// is illustrative.

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  return (
    <SignatureSvg svgRef={ref}>
      <motion.rect
        x="4"
        y="4"
        width="312"
        height="312"
        initial={reduce ? false : { scale: 0.94, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.path
        d="M232 316V284H316M268 284V316M232 300H316"
        {...fade(play, 0.3)}
      />
      <DimH
        x1={40}
        x2={140}
        y={28}
        label="±0.1"
        motionProps={fade(play, 0.5)}
      />
    </SignatureSvg>
  );
}
