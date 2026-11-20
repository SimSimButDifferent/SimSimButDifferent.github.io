"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// The glass CONTACT lettering at the top of the contact page. From lg up it
// is a three.js scene (src/scenes/contact.js) whose lights brighten under the
// pointer; it draws only while the lights are easing or the view is moving.
//
// The middle (scroll-wheel) button moves the view, as in SolidWorks: drag to
// rotate, Ctrl + drag to pan, Shift + drag to zoom, double-click to return
// to the default view. The wheel itself is left to scroll the page.
//
// The canvas is an enhancement. The still frame underneath is what the reader
// sees while three.js loads, under prefers-reduced-motion, without WebGL, and
// below lg.
// Two middle-button presses this close together, and this near each other,
// count as a double-click.
const DOUBLE_MS = 350;
const DOUBLE_PX = 6;
const MIDDLE = 1;

const CURSORS = {
  orbit: "cursor-grabbing",
  pan: "cursor-move",
  zoom: "cursor-ns-resize",
};

const STILL = {
  src: "/images/scenes/contact-01.webp",
  alt: "The word CONTACT in clear glass letters lit from inside by cyan light channels",
};

export default function ContactScene() {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const handleRef = useRef(null);
  const [live, setLive] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const [mode, setMode] = useState(null); // orbit | pan | zoom while dragging
  const dragRef = useRef(null); // { id, x, y }
  const lastPressRef = useRef({ t: 0, x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

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
        if (cancelled || !desktop.matches || !canvasRef.current) return;
        const handle = await mountScene(canvasRef.current, "contact");
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
        handle.seek(0);
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
  }, [reduceMotion]);

  const onPointerDown = (event) => {
    const handle = handleRef.current;
    if (!handle || event.button !== MIDDLE) return;
    // Stop the browser's middle-click autoscroll.
    event.preventDefault();

    const now = event.timeStamp;
    const last = lastPressRef.current;
    const double =
      now - last.t < DOUBLE_MS &&
      Math.hypot(event.clientX - last.x, event.clientY - last.y) < DOUBLE_PX;
    lastPressRef.current = double
      ? { t: 0, x: 0, y: 0 }
      : { t: now, x: event.clientX, y: event.clientY };
    if (double) {
      handle.resetView();
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    setMode(null);
  };

  const onPointerMove = (event) => {
    const handle = handleRef.current;
    const box = boxRef.current;
    if (!handle || !box) return;

    const drag = dragRef.current;
    if (drag && drag.id === event.pointerId) {
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      drag.x = event.clientX;
      drag.y = event.clientY;
      // Modifiers are read on every move, so Ctrl or Shift can be pressed
      // or released mid-drag.
      const next = event.ctrlKey ? "pan" : event.shiftKey ? "zoom" : "orbit";
      if (next === "pan") handle.pan(dx, dy);
      else if (next === "zoom") handle.zoom(dy);
      else handle.orbit(dx, dy);
      if (next !== mode) setMode(next);
    }

    const rect = box.getBoundingClientRect();
    handle.pointer(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
  };

  const onPointerLeave = () => {
    if (!dragRef.current) handleRef.current?.pointer(null);
  };

  const onPointerCancel = (event) => {
    endDrag(event);
    handleRef.current?.pointer(null);
  };

  // Middle-click autoscroll starts on mousedown in some browsers.
  const onMouseDown = (event) => {
    if (live && event.button === MIDDLE) event.preventDefault();
  };

  return (
    <div>
      <div
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={onPointerLeave}
        onPointerCancel={onPointerCancel}
        onMouseDown={onMouseDown}
        onAuxClick={(event) => event.preventDefault()}
        className={`relative aspect-[21/9] w-full ${mode ? CURSORS[mode] : ""}`}
      >
        <Image
          src={STILL.src}
          alt={live ? "" : STILL.alt}
          aria-hidden={live ? "true" : undefined}
          width={1920}
          height={824}
          sizes="(min-width: 1088px) 1024px, 100vw"
          priority
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ease-out-soft ${
            live ? "opacity-0" : "opacity-100"
          }`}
        />
        <canvas
          key={canvasKey}
          ref={canvasRef}
          role="img"
          aria-label={STILL.alt}
          aria-hidden={live ? undefined : "true"}
          className={`absolute inset-0 h-full w-full transition-opacity duration-200 ease-out-soft ${
            live ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <p hidden={!live} className="mt-2 text-right text-sm text-muted-inverse">
        Middle-click and drag to rotate. Hold Ctrl to pan or Shift to zoom;
        double middle-click to reset.
      </p>
    </div>
  );
}
