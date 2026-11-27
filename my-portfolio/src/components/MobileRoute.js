"use client";

import { useEffect, useState } from "react";
import { mobileRoute } from "@/lib/meander.mjs";

// The homepage timeline route below lg: a static 1px line that swings from
// side to side through the stage stations, running down a gutter beside each
// stage's text and crossing over in the gap before the next station. No
// travelling light and nothing tied to scroll, so reduced motion needs no
// separate path.
//
// Positions are measured from the page (header bottom, station circles, stage
// text), so the line meets the stations whatever the phone width or font.
//
// DOM contract (see DesignFlow): the section is `relative`; the header has
// data-meander-start, each mobile station circle data-meander-mobile-node and
// each stage text block data-meander-text, in the same order.

// Gap kept between the bottom of a stage's text and the start of the crossing.
const TURN_GAP = 8;

function measure(section) {
  const box = section.getBoundingClientRect();
  const header = section.querySelector("[data-meander-start]");
  const nodes = [...section.querySelectorAll("[data-meander-mobile-node]")];
  const texts = [...section.querySelectorAll("[data-meander-text]")];
  if (!header || nodes.length === 0 || nodes.length !== texts.length)
    return null;
  const head = header.getBoundingClientRect();
  const start = {
    x: head.left + head.width / 2 - box.left,
    y: head.bottom - box.top,
  };
  const stations = nodes.map((node, index) => {
    const r = node.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - box.left,
      top: r.top - box.top,
      bottom: r.bottom - box.top,
      turn: texts[index].getBoundingClientRect().bottom - box.top + TURN_GAP,
    };
  });
  return {
    width: Math.round(box.width),
    height: Math.round(box.height),
    paths: mobileRoute(start, stations),
  };
}

export default function MobileRoute({ sectionRef }) {
  const [live, setLive] = useState(false);
  const [geometry, setGeometry] = useState(null);

  // Below lg only; from lg up MeanderRoute draws the route.
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setLive(mobile.matches);
    update();
    mobile.addEventListener("change", update);
    return () => mobile.removeEventListener("change", update);
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

  if (!live || !geometry) return null;

  return (
    <svg
      aria-hidden="true"
      data-mobile-route
      width={geometry.width}
      height={geometry.height}
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className="pointer-events-none absolute inset-0 lg:hidden"
    >
      {geometry.paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fill="none"
          strokeWidth="1.5"
          className="stroke-accent-visual opacity-60"
        />
      ))}
    </svg>
  );
}
