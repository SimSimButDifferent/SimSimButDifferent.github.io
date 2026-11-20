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
// Fillets: every outside (convex) edge is rounded at FILLET, both round the
// front and back faces and down the corners of the outline. Outline corners
// sharper than 90 degrees take a smaller fillet (see cornerRadius). Inside
// corners stay sharp.
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
// Each letter: width, outline(THREE) -> Shape, and the centreline of its
// stroke as arcs and segments for the light channels.

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

// Fillet radius for an outline corner with the given interior angle
// (radians): FILLET at 90 degrees and over; under 90 the radius is cut by
// 40% just below 90, rising to 70% at 30 degrees and sharper.
function cornerRadius(angle) {
  const deg = angle / RAD;
  if (deg >= 90) return FILLET;
  const share = Math.min(1, Math.max(0, (90 - deg) / 60));
  return FILLET * (1 - (0.4 + 0.3 * share));
}

// Outline through `points` (counter-clockwise) with every convex corner
// filleted; concave corners are left sharp.
function filletedOutline(THREE, points) {
  const shape = new THREE.Shape();
  const n = points.length;
  const at = (i) => new THREE.Vector2(...points[(i + n) % n]);
  points.forEach((_, i) => {
    const p = at(i);
    const toPrev = at(i - 1).sub(p);
    const toNext = at(i + 1).sub(p);
    const convex = toNext.x * toPrev.y - toNext.y * toPrev.x > 0;
    const lenPrev = toPrev.length();
    const lenNext = toNext.length();
    toPrev.divideScalar(lenPrev);
    toNext.divideScalar(lenNext);
    if (!convex) {
      if (i === 0) shape.moveTo(p.x, p.y);
      else shape.lineTo(p.x, p.y);
      return;
    }
    const angle = Math.acos(Math.min(1, Math.max(-1, toPrev.dot(toNext))));
    // Tangent length, kept to under half of either neighbouring edge.
    let r = cornerRadius(angle);
    let t = r / Math.tan(angle / 2);
    const tMax = 0.45 * Math.min(lenPrev, lenNext);
    if (t > tMax) {
      t = tMax;
      r = t * Math.tan(angle / 2);
    }
    const start = p.clone().addScaledVector(toPrev, t);
    const end = p.clone().addScaledVector(toNext, t);
    const bisector = toPrev.clone().add(toNext).normalize();
    const centre = p.clone().addScaledVector(bisector, r / Math.sin(angle / 2));
    if (i === 0) shape.moveTo(start.x, start.y);
    else shape.lineTo(start.x, start.y);
    shape.absarc(
      centre.x,
      centre.y,
      r,
      Math.atan2(start.y - centre.y, start.x - centre.x),
      Math.atan2(end.y - centre.y, end.x - centre.x),
      false,
    );
  });
  shape.closePath();
  return shape;
}

function polygon(THREE, points, holes = []) {
  const shape = filletedOutline(THREE, points);
  holes.forEach((hole) => {
    shape.holes.push(
      new THREE.Path(hole.map(([x, y]) => new THREE.Vector2(x, y))),
    );
  });
  return shape;
}

// A's legs run at this slope (x per unit of y).
const A_SLOPE = 0.35;
const A_WIDTH = 36;
const A_BAR = 10; // underside of the crossbar

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
    shape: (THREE) =>
      polygon(THREE, [
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
      ]),
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
    shape: (THREE) =>
      polygon(THREE, [
        [12, 0],
        [20, 0],
        [20, 32],
        [32, 32],
        [32, 40],
        [0, 40],
        [0, 32],
        [12, 32],
      ]),
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
    shape: (THREE) => {
      const s = A_SLOPE;
      const w = A_WIDTH;
      const top = CAP;
      const apexL = (w - STROKE) / 2;
      const inner = (y) => STROKE + 0.5 + s * y; // left leg, inner edge
      const holeTop = (w / 2 - STROKE - 0.5) / s; // where the inner edges meet
      const barTop = A_BAR + STROKE;
      return polygon(
        THREE,
        [
          [0, 0],
          [STROKE + 0.5, 0],
          [inner(A_BAR), A_BAR],
          [w - inner(A_BAR), A_BAR],
          [w - STROKE - 0.5, 0],
          [w, 0],
          [apexL + STROKE, top],
          [apexL, top],
        ],
        [
          [
            [inner(barTop), barTop],
            [w / 2, holeTop],
            [w - inner(barTop), barTop],
          ],
        ],
      );
    },
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
    // The bevel is the face-edge fillet: a quarter circle of FILLET, inset
    // by the same amount so the letter keeps its outline size.
    const body = new THREE.ExtrudeGeometry(letter.shape(THREE), {
      depth: DEPTH - 2 * FILLET,
      bevelEnabled: true,
      bevelThickness: FILLET,
      bevelSize: FILLET,
      bevelOffset: -FILLET,
      bevelSegments: 6,
      curveSegments: 24,
    });
    body.translate(0, 0, FILLET);

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
