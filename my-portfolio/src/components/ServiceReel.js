"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

// Service carousel for the About page: one finished subject per service,
// turning on the canvas, with its title and a left/right arrow pair to step
// between them. The arrow keys do the same while focus is inside.
//
// The canvas (the about-reel scene) is an enhancement, from lg up only. The
// still frames underneath are what the reader sees while three.js loads,
// under prefers-reduced-motion, without WebGL, and below lg.
//
// Props:
//   slides  [{ name, href, caption, still: { src, alt } }] in reel order
export default function ServiceReel({ slides }) {
  const rootRef = useRef(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const handleRef = useRef(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const reduceMotion = useReducedMotion();

  const count = slides.length;
  const slide = slides[index];

  const go = (step) => {
    const next = (indexRef.current + step + count) % count;
    indexRef.current = next;
    setIndex(next);
    handleRef.current?.select(next);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") go(-1);
    else if (event.key === "ArrowRight") go(1);
    else return;
    event.preventDefault();
  };

  useEffect(() => {
    if (reduceMotion) return undefined;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let cancelled = false;
    let starting = false;
    let sizeObserver = null;
    let onscreen = false;

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
        const handle = await mountScene(canvasRef.current, "about-reel");
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
        handle.select(indexRef.current);
        handle.setShowcase(onscreen);
        setLive(true);
      } catch {
        // No WebGL, or the scene chunk failed to load: stay on the stills.
        stop();
      } finally {
        starting = false;
      }
    };

    // Start loading just before the carousel scrolls into view, and run the
    // turn only while it is on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting;
        if (onscreen) start();
        handleRef.current?.setShowcase(onscreen);
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
  }, [reduceMotion]);

  const arrow =
    "focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-ink-inverse transition-colors duration-150 hover:border-accent-visual hover:text-accent-visual";

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-labelledby="service-reel-title"
      aria-keyshortcuts="ArrowLeft ArrowRight"
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div
        ref={boxRef}
        className="relative aspect-[40/21] w-full lg:aspect-[4/3]"
      >
        {/* The stills share the reel's framing: models in the top 70%, the
            bottom 30% left clear for the text overlay from lg. Below lg the
            text sits underneath instead, so the box crops that empty band. */}
        {slides.map((s, i) => (
          <Image
            key={s.still.src}
            src={s.still.src}
            alt={i === index && !live ? s.still.alt : ""}
            aria-hidden={i === index && !live ? undefined : "true"}
            width={1280}
            height={960}
            sizes="(min-width: 1024px) 58vw, 100vw"
            priority={i === 0}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 ease-out-soft ${
              !live && i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <canvas
          key={canvasKey}
          ref={canvasRef}
          role="img"
          aria-label={slide.still.alt}
          aria-hidden={live ? undefined : "true"}
          className={`absolute inset-0 h-full w-full transition-opacity duration-200 ease-out-soft ${
            live ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Below lg the text follows the frame; from lg it overlays the
          frame's bottom 30%, which the models leave clear. */}
      <div className="mt-4 flex flex-col gap-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <h2 id="service-reel-title" className="eyebrow">
              <span className="text-accent-visual">Services</span>
            </h2>
            <p aria-hidden="true" className="eyebrow tabular-nums">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")}
            </p>
          </div>

          {/* Every slide's link is in the HTML, so crawlers and readers
              without JavaScript reach all five services; only the current
              one is shown. */}
          <div aria-live="polite" className="mt-1">
            {slides.map((s, i) => (
              <div
                key={s.href}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                hidden={i !== index}
              >
                <p className="text-title font-light">
                  <Link
                    href={s.href}
                    className="focus-ring inline-flex min-h-[44px] items-center gap-3 rounded-lg text-ink-inverse transition-colors duration-150 hover:text-accent-visual"
                  >
                    {s.name}
                    <span className="text-accent-visual">
                      <Chevron />
                    </span>
                  </Link>
                </p>
                <p className="mt-1 min-h-[2lh] max-w-[60ch] text-muted-inverse">
                  {s.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Show previous service"
            className={arrow}
          >
            <Chevron flip />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Show next service"
            className={arrow}
          >
            <Chevron />
          </button>
        </div>
      </div>
    </section>
  );
}

function Chevron({ flip = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={flip ? "rotate-180" : undefined}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
