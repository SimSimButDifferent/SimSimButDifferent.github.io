// Flanged housing: body, cap and four M12 hex bolts. Shared by the
// construction drawings scene and (later) the reverse engineering scene, so
// both draw the same part. Dimensions are in millimetres, matching the
// construction drawings video and its drawing sheet:
//
//   flange 110 x 110 x 12, R8 corners, 4 x Ø13 holes on an 80 mm pitch
//   boss Ø70, 55 high overall (flange underside to boss top), 2 mm chamfer
//   bore Ø42 H7, through
//
// The body stands on y = 0 with the bore on the y axis. Builders take THREE
// as an argument so this file does not pull in a second copy of three.

import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export const HOUSING = {
  flange: 110,
  flangeThickness: 12,
  corner: 8,
  pitch: 80,
  hole: 13,
  boss: 70,
  height: 55,
  chamfer: 2,
  bore: 42,
  // Cap: a disc with a spigot that locates in the bore.
  cap: 74,
  capThickness: 9,
  capChamfer: 1.5,
  capHole: 16,
  spigot: 41.6,
  spigotDepth: 6,
  // Bolts: M12 hex head, 18 across flats, 7.5 high.
  boltAcrossFlats: 18,
  boltHead: 7.5,
  boltShank: 12,
  // Gap left between parts that sit on each other, so their touching faces
  // never share a plane and flicker.
  seat: 0.1,
};

const SEGMENTS = 96;

// Hole centres in plan (x, z).
export const holeCentres = () => {
  const h = HOUSING.pitch / 2;
  return [
    [-h, -h],
    [h, -h],
    [h, h],
    [-h, h],
  ];
};

// One lathe per straight run of the profile, so corners stay sharp (a single
// lathe averages the normals round each corner and smears the shading).
function lathe(THREE, runs) {
  return runs.map(([a, b]) =>
    new THREE.LatheGeometry(
      [new THREE.Vector2(a[0], a[1]), new THREE.Vector2(b[0], b[1])],
      SEGMENTS
    ).toNonIndexed()
  );
}

function roundedSquare(THREE, size, radius) {
  const h = size / 2;
  const r = radius;
  const shape = new THREE.Shape();
  shape.moveTo(-h + r, -h);
  shape.lineTo(h - r, -h);
  shape.absarc(h - r, -h + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(h, h - r);
  shape.absarc(h - r, h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-h + r, h);
  shape.absarc(-h + r, h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-h, -h + r);
  shape.absarc(-h + r, -h + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function circlePath(THREE, x, y, radius) {
  const path = new THREE.Path();
  path.absarc(x, y, radius, 0, Math.PI * 2, true);
  return path;
}

// Body geometry: flange plus boss, as one non-indexed geometry.
export function housingBodyGeometry(THREE) {
  const H = HOUSING;
  const shape = roundedSquare(THREE, H.flange, H.corner);
  holeCentres().forEach(([x, z]) =>
    shape.holes.push(circlePath(THREE, x, -z, H.hole / 2))
  );
  shape.holes.push(circlePath(THREE, 0, 0, H.bore / 2));
  const flange = new THREE.ExtrudeGeometry(shape, {
    depth: H.flangeThickness,
    bevelEnabled: false,
    curveSegments: 24,
  });
  // Shape (x, y) laid flat, extruded upwards: y -> -z, depth -> +y.
  flange.rotateX(-Math.PI / 2);
  flange.clearGroups();

  const R = H.boss / 2;
  const r = H.bore / 2;
  const top = H.height;
  const c = H.chamfer;
  const boss = lathe(THREE, [
    [
      [R, H.flangeThickness],
      [R, top - c],
    ],
    [
      [R, top - c],
      [R - c, top],
    ],
    [
      [R - c, top],
      [r, top],
    ],
    [
      [r, top],
      [r, H.flangeThickness],
    ],
  ]);
  return mergeGeometries([flange, ...boss]);
}

// Cap geometry, standing on y = 0 (its underside), spigot below.
export function housingCapGeometry(THREE) {
  const H = HOUSING;
  const R = H.cap / 2;
  const s = H.spigot / 2;
  const h = H.capHole / 2;
  const t = H.capThickness;
  const c = H.capChamfer;
  const d = -H.spigotDepth;
  return mergeGeometries(
    lathe(THREE, [
      [
        [h, d],
        [s, d],
      ],
      [
        [s, d],
        [s, 0],
      ],
      [
        [s, 0],
        [R, 0],
      ],
      [
        [R, 0],
        [R, t - c],
      ],
      [
        [R, t - c],
        [R - c, t],
      ],
      [
        [R - c, t],
        [h, t],
      ],
      [
        [h, t],
        [h, d],
      ],
    ])
  );
}

// One bolt, standing on y = 0 (the underside of its head), shank below.
// Flat-shaded so the hex faces read as faces.
export function housingBoltGeometry(THREE) {
  const H = HOUSING;
  const corner = H.boltAcrossFlats / Math.sqrt(3);
  const head = new THREE.CylinderGeometry(corner, corner, H.boltHead, 6);
  head.translate(0, H.boltHead / 2, 0);
  const shank = new THREE.CylinderGeometry(6, 6, H.boltShank, 24, 1, true);
  shank.translate(0, -H.boltShank / 2, 0);
  const geometry = mergeGeometries([head.toNonIndexed(), shank.toNonIndexed()]);
  geometry.deleteAttribute("normal");
  geometry.computeVertexNormals();
  return geometry;
}

// The assembly as three groups sharing one material. Positions follow the
// drawing: cap seated on the boss, bolts in the four holes.
export function housingAssembly(THREE, material) {
  const H = HOUSING;
  const body = new THREE.Mesh(housingBodyGeometry(THREE), material);
  const cap = new THREE.Mesh(housingCapGeometry(THREE), material);
  cap.position.y = H.height + H.seat;
  const bolts = new THREE.Group();
  const boltGeometry = housingBoltGeometry(THREE);
  holeCentres().forEach(([x, z]) => {
    const bolt = new THREE.Mesh(boltGeometry, material);
    bolt.position.set(x, H.flangeThickness + H.seat, z);
    // Turn each head a little differently, as real bolts sit.
    bolt.rotation.y = ((x * 7 + z * 3) % 60) * (Math.PI / 180);
    bolts.add(bolt);
  });
  return { body, cap, bolts };
}
