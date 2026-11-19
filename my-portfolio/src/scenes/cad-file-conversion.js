// CAD file conversion scroll scene: a folded sheet-metal bracket travels
// through two format gates. Past the STEP gate one face is missing; it is
// flagged and patched. Past the DXF gate the bracket is a flat pattern, traced
// once by a laser point, and the conversion note arrives. Mirrors the CAD
// file conversion service video: same part, same labels, same values. Every
// value is a function of t, so the scene can be scrubbed in either direction.
//
// The bracket holds the centre of the stage. Travel is shown by what passes
// it: the gates, and the ticks on a pair of conveyor rails under the part.
//
// Timeline (seconds, matching the video's beats at 0 / 3.0 / 6.8 / 10.6):
//   0.0  folded ice-blue bracket, ".SLDPRT"
//   2.9  STEP gate sweeps through; behind it the front flange is missing and
//        outlined in dashed cyan; label becomes ".STEP"
//   6.8  "Missing face" callout; the flange is patched; "Patched"
//  10.6  flanges unfold about their bend lines; DXF gate sweeps through and
//        leaves a white outline, ".DXF"; laser point traces the outline;
//        conversion note ticks its two rows

import { stroke, setSegments, setPath } from "./lines";

// Bracket, in millimetres. x runs along the bracket (the direction of
// travel), z from the back flange (negative) to the front flange.
const LENGTH = 100;
const HALF = LENGTH / 2;
const BASE = 50; // base depth, bend line to bend line
const BACK = 44; // back flange height
const FRONT = 32; // front flange height
const THICKNESS = 2;
// Holes as { x, s, r }: s is measured from the panel's bend line (for the
// base, from the back bend line).
const BASE_HOLES = [
  { x: -27, s: 25, r: 5 },
  { x: 27, s: 25, r: 5 },
];
const BACK_HOLES = [{ x: -18, s: 27, r: 4 }];
const FRONT_HOLES = [{ x: 16, s: 16, r: 4 }];

// Gates: a frame across the direction of travel.
const GATE_WIDTH = 104;
const GATE_HEIGHT = 88;
const SPEED = 100; // mm per second: how fast the gates and rail ticks pass
const STEP_AT = 4.0; // time the STEP gate crosses the middle of the bracket
const DXF_AT = 11.3;
// A cut face stops this far behind the gate plane, so the two never share a
// plane and flicker.
const BEHIND = 0.6;

// Conveyor rails, either side of the flat pattern.
const RAIL_Z = 86;
const RAIL_REACH = 130;
const TICK_PITCH = 26;
const TICK_LENGTH = 7;

// World units per millimetre. With the camera distances below, this keeps
// the bracket large in frame and the floor's fade inside the canvas.
const SCALE = 0.75;
// Showcase only: how far the turning bracket moves left, in millimetres, so
// it clears the conversion note.
const SHOWCASE_SHIFT = 22;
const RAD = Math.PI / 180;
const AZIMUTH = 28 * RAD; // story view: from the front right
const ELEVATION = 22 * RAD;
const SHOWCASE_ELEVATION = 30 * RAD;

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const ramp = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, x) => a + (b - a) * x;

// Opacity of a gate at position x: it fades in and out at the ends of the
// run, inside the reach of the floor.
const gateFade = (x) => 1 - ramp(Math.abs(x), 78, 116);

export function paramsAt(t) {
  const stepGate = (STEP_AT - t) * SPEED;
  const dxfGate = (DXF_AT - t) * SPEED;
  const patch = easeInOut(ramp(t, 7.9, 8.5));
  // Right-hand end of the front flange. The STEP gate removes it as it
  // passes (from the right, the end that goes through first); the patch
  // fills it back in from the left.
  const flangeEnd =
    t < 7 ? clamp(stepGate - BEHIND, -HALF, HALF) : lerp(-HALF, HALF, patch);
  return {
    travel: t * SPEED,
    stepGate,
    dxfGate,
    flangeEnd,
    // Outline of the missing face, from this x to the right-hand end.
    missingFrom: clamp(stepGate, -HALF, HALF),
    missing: ramp(t, 3.45, 3.6) * (1 - ramp(t, 9.0, 9.5)),
    patched: patch >= 1, // the dashed outline turns solid
    edges: lerp(0.3, 0.85, ramp(t, 3.5, 4.5)),
    extension: t < STEP_AT ? ".SLDPRT" : t < DXF_AT ? ".STEP" : ".DXF",
    // The label dips out and back as it changes.
    extensionOn:
      1 -
      (1 - Math.abs(clamp((t - STEP_AT) / 0.2, -1, 1))) -
      (1 - Math.abs(clamp((t - DXF_AT) / 0.2, -1, 1))),
    callout: easeOut(ramp(t, 6.9, 7.4)) * (1 - ramp(t, 9.6, 10.1)),
    calloutText: t < 8.5 ? "Missing face" : "Patched",
    fold: 1 - easeInOut(ramp(t, 10.5, 11.0)), // 1 folded, 0 flat
    // Right-hand end of the solid, and left-hand end of the flat outline.
    solidEnd: clamp(dxfGate - BEHIND, -HALF, HALF),
    outlineFrom: clamp(dxfGate, -HALF, HALF),
    // The video's trace runs on into the loop return; here it finishes
    // inside the last pane so the scene rests on a complete outline.
    trace: easeInOut(ramp(t, 11.65, 12.4)),
    laser: ramp(t, 11.55, 11.65),
    note: easeOut(ramp(t, 11.0, 11.5)),
    ticked: t >= 12.1 ? 2 : t >= 11.7 ? 1 : 0,
    rails: 1,
  };
}

// Landing loop: the finished, folded bracket and its ticked conversion note.
const SHOWCASE = {
  travel: 0,
  stepGate: 1e4,
  dxfGate: 1e4,
  flangeEnd: HALF,
  missingFrom: HALF,
  missing: 0,
  patched: true,
  edges: 0.45,
  extension: ".STEP",
  extensionOn: 0,
  callout: 0,
  calloutText: "Patched",
  fold: 1,
  solidEnd: HALF,
  outlineFrom: HALF,
  trace: 0,
  laser: 0,
  note: 1,
  ticked: 2,
  rails: 0,
};

export function create({ THREE, tokens, fontFamily }) {
  // object: everything. body: the bracket, which turns in the showcase. The
  // gates, rails, labels and conversion note stay on object.
  const object = new THREE.Group();
  object.scale.setScalar(SCALE);
  const body = new THREE.Group();
  object.add(body);
  const textures = new Map();

  // A sprite compiled without a map ignores one assigned later unless the
  // material is flagged for recompilation.
  function setMap(material, texture) {
    if (material.map === texture) return;
    material.map = texture;
    material.needsUpdate = true;
  }

  function cached(key, width, height, draw) {
    if (textures.has(key)) return textures.get(key);
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    draw(c.getContext("2d"));
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.set(key, texture);
    return texture;
  }

  // White label on a navy plate, so it reads over a gate and the floor.
  const labelTexture = (text) =>
    cached(`label-${text}`, 384, 96, (ctx) => {
      ctx.font = `400 40px ${fontFamily}`;
      const width = ctx.measureText(text).width + 44;
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.beginPath();
      ctx.roundRect(192 - width / 2, 10, width, 76, 14);
      ctx.fill();
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = tokens.ink;
      ctx.fillText(text, 192, 50);
    });

  function label(text) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: text ? labelTexture(text) : null,
        transparent: true,
        depthTest: false,
      })
    );
    sprite.scale.set(52, 13, 1);
    sprite.renderOrder = 3;
    return sprite;
  }

  // ---- Bracket ----------------------------------------------------------
  // Three plates joined at two bend lines. Each is drawn in (x, s), where s
  // runs away from the plate's bend line, and can be cut short at any x: by
  // a gate passing through it, or by the patch filling it back in.

  // Plate from x = -HALF to `end`, s = 0 to `length`. A hole wholly inside
  // is cut out; a hole the cut passes through becomes a notch in the edge.
  function plateShape(end, length, holes) {
    const shape = new THREE.Shape();
    shape.moveTo(-HALF, 0);
    shape.lineTo(end, 0);
    holes
      .filter((hole) => Math.abs(end - hole.x) < hole.r - 0.05)
      .sort((a, b) => a.s - b.s)
      .forEach((hole) => {
        const angle = Math.acos((end - hole.x) / hole.r);
        shape.lineTo(end, hole.s - hole.r * Math.sin(angle));
        shape.absarc(hole.x, hole.s, hole.r, -angle, angle, true);
      });
    shape.lineTo(end, length);
    shape.lineTo(-HALF, length);
    shape.closePath();
    holes
      .filter((hole) => end - hole.x >= hole.r - 0.05)
      .forEach((hole) => {
        const path = new THREE.Path();
        path.absarc(hole.x, hole.s, hole.r, 0, Math.PI * 2, true);
        shape.holes.push(path);
      });
    return shape;
  }

  // The plates overlap for one thickness at each bend, where their faces
  // share a plane. They share one material, so those faces shade the same;
  // the offset keeps the white edge lines in front of the faces they sit on.
  const skin = new THREE.MeshStandardMaterial({
    color: tokens.render,
    roughness: 0.32,
    metalness: 0.35,
    // A little self-light, so a flange's outer face does not go black as it
    // swings down towards the floor during the unfold.
    emissive: tokens.render,
    emissiveIntensity: 0.14,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: tokens.ink,
    transparent: true,
  });

  // Flat-pattern line-work for one plate: white for cut edges and holes.
  // `sides` lists which of the plate's edges are on the outside of the flat
  // pattern: "far" (s = length), and the two ends are always included.
  function makePlate({ length, holes, towards, sides }) {
    // towards: -1 if s runs towards the back (negative z), +1 the front.
    const group = new THREE.Group();
    const solid = new THREE.Mesh(new THREE.BufferGeometry(), skin);
    const edges = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      edgeMaterial
    );
    const outline = stroke(tokens.ink, 2);
    outline.renderOrder = 2;
    group.add(solid, edges, outline);
    body.add(group);

    // Lay a point of the (x, s) drawing on the plate's top face.
    const lay = (x, s) => new THREE.Vector3(x, THICKNESS, towards * s);

    let builtSolid = null;
    let builtOutline = null;

    return {
      group,
      lay,
      set({ end, outlineFrom }) {
        const hasSolid = end > -HALF + 0.05;
        const solidKey = hasSolid ? end.toFixed(3) : "none";
        if (solidKey !== builtSolid) {
          builtSolid = solidKey;
          solid.geometry.dispose();
          edges.geometry.dispose();
          if (hasSolid) {
            const geometry = new THREE.ExtrudeGeometry(
              plateShape(end, length, holes),
              { depth: THICKNESS, bevelEnabled: false, curveSegments: 12 }
            );
            // Shape (x, s), extruded along +z, laid flat with the thickness
            // upwards and s running the plate's way.
            if (towards < 0) {
              geometry.rotateX(-Math.PI / 2);
            } else {
              geometry.rotateX(Math.PI / 2);
              geometry.translate(0, THICKNESS, 0);
            }
            solid.geometry = geometry;
            edges.geometry = new THREE.EdgesGeometry(geometry, 25);
          } else {
            solid.geometry = new THREE.BufferGeometry();
            edges.geometry = new THREE.BufferGeometry();
          }
        }
        solid.visible = hasSolid;
        edges.visible = hasSolid && edgeMaterial.opacity > 0.001;

        const hasOutline = outlineFrom < HALF - 0.05;
        const outlineKey = hasOutline ? outlineFrom.toFixed(3) : "none";
        if (outlineKey !== builtOutline) {
          builtOutline = outlineKey;
          const points = [];
          if (hasOutline) {
            const from = outlineFrom;
            if (sides.includes("far")) {
              points.push(lay(from, length), lay(HALF, length));
            }
            points.push(lay(HALF, 0), lay(HALF, length));
            if (from <= -HALF + 0.05) {
              points.push(lay(-HALF, 0), lay(-HALF, length));
            }
            holes.forEach((hole) => {
              const steps = 40;
              for (let i = 0; i < steps; i++) {
                const a = (i / steps) * Math.PI * 2;
                const b = ((i + 1) / steps) * Math.PI * 2;
                const xa = hole.x + hole.r * Math.cos(a);
                const xb = hole.x + hole.r * Math.cos(b);
                if (xa < from || xb < from) continue;
                points.push(
                  lay(xa, hole.s + hole.r * Math.sin(a)),
                  lay(xb, hole.s + hole.r * Math.sin(b))
                );
              }
            });
          }
          setSegments(outline, points);
        }
      },
    };
  }

  // Base: s runs from the front bend line to the back one.
  const base = makePlate({
    length: BASE,
    holes: BASE_HOLES.map((hole) => ({ ...hole, s: BASE - hole.s })),
    towards: -1,
    sides: [],
  });
  base.group.position.z = BASE / 2;
  const back = makePlate({
    length: BACK,
    holes: BACK_HOLES,
    towards: -1,
    sides: ["far"],
  });
  back.group.position.z = -BASE / 2;
  const front = makePlate({
    length: FRONT,
    holes: FRONT_HOLES,
    towards: 1,
    sides: ["far"],
  });
  front.group.position.z = BASE / 2;

  // Bend lines of the flat pattern: construction geometry, so dashed cyan.
  const bends = stroke(tokens.cyan, 2, true);
  bends.renderOrder = 2;
  base.group.add(bends);
  let builtBends = null;
  function setBends(from) {
    const on = from < HALF - 0.05;
    const key = on ? from.toFixed(3) : "none";
    if (key !== builtBends) {
      builtBends = key;
      setSegments(
        bends,
        on
          ? [
              base.lay(HALF, 0),
              base.lay(from, 0),
              base.lay(HALF, BASE),
              base.lay(from, BASE),
            ]
          : []
      );
    }
  }

  // Outline of the missing front flange: dashed while it is missing, solid
  // once it has been patched. Drawn on the flange's outer face.
  const missingDashed = stroke(tokens.cyan, 2.5, true);
  const missingSolid = stroke(tokens.cyan, 2.5);
  missingDashed.renderOrder = 2;
  missingSolid.renderOrder = 2;
  front.group.add(missingDashed, missingSolid);
  let builtMissing = null;
  function setMissing(from) {
    const key = from.toFixed(3);
    if (key === builtMissing) return;
    builtMissing = key;
    const at = (x, s) => new THREE.Vector3(x, 0, s);
    const points = [at(from, 0), at(HALF, 0), at(HALF, FRONT), at(from, FRONT)];
    if (from <= -HALF + 0.05) points.push(at(from, 0));
    setPath(missingDashed, points);
    setPath(missingSolid, points);
  }

  // ---- Laser trace ------------------------------------------------------
  // Once round the outside of the flat pattern, starting at the front left
  // corner and running along the front edge first, as in the video.
  const zFront = BASE / 2 + FRONT;
  const zBack = -BASE / 2 - BACK;
  const corners = [
    [-HALF, zFront],
    [HALF, zFront],
    [HALF, zBack],
    [-HALF, zBack],
    [-HALF, zFront],
  ].map(([x, z]) => new THREE.Vector3(x, THICKNESS, z));
  const legs = corners.slice(1).map((point, i) => point.distanceTo(corners[i]));
  const perimeter = legs.reduce((sum, leg) => sum + leg, 0);

  const trace = stroke(tokens.cyan, 3);
  trace.renderOrder = 3;
  body.add(trace);
  const laser = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: cached("laser", 64, 64, (ctx) => {
        ctx.fillStyle = "#a5f3fc";
        ctx.beginPath();
        ctx.arc(32, 32, 26, 0, Math.PI * 2);
        ctx.fill();
      }),
      transparent: true,
      depthTest: false,
    })
  );
  laser.scale.set(5, 5, 1);
  laser.renderOrder = 4;
  body.add(laser);

  function setTrace(fraction) {
    let left = fraction * perimeter;
    const points = [corners[0].clone()];
    for (let i = 0; i < legs.length && left > 0; i++) {
      const along = Math.min(1, left / legs[i]);
      points.push(corners[i].clone().lerp(corners[i + 1], along));
      left -= legs[i];
    }
    setPath(trace, points);
    laser.position.copy(points[points.length - 1]);
  }

  // ---- Gates ------------------------------------------------------------
  function makeGate(name) {
    const group = new THREE.Group();
    const half = GATE_WIDTH / 2;
    const frame = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(
        [
          [0, -half],
          [0, half],
          [GATE_HEIGHT, half],
          [GATE_HEIGHT, -half],
        ].map(([y, z]) => new THREE.Vector3(0, y, z))
      ),
      new THREE.LineBasicMaterial({ color: tokens.cyan, transparent: true })
    );
    const pane = new THREE.Mesh(
      new THREE.PlaneGeometry(GATE_WIDTH, GATE_HEIGHT).rotateY(Math.PI / 2),
      new THREE.MeshBasicMaterial({
        color: tokens.cyan,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    pane.position.y = GATE_HEIGHT / 2;
    pane.renderOrder = 1;
    const name_ = label(name);
    name_.position.set(0, GATE_HEIGHT + 9, half - 16);
    group.add(pane, frame, name_);
    object.add(group);
    return {
      set(x) {
        const on = gateFade(x);
        group.visible = on > 0.001;
        group.position.x = x;
        frame.material.opacity = on;
        pane.material.opacity = 0.1 * on;
        name_.material.opacity = on;
      },
    };
  }
  const stepGate = makeGate("STEP");
  const dxfGate = makeGate("DXF");

  // ---- Conveyor rails ---------------------------------------------------
  // Two rails with ticks that pass under the bracket at the speed of the
  // gates. They fade out with distance, like the floor they sit on.
  const railAlpha = (x, z) =>
    Math.max(0, 1 - Math.pow((Math.hypot(x, z) * SCALE) / 86, 2));
  const railColour = new THREE.Color(0xcbd5e1);
  const railPieces = 20;
  const tickCount = Math.ceil((RAIL_REACH * 2) / TICK_PITCH);
  const railVertices = (railPieces + tickCount) * 2 * 2;
  const railPositions = new Float32Array(railVertices * 3);
  const railColours = new Float32Array(railVertices * 4);
  const railGeometry = new THREE.BufferGeometry();
  railGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(railPositions, 3)
  );
  railGeometry.setAttribute("color", new THREE.BufferAttribute(railColours, 4));
  const rails = new THREE.LineSegments(
    railGeometry,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    })
  );
  rails.position.y = -0.3;
  object.add(rails);

  function setRails(travel) {
    let v = 0;
    const put = (x, z) => {
      railPositions.set([x, 0, z], v * 3);
      railColours.set(
        [railColour.r, railColour.g, railColour.b, railAlpha(x, z)],
        v * 4
      );
      v++;
    };
    [-1, 1].forEach((side) => {
      const z = side * RAIL_Z;
      for (let i = 0; i < railPieces; i++) {
        const piece = (RAIL_REACH * 2) / railPieces;
        put(-RAIL_REACH + i * piece, z);
        put(-RAIL_REACH + (i + 1) * piece, z);
      }
      for (let i = 0; i < tickCount; i++) {
        const span = tickCount * TICK_PITCH;
        const x =
          ((((i * TICK_PITCH - travel) % span) + span) % span) - span / 2;
        put(x, z);
        put(x, z - side * TICK_LENGTH);
      }
    });
    railGeometry.attributes.position.needsUpdate = true;
    railGeometry.attributes.color.needsUpdate = true;
  }

  // ---- Labels and callout -----------------------------------------------
  const extension = label("");
  extension.position.set(0, BACK + 24, 0);
  object.add(extension);

  // Callout on the front flange: leader from the face out to the label.
  const calloutFrom = new THREE.Vector3(26, FRONT * 0.55, BASE / 2);
  const calloutTo = new THREE.Vector3(74, 50, BASE / 2);
  const leader = stroke(tokens.cyan, 1.5);
  leader.renderOrder = 3;
  const calloutLabel = label("");
  calloutLabel.center.set(0.12, 0.5);
  calloutLabel.position.copy(calloutTo);
  object.add(leader, calloutLabel);

  // ---- Conversion note --------------------------------------------------
  const noteRows = [
    ["Missing face", "Patched"],
    ["Units", "Millimetres"],
  ];

  const noteTexture = (ticked) =>
    cached(`note-${ticked}`, 480, 512, (ctx) => {
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.roundRect(0, 0, 480, 512, 16);
      ctx.fill();
      ctx.fillStyle = "#475569";
      ctx.font = `600 22px ${fontFamily}`;
      ctx.fillText("CONVERSION NOTE", 40, 66);
      const rule = (y) => {
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(440, y);
        ctx.stroke();
      };
      noteRows.forEach(([name, value], i) => {
        const y = 100 + i * 136;
        rule(y);
        if (i >= ticked) return;
        ctx.fillStyle = "#475569";
        ctx.font = `400 24px ${fontFamily}`;
        ctx.fillText(name, 40, y + 48);
        ctx.fillStyle = "#0f172a";
        ctx.font = `600 34px ${fontFamily}`;
        ctx.fillText(value, 40, y + 96);
        ctx.fillStyle = "#0e7490";
        ctx.beginPath();
        ctx.arc(414, y + 70, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#f8fafc";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(404, y + 71);
        ctx.lineTo(411, y + 78);
        ctx.lineTo(424, y + 62);
        ctx.stroke();
      });
      rule(372);
      ctx.fillStyle = "#334155";
      ctx.font = `400 24px ${fontFamily}`;
      ctx.fillText("Opened and checked before", 40, 424);
      ctx.fillText("delivery", 40, 458);
    });

  const note = new THREE.Sprite(
    new THREE.SpriteMaterial({ transparent: true, depthTest: false })
  );
  note.scale.set(70.3, 75, 1); // 25% larger twice over the original 45 x 48
  note.renderOrder = 4;
  object.add(note);

  // ---- State ------------------------------------------------------------
  const target = new THREE.Vector3(0, 12, 0);
  let time = 0;
  let showcaseOn = false;
  let noteIn = 0;

  // Hold the note in the camera's plane, at the right of the view, so it
  // sits beside the bracket in the story view and in the showcase alike.
  function placeNote() {
    const azimuth = showcaseOn ? 0 : AZIMUTH;
    const elevation = showcaseOn ? SHOWCASE_ELEVATION : ELEVATION;
    const right = new THREE.Vector3(Math.cos(azimuth), 0, -Math.sin(azimuth));
    const back = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(elevation),
      Math.sin(elevation),
      Math.cos(azimuth) * Math.cos(elevation)
    );
    const up = new THREE.Vector3().crossVectors(back, right);
    note.position
      .copy(target)
      .addScaledVector(right, lerp(70, 64, noteIn))
      // Story: top right, above the flat pattern. Showcase: raised, beside
      // the turning bracket.
      .addScaledVector(up, showcaseOn ? 20 : 36)
      .divideScalar(SCALE);
  }

  function apply() {
    const p = showcaseOn ? SHOWCASE : paramsAt(time);

    edgeMaterial.opacity = p.edges;
    const fold = (p.fold * Math.PI) / 2;
    back.group.rotation.x = fold;
    front.group.rotation.x = -fold;

    base.set({ end: p.solidEnd, outlineFrom: p.outlineFrom });
    back.set({ end: p.solidEnd, outlineFrom: p.outlineFrom });
    front.set({
      end: Math.min(p.flangeEnd, p.solidEnd),
      outlineFrom: p.outlineFrom,
    });
    setBends(p.outlineFrom);

    setMissing(p.missingFrom);
    missingDashed.material.opacity = p.missing;
    missingSolid.material.opacity = p.missing;
    missingDashed.visible = p.missing > 0.001 && !p.patched;
    missingSolid.visible = p.missing > 0.001 && p.patched;

    setTrace(p.trace);
    trace.visible = p.trace > 0.001;
    laser.material.opacity = p.laser;
    laser.visible = p.laser > 0.001;

    stepGate.set(p.stepGate);
    dxfGate.set(p.dxfGate);

    setRails(p.travel);
    rails.material.opacity = p.rails;
    rails.visible = p.rails > 0.001;

    setMap(extension.material, labelTexture(p.extension));
    extension.material.opacity = p.extensionOn;
    extension.visible = p.extensionOn > 0.001;

    setPath(leader, [
      calloutFrom,
      calloutFrom.clone().lerp(calloutTo, Math.min(1, p.callout * 1.5)),
    ]);
    leader.material.opacity = p.callout;
    leader.visible = p.callout > 0.001;
    setMap(calloutLabel.material, labelTexture(p.calloutText));
    calloutLabel.material.opacity = ramp(p.callout, 0.6, 1);
    calloutLabel.visible = calloutLabel.material.opacity > 0.001;

    noteIn = p.note;
    setMap(note.material, noteTexture(p.ticked));
    note.material.opacity = p.note;
    note.visible = p.note > 0.001;
    placeNote();
  }

  function update(t) {
    time = t;
    apply();
  }

  // Showcase view, independent of scene time: the story ends on the flat
  // pattern, so the showcase swaps in the finished folded bracket and its
  // ticked note, with no gates, rails or labels. `spin` turns the bracket
  // about its centre (radians).
  function view({ spin, showcase }) {
    const on = showcase > 0.5;
    if (on !== showcaseOn) {
      showcaseOn = on;
      apply();
    }
    // Showcase: the bracket sits left of centre, clear of the conversion note.
    body.position.x = on ? -SHOWCASE_SHIFT : 0;
    body.rotation.y = on ? spin : 0;
  }

  return {
    object,
    update,
    view,
    camera: {
      target,
      distance: 280,
      elevation: ELEVATION,
      swing: 0,
      period: 15,
      // Story: a fixed view from the front right. The bracket holds the
      // centre while the gates and rail ticks pass. No pendulum.
      at: () => ({ azimuth: AZIMUTH }),
      // Showcase: a higher, isometric-style view; one full turn in 24 s.
      showcaseElevation: SHOWCASE_ELEVATION,
      showcaseDistance: 300,
      spinPeriod: 24,
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
    },
  };
}
