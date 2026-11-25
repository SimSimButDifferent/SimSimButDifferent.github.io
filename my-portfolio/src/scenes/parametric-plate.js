// Homepage intro scene: one slotted plate whose driving dimension W loops
// 60 -> 90 -> 120 -> 60 (timing in src/lib/parametricLoop.mjs). The left end
// is fixed; the plate, slot and far hole grow to the right, and the cyan W
// dimension and its value follow. Same part and finish as the SolidWorks
// design scene (src/scenes/parts/bracket.js). A pure function of time.

import { BRACKET, cutPaths, outlineShape } from "./parts/bracket";
import { shownWidth, widthAt } from "@/lib/parametricLoop.mjs";

const { depth: DEPTH, thickness: THICKNESS, fillet: FILLET } = BRACKET;
const LEFT = -60; // left end; W = 120 is centred on 0
const SCALE = 0.7; // world units per millimetre, as the SolidWorks scene
const RAD = Math.PI / 180;

export function create({ THREE, tokens, fontFamily }) {
  const object = new THREE.Group();
  object.scale.setScalar(SCALE);
  const textures = new Map();
  const half = DEPTH / 2;

  // Dimension value on a navy plate, so it reads over the part and floor.
  const valueTexture = (text) => {
    if (textures.has(text)) return textures.get(text);
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 96;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
    ctx.beginPath();
    ctx.roundRect(4, 8, 248, 80, 14);
    ctx.fill();
    ctx.font = `400 40px ${fontFamily}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = tokens.ink;
    ctx.fillText(text, 128, 50);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.set(text, texture);
    return texture;
  };

  // ---- Plate: finished ice-blue, with ink edges ----------------------------
  const group = new THREE.Group();
  group.position.set(LEFT, 0, 0);
  object.add(group);

  const skin = new THREE.MeshStandardMaterial({
    color: tokens.render,
    roughness: 0.32,
    metalness: 0.35,
  });
  const solid = new THREE.Mesh(new THREE.BufferGeometry(), skin);
  const edges = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: tokens.ink, transparent: true })
  );
  group.add(solid, edges);

  // ---- Driving dimension ---------------------------------------------------
  const dimension = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: tokens.cyan, depthTest: false })
  );
  dimension.renderOrder = 1;
  const value = new THREE.Sprite(
    new THREE.SpriteMaterial({ transparent: true, depthTest: false })
  );
  value.scale.set(34, 12.75, 1);
  value.renderOrder = 2;
  group.add(dimension, value);

  let built = "";
  let label = "";

  function update(t) {
    const width = widthAt(t);

    const key = width.toFixed(2);
    if (key !== built) {
      built = key;
      const shape = outlineShape(THREE, width, FILLET);
      shape.holes = cutPaths(THREE, width);
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: THICKNESS,
        bevelEnabled: false,
        curveSegments: 10,
      }).rotateX(-Math.PI / 2);
      solid.geometry.dispose();
      solid.geometry = geometry;
      edges.geometry.dispose();
      edges.geometry = new THREE.EdgesGeometry(geometry, 25);

      // Extension lines, dimension line and arrowheads, at floor level in
      // front of the part.
      const z = half + 12;
      const a = 2.6;
      dimension.geometry.setFromPoints(
        [
          [0, half + 3, 0, half + 16],
          [width, half + 3, width, half + 16],
          [0, z, width, z],
          [0, z, a, z - 1.4],
          [0, z, a, z + 1.4],
          [width, z, width - a, z - 1.4],
          [width, z, width - a, z + 1.4],
        ].flatMap(([xa, za, xb, zb]) => [
          new THREE.Vector3(xa, 0.3, za),
          new THREE.Vector3(xb, 0.3, zb),
        ])
      );
      value.position.set(width / 2, 0.3, z);
    }

    // The value changes as soon as a new W is entered, as in SolidWorks.
    const text = `W = ${shownWidth(t)}`;
    if (text !== label) {
      label = text;
      value.material.map = valueTexture(text);
      value.material.needsUpdate = true;
    }
  }

  return {
    object,
    update,
    camera: {
      target: new THREE.Vector3(-13, 17, 2),
      distance: 190,
      elevation: 30 * RAD,
      swing: 0,
      period: 1,
      at: () => ({ azimuth: 30 * RAD }),
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
    },
  };
}
