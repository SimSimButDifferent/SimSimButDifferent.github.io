"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { activePane, planBeat } from "@/lib/scrollTimeline.mjs";

// Snap-scrolling scene: text panes scroll on the left and snap into place
// while a canvas stays pinned on the right. Arriving at a pane plays that
// pane's beat of the animation on a timer (about five seconds); the scroll
// wheel chooses the pane, it does not drive the frames.
//
// The canvas is an enhancement. Still frames sit underneath it and are what
// the reader sees while three.js loads, under prefers-reduced-motion, when
// WebGL is unavailable, and (inside each ScrollPane) below the lg breakpoint.
//
// Props:
//   slug    scene id registered in src/scenes/stage.js
//   beats   [{ start, end, showcase? }] one per pane, in scene time; with
//           showcase the finished part turns in a loop (see stage.js)
//   stills  [{ src, alt }] one per pane: the scene at that pane's beat end
//   label   accessible description of the animation
export default function ScrollScene({
  slug,
  beats,
  stills,
  label,
  children,
}) {
  const rootRef = useRef(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const handleRef = useRef(null);
  const activeRef = useRef(0);
  const clockRef = useRef(0);
  const tweenRef = useRef(null);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  // Take the scene to the given pane's beat. `cameFrom` is "none" on first
  // arrival, "earlier" when scrolling down, "later" when scrolling up.
  const playTo = (index, cameFrom) => {
    tweenRef.current?.stop();
    const beat = beats[index];
    handleRef.current?.setShowcase(Boolean(beat.showcase));
    const moves = planBeat(clockRef.current, beat, cameFrom);

    const step = (i) => {
      const move = moves[i];
      if (!move) return;
      const seek = (t) => {
        clockRef.current = t;
        handleRef.current?.seek(t);
      };
      if (move.duration === 0) {
        seek(move.to);
        step(i + 1);
        return;
      }
      tweenRef.current = animate(clockRef.current, move.to, {
        duration: move.duration,
        ease: "easeInOut",
        onUpdate: seek,
        onComplete: () => step(i + 1),
      });
    };
    step(0);
  };

  const currentPane = () => {
    const panes = rootRef.current?.querySelectorAll("[data-scroll-pane]") ?? [];
    const tops = Array.from(panes, (pane) => pane.getBoundingClientRect().top);
    return activePane(tops, window.innerHeight);
  };

  useMotionValueEvent(scrollY, "change", () => {
    const index = currentPane();
    if (index === activeRef.current) return;
    const cameFrom = index > activeRef.current ? "earlier" : "later";
    activeRef.current = index;
    setActive(index);
    if (handleRef.current) playTo(index, cameFrom);
  });

  useEffect(() => {
    if (reduceMotion) return undefined;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let cancelled = false;
    let starting = false;
    let sizeObserver = null;

    const stop = () => {
      tweenRef.current?.stop();
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
        activeRef.current = currentPane();
        setActive(activeRef.current);
        clockRef.current = 0;
        setLive(true);
        playTo(activeRef.current, "none");
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
    // playTo and currentPane only read refs and props that never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, slug]);

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
