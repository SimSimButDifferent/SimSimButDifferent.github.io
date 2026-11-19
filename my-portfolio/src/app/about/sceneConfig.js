// The About page has one canvas frame: the service reel (src/scenes/about-reel.js),
// which shows each service's finished subject in turn. It has no story, so
// its single beat is the showcase.
export const beats = [{ start: 0, end: 0, showcase: true }];

export const stills = [
  {
    src: "/images/scenes/about-reel-01.webp",
    alt: "Ice-blue slotted bracket family, the first of five finished service models shown in turn",
  },
];

export const label =
  "Animated reel of five finished CAD models, one per service: a bracket family, a moulded cup with its DFM report, a housing with its drawing sheet, a sheet-metal bracket with its conversion note and a housing assembly";
