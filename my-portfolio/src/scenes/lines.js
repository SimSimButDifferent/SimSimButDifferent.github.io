// Line-work with a width in pixels, shared by the scroll scenes. WebGL's own
// lines are one pixel wide, which is too faint for flat patterns, drawing
// sheets and dashed outlines; three's LineSegments2 draws them as quads.
//
// By default a stroke is drawn over the solids (depthTest off), like the
// construction lines in the scenes. Pass { depthTest: true } for line-work
// that a solid in front of it should hide, such as a drawing sheet.

import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

// stroke(colour, width in px, dashed?, options?) -> LineSegments2
// options: dashSize and gapSize (in the line's own units), depthTest and
// depthWrite (three's defaults otherwise, as the conversion scene was built).
export const stroke = (
  colour,
  width,
  dashed = false,
  { dashSize = 5, gapSize = 3.5, depthTest = false, depthWrite = true } = {}
) =>
  new LineSegments2(
    new LineSegmentsGeometry(),
    new LineMaterial({
      color: colour,
      linewidth: width,
      transparent: true,
      depthTest,
      depthWrite,
      dashed,
      dashSize,
      gapSize,
    })
  );

// Set a stroke's segments from pairs of points. The point count changes
// between frames, so the geometry is replaced: writing into the existing one
// keeps the old buffer size and leaves later segments undrawn.
export function setSegments(line, points) {
  line.geometry.dispose();
  line.geometry = new LineSegmentsGeometry();
  line.visible = points.length > 1;
  if (!line.visible) return;
  line.geometry.setPositions(points.flatMap((p) => [p.x, p.y, p.z]));
  if (line.material.dashed) line.computeLineDistances();
}

// The same, from a run of points joined end to end.
export const setPath = (line, points) =>
  setSegments(
    line,
    points.slice(1).flatMap((point, i) => [points[i], point])
  );
