"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// DFM page signature element: a drafted channel cross-section that draws on
// like a CAD sketch, then gains review annotations (wall thickness, draft
// angle, corner radius) in sequence — a DFM review happening on screen.
const partVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

const annotationVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: "easeOut" },
      opacity: { duration: 0.2 },
    },
  },
};

const labelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.45,
      delayChildren: 0.2,
    },
  },
};

const annotationStroke = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const DfmReviewSketch = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref}>
      <motion.svg
        viewBox="0 0 640 400"
        className="w-full h-auto"
        role="img"
        aria-label="Cross-section sketch of a moulded channel part with design for manufacture review annotations pointing out wall thickness, draft angle and corner radius"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Part outline: drafted open channel, outer then inner profile */}
        <motion.path
          className="fill-none stroke-black stroke-[6px]"
          style={annotationStroke}
          d="M 150,110 L 175,320 L 465,320 L 490,110"
          variants={partVariants}
        />
        <motion.path
          className="fill-none stroke-black stroke-[6px]"
          style={annotationStroke}
          d="M 215,110 L 232,258 L 408,258 L 425,110"
          variants={partVariants}
        />

        {/* Annotation 1: wall thickness dimension */}
        <motion.path
          className="fill-none stroke-cyan-400 stroke-[3px]"
          style={annotationStroke}
          d="M 150,102 L 150,80 M 215,102 L 215,80 M 150,88 L 215,88 M 158,84 L 150,88 L 158,92 M 207,84 L 215,88 L 207,92"
          variants={annotationVariants}
        />
        <motion.text
          x="182"
          y="62"
          textAnchor="middle"
          fontSize="21"
          className="fill-ink"
          variants={labelVariants}
        >
          wall thickness
        </motion.text>

        {/* Annotation 2: draft angle against a dashed vertical reference */}
        <motion.line
          className="fill-none stroke-cyan-400 stroke-[3px]"
          style={{ ...annotationStroke, strokeDasharray: "8 8" }}
          x1="150"
          y1="110"
          x2="150"
          y2="330"
          variants={annotationVariants}
        />
        <motion.path
          className="fill-none stroke-cyan-400 stroke-[3px]"
          style={annotationStroke}
          d="M 150,290 A 44 44 0 0 0 171,286 M 160,300 L 128,338"
          variants={annotationVariants}
        />
        <motion.text
          x="122"
          y="362"
          textAnchor="middle"
          fontSize="21"
          className="fill-ink"
          variants={labelVariants}
        >
          draft angle
        </motion.text>

        {/* Annotation 3: corner radius leader into the cavity */}
        <motion.path
          className="fill-none stroke-cyan-400 stroke-[3px]"
          style={annotationStroke}
          d="M 240,250 L 302,192"
          variants={annotationVariants}
        />
        <motion.text
          x="308"
          y="186"
          textAnchor="start"
          fontSize="21"
          className="fill-ink"
          variants={labelVariants}
        >
          corner radius
        </motion.text>

        {/* Drawing-sheet caption */}
        <motion.text
          x="320"
          y="388"
          textAnchor="middle"
          fontSize="18"
          className="fill-black opacity-70"
          variants={labelVariants}
        >
          Section A–A
        </motion.text>
      </motion.svg>
    </div>
  );
};

export default DfmReviewSketch;
