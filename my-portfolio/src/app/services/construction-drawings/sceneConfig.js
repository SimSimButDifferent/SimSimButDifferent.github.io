// One beat per pane, in seconds on the construction drawings scene timeline
// (see src/scenes/construction-drawings.js):
//   01 intro              showcase: the finished housing turns in front of
//                                   its completed drawing sheet
//   02 How it works       2.2 -> 6.8   the model shrinks to an isometric view;
//                                      sheet border, front and plan views
//   03 What is delivered  6.8 -> 12.5  dimensions, datums, tolerance frames,
//                                      balloons, bill of materials, title block
// 01 is a separate animation (no balloons, sheet dimmed behind the part).
// Moving between 01 and 02 is a quick fade cut: 02 fades in on the housing
// model just before it shrinks onto the sheet, then plays.
export const beats = [
  { start: 12.5, end: 12.5, showcase: true },
  { start: 2.2, end: 6.8 },
  { start: 6.8, end: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/construction-drawings-01.webp",
    alt: "Flanged housing assembly in ice-blue, with its cap and four bolts, in front of its completed A3 drawing sheet",
  },
  {
    src: "/images/scenes/construction-drawings-02.webp",
    alt: "A3 drawing sheet with the housing's front view above its plan view, joined by projection lines, and an isometric view top right",
  },
  {
    src: "/images/scenes/construction-drawings-03.webp",
    alt: "The finished drawing: dimensions 110, 55, 80, Ø42 H7 and 4× Ø13, datums A and B, three tolerance frames, balloons 1 to 3, bill of materials and title block citing ISO 2768-m and ISO 8015",
  },
];

export const label =
  "Animated construction drawing of a flanged housing: the finished assembly turning in front of its drawing sheet, then the model projected into first-angle front and plan views, then dimensioned and toleranced, ballooned, and completed with a bill of materials and title block";
