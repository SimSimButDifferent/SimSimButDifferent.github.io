"use client";

import { motion } from "framer-motion";
import { DimH, SignatureSvg, fade, usePlayOnce } from "./kit";

// Stage 06, Construction drawings: a drawing sheet draws on around the
// station (border, then title block), then a tolerance dimension appears.
// The value is illustrative.

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  const draw = (delay, duration = 0.6) => ({
    initial: reduce ? false : { pathLength: 0 },
    animate: show ? { pathLength: 1 } : undefined,
    transition: { duration, ease: "easeOut", delay },
  });
  return (
    <SignatureSvg svgRef={ref}>
      <motion.rect x="4" y="4" width="312" height="312" {...draw(0, 0.8)} />
      <motion.path
        d="M232 316V284H316M268 284V316M232 300H316"
        {...draw(0.8, 0.3)}
      />
      <DimH
        x1={56}
        x2={264}
        y={28}
        label="±0.1"
        motionProps={fade(play, 1.1)}
      />
    </SignatureSvg>
  );
}
