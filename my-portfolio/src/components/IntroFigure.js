"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FEATURES,
  rebuildingFeature,
  shownWidth,
} from "@/lib/parametricLoop.mjs";

// Homepage intro figure: a model-viewport frame (file-name bar, corner
// brackets) around the parametric plate.
//
// From lg up it is live: a three.js scene (src/scenes/parametric-plate.js)
// in which one plate's driving dimension W loops 60 -> 90 -> 120, with a
// FeatureManager-style tree whose features light in order on each rebuild
// and a header showing the current W. The scene loads when the frame first
// comes into view and pauses while it is off screen.
//
// The still render underneath (the same plate at three widths) is what the
// reader sees while three.js loads, under prefers-reduced-motion, without
// WebGL, and below lg. It is cropped by sizing it to 130% of the frame. Its
// baked-in "W = n" labels are about 8px at this size, so each is covered by
// a navy tile carrying a live label at text-sm. Positions are percentages of
// the image (centre x, centre y, tile width, tile height).

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

const STILL_ALT =
  "One parametric plate modelled at three widths, 60, 90 and 120 millimetres, with the slot lengthening as the width grows";
const LIVE_LABEL =
  "One parametric plate whose driving width W changes between 60, 90 and 120 millimetres; the slot and holes follow and the features rebuild in order";

// The live scene: mounts on first view (lg up, motion allowed) and plays a
// looping clock while in view. Returns the W shown and the feature being
// rebuilt; state changes only when those do, not every frame.
function useLivePlate(boxRef, canvasRef, inView, reduce) {
  const handleRef = useRef(null);
  const [live, setLive] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const [shown, setShown] = useState(shownWidth(0));
  const [lit, setLit] = useState(-1);
  const clock = useRef({ elapsed: 0, last: 0, frame: null });
  const seen = useRef(false);
  if (inView) seen.current = true;

  // Mount and unmount.
  useEffect(() => {
    if (reduce || !seen.current) return undefined;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let cancelled = false;
    let starting = false;
    let sizeObserver = null;

    const stop = () => {
      sizeObserver?.disconnect();
      sizeObserver = null;
      if (handleRef.current) {
        handleRef.current.dispose();
        handleRef.current = null;
        // A canvas cannot be reused once its context is released.
        setCanvasKey((key) => key + 1);
      }
      setLive(false);
    };

    const start = async () => {
      if (starting || handleRef.current || !desktop.matches) return;
      starting = true;
      try {
        const { mountScene } = await import("@/scenes/stage");
        if (cancelled || !desktop.matches || !canvasRef.current) return;
        const handle = await mountScene(canvasRef.current, "parametric-plate");
        if (cancelled || !desktop.matches) {
          handle.dispose();
          return;
        }
        handleRef.current = handle;
        const fit = () => {
          const box = boxRef.current;
          if (box) handle.resize(box.clientWidth, box.clientHeight);
        };
        sizeObserver = new ResizeObserver(fit);
        sizeObserver.observe(boxRef.current);
        fit();
        handle.seek(clock.current.elapsed);
        setLive(true);
      } catch {
        // No WebGL, or the scene chunk failed to load: stay on the still.
        stop();
      } finally {
        starting = false;
      }
    };

    start();
    const onBreakpoint = () => (desktop.matches ? start() : stop());
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      cancelled = true;
      desktop.removeEventListener("change", onBreakpoint);
      stop();
    };
    // `inView` is a dependency only so the first view triggers the mount.
  }, [reduce, inView, boxRef, canvasRef]);

  // Clock: runs while live and in view; resumes where it paused.
  useEffect(() => {
    if (!live || !inView) return undefined;
    const c = clock.current;
    c.last = 0;
    const tick = (now) => {
      if (c.last) c.elapsed += Math.min((now - c.last) / 1000, 0.1);
      c.last = now;
      handleRef.current?.seek(c.elapsed);
      setShown(shownWidth(c.elapsed));
      setLit(rebuildingFeature(c.elapsed));
      c.frame = requestAnimationFrame(tick);
    };
    c.frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(c.frame);
  }, [live, inView]);

  return { live, canvasKey, shown, lit: live ? lit : -1 };
}

export default function IntroFigure() {
  const ref = useRef(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const inView = useInView(ref, { margin: "-20%", once: true });
  const visible = useInView(boxRef);
  const reduce = useReducedMotion();
  const { live, canvasKey, shown, lit } = useLivePlate(
    boxRef,
    canvasRef,
    visible,
    Boolean(reduce),
  );

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
          <span>
            {live ? `W = ${shown} mm` : "W = 60 · 90 · 120 mm"}
          </span>
        </div>
        <div ref={boxRef} className="relative aspect-[4/3] overflow-hidden">
          <div
            className={`absolute -top-[21.5%] left-1/2 w-[130%] -translate-x-1/2 transition-opacity duration-200 ease-out-soft ${
              live ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src="/images/scenes/solidworks-design-01.webp"
              alt={live ? "" : STILL_ALT}
              aria-hidden={live ? "true" : undefined}
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
          <canvas
            key={canvasKey}
            ref={canvasRef}
            role="img"
            aria-label={LIVE_LABEL}
            aria-hidden={live ? undefined : "true"}
            className={`absolute inset-0 h-full w-full transition-opacity duration-200 ease-out-soft ${
              live ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* FeatureManager-style tree: features light in order on rebuild */}
          {live && (
            <div
              aria-hidden="true"
              className="absolute left-5 top-5 text-sm leading-6"
            >
              <p className="flex items-center gap-2 text-ink-inverse">
                <span className="h-2.5 w-2.5 border border-muted-inverse" />
                Plate
              </p>
              <ul className="ml-1 border-l border-line pl-3">
                {FEATURES.map((name, i) => (
                  <li
                    key={name}
                    className={`flex items-center gap-2 transition-colors duration-150 ease-out ${
                      i === lit ? "text-accent-visual" : "text-muted-inverse"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full border transition-colors duration-150 ease-out ${
                        i === lit
                          ? "border-accent-visual bg-accent-visual"
                          : "border-muted-inverse"
                      }`}
                    />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
