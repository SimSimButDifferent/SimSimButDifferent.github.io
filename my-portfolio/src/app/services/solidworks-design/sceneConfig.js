// One beat per pane, in seconds on the SolidWorks design scene timeline (see
// src/scenes/solidworks-design.js):
//   01 intro              showcase: the family of three brackets turns
//   02 How it works       0.3 -> 6.8   sketch, extrude, cut, fillet; W = 60
//   03 What is delivered  6.8 -> 12.5  W drives 60, 90, 120; ice-blue finish
// 01 is a separate animation (no dimension lines). Moving between 01 and 02
// is a quick fade cut: 02 fades in on the empty sketch plane, then plays.
export const beats = [
  { start: 12.5, end: 12.5, showcase: true },
  { start: 0.3, end: 6.8 },
  { start: 6.8, end: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/solidworks-design-01.webp",
    alt: "Three slotted brackets in ice-blue, the same model at W = 60, 90 and 120",
  },
  {
    src: "/images/scenes/solidworks-design-02.webp",
    alt: "Slotted bracket dimensioned W = 60 beside its feature list: Sketch1, Boss-Extrude1, Cut-Extrude1, Fillet1",
  },
  {
    src: "/images/scenes/solidworks-design-03.webp",
    alt: "Family of three brackets rebuilt from one driving dimension, each labelled with its width",
  },
];

export const label =
  "Animated parametric model of a slotted bracket: the finished family of three turning, then a sketch built up through named features, then one driving dimension rebuilding it at W = 60, 90 and 120";
