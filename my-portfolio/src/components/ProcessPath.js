"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

// "Who it is for" visual: the route from design to production, with the
// stage this service covers lit in cyan and each kind of client shown at the
// stage where they usually arrive. Linked stages are the neighbouring
// services. Plain HTML (an ordered list), so it reads in order without
// JavaScript; vertical below md, horizontal from md.
//
// The route line is drawn as two half-segments per stage (into the dot, out
// of the dot), so it lines up with the dots in both layouts and the cyan part
// stops exactly at the current stage.
//
// Props:
//   stages   [{ name, href?, current?, clients?: string[] }] in order
//   caption  one-line description of the figure
const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: "-80px" };

// Each stage (<li>) watches the viewport and passes "hidden"/"shown" down to
// its line segments and text, so the zero-size segments need no observer of
// their own (an element scaled to nothing never registers as in view).
function Segment({ lit, className, axis, delay }) {
  const colour = lit ? "bg-accent-visual" : "bg-line";
  const origin = axis === "scaleX" ? "origin-left" : "origin-top";
  return (
    <motion.span
      aria-hidden="true"
      className={`absolute ${colour} ${origin} ${className}`}
      variants={{
        hidden: { [axis]: 0 },
        shown: { [axis]: 1, transition: { duration: 0.2, ease: EASE, delay } },
      }}
    />
  );
}

export default function ProcessPath({ stages, caption }) {
  const reduceMotion = useReducedMotion();
  const currentIndex = stages.findIndex((stage) => stage.current);
  const last = stages.length - 1;

  return (
    <figure className="mt-8 border-t border-line pt-8">
      <figcaption className="eyebrow mb-6">{caption}</figcaption>

      <ol className="grid md:grid-cols-5">
        {stages.map((stage, index) => {
          const lit = index <= currentIndex;
          const delay = index * 0.06;
          const segment = { delay };

          return (
            <motion.li
              initial={reduceMotion ? false : "hidden"}
              whileInView="shown"
              viewport={VIEWPORT}
              key={stage.name}
              aria-current={stage.current ? "step" : undefined}
              className="relative flex gap-4 pb-6 last:pb-0 md:flex-col md:items-center md:gap-3 md:px-1 md:pb-0 md:text-center"
            >
              {/* Vertical route (below md) */}
              {index > 0 && (
                <Segment
                  {...segment}
                  axis="scaleY"
                  lit={lit}
                  className="left-[7px] top-0 h-[11px] w-px md:hidden"
                />
              )}
              {index < last && (
                <Segment
                  {...segment}
                  axis="scaleY"
                  lit={index < currentIndex}
                  className="bottom-0 left-[7px] top-[11px] w-px md:hidden"
                />
              )}

              {/* Horizontal route (md and up) */}
              {index > 0 && (
                <Segment
                  {...segment}
                  axis="scaleX"
                  lit={lit}
                  className="left-0 right-1/2 top-[7px] hidden h-px md:block"
                />
              )}
              {index < last && (
                <Segment
                  {...segment}
                  axis="scaleX"
                  lit={index < currentIndex}
                  className="left-1/2 right-0 top-[7px] hidden h-px md:block"
                />
              )}

              <span
                aria-hidden="true"
                className={`relative z-10 mt-1 h-[15px] w-[15px] shrink-0 rounded-full border md:mt-0 ${
                  stage.current
                    ? "border-accent-visual bg-accent-visual ring-4 ring-cyan-400/20"
                    : lit
                      ? "border-accent-visual bg-surface"
                      : "border-line bg-surface"
                }`}
              />

              <motion.div
                className="flex flex-col gap-2 md:items-center"
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.2, ease: EASE, delay: delay + 0.1 },
                  },
                }}
              >
                <p
                  className={`text-sm leading-normal ${
                    stage.current
                      ? "font-semibold text-accent-visual"
                      : "text-ink-inverse"
                  }`}
                >
                  {stage.href ? (
                    <Link
                      href={stage.href}
                      className="link-inverse -my-3 inline-block py-3"
                    >
                      {stage.name}
                    </Link>
                  ) : (
                    stage.name
                  )}
                </p>
                {stage.clients?.length > 0 && (
                  <ul
                    aria-label={`Usually arrive at ${stage.name}`}
                    className="flex flex-wrap gap-1 md:justify-center"
                  >
                    {stage.clients.map((client) => (
                      <li key={client} className="chip font-light">
                        {client}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.li>
          );
        })}
      </ol>
    </figure>
  );
}
