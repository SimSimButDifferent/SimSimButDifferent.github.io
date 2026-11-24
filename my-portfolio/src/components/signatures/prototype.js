"use client";

import { motion } from "framer-motion";
import { SignatureSvg, fade, svgText, usePlayOnce } from "./kit";

// Stage 04, 3D printed prototype: five layers stack up from a build plate at
// the bottom right of the station, clear of the route line.

const LAYERS = 5;

export function Overlay() {
  const play = usePlayOnce();
  return (
    <SignatureSvg svgRef={play.ref}>
      <motion.path d="M200 296H304" {...fade(play, 0)} />
      {Array.from({ length: LAYERS }, (_, i) => (
        <motion.rect
          key={i}
          x="216"
          y={290 - i * 6}
          width="72"
          height="6"
          {...fade(play, 0.2 + i * 0.1)}
        />
      ))}
      <motion.text x="216" y="314" className={svgText} {...fade(play, 0.7)}>
        Layer {LAYERS}
      </motion.text>
    </SignatureSvg>
  );
}
