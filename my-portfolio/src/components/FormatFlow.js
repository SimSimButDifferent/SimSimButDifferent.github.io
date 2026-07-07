"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// CAD file conversion page signature element: format-to-format pairings —
// native SolidWorks file badges converting to the neutral formats suppliers
// ask for, with the inspection step shown as part of the flow.
const rowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.35, delayChildren: 0.2 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const conversions = [
  { from: "SLDPRT", to: "STEP" },
  { from: "SLDASM", to: "IGES" },
  { from: "SLDPRT", to: "DXF" },
];

const Arrow = () => (
  <motion.svg
    viewBox="0 0 60 24"
    className="w-10 h-auto shrink-0"
    aria-hidden="true"
    variants={badgeVariants}
  >
    <path
      d="M 4,12 L 48,12 M 40,4 L 50,12 L 40,20"
      className="fill-none stroke-sky-400 stroke-[4px]"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const Badge = ({ children, accent = false }) => (
  <motion.span
    className={`inline-block rounded-lg shadow-xl px-4 py-2 font-bold ${
      accent ? "bg-sky-100" : "bg-gray-100 bg-opacity-95"
    }`}
    variants={badgeVariants}
  >
    {children}
  </motion.span>
);

const FormatFlow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-4"
      role="img"
      aria-label="Format conversion flow: native SolidWorks files converting to STEP, IGES and DXF, each opened and inspected before delivery"
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {conversions.map(({ from, to }) => (
        <motion.div
          key={`${from}-${to}`}
          className="flex items-center gap-3 textsm"
          variants={rowVariants}
        >
          <Badge>{from}</Badge>
          <Arrow />
          <Badge accent>{to}</Badge>
        </motion.div>
      ))}

      <motion.div
        className="flex items-center gap-2 pt-2 textsm"
        variants={rowVariants}
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-6 h-6 shrink-0"
          aria-hidden="true"
          variants={badgeVariants}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            className="fill-none stroke-sky-400 stroke-2"
          />
          <path
            d="M 7,12.5 L 10.5,16 L 17,8.5"
            className="fill-none stroke-sky-400 stroke-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <motion.span variants={badgeVariants}>
          opened and inspected before delivery
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default FormatFlow;
