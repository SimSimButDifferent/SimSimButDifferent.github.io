"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { meanderSegments, stopAt, travelMs } from "@/lib/meander.mjs";

// The homepage timeline route, from lg up: a 1px line that swings from side
// to side between the stage stations, and a light that travels one segment
// each time a stage snaps into view. Scroll picks the stop; once the page has
// settled the light plays to it on a timer (1.2 s forward, 0.6 s back) and
// the station lights as it arrives. Under reduced motion the line and stations update at once
// and there is no travelling light.
//
// Positions are measured from the page (header bottom, station centres), so
// the line always meets the stations whatever the viewport or font.
//
// Props:
//   sectionRef  ref to the timeline <section> (position: relative)
//   onArrive    called with the stop the light has reached (0 to 8)

const SETTLE_MS = 100;

function Segment({ d, index, p, pathRef }) {
  const lit = useTransform(p, (v) => Math.min(Math.max(v - index, 0), 1));
  const shown = useTransform(lit, (v) => (v > 0 ? 1 : 0));
  return (
    <>
      <path d={d} fill="none" strokeWidth="1" className="stroke-line" />
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        strokeWidth="1.5"
        className="stroke-accent-visual"
        style={{ pathLength: lit, opacity: shown }}
      />
    </>
  );
}

function measure(section) {
  const box = section.getBoundingClientRect();
  const header = section.querySelector("[data-meander-start]");
  const nodes = [...section.querySelectorAll("[data-meander-node]")];
  if (!header || nodes.length === 0) return null;
  // Each segment runs from the bottom of one station to the top of the next
  // (the first from the header), so the line meets every circle vertically
  // instead of disappearing under it at an angle.
  const rim = (el) => {
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2 - box.left;
    return { top: { x, y: r.top - box.top }, bottom: { x, y: r.bottom - box.top } };
  };
  const head = header.getBoundingClientRect();
  let from = { x: head.left + head.width / 2 - box.left, y: head.bottom - box.top };
  const paths = nodes.map((node) => {
    const { top, bottom } = rim(node);
    const [d] = meanderSegments(from, [top]);
    from = bottom;
    return d;
  });
  return {
    width: Math.round(box.width),
    height: Math.round(box.height),
    paths,
  };
}

export default function MeanderRoute({ sectionRef, onArrive }) {
  const reduceMotion = useReducedMotion();
  const [live, setLive] = useState(false);
  const [geometry, setGeometry] = useState(null);
  const p = useMotionValue(0);
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const lightOpacity = useMotionValue(0);
  const pathRefs = useRef([]);
  const reduceRef = useRef(reduceMotion);
  reduceRef.current = reduceMotion;

  // Desktop only.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setLive(desktop.matches);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, []);

  // Measure on mount, on resize, and once the fonts have settled.
  useEffect(() => {
    const section = sectionRef.current;
    if (!live || !section) return undefined;
    let cancelled = false;
    const run = () => !cancelled && setGeometry(measure(section));
    run();
    const observer = new ResizeObserver(run);
    observer.observe(section);
    document.fonts?.ready.then(run);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [live, sectionRef]);

  // Follow the scroll: work out the stop, then move the light to it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!live || !section) return undefined;
    const stages = [...section.querySelectorAll("[data-meander-stage]")];
    let stop = null;
    let settle = 0;
    let move = null;

    const go = () => {
      settle = 0;
      const next = stopAt(
        stages.map((stage) => stage.getBoundingClientRect().top),
        window.innerHeight
      );
      if (next === stop) return;
      const first = stop === null;
      stop = next;
      move?.stop();
      const duration = first || reduceRef.current ? 0 : travelMs(p.get(), next);
      if (duration === 0) {
        p.set(next);
        onArrive(next);
        return;
      }
      // A segment between two stations spans two frames, and the page has
      // already snapped to the new one, so the half in the frame just left
      // is off-screen. Light that half at once and play the visible half:
      // the light enters at the viewport edge and runs into the station.
      // (Segment 0, header to station 01, sits in one frame: played whole.)
      const at = p.get();
      if (next > at && next >= 2) p.set(Math.max(at, next - 0.5));
      if (next < at && next >= 1) p.set(Math.min(at, next + 0.5));
      // Going back, the station the light leaves goes dark straight away.
      if (next < at) onArrive(next);
      move = animate(p, next, {
        duration: duration / 1000,
        ease: "easeInOut",
        onComplete: () => onArrive(next),
      });
    };
    // Wait for the snap scroll to settle before moving the light, so it
    // plays in the frame the reader has arrived at.
    const onScroll = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(go, SETTLE_MS);
    };

    go();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
      move?.stop();
    };
  }, [live, sectionRef, p, onArrive]);

  // Place the light at the tip of the lit trail; hide it when docked.
  useMotionValueEvent(p, "change", (v) => {
    const index = Math.floor(v);
    const local = v - index;
    const path = pathRefs.current[index];
    if (reduceRef.current || local <= 0 || !path) {
      lightOpacity.set(0);
      return;
    }
    const point = path.getPointAtLength(local * path.getTotalLength());
    lightX.set(point.x);
    lightY.set(point.y);
    lightOpacity.set(1);
  });

  if (!live || !geometry) return null;

  return (
    <svg
      aria-hidden="true"
      data-meander-route
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className="pointer-events-none absolute inset-0"
    >
      {geometry.paths.map((d, index) => (
        <Segment
          key={index}
          d={d}
          index={index}
          p={p}
          pathRef={(el) => {
            pathRefs.current[index] = el;
          }}
        />
      ))}
      <motion.g style={{ x: lightX, y: lightY, opacity: lightOpacity }}>
        <circle r="11" className="fill-accent-visual opacity-20" />
        <circle r="5" className="fill-accent-visual" />
      </motion.g>
    </svg>
  );
}
