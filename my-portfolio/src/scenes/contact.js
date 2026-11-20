// Contact page scene: the word CONTACT in clear, refractive glass letters
// standing on the blueprint floor, each lit from inside by one cyan light
// channel that follows the letter's stroke. Modelled on the earlier still render
// (public/images/contact_header.png).
//
// It has no story and no loop. The lights rest at a steady level; when the
// pointer moves over the word, the letter under it brightens most and its
// neighbours a little (a gaussian falloff along the word), then everything
// eases back when the pointer leaves. The stage renders only while step()
// reports that the lights are still easing.
//
// Letters are drawn on a 40-unit cap height with an 8-unit stroke, in the
// XY plane, and extruded through Z.
//
// Fillets: every edge is rounded. The edges round the front and back faces
// take FILLET; so does every corner of the outline, inside or outside, at 90
// degrees and over. Corners sharper than 90 degrees take a smaller fillet
// (see cornerRadius).
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { blueprintFloor } from "./stage";

const CAP = 40; // cap height
const STROKE = 8;
const DEPTH = 12; // extrusion through the letter
const FILLET = 2; // outside edge radius
const GAP = 9; // between letters
const TUBE = 0.75; // light channel radius, one channel at mid-depth

// Brightness: REST with no pointer, 1 directly under it.
const REST = 0.45;
const RISE = 0.15; // seconds, time constant brightening
const FALL = 0.3; // seconds, time constant dimming
const SETTLED = 0.001;
const POOL = 0.8; // floor light pool strength

const RAD = Math.PI / 180;

// ---- Letterforms -----------------------------------------------------------
// Each letter: width; either shape(THREE) -> Shape (round letters) or an
// outline and holes with sharp corners (straight-sided letters, filleted by
// filletedSolid); and the centreline of its stroke as arcs and segments for
// the light channels.

const R_OUT = CAP / 2;
const R_IN = R_OUT - STROKE;
const R_MID = (R_OUT + R_IN) / 2;
const C_OPEN = 42 * RAD; // half-angle of the C's opening

function ringShape(THREE) {
  const shape = new THREE.Shape();
  shape.absarc(R_OUT, R_OUT, R_OUT, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(R_OUT, R_OUT, R_IN, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function cShape(THREE) {
  const c = R_OUT;
  const a0 = C_OPEN;
  const a1 = Math.PI * 2 - C_OPEN;
  const end = (a) => ({
    x: c + R_MID * Math.cos(a),
    y: c + R_MID * Math.sin(a),
  });
  const shape = new THREE.Shape();
  shape.absarc(c, c, R_OUT, a0, a1, false);
  const e1 = end(a1);
  shape.absarc(e1.x, e1.y, STROKE / 2, a1, a1 + Math.PI, false);
  shape.absarc(c, c, R_IN, a1, a0, true);
  const e0 = end(a0);
  shape.absarc(e0.x, e0.y, STROKE / 2, a0 + Math.PI, a0 + Math.PI * 2, false);
  return shape;
}

// Fillet radius for an outline corner with the given angle between its two
// edges (radians): FILLET at 90 degrees and over; under 90 the radius is cut
// by 40% just below 90, rising to 70% at 30 degrees and sharper.
function cornerRadius(angle) {
  const deg = angle / RAD;
  if (deg >= 90) return FILLET;
  const share = Math.min(1, Math.max(0, (90 - deg) / 60));
  return FILLET * (1 - (0.4 + 0.3 * share));
}

// ---- Filleted solids for the straight-sided letters (N, T, A) ---------------
// ExtrudeGeometry's bevel shrinks the outline by moving each vertex, which
// folds over itself wherever a corner fillet is smaller than the edge fillet
// (the A's feet) and leaves the letter uneven. Instead the solid is built
// from rings: each ring is the sharp outline offset into the material by d,
// then filleted. Offsetting a fillet of radius r by d gives radius r - d on an
// outside corner (sharp once d passes r) and r + d on an inside corner, about
// the same centre, so every ring is the exact section of the filleted solid.

const ARC_STEPS = 8; // segments per corner fillet
const EDGE_STEPS = 6; // segments per quarter circle of the face-edge fillet
const SHARP = 1e-3; // radius standing in for a sharp corner

const sub = ([ax, ay], [bx, by]) => [ax - bx, ay - by];
const unit = ([x, y]) => {
  const l = Math.hypot(x, y);
  return [x / l, y / l];
};
const signedArea = (loop) =>
  loop.reduce((sum, [x1, y1], i) => {
    const [x2, y2] = loop[(i + 1) % loop.length];
    return sum + x1 * y2 - x2 * y1;
  }, 0) / 2;

// Per corner of a loop that has the material on its left: whether it is an
// outside corner, the angle between its edges, and its fillet radius.
function cornersOf(loop) {
  const n = loop.length;
  return loop.map((p, i) => {
    const toPrev = unit(sub(loop[(i - 1 + n) % n], p));
    const toNext = unit(sub(loop[(i + 1) % n], p));
    const outside = toNext[0] * toPrev[1] - toNext[1] * toPrev[0] > 0;
    const cos = toPrev[0] * toNext[0] + toPrev[1] * toNext[1];
    const angle = Math.acos(Math.min(1, Math.max(-1, cos)));
    return { outside, radius: cornerRadius(angle) };
  });
}

// The loop offset by d into the material (on its left), corners mitred.
function offsetLoop(loop, d) {
  const n = loop.length;
  return loop.map((p, i) => {
    const e1 = unit(sub(p, loop[(i - 1 + n) % n]));
    const e2 = unit(sub(loop[(i + 1) % n], p));
    const n1 = [-e1[1], e1[0]];
    const n2 = [-e2[1], e2[0]];
    const k = d / (1 + n1[0] * n2[0] + n1[1] * n2[1]);
    return [p[0] + (n1[0] + n2[0]) * k, p[1] + (n1[1] + n2[1]) * k];
  });
}

// One ring: the loop offset by d, each corner replaced by ARC_STEPS + 1
// points on its fillet. Every ring of a loop has the same point count.
function ring(loop, corners, d) {
  const sharp = offsetLoop(loop, d);
  const n = sharp.length;
  const points = [];
  sharp.forEach((p, i) => {
    const { outside, radius } = corners[i];
    const prev = sharp[(i - 1 + n) % n];
    const next = sharp[(i + 1) % n];
    const toPrev = unit(sub(prev, p));
    const toNext = unit(sub(next, p));
    const cos = toPrev[0] * toNext[0] + toPrev[1] * toNext[1];
    const half = Math.acos(Math.min(1, Math.max(-1, cos))) / 2;
    let r = outside ? Math.max(radius - d, SHARP) : radius + d;
    // Keep each fillet within 45% of its shorter neighbouring edge.
    const reach =
      0.45 * Math.min(Math.hypot(...sub(prev, p)), Math.hypot(...sub(next, p)));
    r = Math.min(r, reach * Math.tan(half));
    const t = r / Math.tan(half);
    const bisector = unit([toPrev[0] + toNext[0], toPrev[1] + toNext[1]]);
    const centre = [
      p[0] + (bisector[0] * r) / Math.sin(half),
      p[1] + (bisector[1] * r) / Math.sin(half),
    ];
    const start = [p[0] + toPrev[0] * t, p[1] + toPrev[1] * t];
    const end = [p[0] + toNext[0] * t, p[1] + toNext[1] * t];
    const a0 = Math.atan2(start[1] - centre[1], start[0] - centre[0]);
    let sweep = Math.atan2(end[1] - centre[1], end[0] - centre[0]) - a0;
    // The short way round: a fillet turns through less than half a circle.
    sweep = Math.atan2(Math.sin(sweep), Math.cos(sweep));
    for (let k = 0; k <= ARC_STEPS; k += 1) {
      const a = a0 + (sweep * k) / ARC_STEPS;
      points.push([centre[0] + r * Math.cos(a), centre[1] + r * Math.sin(a)]);
    }
  });
  return points;
}

// Filleted solid from an outline and its holes (sharp corners, any winding),
// from z = 0 to DEPTH.
function filletedSolid(THREE, outline, holes = []) {
  // Material on the left: outline counter-clockwise, holes clockwise.
  const outer = signedArea(outline) > 0 ? outline : [...outline].reverse();
  const loops = [
    outer,
    ...holes.map((h) => (signedArea(h) < 0 ? h : [...h].reverse())),
  ];
  const corners = loops.map(cornersOf);

  // Section levels through the depth: a quarter circle of FILLET at each
  // face, straight between.
  const levels = [];
  for (let k = 0; k <= EDGE_STEPS; k += 1) {
    const a = (k / EDGE_STEPS) * (Math.PI / 2);
    levels.push({
      z: FILLET * (1 - Math.cos(a)),
      d: FILLET * (1 - Math.sin(a)),
    });
  }
  for (let k = EDGE_STEPS; k >= 0; k -= 1) {
    const a = (k / EDGE_STEPS) * (Math.PI / 2);
    levels.push({
      z: DEPTH - FILLET * (1 - Math.cos(a)),
      d: FILLET * (1 - Math.sin(a)),
    });
  }

  const positions = [];
  const index = [];
  const push = ([x, y], z) => {
    positions.push(x, y, z);
    return positions.length / 3 - 1;
  };

  // Sides: one band of quads between each pair of levels, per loop.
  const rings = levels.map(({ z, d }) =>
    loops.map((loop, li) => ring(loop, corners[li], d).map((p) => push(p, z))),
  );
  for (let i = 0; i < levels.length - 1; i += 1) {
    loops.forEach((_, li) => {
      const a = rings[i][li];
      const b = rings[i + 1][li];
      const n = a.length;
      for (let j = 0; j < n; j += 1) {
        const j2 = (j + 1) % n;
        index.push(a[j], a[j2], b[j], a[j2], b[j2], b[j]);
      }
    });
  }

  // Flat faces, with their own vertices so their normals stay square.
  const cap = (level, facingUp) => {
    const { z, d } = levels[level];
    const sections = loops.map((loop, li) => ring(loop, corners[li], d));
    const flat = sections.flat();
    const ids = flat.map((p) => push(p, z));
    const triangles = THREE.ShapeUtils.triangulateShape(
      sections[0].map(([x, y]) => new THREE.Vector2(x, y)),
      sections.slice(1).map((h) => h.map(([x, y]) => new THREE.Vector2(x, y))),
    );
    triangles.forEach(([a, b, c]) => {
      const [ax, ay] = flat[a];
      const [bx, by] = flat[b];
      const [cx, cy] = flat[c];
      const ccw = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax) > 0;
      if (ccw === facingUp) index.push(ids[a], ids[b], ids[c]);
      else index.push(ids[a], ids[c], ids[b]);
    });
  };
  cap(0, false);
  cap(levels.length - 1, true);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setIndex(index);
  geometry.computeVertexNormals();
  return geometry;
}

// A's legs run at this slope (x per unit of y).
const A_SLOPE = 0.35;
const A_WIDTH = 36;
const A_BAR = 10; // underside of the crossbar
const A_INNER = (y) => STROKE + 0.5 + A_SLOPE * y; // left leg, inner edge
const A_APEX = (A_WIDTH - STROKE) / 2; // left end of the flat top
const A_HOLE_TOP = (A_WIDTH / 2 - STROKE - 0.5) / A_SLOPE; // inner edges meet
const A_BAR_TOP = A_BAR + STROKE;
const A_OUTLINE = [
  [0, 0],
  [STROKE + 0.5, 0],
  [A_INNER(A_BAR), A_BAR],
  [A_WIDTH - A_INNER(A_BAR), A_BAR],
  [A_WIDTH - STROKE - 0.5, 0],
  [A_WIDTH, 0],
  [A_APEX + STROKE, CAP],
  [A_APEX, CAP],
];
const A_HOLE = [
  [A_INNER(A_BAR_TOP), A_BAR_TOP],
  [A_WIDTH / 2, A_HOLE_TOP],
  [A_WIDTH - A_INNER(A_BAR_TOP), A_BAR_TOP],
];

const LETTERS = {
  C: {
    width: CAP,
    shape: cShape,
    arcs: [
      {
        cx: R_OUT,
        cy: R_OUT,
        r: R_MID,
        from: C_OPEN,
        to: Math.PI * 2 - C_OPEN,
      },
    ],
    lines: [],
  },
  O: {
    width: CAP,
    shape: ringShape,
    arcs: [{ cx: R_OUT, cy: R_OUT, r: R_MID, from: 0, to: Math.PI * 2 }],
    lines: [],
  },
  N: {
    width: 32,
    outline: [
      [0, 0],
      [8, 0],
      [8, 26],
      [24, 0],
      [32, 0],
      [32, 40],
      [24, 40],
      [24, 14],
      [8, 40],
      [0, 40],
    ],
    arcs: [],
    lines: [
      [
        [4, 4],
        [4, 36],
      ],
      [
        [4, 36],
        [28, 4],
      ],
      [
        [28, 4],
        [28, 36],
      ],
    ],
  },
  T: {
    width: 32,
    outline: [
      [12, 0],
      [20, 0],
      [20, 32],
      [32, 32],
      [32, 40],
      [0, 40],
      [0, 32],
      [12, 32],
    ],
    arcs: [],
    lines: [
      [
        [4, 36],
        [28, 36],
      ],
      [
        [16, 36],
        [16, 4],
      ],
    ],
  },
  A: {
    width: A_WIDTH,
    outline: A_OUTLINE,
    holes: [A_HOLE],
    arcs: [],
    lines: [
      [
        [(STROKE + 0.5) / 2 + A_SLOPE * 4, 4],
        [A_WIDTH / 2, 35],
      ],
      [
        [A_WIDTH / 2, 35],
        [A_WIDTH - (STROKE + 0.5) / 2 - A_SLOPE * 4, 4],
      ],
      [
        [(STROKE + 0.5) / 2 + A_SLOPE * 14, 14],
        [A_WIDTH - (STROKE + 0.5) / 2 - A_SLOPE * 14, 14],
      ],
    ],
  },
};

const WORD = ["C", "O", "N", "T", "A", "C", "T"];

// Soft round light pool, drawn once and shared by every letter.
function poolTexture(THREE) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(34, 211, 238, 0.5)");
  g.addColorStop(0.45, "rgba(34, 211, 238, 0.14)");
  g.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function create({ THREE, tokens, renderer }) {
  const object = new THREE.Group();

  // ---- Shared resources ---------------------------------------------------
  // The glass needs something to reflect: a neutral room, prefiltered once.
  const pmrem = renderer ? new THREE.PMREMGenerator(renderer) : null;
  const envMap = pmrem?.fromScene(new RoomEnvironment(), 0.04).texture ?? null;

  // Clear refractive glass. Transmission samples the opaque scene behind
  // each letter (its light channel included), so the stage draws this scene
  // on an opaque navy background (see `background` below).
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.03,
    transmission: 1,
    ior: 1.5,
    thickness: 3,
    attenuationColor: new THREE.Color(tokens.render),
    attenuationDistance: 90,
    specularIntensity: 1,
    envMap,
    envMapIntensity: 0.6,
  });

  const pool = poolTexture(THREE);

  // The glass refracts only opaque objects, and the stage's floor grid is
  // transparent, so behind each letter it would vanish and the glass would
  // read as smoked. This scene hides the stage floor (camera.at, floor 0)
  // and draws its own copy with the grid made opaque: each line colour is
  // pre-blended over the navy background, so it looks the same and shows
  // through the glass.
  const floor = blueprintFloor();
  // Additive pools read brighter than blended ones: run them at POOL.
  floor.userData.set(POOL, 0);
  const grid = floor.children[0];
  const navy = new THREE.Color(tokens.navy);
  const lineColour = new THREE.Color();
  const colours = grid.geometry.getAttribute("color");
  for (let i = 0; i < colours.count; i += 1) {
    const a = colours.getW(i);
    lineColour.setRGB(colours.getX(i), colours.getY(i), colours.getZ(i));
    lineColour.lerpColors(navy, lineColour, a);
    colours.setXYZW(i, lineColour.r, lineColour.g, lineColour.b, 1);
  }
  grid.material.transparent = false;
  grid.material.depthWrite = true;
  // The light pools glow on the floor, so the glass must refract them too.
  // Additive blending on a material that is not flagged transparent keeps
  // them in the opaque pass, which is the one the glass samples.
  const additive = (material) => {
    material.transparent = false;
    material.blending = THREE.AdditiveBlending;
    material.depthWrite = false;
  };
  floor.children.slice(1).forEach((mesh) => additive(mesh.material));
  object.add(floor);

  // One extruded body and one set of channel geometries per letterform,
  // shared by repeated letters (two Cs, two Ts).
  const forms = {};
  Object.entries(LETTERS).forEach(([key, letter]) => {
    // Straight-sided letters get the filleted solid. C and O have no
    // corners, so the extrusion bevel (a quarter circle of FILLET, inset by
    // the same amount) is exact for them.
    let body;
    if (letter.outline) {
      body = filletedSolid(THREE, letter.outline, letter.holes);
    } else {
      body = new THREE.ExtrudeGeometry(letter.shape(THREE), {
        depth: DEPTH - 2 * FILLET,
        bevelEnabled: true,
        bevelThickness: FILLET,
        bevelSize: FILLET,
        bevelOffset: -FILLET,
        bevelSegments: EDGE_STEPS,
        curveSegments: 24,
      });
      body.translate(0, 0, FILLET);
    }

    const channels = [];
    letter.arcs.forEach(({ cx, cy, r, from, to }) => {
      const arc = to - from;
      const geometry = new THREE.TorusGeometry(r, TUBE, 10, 96, arc);
      geometry.rotateZ(from);
      geometry.translate(cx, cy, 0);
      channels.push(geometry);
      if (arc < Math.PI * 2 - 0.01) {
        // Round ends on an open arc.
        [from, to].forEach((a) => {
          const cap = new THREE.SphereGeometry(TUBE, 10, 8);
          cap.translate(cx + r * Math.cos(a), cy + r * Math.sin(a), 0);
          channels.push(cap);
        });
      }
    });
    letter.lines.forEach(([[x1, y1], [x2, y2]]) => {
      const length = Math.hypot(x2 - x1, y2 - y1);
      const geometry = new THREE.CapsuleGeometry(TUBE, length, 4, 10);
      geometry.rotateZ(Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2);
      geometry.translate((x1 + x2) / 2, (y1 + y2) / 2, 0);
      channels.push(geometry);
    });

    forms[key] = { body, channels };
  });

  // ---- The word -------------------------------------------------------------
  const word = new THREE.Group();

  let x = 0;
  const letters = WORD.map((key) => {
    const letter = LETTERS[key];
    const form = forms[key];
    const group = new THREE.Group();
    group.position.x = x;
    word.add(group);

    const light = new THREE.MeshStandardMaterial({
      color: 0x0e7490,
      emissive: tokens.cyan,
      emissiveIntensity: REST,
      roughness: 0.4,
    });

    const channel = new THREE.Group();
    channel.position.z = DEPTH / 2;
    form.channels.forEach((geometry) =>
      channel.add(new THREE.Mesh(geometry, light)),
    );
    group.add(channel);

    group.add(new THREE.Mesh(form.body, glass));

    // A point light inside each letter lights its own glass and the floor.
    const lamp = new THREE.PointLight(tokens.cyan, 0, 60, 2);
    lamp.position.set(letter.width / 2, CAP / 2, DEPTH / 2);
    group.add(lamp);

    const floorGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(letter.width * 2.2, letter.width * 2.2),
      new THREE.MeshBasicMaterial({ map: pool, opacity: REST }),
    );
    additive(floorGlow.material);
    floorGlow.rotation.x = -Math.PI / 2;
    floorGlow.position.set(letter.width / 2, -0.2, DEPTH / 2);
    group.add(floorGlow);

    const centre = x + letter.width / 2;
    x += letter.width + GAP;
    return { light, lamp, floorGlow, centre, level: REST, target: REST };
  });

  const span = x - GAP;
  const pitch = span / WORD.length;

  // Centre the word on the origin, standing on the floor, and turn it so it
  // runs away from the camera to the right, as in the render.
  word.position.set(-span / 2, 0, -DEPTH / 2);
  const stand = new THREE.Group();
  stand.add(word);
  stand.rotation.y = 28 * RAD;
  object.add(stand);

  // Brighter also means paler: at full level the channels run from cyan-400
  // towards cyan-100, so the change reads without any bloom.
  const restColour = new THREE.Color(tokens.cyan);
  const hotColour = new THREE.Color(0xcffafe);
  const apply = (entry) => {
    const heat = (entry.level - REST) / (1 - REST);
    entry.light.emissive.copy(restColour).lerp(hotColour, heat * 0.6);
    entry.light.emissiveIntensity = 0.35 + entry.level * 0.65;
    entry.lamp.intensity = entry.level * 900;
    entry.floorGlow.material.opacity = entry.level * POOL;
  };
  letters.forEach(apply);

  // ---- Pointer --------------------------------------------------------------
  // The pointer ray is cut with the vertical plane through the middle of the
  // word: that gives a position along the word whether or not the pointer is
  // over glass, so the glow moves smoothly across the gaps.
  const plane = new THREE.Plane();
  const hit = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const middle = new THREE.Vector3();

  function pointer(raycaster) {
    let along = null;
    if (raycaster) {
      object.updateMatrixWorld(true);
      normal.set(0, 0, 1).transformDirection(word.matrixWorld);
      middle.set(span / 2, CAP / 2, DEPTH / 2).applyMatrix4(word.matrixWorld);
      plane.setFromNormalAndCoplanarPoint(normal, middle);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        word.worldToLocal(hit);
        const inside =
          hit.y > -CAP * 0.6 &&
          hit.y < CAP * 1.6 &&
          hit.x > -pitch &&
          hit.x < span + pitch;
        if (inside) along = hit.x;
      }
    }
    letters.forEach((entry) => {
      if (along === null) {
        entry.target = REST;
      } else {
        const d = (along - entry.centre) / pitch;
        entry.target = REST + (1 - REST) * Math.exp(-d * d);
      }
    });
  }

  // Ease each letter towards its target; true while any is still moving.
  function step(dt) {
    let moving = false;
    letters.forEach((entry) => {
      const tau = entry.target > entry.level ? RISE : FALL;
      entry.level += (entry.target - entry.level) * (1 - Math.exp(-dt / tau));
      if (Math.abs(entry.target - entry.level) < SETTLED) {
        entry.level = entry.target;
      } else {
        moving = true;
      }
      apply(entry);
    });
    return moving;
  }

  return {
    object,
    update() {},
    // Opaque page navy behind the scene, so the glass refracts navy rather
    // than three.js's half-transparent white stand-in.
    background: tokens.navy,
    pointer,
    step,
    camera: {
      target: new THREE.Vector3(0, 14, 0),
      distance: 350,
      elevation: 34 * RAD,
      swing: 0,
      period: 1,
      // Hide the stage floor; this scene draws its own (see above).
      at: () => ({ floor: 0 }),
    },
    dispose() {
      Object.values(forms).forEach(({ body, channels }) => {
        body.dispose();
        channels.forEach((geometry) => geometry.dispose());
      });
      pool.dispose();
      envMap?.dispose();
      pmrem?.dispose();
    },
  };
}
