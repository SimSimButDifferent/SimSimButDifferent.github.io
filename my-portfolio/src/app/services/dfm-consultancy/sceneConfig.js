// One beat per pane, in seconds on the DFM scene timeline (see
// src/scenes/dfm-consultancy.js):
//   01 intro              showcase: the finished part turns beside its report
//   02 How it works       2.6 -> 6.7   section opens, three issues called out
//   03 What is delivered  6.7 -> 12.5  issues fixed, ice-blue finish, report
// Scrolling from 01 to 02 rewinds quickly to the unchecked part, then plays.
export const beats = [
  { start: 12.5, end: 12.5, showcase: true },
  { start: 2.6, end: 6.7 },
  { start: 6.7, end: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/dfm-consultancy-01.webp",
    alt: "Finished moulded cup in section, ice-blue, beside a DFM report listing wall, draft and corner fixes",
  },
  {
    src: "/images/scenes/dfm-consultancy-02.webp",
    alt: "Quarter section of the cup with wall thickness, draft angle and corner radius called out",
  },
  {
    src: "/images/scenes/dfm-consultancy-03.webp",
    alt: "Revised cup in section beside the written DFM report",
  },
];

export const label =
  "Animated section view of a moulded cup going through a DFM review: the finished part turning beside its report, then issues called out, geometry corrected, report delivered";
