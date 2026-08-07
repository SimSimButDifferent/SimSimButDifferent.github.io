"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// SolidWorks design page signature element: the same slotted bracket drawn
// three times at increasing widths, each with its driving dimension labelled
// parametrically (W, 1.5 W, 2 W) — one parameter, a family of parts.
const outlineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.1, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

const dimensionVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.6, ease: "easeOut" },
      opacity: { duration: 0.2 },
    },
  },
};

const labelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.2,
    },
  },
};

const strokeStyle = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

// One bracket outline: rounded-top plate with a slot, parameterised by width.
const bracket = (x, width) => {
  const h = 150;
  const top = 60;
  const slotW = width - 60;
  const slotX = x + 30;
  return {
    outline: `M ${x},${top + h} L ${x},${top + 30} Q ${x},${top} ${x + 30},${top} L ${x + width - 30},${top} Q ${x + width},${top} ${x + width},${top + 30} L ${x + width},${top + h} Z`,
    slot: `M ${slotX + 12},${top + 55} L ${slotX + slotW - 12},${top + 55} A 12 12 0 0 1 ${slotX + slotW - 12},${top + 79} L ${slotX + 12},${top + 79} A 12 12 0 0 1 ${slotX + 12},${top + 55} Z`,
    dim: `M ${x},${top + h + 22} L ${x},${top + h + 44} M ${x + width},${top + h + 22} L ${x + width},${top + h + 44} M ${x},${top + h + 33} L ${x + width},${top + h + 33} M ${x + 8},${top + h + 29} L ${x},${top + h + 33} L ${x + 8},${top + h + 37} M ${x + width - 8},${top + h + 29} L ${x + width},${top + h + 33} L ${x + width - 8},${top + h + 37}`,
    labelX: x + width / 2,
  };
};

const variants = [
  { ...bracket(20, 120), label: "W" },
  { ...bracket(180, 180), label: "1.5 W" },
  { ...bracket(400, 240), label: "2 W" },
];

const ParametricFamily = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref}>
      <motion.svg
        viewBox="0 0 660 320"
        className="w-full h-auto"
        role="img"
        aria-label="Three outlines of the same slotted bracket at increasing widths, each dimensioned with a parametric width label: W, one and a half W, and two W"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {variants.map(({ outline, slot, dim, labelX, label }) => (
          <motion.g key={label}>
            <motion.path
              className="fill-none stroke-black stroke-[5px]"
              style={strokeStyle}
              d={outline}
              variants={outlineVariants}
            />
            <motion.path
              className="fill-none stroke-black stroke-[5px]"
              style={strokeStyle}
              d={slot}
              variants={outlineVariants}
            />
            <motion.path
              className="fill-none stroke-cyan-400 stroke-[3px]"
              style={strokeStyle}
              d={dim}
              variants={dimensionVariants}
            />
            <motion.text
              x={labelX}
              y={290}
              textAnchor="middle"
              fontSize="22"
              className="fill-ink"
              variants={labelVariants}
            >
              {label}
            </motion.text>
          </motion.g>
        ))}
      </motion.svg>
    </div>
  );
};

export default ParametricFamily;
