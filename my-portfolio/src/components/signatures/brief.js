"use client";

import { motion } from "framer-motion";
import { SignatureSvg, usePlayOnce } from "./kit";

// Stage 01, Brief: the three things work can start from drift in around the
// station: a sketch, a photo and scan points that settle into a line.

const JITTER = [-14, 10, -6, 14, -10, 6];

export function Overlay() {
  const { ref, show, reduce } = usePlayOnce();
  const drift = (dx, dy, delay) => ({
    initial: reduce ? false : { x: dx, y: dy, opacity: 0 },
    animate: show ? { x: 0, y: 0, opacity: 1 } : undefined,
    transition: { duration: 0.3, ease: "easeOut", delay },
  });
  return (
    <SignatureSvg svgRef={ref}>
      {/* Sketch */}
      <motion.g {...drift(-16, -16, 0.2)}>
        <rect x="8" y="8" width="56" height="48" className="fill-navy" />
        <path d="M16 46L28 20L40 38L56 16" />
      </motion.g>

      {/* Photo */}
      <motion.g {...drift(16, -16, 0.4)}>
        <rect x="256" y="8" width="56" height="48" className="fill-navy" />
        <path d="M264 48L280 28L292 40L300 32L308 48" />
        <circle cx="296" cy="20" r="4" />
      </motion.g>

      {/* Scan points */}
      <g>
        {JITTER.map((offset, i) => (
          <motion.circle
            key={i}
            cx={116 + i * 17}
            cy="296"
            r="2.5"
            className="fill-accent-visual"
            initial={reduce ? false : { y: offset, opacity: 0 }}
            animate={show ? { y: 0, opacity: 1 } : undefined}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
          />
        ))}
      </g>
    </SignatureSvg>
  );
}
