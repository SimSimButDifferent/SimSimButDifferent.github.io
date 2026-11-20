// The About page service carousel. One slide per subject of the service reel
// (src/scenes/about-reel.js), in the same order. Each still is rendered from
// the reel itself (subject at turn 0, no floor, 1280×960 on navy), so it
// hands over to the canvas without a jump.
export const slides = [
  {
    name: "SolidWorks design",
    href: "/services/solidworks-design",
    caption:
      "One parametric bracket, rebuilt at three widths from a single driving dimension.",
    still: {
      src: "/images/scenes/about-reel-01.webp",
      alt: "Three slotted brackets, the same model at W = 60, 90 and 120",
    },
  },
  {
    name: "DFM consultancy",
    href: "/services/dfm-consultancy",
    caption:
      "A moulded cup in section, beside a written report of wall, draft and corner fixes.",
    still: {
      src: "/images/scenes/about-reel-02.webp",
      alt: "Finished moulded cup in section beside a DFM report listing wall, draft and corner fixes",
    },
  },
  {
    name: "Construction drawings",
    href: "/services/construction-drawings",
    caption:
      "A flanged housing assembly at the corner of its finished A3 drawing sheet.",
    still: {
      src: "/images/scenes/about-reel-03.webp",
      alt: "Flanged housing assembly with its cap and four bolts, at the top right of its completed A3 drawing sheet",
    },
  },
  {
    name: "CAD file conversion",
    href: "/services/cad-file-conversion",
    caption:
      "A STEP bracket with a missing face, repaired and unfolded to a DXF flat pattern.",
    still: {
      src: "/images/scenes/about-reel-04.webp",
      alt: "Folded sheet-metal bracket beside its conversion note: missing face patched, units in millimetres",
    },
  },
  {
    name: "Reverse engineering",
    href: "/services/reverse-engineering",
    caption:
      "A flanged housing rebuilt from a scan, shown exploded into body, bush and cap.",
    still: {
      src: "/images/scenes/about-reel-05.webp",
      alt: "Flanged housing in exploded view: the cap and bush lifted above the body",
    },
  },
];
