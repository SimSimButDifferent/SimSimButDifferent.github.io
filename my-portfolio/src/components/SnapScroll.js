"use client";

import { useEffect } from "react";
import { nextSnap } from "@/lib/scrollTimeline.mjs";

// One wheel gesture = one frame, on pages whose <main> has .snap-page.
//
// CSS scroll snapping alone settles on the nearest snap point, so a single
// wheel notch falls back to where it started. This steps to the next
// .snap-frame in the wheel's direction instead. From lg up only; keyboard and
// touch scrolling are left to the browser and the CSS snap rules.
const STEP_LOCK_MS = 1000; // ignore the rest of the gesture (trackpad inertia)
const GESTURE_GAP_MS = 150;
const TRIGGER_PX = 40;

export default function SnapScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lockedUntil = 0;
    let gathered = 0;
    let lastEvent = 0;

    const snapPoints = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const tops = Array.from(
        document.querySelectorAll(".snap-frame"),
        (frame) =>
          Math.round(frame.getBoundingClientRect().top + window.scrollY)
      );
      const all = [0, ...tops, max].map((p) => Math.min(Math.max(p, 0), max));
      return [...new Set(all)].sort((a, b) => a - b);
    };

    const onWheel = (event) => {
      if (!desktop.matches || event.ctrlKey || !event.deltaY) return;
      event.preventDefault();

      const now = performance.now();
      if (now < lockedUntil) return;
      if (now - lastEvent > GESTURE_GAP_MS) gathered = 0;
      lastEvent = now;
      gathered += event.deltaY;
      if (Math.abs(gathered) < TRIGGER_PX) return;

      const target = nextSnap(
        snapPoints(),
        window.scrollY,
        Math.sign(gathered),
        window.innerHeight
      );
      gathered = 0;
      if (target === null) return;
      lockedUntil = now + STEP_LOCK_MS;
      window.scrollTo({
        top: target,
        behavior: reduced.matches ? "auto" : "smooth",
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
