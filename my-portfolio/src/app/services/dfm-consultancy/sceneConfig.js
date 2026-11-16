// Scene time each pane plays to when it snaps into view (seconds on the DFM
// scene timeline, see src/scenes/dfm-consultancy.js):
//   01 intro              0 -> 2.6   unchecked part
//   02 How it works       -> 6.7     section opens, three issues called out
//   03 What is delivered  -> 12.5    issues fixed, ice-blue finish, report
export const targets = [2.6, 6.7, 12.5];

export const stills = [
  {
    src: "/images/scenes/dfm-consultancy-01.webp",
    alt: "Moulded cup model before review, shown as a plain grey solid",
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
  "Animated section view of a moulded cup going through a DFM review: issues called out, geometry corrected, report delivered";
