"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { stillAt, timeAt } from "@/lib/scrollTimeline.mjs";

// Scroll-driven scene: text panes scroll on the left while a canvas stays
// pinned on the right, and scroll position sets the scene time.
//
// The canvas is an enhancement. Still frames sit underneath it and are what
// the reader sees while three.js loads, under prefers-reduced-motion, when
// WebGL is unavailable, and (inside each ScrollPane) below the lg breakpoint.
//
// Props:
//   slug    scene id registered in src/scenes/stage.js
//   stops   [{ p, t }] scroll progress -> scene time
//   stills  [{ src, alt, from }] one per pane; `from` is the scene time at
//           which that still takes over in the fallback view
//   label   accessible description of the animation
export default function ScrollScene({ slug, stops, stills, label, children }) {
  const rootRef = useRef(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const handleRef = useRef(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    progressRef.current = progress;
    const t = timeAt(progress, stops);
    setActive(
      stillAt(
        t,
        stills.map((still) => still.from)
      )
    );
    handleRef.current?.seek(t);
  });

  useEffect(() => {
    if (reduceMotion) return undefined;

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
        await document.fonts?.ready;
        if (cancelled || !desktop.matches || !canvasRef.current) return;
        const handle = await mountScene(canvasRef.current, slug);
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
        handle.seek(timeAt(progressRef.current, stops));
        setLive(true);
      } catch {
        // No WebGL, or the scene chunk failed to load: stay on the stills.
        stop();
      } finally {
        starting = false;
      }
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibility.disconnect();
          start();
        }
      },
      { rootMargin: "200px" }
    );
    visibility.observe(rootRef.current);

    const onBreakpoint = () => (desktop.matches ? start() : stop());
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      cancelled = true;
      visibility.disconnect();
      desktop.removeEventListener("change", onBreakpoint);
      stop();
    };
  }, [reduceMotion, slug, stops]);

  return (
    <section
      ref={rootRef}
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:px-8"
    >
      <div className="lg:col-span-5">{children}</div>

      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-0 flex h-screen items-center gap-6">
          <div aria-hidden="true" className="h-1/2 w-px shrink-0 bg-line">
            <motion.div
              className="h-full w-px origin-top bg-accent-visual"
              style={{ scaleY: scrollYProgress }}
            />
          </div>
          <div ref={boxRef} className="relative aspect-[4/3] w-full">
            {stills.map((still, index) => (
              <Image
                key={still.src}
                src={still.src}
                alt=""
                width={1280}
                height={960}
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out-soft ${
                  !live && index === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <canvas
              key={canvasKey}
              ref={canvasRef}
              role="img"
              aria-label={label}
              className={`absolute inset-0 h-full w-full transition-opacity duration-200 ease-out-soft ${
                live ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
