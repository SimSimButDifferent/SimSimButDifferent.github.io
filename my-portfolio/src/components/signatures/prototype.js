"use client";

import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SignatureSvg, fade, svgText, usePlayOnce } from "./kit";

// Stage 04, 3D printed prototype: layers stack up from a build plate below
// the station while a layer counter steps 1 to 4.

const LAYERS = 4;

export function Overlay() {
  const play = usePlayOnce();
  const { ref, show, reduce } = play;
  const [layer, setLayer] = useState(reduce ? LAYERS : 1);

  useEffect(() => {
    if (reduce || !show) return undefined;
    const controls = animate(1, LAYERS, {
      duration: 0.15 * (LAYERS - 1),
      delay: 0.2,
      ease: "linear",
      onUpdate: (v) => setLayer(Math.round(v)),
    });
    return () => controls.stop();
  }, [show, reduce]);

  return (
    <SignatureSvg svgRef={ref}>
      <motion.path d="M72 300H248" {...fade(play, 0)} />
      {Array.from({ length: LAYERS }, (_, i) => (
        <motion.rect
          key={i}
          x="108"
          y={294 - i * 6}
          width="104"
          height="6"
          {...fade(play, 0.2 + i * 0.15)}
        />
      ))}
      <motion.text x="228" y="296" className={svgText} {...fade(play, 0.2)}>
        Layer {layer}
      </motion.text>
    </SignatureSvg>
  );
}
