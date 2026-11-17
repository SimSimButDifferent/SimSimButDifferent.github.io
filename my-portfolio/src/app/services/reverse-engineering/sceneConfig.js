// One beat per pane, in seconds on the reverse engineering scene timeline
// (see src/scenes/reverse-engineering.js):
//   01 intro              showcase: the finished housing in exploded view
//                                   (body, bush, cap) turns on its centreline
//   02 How it works       2.2 -> 6.8   the slate part is scanned into a point
//                                      cloud, then the centreline and the
//                                      110, 55 and Ø70 dimensions placed
//   03 What is delivered  6.8 -> 12.5  the model draws on in white line-work,
//                                      turns ice-blue, and the cap and bush
//                                      lift out along the centreline
// 01 is a separate animation. Moving between 01 and 02 is a quick fade cut:
// 02 fades in on the slate part just before the scan begins, then plays.
export const beats = [
  { start: 12.5, end: 12.5, showcase: true },
  { start: 2.2, end: 6.8 },
  { start: 6.8, end: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/reverse-engineering-01.webp",
    alt: "Flanged housing in ice-blue in exploded view: the cap and bush lifted above the body along a dashed cyan centreline",
  },
  {
    src: "/images/scenes/reverse-engineering-02.webp",
    alt: "The housing as a cyan point cloud from a scan, measured at 110 across the flange, 55 high and Ø70 across the boss",
  },
  {
    src: "/images/scenes/reverse-engineering-03.webp",
    alt: "The rebuilt housing model in ice-blue, exploded into body, bush and cap along its centreline",
  },
];

export const label =
  "Animated reverse engineering of a flanged housing: the finished model turning in exploded view, then the physical part scanned into a point cloud and measured, then rebuilt as a parametric model in line-work, finished, and separated into body, bush and cap along its centreline";
