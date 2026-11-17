// One beat per pane, in seconds on the CAD file conversion scene timeline
// (see src/scenes/cad-file-conversion.js):
//   01 intro              showcase: the finished bracket turns beside its note
//   02 How it works       2.4 -> 6.8   STEP gate; one face missing, outlined
//   03 What is delivered  6.8 -> 12.5  face patched; DXF gate; flat pattern,
//                                      laser trace, conversion note
// 01 is a separate animation (no gates or labels). Moving between 01 and 02
// is a quick fade cut: 02 fades in on the .SLDPRT bracket just before the
// STEP gate arrives, then plays.
export const beats = [
  { start: 12.5, end: 12.5, showcase: true },
  { start: 2.4, end: 6.8 },
  { start: 6.8, end: 12.5 },
];

export const stills = [
  {
    src: "/images/scenes/cad-file-conversion-01.webp",
    alt: "Folded sheet-metal bracket in ice-blue beside its conversion note: missing face patched, units in millimetres",
  },
  {
    src: "/images/scenes/cad-file-conversion-02.webp",
    alt: "The bracket as a .STEP file with its front flange missing, the gap outlined in dashed cyan",
  },
  {
    src: "/images/scenes/cad-file-conversion-03.webp",
    alt: "The bracket unfolded to a .DXF flat pattern with bend lines and four holes, beside the conversion note",
  },
];

export const label =
  "Animated conversion of a sheet-metal bracket: the finished bracket turning beside its conversion note, then the SolidWorks part passing a STEP gate and losing one face, then the face patched and the part unfolded to a DXF flat pattern traced by a laser point";
