"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Homepage intro figure: a model-viewport frame around the parametric plate
// render, with corner brackets and a file-name bar. Fades in once.
//
// The render is cropped by sizing it to 130% of the frame and offsetting it.
// Its baked-in "W = n" labels are about 8px at this size, so each is covered
// by a navy tile carrying a live label at text-sm. Positions are percentages
// of the image (centre x, centre y, tile width, tile height).

const corners = [
  "left-2 top-2 border-l border-t",
  "right-2 top-2 border-r border-t",
  "bottom-2 left-2 border-b border-l",
  "bottom-2 right-2 border-b border-r",
];

const labels = [
  {
    text: "W = 120",
    position: "left-[42.6%] top-[43.8%] h-[4.2%] w-[9%]",
  },
  {
    text: "W = 90",
    position: "left-[52.2%] top-[60.4%] h-[4.8%] w-[10%]",
  },
  {
    text: "W = 60",
    position: "left-[65.2%] top-[82.6%] h-[5.4%] w-[11.6%]",
  },
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
          <span>W = 60 · 90 · 120 mm</span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute -top-[21.5%] left-1/2 w-[130%] -translate-x-1/2">
            <Image
              src="/images/scenes/solidworks-design-01.webp"
              alt="One parametric plate modelled at three widths, 60, 90 and 120 millimetres, with the slot lengthening as the width grows"
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 640px, 130vw"
              className="h-auto w-full"
            />
            {labels.map(({ text, position }) => (
              <span
                key={text}
                aria-hidden="true"
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap bg-navy text-sm text-ink-inverse ${position}`}
              >
                {text}
              </span>
            ))}
          </div>
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
