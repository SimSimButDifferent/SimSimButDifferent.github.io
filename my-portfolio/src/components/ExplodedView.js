"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Reverse engineering page signature element: a three-part assembly that
// appears assembled, then separates along a dashed centreline into an
// exploded view — the part coming apart to be understood and rebuilt.
const centrelineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  exploded: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.9, ease: "easeInOut" },
      opacity: { duration: 0.2 },
    },
  },
};

const partVariants = (offset) => ({
  hidden: { opacity: 0, y: 0 },
  exploded: {
    opacity: 1,
    y: offset,
    transition: {
      opacity: { duration: 0.5, delay: 0.6 },
      y: { delay: 1.4, duration: 0.9, ease: "easeOut" },
    },
  },
});

const strokeStyle = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ExplodedView = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref}>
      <motion.svg
        viewBox="0 0 400 480"
        className="w-full h-auto"
        role="img"
        aria-label="A three-part assembly separating into an exploded view along a dashed centreline — a physical part coming apart to be measured and rebuilt as CAD"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isInView ? "exploded" : "hidden"}
      >
        {/* Dashed centreline */}
        <motion.line
          className="fill-none stroke-sky-400 stroke-[3px]"
          style={{ ...strokeStyle, strokeDasharray: "10 10" }}
          x1="200"
          y1="30"
          x2="200"
          y2="450"
          variants={centrelineVariants}
        />

        {/* Cap: slides up */}
        <motion.g variants={partVariants(-55)}>
          <path
            className="fill-white stroke-black stroke-[6px]"
            style={strokeStyle}
            d="M 130,160 L 130,120 Q 130,95 155,95 L 245,95 Q 270,95 270,120 L 270,160 Z"
          />
        </motion.g>

        {/* Body: stays put */}
        <motion.g variants={partVariants(0)}>
          <path
            className="fill-white stroke-black stroke-[6px]"
            style={strokeStyle}
            d="M 105,165 L 295,165 L 295,285 L 105,285 Z M 150,165 L 150,285 M 250,165 L 250,285"
          />
        </motion.g>

        {/* Insert: slides down */}
        <motion.g variants={partVariants(55)}>
          <path
            className="fill-white stroke-black stroke-[6px]"
            style={strokeStyle}
            d="M 160,290 L 240,290 L 240,330 L 215,330 L 215,385 L 185,385 L 185,330 L 160,330 Z"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default ExplodedView;
