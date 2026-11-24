"use client";

import { motion } from "framer-motion";
import { SignatureSvg, svgText, usePlayOnce } from "./kit";

// Stage 08, Files to the factory: three file tiles slide out from behind the
// station circle, one after another.

const FILES = ["STEP", "IGES", "DXF"];

export function Overlay() {
  const { ref, show, reduce } = usePlayOnce();
  return (
    <SignatureSvg svgRef={ref}>
      {FILES.map((name, i) => (
        <motion.g
          key={name}
          initial={reduce ? false : { x: -90, opacity: 0 }}
          animate={show ? { x: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 + i * 0.2 }}
        >
          <rect
            x="268"
            y={100 + i * 50}
            width="48"
            height="22"
            className="fill-navy"
          />
          <text
            x="292"
            y={116 + i * 50}
            textAnchor="middle"
            className={svgText}
          >
            {name}
          </text>
        </motion.g>
      ))}
    </SignatureSvg>
  );
}
