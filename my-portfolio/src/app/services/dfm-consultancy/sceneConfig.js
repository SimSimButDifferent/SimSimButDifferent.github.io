// Scroll progress -> scene time for the DFM scroll scene.
// Pane 01 rests on the unchecked part; "How it works" carries the review and
// the three fixes; "What is delivered" carries the finished part and report.
// The scene stops at 12.5 s; the video's loop return is never played.
export const stops = [
  { p: 0, t: 1.5 },
  { p: 0.2, t: 3.0 },
  { p: 0.7, t: 10.6 },
  { p: 1, t: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/dfm-consultancy-01.webp",
    alt: "Moulded cup model before review, shown as a plain grey solid",
    from: 0,
  },
  {
    src: "/images/scenes/dfm-consultancy-02.webp",
    alt: "Quarter section of the cup with wall thickness, draft angle and corner radius called out",
    from: 3.0,
  },
  {
    src: "/images/scenes/dfm-consultancy-03.webp",
    alt: "Revised cup in section beside the written DFM report",
    from: 10.6,
  },
];

export const label =
  "Animated section view of a moulded cup going through a DFM review: issues called out, geometry corrected, report delivered";
