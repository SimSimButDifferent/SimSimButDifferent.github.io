"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Shared pieces for the homepage timeline "signatures": the diagram around a
// stage's station circle and the optional panel under the chips. Everything
// plays once when scrolled into view and is a still frame under
// prefers-reduced-motion. Motion is transform and opacity only.

// `show` turns true once the element is in view (or at once when motion is
// reduced). Attach `ref` to the element being watched.
export function usePlayOnce() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const reduce = useReducedMotion();
  return { ref, show: Boolean(reduce) || inView, reduce: Boolean(reduce) };
}

// Counts from `from` to `to` once the element is in view. Always starts at
// `from` so server and client markup match; jumps to `to` when motion is
// reduced.
export function useCountTo(play, { from, to, delay = 0, duration = 0.3 }) {
  const [value, setValue] = useState(from);
  const { show, reduce } = play;
  useEffect(() => {
    if (reduce) {
      setValue(to);
      return undefined;
    }
    if (!show) return undefined;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [show, reduce, from, to, delay, duration]);
  return value;
}

// Opacity fade for a <motion.*> element.
export function fade({ show, reduce }, delay = 0.2) {
  return {
    initial: reduce ? false : { opacity: 0 },
    animate: show ? { opacity: 1 } : undefined,
    transition: { duration: 0.3, ease: "easeOut", delay },
  };
}

// 320px square overlay centred on the 208px station circle. Children draw in
// a 320 x 320 viewBox; the circle occupies roughly 56..264 on both axes.
export function SignatureSvg({ svgRef, children }) {
  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 320 320"
      className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 fill-none stroke-accent-visual"
      strokeWidth="1"
    >
      {children}
    </svg>
  );
}

export const svgText = "fill-accent-visual text-sm stroke-none";

// Horizontal dimension line with end ticks and a centred value.
export function DimH({ x1, x2, y, label, motionProps }) {
  const mid = (x1 + x2) / 2;
  return (
    <motion.g {...motionProps}>
      <path
        d={`M${x1} ${y}H${x2}M${x1} ${y - 8}V${y + 8}M${x2} ${y - 8}V${y + 8}`}
      />
      <rect
        x={mid - 24}
        y={y - 10}
        width="48"
        height="20"
        className="fill-navy stroke-none"
      />
      <text x={mid} y={y + 5} textAnchor="middle" className={svgText}>
        {label}
      </text>
    </motion.g>
  );
}

// Vertical dimension line with end ticks and a centred value.
export function DimV({ x, y1, y2, label, motionProps }) {
  const mid = (y1 + y2) / 2;
  return (
    <motion.g {...motionProps}>
      <path
        d={`M${x} ${y1}V${y2}M${x - 8} ${y1}H${x + 8}M${x - 8} ${y2}H${x + 8}`}
      />
      <rect
        x={x - 14}
        y={mid - 10}
        width="28"
        height="20"
        className="fill-navy stroke-none"
      />
      <text x={x} y={mid + 5} textAnchor="middle" className={svgText}>
        {label}
      </text>
    </motion.g>
  );
}

// Bordered list panel under the chips. `items` are { name, children? }; rows
// light up one after another. Children render as a nested list.
export function StepList({ title, ariaLabel, items }) {
  const { ref, show, reduce } = usePlayOnce();
  let order = 0;

  const renderItems = (list) =>
    list.map((item) => {
      const delay = order * 0.1;
      order += 1;
      return (
        <li key={item.name}>
          <motion.div
            initial={reduce ? false : { opacity: 0.6, x: -8 }}
            animate={show ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.2, ease: "easeOut", delay }}
            className="flex items-center gap-3 py-1 text-sm text-ink-inverse"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full border border-accent-visual"
            />
            {item.name}
          </motion.div>
          {item.children && (
            <ul className="pl-6">{renderItems(item.children)}</ul>
          )}
        </li>
      );
    });

  return (
    <div
      ref={ref}
      className="mt-6 max-w-sm border border-line bg-surface px-4 py-3"
    >
      <p className="eyebrow mb-2 text-muted-inverse">{title}</p>
      <ul aria-label={ariaLabel}>{renderItems(items)}</ul>
    </div>
  );
}
