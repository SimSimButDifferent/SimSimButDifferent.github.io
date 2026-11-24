"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import MeanderRoute from "./MeanderRoute";
import { signatures } from "./signatures";

// Homepage "Product development timeline": eight stages from a first sketch
// to production, each tied to one service. From lg up each stage is its own
// snap frame, text alternating left and right, with a "station" on the other
// side. Below lg it is a plain vertical route.
//
// DOM contract for the route overlay: the section is `relative`; the header
// has data-meander-start, each stage <li> data-meander-stage and each station
// data-meander-node.

function stationClass(state) {
  if (state === "current")
    return "border-accent-visual ring-4 ring-cyan-400/20";
  if (state === "passed") return "border-accent-visual";
  return "border-line";
}

function Station({ stage, state, textOnLeft }) {
  const Signature = signatures[stage.signature];
  const numeral = (
    <span className="text-display-lg font-light text-line">{stage.number}</span>
  );
  return (
    <div
      aria-hidden="true"
      className={`hidden items-center justify-center gap-6 lg:col-span-7 lg:row-start-1 lg:flex ${
        textOnLeft ? "lg:col-start-6" : "lg:col-start-1"
      }`}
    >
      {!textOnLeft && numeral}
      <div className="relative">
        {Signature?.Overlay && <Signature.Overlay />}
        <div
          data-meander-node
          data-state={state}
          className={`relative z-10 flex h-52 w-52 items-center justify-center rounded-full border bg-navy transition-colors duration-200 ${stationClass(
            state,
          )}`}
        >
          <Image
            src={stage.icon}
            alt=""
            width={144}
            height={144}
            className="h-36 w-36 invert"
          />
        </div>
      </div>
      {textOnLeft && numeral}
    </div>
  );
}

function StageText({ stage, textOnLeft }) {
  const Signature = signatures[stage.signature];
  return (
    <div
      className={`lg:col-span-5 lg:row-start-1 ${
        textOnLeft ? "lg:col-start-1" : "lg:col-start-8"
      }`}
    >
      <p className="eyebrow mb-4">
        <span className="text-accent-visual">Stage {stage.number}</span> ·{" "}
        {stage.label}
      </p>
      <h3 className="mb-4 pb-0 text-title font-light">{stage.title}</h3>
      <p className="max-w-[70ch]">{stage.body}</p>
      <ul
        aria-label="Delivered at this stage"
        className="mt-6 flex flex-wrap gap-2"
      >
        {stage.chips.map((chip) => (
          <li key={chip} className="chip">
            {chip}
          </li>
        ))}
      </ul>
      {Signature?.Text && <Signature.Text />}
      <p className="mt-3">
        <Link href={stage.href} className="link-inverse inline-block py-3">
          {stage.linkText}
        </Link>
      </p>
    </div>
  );
}

export default function DesignFlow({ stages }) {
  // `arrived`: the stop the route light has reached (0 = none). Set by the
  // route overlay when its animation finishes.
  const [arrived, setArrived] = useState(0);
  const sectionRef = useRef(null);

  const stateOf = (index) => {
    if (arrived === index + 1) return "current";
    if (index + 1 < arrived) return "passed";
    return "idle";
  };

  return (
    <section
      ref={sectionRef}
      id="timeline"
      aria-labelledby="timeline-heading"
      className="snap-frame relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <MeanderRoute sectionRef={sectionRef} onArrive={setArrived} />

      <header
        data-meander-start
        className="relative pt-16 text-center lg:flex lg:h-[30vh] lg:flex-col lg:justify-end lg:pt-0"
      >
        <p className="eyebrow mb-4">
          <span className="text-accent-visual">02 · The process</span>
        </p>
        <h2 id="timeline-heading" className="mb-4 text-title font-light">
          Product development timeline
        </h2>
        <p className="mx-auto max-w-[70ch] text-muted-inverse">
          Eight stages from a first sketch to parts coming off the line. Join at
          whichever stage your project has reached.
        </p>
      </header>

      <ol className="ml-2 mt-12 border-l border-line lg:ml-0 lg:mt-0 lg:border-0">
        {stages.map((stage, index) => {
          const textOnLeft = index % 2 === 0;
          return (
            <li
              key={stage.number}
              data-meander-stage
              className={`relative pb-12 pl-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-0 lg:pl-0 ${
                index === 0 ? "lg:min-h-[70vh]" : "snap-frame lg:min-h-screen"
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 top-1 h-[15px] w-[15px] rounded-full border border-accent-visual bg-surface lg:hidden"
              />
              <StageText stage={stage} textOnLeft={textOnLeft} />
              <Station
                stage={stage}
                state={stateOf(index)}
                textOnLeft={textOnLeft}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
