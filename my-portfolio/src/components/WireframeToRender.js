"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

// Rendering page signature element: the wireframe cube (the site's logo
// motif) draws itself, then its faces "render" in with shaded fills and a
// highlight — wireframe to photoreal, the service's before-and-after.
const wireVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

const faceVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
};

const strokeStyle = {
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const WireframeToRender = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref}>
      <motion.svg
        viewBox="0 0 400 420"
        className="w-full h-auto"
        role="img"
        aria-label="A wireframe cube that fills in with shaded, rendered surfaces — a CAD model becoming a photorealistic render"
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion || isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <defs>
          <linearGradient id="renderTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          <linearGradient id="renderLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="renderRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Stage 1: the wireframe draws on */}
        <motion.path
          className="fill-none stroke-black stroke-[5px]"
          style={strokeStyle}
          d="M 200,40 L 340,120 L 200,200 L 60,120 Z M 60,120 L 60,280 L 200,360 L 200,200 M 340,120 L 340,280 L 200,360"
          variants={wireVariants}
        />

        {/* Stage 2: the faces render in */}
        <motion.polygon
          points="60,120 200,200 200,360 60,280"
          fill="url(#renderLeft)"
          variants={faceVariants}
        />
        <motion.polygon
          points="340,120 340,280 200,360 200,200"
          fill="url(#renderRight)"
          variants={faceVariants}
        />
        <motion.polygon
          points="200,40 340,120 200,200 60,120"
          fill="url(#renderTop)"
          variants={faceVariants}
        />

        {/* Stage 3: a specular highlight lands on the top face */}
        <motion.ellipse
          cx="175"
          cy="115"
          rx="52"
          ry="24"
          transform="rotate(-25 175 115)"
          fill="white"
          opacity="0.55"
          variants={faceVariants}
        />
      </motion.svg>
    </div>
  );
};

export default WireframeToRender;
