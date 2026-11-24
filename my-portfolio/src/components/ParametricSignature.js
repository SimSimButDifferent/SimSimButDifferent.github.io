"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Signature visuals for stage 02 (Parametric 3D model) on the homepage
// timeline. Both play once when scrolled into view and render as still frames
// under prefers-reduced-motion. Motion uses transform and opacity only.

const FEATURES = [
  { name: "Sketch1", depth: 0 },
  { name: "Boss-Extrude1", depth: 0 },
  { name: "Fillet1", depth: 1 },
  { name: "Hole Wizard1", depth: 1 },
  { name: "Linear Pattern1", depth: 1 },
];

export function FeatureTree() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const reduce = useReducedMotion();
  const show = reduce || inView;

  return (
    <div
      ref={ref}
      className="mt-6 max-w-sm border border-line bg-surface px-4 py-3"
    >
      <p className="eyebrow mb-2 text-muted-inverse">Feature tree</p>
      <ol aria-label="Example feature tree of a parametric part">
        {FEATURES.map((feature, i) => (
          <motion.li
            key={feature.name}
            initial={reduce ? false : { opacity: 0.25, x: -8 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.2, ease: "easeOut", delay: i * 0.2 }}
            className={`flex items-center gap-3 py-1 text-sm text-ink-inverse ${
              feature.depth ? "pl-6" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full border border-accent-visual"
            />
            {feature.name}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

// 320px square overlay centred on the 208px station circle. Dimension lines
// sit outside the circle; the dashed ring scales in behind the icon and the
// width value counts from 40 to 60 as it does.
export function DimensionCallouts() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const reduce = useReducedMotion();
  const [width, setWidth] = useState(reduce ? 60 : 40);

  useEffect(() => {
    if (reduce || !inView) return undefined;
    const controls = animate(40, 60, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setWidth(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const show = reduce || inView;
  const fade = {
    initial: reduce ? false : { opacity: 0 },
    animate: show ? { opacity: 1 } : undefined,
    transition: { duration: 0.3, ease: "easeOut", delay: 0.2 },
  };

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 320 320"
      className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 fill-none stroke-accent-visual"
      strokeWidth="1"
    >
      <motion.circle
        cx="160"
        cy="160"
        r="116"
        strokeDasharray="4 6"
        style={{ transformOrigin: "160px 160px" }}
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Horizontal dimension, below the circle */}
      <motion.g {...fade}>
        <path d="M44 296H276M44 288V304M276 288V304" />
        <rect
          x="136"
          y="286"
          width="48"
          height="20"
          className="fill-navy stroke-none"
        />
        <text
          x="160"
          y="301"
          textAnchor="middle"
          className="fill-accent-visual text-sm stroke-none"
        >
          {width}
        </text>
      </motion.g>

      {/* Vertical dimension, right of the circle */}
      <motion.g {...fade}>
        <path d="M300 44V276M292 44H308M292 276H308" />
        <rect
          x="288"
          y="150"
          width="24"
          height="20"
          className="fill-navy stroke-none"
        />
        <text
          x="300"
          y="165"
          textAnchor="middle"
          className="fill-accent-visual text-sm stroke-none"
        >
          24
        </text>
      </motion.g>

      {/* Radius leader, upper left */}
      <motion.g {...fade}>
        <path d="M78 78L40 40H8" />
        <text x="8" y="32" className="fill-accent-visual text-sm stroke-none">
          R3
        </text>
      </motion.g>
    </svg>
  );
}
