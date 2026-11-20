"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

// The glass CONTACT lettering at the top of the contact page. From lg up it
// is a three.js scene (src/scenes/contact.js) whose lights brighten under the
// pointer; it draws only while the lights are easing.
//
// The canvas is an enhancement. The still frame underneath is what the reader
// sees while three.js loads, under prefers-reduced-motion, without WebGL, and
// below lg.
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

  const onPointerMove = (event) => {
    const handle = handleRef.current;
    const box = boxRef.current;
    if (!handle || !box) return;
    const rect = box.getBoundingClientRect();
    handle.pointer(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
  };

  const onPointerLeave = () => handleRef.current?.pointer(null);

  return (
    <div
      ref={boxRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerCancel={onPointerLeave}
      className="relative aspect-[21/9] w-full"
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
  );
}
