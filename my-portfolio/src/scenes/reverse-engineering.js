// Reverse engineering scroll scene: the physical housing (slate) is swept by
// a cyan scan plane into a point cloud, measured (centreline, then 110, 55
// and Ø70), rebuilt as a parametric model in white line-work, finished in
// ice-blue, and exploded along its centreline into body, bush and cap.
// Follows the reverse engineering service video as described in the video
// plan: same part, same moves. Every value is a function of t, so the scene
// can be scrubbed in either direction.
//
// Units are millimetres inside `part`; the whole scene is scaled by STORY
// (or SHOWCASE in the landing loop) so the floor's fade, about 100 world
// units from the origin, stays inside the canvas.
//
// Timeline (seconds, matching the video's beats at 0 / 3.0 / 6.8 / 10.6):
//   0.0  the physical part: body and cap, slate
//   3.2  the scan plane sweeps down; above it the solid becomes points
//   5.0  dashed centreline, then 110, 55 and Ø70, one at a time
//   6.9  the model draws on in white line-work, bottom to top; the cloud fades
//   8.9  the model turns ice-blue, the line-work and dimensions fade
//  10.6  the cap lifts, then the bush rises out of the bore

import { stroke, setSegments, setPath } from "./lines";
import { HOUSING, housingAssembly } from "./parts/housing";

const RAD = Math.PI / 180;
const END = 12.5;

const STORY = 0.64; // world units per mm in the story
const SHOWCASE = 0.7; // and in the landing loop

// Camera pendulum, as the video: ±22° over its 15 s period.
const SWING = 22 * RAD;
const PERIOD = 15;
const azimuthAt = (t) => SWING * Math.sin((2 * Math.PI * t) / PERIOD);

// Exploded offsets (mm). The cap lifts first; the bush follows up the bore
// once the cap is clear, and stops short of the cap's spigot.
const CAP_LIFT = 72;
const BUSH_LIFT = 62;

// Scan plane: starts above the cap, ends below the flange.
const SCAN_TOP = 72;
const SCAN_BOTTOM = -3;
const SCAN_SIZE = 150;

const POINTS = 5200;

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const ramp = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, x) => a + (b - a) * x;

// Dimension placement: extension lines first, then the dimension line from
// its middle outwards, then the value.
const DIM_TIMES = { d110: 5.35, d55: 5.8, d70: 6.25 };
const placeDim = (t, start) => ({
  extension: ramp(t, start, start + 0.15),
  line: ramp(t, start + 0.12, start + 0.3),
  value: ramp(t, start + 0.26, start + 0.4),
});

export function paramsAt(t) {
  const sweep = easeInOut(ramp(t, 3.2, 5.0));
  return {
    scanIn: ramp(t, 3.0, 3.2) * (1 - ramp(t, 5.0, 5.25)),
    scanY: lerp(SCAN_TOP, SCAN_BOTTOM, sweep),
    sweep,
    // The solid is cut away above the plane; once the plane is past, gone.
    slate: t < 3.2 ? 1 : sweep < 1 ? 1 : 0,
    cloud: (t >= 3.2 ? 1 : 0) * (1 - ramp(t, 7.4, 8.6)),
    centreline: ramp(t, 5.0, 5.3),
    d110: placeDim(t, DIM_TIMES.d110),
    d55: placeDim(t, DIM_TIMES.d55),
    d70: placeDim(t, DIM_TIMES.d70),
    dimFade: 1 - ramp(t, 9.0, 9.5),
    // Height (mm) the line-work has reached, bottom to top.
    draw: lerp(-1, 66, easeInOut(ramp(t, 6.9, 8.6))),
    lineFade: 1 - ramp(t, 9.3, 9.9),
    finish: easeInOut(ramp(t, 8.9, 9.8)),
    cap: easeInOut(ramp(t, 10.6, 11.35)),
    bush: easeInOut(ramp(t, 10.95, 11.8)),
    // The centreline grows upwards to run through the exploded parts.
    reach: lerp(76, 150, easeInOut(ramp(t, 10.6, 11.4))),
  };
}

// Small seeded random generator, so the point cloud is the same every load.
function seeded(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function create({ THREE, tokens, fontFamily }) {
  // object: everything, scaled to world units. body: what turns in the
  // landing loop. The centreline sits on the axis, so it stays on object.
  const object = new THREE.Group();
  const body = new THREE.Group();
  object.add(body);
  const textures = new Map();
  const geometries = [];
  const H = HOUSING;
  const capSeat = H.height + H.seat;

  // ---- The physical part (slate) ----------------------------------------
  // Cut away above the scan plane: fragments higher than uScanY (world) are
  // discarded. Double-sided, so the cut shows the part's inside.
  const scanUniform = { value: 1e6 };
  const slateSkin = new THREE.MeshStandardMaterial({
    color: tokens.found,
    roughness: 0.7,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  slateSkin.onBeforeCompile = (shader) => {
    shader.uniforms.uScanY = scanUniform;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vScanY;")
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvScanY = (modelMatrix * vec4(transformed, 1.0)).y;"
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform float uScanY;\nvarying float vScanY;"
      )
      .replace(
        "void main() {",
        "void main() {\n  if (vScanY > uScanY) discard;"
      );
  };
  slateSkin.customProgramCacheKey = () => "reverse-engineering-scan";
  const found = housingAssembly(THREE, slateSkin, { bolts: false });
  const slate = new THREE.Group();
  slate.add(found.body, found.cap);
  body.add(slate);

  // ---- The model (ice-blue) ----------------------------------------------
  const finish = (offset) =>
    new THREE.MeshStandardMaterial({
      color: tokens.render,
      roughness: 0.32,
      metalness: 0.35,
      // A little self-light, so faces turned from the key light stay blue.
      emissive: tokens.render,
      emissiveIntensity: 0.12,
      transparent: true,
      // The bush runs 0.1 mm inside the bore: push it back a touch so the
      // two never fight where both show at the mouth of the bore.
      polygonOffset: offset,
      polygonOffsetFactor: offset ? 1 : 0,
      polygonOffsetUnits: offset ? 1 : 0,
    });
  const blueSkins = [finish(false), finish(false), finish(true)];
  const model = housingAssembly(THREE, blueSkins[0], {
    bush: true,
    bolts: false,
  });
  model.cap.material = blueSkins[1];
  model.bush.material = blueSkins[2];
  const blue = new THREE.Group();
  blue.add(model.body, model.cap, model.bush);
  body.add(blue);

  // ---- Point cloud ---------------------------------------------------------
  // Points on the outside of the body and cap, area-weighted, sorted top
  // down so the draw range reveals exactly the points above the scan plane.
  const cloudPoints = (() => {
    const random = seeded(1729);
    const triangles = [];
    let total = 0;
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();
    const n = new THREE.Vector3();
    const collect = (geometry, lift, keep) => {
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i += 3) {
        a.fromBufferAttribute(pos, i);
        b.fromBufferAttribute(pos, i + 1);
        c.fromBufferAttribute(pos, i + 2);
        n.subVectors(c, b).cross(new THREE.Vector3().subVectors(a, b));
        const area = n.length() / 2;
        if (area < 1e-6) continue;
        const cx = (a.x + b.x + c.x) / 3;
        const cy = (a.y + b.y + c.y) / 3;
        const cz = (a.z + b.z + c.z) / 3;
        if (!keep(Math.hypot(cx, cz), cy, Math.abs(n.y) / (area * 2))) continue;
        triangles.push([a.clone(), b.clone(), c.clone(), lift]);
        total += area;
        triangles[triangles.length - 1].push(total);
      }
    };
    // Body: leave out the bore (hidden under the cap) and the underside.
    collect(
      found.body.geometry,
      0,
      (r, y, flat) => r > H.bore / 2 + 0.6 && !(flat > 0.9 && y < 1)
    );
    // Cap: leave out the spigot, which sits inside the bore.
    collect(
      found.cap.geometry,
      capSeat,
      (r, y) => y > -0.01 && r > H.capHole / 2 - 0.5
    );
    const points = [];
    for (let i = 0; i < POINTS; i++) {
      const pick = random() * total;
      let lo = 0;
      let hi = triangles.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (triangles[mid][4] < pick) lo = mid + 1;
        else hi = mid;
      }
      const [p, q, s, lift] = triangles[lo];
      let u = random();
      let v = random();
      if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
      }
      const point = p
        .clone()
        .addScaledVector(new THREE.Vector3().subVectors(q, p), u)
        .addScaledVector(new THREE.Vector3().subVectors(s, p), v);
      point.y += lift;
      points.push(point);
    }
    return points.sort((m, k) => k.y - m.y);
  })();
  const cloudGeometry = new THREE.BufferGeometry().setFromPoints(cloudPoints);
  geometries.push(cloudGeometry);
  const cloud = new THREE.Points(
    cloudGeometry,
    new THREE.PointsMaterial({
      color: tokens.cyan,
      size: 2.2,
      sizeAttenuation: false,
      transparent: true,
      depthWrite: false,
    })
  );
  cloud.renderOrder = 1;
  body.add(cloud);
  const cloudHeights = cloudPoints.map((p) => p.y);
  // Number of points above height y (heights are sorted, highest first).
  const pointsAbove = (y) => {
    let lo = 0;
    let hi = cloudHeights.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cloudHeights[mid] > y) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  };

  // ---- Scan plane ------------------------------------------------------------
  const scan = new THREE.Group();
  const scanSheetGeometry = new THREE.PlaneGeometry(SCAN_SIZE, SCAN_SIZE);
  geometries.push(scanSheetGeometry);
  const scanSheet = new THREE.Mesh(
    scanSheetGeometry,
    new THREE.MeshBasicMaterial({
      color: tokens.cyan,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  scanSheet.rotation.x = -Math.PI / 2;
  scanSheet.renderOrder = 2;
  const scanEdge = stroke(tokens.cyan, 2);
  scanEdge.renderOrder = 3;
  const e = SCAN_SIZE / 2;
  setPath(scanEdge, [
    new THREE.Vector3(-e, 0, -e),
    new THREE.Vector3(e, 0, -e),
    new THREE.Vector3(e, 0, e),
    new THREE.Vector3(-e, 0, e),
    new THREE.Vector3(-e, 0, -e),
  ]);
  scan.add(scanSheet, scanEdge);
  body.add(scan);

  // ---- Labels ----------------------------------------------------------------
  function setMap(material, texture) {
    if (material.map === texture) return;
    material.map = texture;
    material.needsUpdate = true;
  }

  // White value on a navy plate, so it reads over the point cloud.
  const LABEL_W = 256;
  const LABEL_H = 112;
  const labelTexture = (text) => {
    const key = `label-${text}`;
    if (textures.has(key)) return textures.get(key);
    const c = document.createElement("canvas");
    c.width = LABEL_W;
    c.height = LABEL_H;
    const ctx = c.getContext("2d");
    ctx.font = `500 58px ${fontFamily}`;
    const width = ctx.measureText(text).width + 40;
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.beginPath();
    ctx.roundRect(LABEL_W / 2 - width / 2, 12, width, 88, 16);
    ctx.fill();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = tokens.ink;
    ctx.fillText(text, LABEL_W / 2, 58);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    textures.set(key, texture);
    return texture;
  };

  // Label height in mm: about 14 px of text at the page's canvas size.
  const LABEL_MM = 23;
  function label(text) {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ transparent: true, depthTest: false })
    );
    setMap(sprite.material, labelTexture(text));
    sprite.scale.set((LABEL_MM * LABEL_W) / LABEL_H, LABEL_MM, 1);
    sprite.renderOrder = 5;
    return sprite;
  }

  // ---- Dimensions ------------------------------------------------------------
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const ARROW = 7;
  const partial = (a, b, x) => [a, a.clone().lerp(b, x)];

  // extensions: [[from, to], ...] grow from the feature outwards.
  // line: [p, q], grown from its middle; arrows sit at p and q pointing
  // outwards, with wings along `side`. labelAt: the value's position.
  function dimension({ extensions, line, side, text, labelAt }) {
    const group = new THREE.Group();
    const pen = stroke(tokens.cyan, 2);
    pen.renderOrder = 4;
    const value = label(text);
    value.position.copy(labelAt);
    group.add(pen, value);
    let built = null;
    let drawn = false;
    return {
      group,
      set({ extension, line: grow, value: shown }, fade) {
        const key = `${extension.toFixed(3)}-${grow.toFixed(3)}`;
        if (key !== built) {
          built = key;
          const segments = [];
          if (extension > 0) {
            extensions.forEach(([a, b]) =>
              segments.push(...partial(a, b, extension))
            );
          }
          if (grow > 0) {
            const [p, q] = line;
            const mid = p.clone().lerp(q, 0.5);
            segments.push(...partial(mid, p, grow), ...partial(mid, q, grow));
            if (grow >= 0.98) {
              [
                [p, q],
                [q, p],
              ].forEach(([tip, other]) => {
                const back = other
                  .clone()
                  .sub(tip)
                  .normalize()
                  .multiplyScalar(ARROW);
                const wing = side.clone().multiplyScalar(ARROW * 0.38);
                segments.push(tip, tip.clone().add(back).add(wing));
                segments.push(tip, tip.clone().add(back).sub(wing));
              });
            }
          }
          setSegments(pen, segments);
          drawn = segments.length > 1;
        }
        pen.material.opacity = fade;
        pen.visible = drawn && fade > 0.001;
        value.material.opacity = shown * fade;
        value.visible = shown * fade > 0.001;
      },
    };
  }

  const F = H.flange / 2;
  const reach = 24; // extension line length beyond the part
  // 110: across the front edge of the flange, on the floor.
  const d110 = dimension({
    extensions: [
      [V(-F, 0, F + 2), V(-F, 0, F + reach)],
      [V(F, 0, F + 2), V(F, 0, F + reach)],
    ],
    line: [V(-F, 0, F + reach - 5), V(F, 0, F + reach - 5)],
    side: V(0, 0, 1),
    text: "110",
    labelAt: V(0, 0, F + reach + 10),
  });
  // 55: flange underside to boss top, on the right, through the axis.
  const R = H.boss / 2;
  const x55 = F + 20;
  const d55 = dimension({
    extensions: [
      [V(F + 2, 0, 0), V(x55 + 5, 0, 0)],
      [V(R + 3, H.height, 0), V(x55 + 5, H.height, 0)],
    ],
    line: [V(x55, 0, 0), V(x55, H.height, 0)],
    side: V(1, 0, 0),
    text: "55",
    labelAt: V(x55 + 24, H.height / 2, 0),
  });
  // Ø70: across the boss. It faces the camera as the pendulum swings, so the
  // line always spans the boss's outline.
  const y70 = 30;
  const d70 = dimension({
    extensions: [
      [V(-R, y70 - 5, 0), V(-R, y70 + 7, 0)],
      [V(R, y70 - 5, 0), V(R, y70 + 7, 0)],
    ],
    line: [V(-R, y70, 0), V(R, y70, 0)],
    side: V(0, 1, 0),
    text: "Ø70",
    labelAt: V(0, y70 + 15, 0),
  });
  const dims = [d110, d55, d70];
  dims.forEach((d) => body.add(d.group));

  // ---- Line-work ---------------------------------------------------------------
  // Feature edges of the three parts, drawn on bottom to top. The solids are
  // not there yet, so the bush shows inside the bore.
  const edges = [];
  const addEdges = (geometry, lift) => {
    const edgeGeometry = new THREE.EdgesGeometry(geometry, 20);
    const pos = edgeGeometry.attributes.position;
    for (let i = 0; i < pos.count; i += 2) {
      const p = V(pos.getX(i), pos.getY(i) + lift, pos.getZ(i));
      const q = V(pos.getX(i + 1), pos.getY(i + 1) + lift, pos.getZ(i + 1));
      edges.push(p.y <= q.y ? [p, q] : [q, p]);
    }
    edgeGeometry.dispose();
  };
  addEdges(model.body.geometry, 0);
  addEdges(model.bush.geometry, 0);
  addEdges(model.cap.geometry, capSeat);
  edges.sort((m, k) => m[0].y - k[0].y);
  const linework = stroke(tokens.ink, 1.6);
  linework.renderOrder = 3;
  body.add(linework);
  // Turned faces have no feature edges, so their outlines are drawn as two
  // silhouette lines facing the camera: [radius, bottom, top] in mm.
  const C = HOUSING;
  const silhouettes = [
    [C.boss / 2, C.flangeThickness, C.height - C.chamfer],
    [C.bushOuter / 2, C.bushChamfer, C.bushLength - C.bushChamfer],
    [C.cap / 2, capSeat, capSeat + C.capThickness - C.capChamfer],
  ];
  let drawnTo = null;
  function drawLinework(height, azimuth) {
    const key = `${height.toFixed(2)}-${azimuth.toFixed(4)}`;
    if (key === drawnTo) return;
    drawnTo = key;
    const segments = [];
    for (const [p, q] of edges) {
      if (p.y > height) break;
      if (q.y <= height) segments.push(p, q);
      else segments.push(p, p.clone().lerp(q, (height - p.y) / (q.y - p.y)));
    }
    const across = V(Math.cos(azimuth), 0, -Math.sin(azimuth));
    silhouettes.forEach(([r, bottom, top]) => {
      if (bottom > height) return;
      const y = Math.min(top, height);
      [r, -r].forEach((side) => {
        segments.push(
          across.clone().multiplyScalar(side).setY(bottom),
          across.clone().multiplyScalar(side).setY(y)
        );
      });
    });
    setSegments(linework, segments);
  }

  // ---- Centreline ----------------------------------------------------------
  // Dashed, on the bore's axis. Hidden where it runs inside a solid, so in
  // the exploded view it shows in the gaps between the parts.
  const centreline = stroke(tokens.cyan, 2, true, {
    dashSize: 7,
    gapSize: 4.5,
    depthTest: true,
    depthWrite: false,
  });
  centreline.renderOrder = 4;
  object.add(centreline);
  let centreTo = null;
  function drawCentreline(grow, top) {
    const bottom = -10;
    const y = lerp(bottom, top, grow);
    const key = y.toFixed(2);
    if (key !== centreTo) {
      centreTo = key;
      setSegments(centreline, grow > 0 ? [V(0, bottom, 0), V(0, y, 0)] : []);
    }
  }

  // ---- Apply -----------------------------------------------------------------
  let time = 0;
  let showcaseOn = false;
  let spin = 0;

  function apply() {
    const p = paramsAt(showcaseOn ? END : time);
    const scale = showcaseOn ? SHOWCASE : STORY;
    object.scale.setScalar(scale);
    body.rotation.y = showcaseOn ? spin : 0;

    // Physical part and scan.
    slate.visible = !showcaseOn && p.slate > 0;
    scanUniform.value = time < 3.2 ? 1e6 : p.scanY * scale;
    scan.visible = !showcaseOn && p.scanIn > 0.001;
    scan.position.y = p.scanY;
    scanSheet.material.opacity = 0.1 * p.scanIn;
    scanEdge.material.opacity = p.scanIn;

    // Point cloud: the points above the plane, fading as the model draws.
    const cloudOn = !showcaseOn && p.cloud > 0.001;
    cloud.visible = cloudOn;
    if (cloudOn) {
      cloud.geometry.setDrawRange(
        0,
        p.sweep < 1 ? pointsAbove(p.scanY) : POINTS
      );
      cloud.material.opacity = 0.9 * p.cloud;
    }

    // Dimensions. Ø70 turns to face the camera.
    d110.set(p.d110, showcaseOn ? 0 : p.dimFade);
    d55.set(p.d55, showcaseOn ? 0 : p.dimFade);
    d70.set(p.d70, showcaseOn ? 0 : p.dimFade);
    d70.group.rotation.y = azimuthAt(time);

    // Line-work.
    const lines = showcaseOn ? 0 : p.lineFade * (p.draw > -1 ? 1 : 0);
    if (lines > 0.001) drawLinework(p.draw, azimuthAt(time));
    linework.visible = lines > 0.001 && p.draw > -1;
    linework.material.opacity = lines;

    // The model and its explosion.
    const solid = showcaseOn ? 1 : p.finish;
    blue.visible = solid > 0.001;
    blueSkins.forEach((skin) => {
      skin.opacity = solid;
      skin.depthWrite = solid > 0.99;
      skin.transparent = solid < 0.999;
    });
    model.cap.position.y = capSeat + CAP_LIFT * p.cap;
    model.bush.position.y = BUSH_LIFT * p.bush;

    drawCentreline(showcaseOn ? 1 : p.centreline, showcaseOn ? 150 : p.reach);
  }

  function update(t) {
    time = t;
    apply();
  }

  // Landing loop, independent of scene time: the finished assembly in its
  // exploded view, turning, with only the centreline beside it.
  function view({ spin: angle, showcase }) {
    const on = showcase > 0.5;
    spin = angle;
    if (on !== showcaseOn) {
      showcaseOn = on;
      apply();
    } else if (on) {
      body.rotation.y = spin;
    }
  }

  // Story camera: aimed low on the part, rising with the explosion.
  const storyTarget = (t) => {
    const lift = easeInOut(ramp(t, 10.6, 11.6));
    return new THREE.Vector3(0, lerp(18, 36, lift), 0);
  };

  return {
    object,
    update,
    view,
    camera: {
      target: new THREE.Vector3(0, 46, 0),
      distance: 345,
      elevation: 24 * RAD,
      swing: SWING,
      period: PERIOD,
      at: (t) => ({
        target: storyTarget(t),
        distance: lerp(345, 375, easeInOut(ramp(t, 10.6, 11.6))),
      }),
      // Landing loop: a higher, isometric-style view; one turn in 24 s.
      showcaseElevation: 30 * RAD,
      showcaseDistance: 420,
      spinPeriod: 24,
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      [
        scanEdge,
        linework,
        centreline,
        ...dims.map((d) => d.group.children[0]),
      ].forEach((line) => line.geometry.dispose());
      found.body.geometry.dispose();
      found.cap.geometry.dispose();
    },
  };
}
