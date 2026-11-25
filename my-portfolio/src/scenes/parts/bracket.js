// Slotted bracket (the "plate"): a filleted rectangle with two fixing holes
// and a slot. Shared by the SolidWorks design scene and the homepage
// parametric plate, so both draw the same part. Dimensions are in
// millimetres, matching the SolidWorks design video.
//
// The left end is fixed and W grows to the right: the holes keep their
// distance from each end and the slot grows with W. Shapes are drawn in
// (x, s) and laid flat by the scenes, so s runs towards the back. Builders
// take THREE as an argument so this file does not pull in a second copy of
// three.

export const BRACKET = {
  depth: 40,
  thickness: 8,
  fillet: 8,
  holeRadius: 3,
  holeEdge: 9, // hole centre to each end: fixed, whatever W is
  slotRadius: 4,
  slotEdge: 22, // slot end centre to each end: the slot grows with W
};

// Outline of a bracket W long, with corner fillets of radius `fillet`
// (0 gives square corners).
export function outlineShape(THREE, width, fillet) {
  const half = BRACKET.depth / 2;
  const shape = new THREE.Shape();
  const r = Math.min(fillet, half);
  if (r < 0.05) {
    shape.moveTo(0, -half);
    shape.lineTo(width, -half);
    shape.lineTo(width, half);
    shape.lineTo(0, half);
    shape.closePath();
    return shape;
  }
  shape.moveTo(r, -half);
  shape.lineTo(width - r, -half);
  shape.absarc(width - r, -half + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(width, half - r);
  shape.absarc(width - r, half - r, r, 0, Math.PI / 2, false);
  shape.lineTo(r, half);
  shape.absarc(r, half - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(0, -half + r);
  shape.absarc(r, -half + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

// Two fixing holes and the slot. Returned as closed paths (for cutting) —
// new THREE.Shape(points) of the same paths gives the plugs and outlines.
export function cutPaths(THREE, width) {
  const { holeRadius, holeEdge, slotRadius, slotEdge } = BRACKET;
  const circle = (x) => {
    const path = new THREE.Path();
    path.absarc(x, 0, holeRadius, 0, Math.PI * 2, true);
    return path;
  };
  const slot = new THREE.Path();
  const x1 = slotEdge;
  const x2 = width - slotEdge;
  slot.moveTo(x1, slotRadius);
  slot.lineTo(x2, slotRadius);
  slot.absarc(x2, 0, slotRadius, Math.PI / 2, -Math.PI / 2, true);
  slot.lineTo(x1, -slotRadius);
  slot.absarc(x1, 0, slotRadius, -Math.PI / 2, Math.PI / 2, true);
  return [circle(holeEdge), slot, circle(width - holeEdge)];
}
