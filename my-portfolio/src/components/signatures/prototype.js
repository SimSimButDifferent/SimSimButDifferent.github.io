"use client";

import { motion } from "framer-motion";
import { SignatureSvg, fade, svgText, useCountTo, usePlayOnce } from "./kit";

// Stage 04, 3D printed prototype: layers stack up from a build plate below
// the station while a layer counter steps 1 to 5.

const LAYERS = 5;

export function Overlay() {
  const play = usePlayOnce();
  const layer = Math.round(
    useCountTo(play, { from: 1, to: LAYERS, delay: 0.2, duration: 0.3 }),
  );

  return (
    <SignatureSvg svgRef={play.ref}>
      <motion.path d="M72 304H248" {...fade(play, 0)} />
      {Array.from({ length: LAYERS }, (_, i) => (
        <motion.rect
          key={i}
          className="fill-navy"
          x="108"
          y={298 - i * 6}
          width="104"
          height="6"
          {...fade(play, 0.2 + i * 0.1)}
        />
      ))}
      <motion.text x="228" y="300" className={svgText} {...fade(play, 0.2)}>
        Layer {layer}
      </motion.text>
    </SignatureSvg>
  );
}
