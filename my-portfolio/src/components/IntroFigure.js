"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Homepage intro figure: a model-viewport frame around the parametric plate
// render, with corner brackets and a file-name bar. Fades in once.

const corners = [
  "left-2 top-2 border-l border-t",
  "right-2 top-2 border-r border-t",
  "bottom-2 left-2 border-b border-l",
  "bottom-2 right-2 border-b border-r",
];

export default function IntroFigure() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const reduce = useReducedMotion();
  return (
    <motion.figure
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mt-10 lg:mt-0"
    >
      <div className="border border-line bg-navy">
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2 text-sm text-muted-inverse">
          <span>Plate.SLDPRT</span>
          <span>W = 60 · 90 · 120</span>
        </div>
        <div className="relative overflow-hidden">
          <Image
            src="/images/scenes/solidworks-design-01.webp"
            alt="One parametric plate modelled at three widths, 60, 90 and 120, with the slot lengthening as the width grows"
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="h-auto w-full origin-[50%_55%] scale-[1.3]"
          />
          {corners.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute h-4 w-4 border-accent-visual ${position}`}
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-inverse">
        One parametric plate at three widths. Change W and the slot and holes
        follow.
      </figcaption>
    </motion.figure>
  );
}
