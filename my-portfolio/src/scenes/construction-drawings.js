// Construction drawings scroll scene: the housing model shrinks to an
// isometric view on an A3 sheet, front and plan views are projected
// (first-angle: plan below front), the part is dimensioned and toleranced,
// the cap and bolts arrive for the balloons, and the bill of materials and
// title block fill in. Mirrors the construction drawings service video: same
// part, same views, same dimensions, same title block values. Every value is
// a function of t, so the scene can be scrubbed in either direction.
//
// Units are millimetres and the sheet is drawn at 1:1, as its title block
// says. World units are millimetres too; the camera distance is chosen so the
// floor's fade (about 100 units from the origin) stays inside the canvas.
//
// Timeline (seconds, matching the video's beats at 0 / 3.0 / 6.8 / 10.6):
//   0.0  the housing body, large, slow drift
//   3.0  it shrinks to the isometric view top right; the sheet border draws
//   4.5  front view draws, hidden lines, projection lines drop, plan view
//   7.2  dimensions one at a time: 110, 55, 80, Ø42 H7, 4× Ø13
//   8.8  datums A and B; perpendicularity, flatness, position frames
//  10.2  cap and four bolts drop on; balloons 1 to 3
//  11.2  bill of materials builds, then the title block fills

import { stroke, setSegments } from "./lines";
import { HOUSING, holeCentres, housingAssembly } from "./parts/housing";

const RAD = Math.PI / 180;
const END = 12.5;

// Sheet: A3 landscape, 10 mm border. Sheet coordinates have their origin at
// the sheet's centre, x right, y up.
const SHEET_W = 420;
const SHEET_H = 297;
const MARGIN = 10;
const IN_X = SHEET_W / 2 - MARGIN;
const IN_Y = SHEET_H / 2 - MARGIN;
const LIFT = 4; // sheet bottom above the floor
const SHEET_Y = SHEET_H / 2 + LIFT; // world height of the sheet's centre

// View placement on the sheet (from the video's layout).
const FV = { x: -86, y: 50 }; // front view: part centre line, flange underside
const PV = { x: -86, y: -38 }; // plan view: bore centre
const ISO = { x: 124, y: 64, z: 45, scale: 0.85 }; // isometric view, standing off the sheet

// Text heights (em, mm). About three times real drawing height, so the sheet
// reads at the canvas size on the page.
const DIM_EM = 12;
const FRAME_H = 12.5;
const FRAME_EM = 8.5;
const TABLE_EM = 9;
const LABEL_EM = 6.5;
const VALUE_EM = 9.5;
const TEXT_RES = 10; // texture pixels per millimetre

// Housing size on stage: large in beat 01, 1:1 on the sheet.
const BIG = 1.6;
const SHOWCASE_SCALE = 1.55;
// The showcase is built at the same millimetre scale, then the whole scene
// is shrunk by this factor so the floor's light pool reads under the part as
// it does on the other pages, while its fade stays inside the canvas.
const SHOWCASE_ZOOM = 0.62;
// In the showcase the sheet stands back, leaning to face the raised camera
// like a drawing board, a little smaller so it fits above the part.
const SHOWCASE_SHEET = { y: 120, z: -200, lean: -30 * RAD, scale: 0.85 };
const SHOWCASE_DIM = 0.35; // sheet brightness behind the turning part

// Isometric-style orientation: turned, then tipped towards the viewer.
const ISO_TURN = -38 * RAD;
const ISO_TIP = 31 * RAD;

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const ramp = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, x) => a + (b - a) * x;

// Dimension placements: extension lines first, then the dimension line, then
// the value. Times are when each dimension starts.
const DIM_TIMES = { d110: 7.2, d55: 7.5, d80: 7.8, d42: 8.15, d13: 8.5 };
const placeDim = (t, start) => ({
  extension: ramp(t, start, start + 0.1),
  line: ramp(t, start + 0.08, start + 0.2),
  value: ramp(t, start + 0.15, start + 0.27),
});

export function paramsAt(t) {
  const move = easeInOut(ramp(t, 3.0, 4.4));
  return {
    move,
    drift: (1 - move) * Math.sin((2 * Math.PI * t) / 15),
    fill: ramp(t, 3.3, 3.8),
    outer: ramp(t, 3.3, 4.0),
    inner: ramp(t, 3.6, 4.3),
    front: ramp(t, 4.5, 5.3),
    hidden: ramp(t, 5.2, 5.5),
    frontCentre: ramp(t, 5.3, 5.5),
    projection: ramp(t, 5.4, 5.8),
    projectionFade: lerp(1, 0.45, ramp(t, 6.6, 7.0)),
    planOutline: ramp(t, 5.8, 6.2),
    planCircles: ramp(t, 6.1, 6.5),
    planHoles: ramp(t, 6.3, 6.6),
    planCentres: ramp(t, 6.5, 6.8),
    d110: placeDim(t, DIM_TIMES.d110),
    d55: placeDim(t, DIM_TIMES.d55),
    d80: placeDim(t, DIM_TIMES.d80),
    d42: placeDim(t, DIM_TIMES.d42),
    d13: placeDim(t, DIM_TIMES.d13),
    datumA: { leader: ramp(t, 8.85, 8.95), box: ramp(t, 8.92, 9.02) },
    datumB: { leader: ramp(t, 9.1, 9.2), box: ramp(t, 9.17, 9.27) },
    perpendicularity: { leader: ramp(t, 9.35, 9.45), box: ramp(t, 9.42, 9.52) },
    flatness: { leader: ramp(t, 9.6, 9.7), box: ramp(t, 9.67, 9.77) },
    position: ramp(t, 9.9, 10.05),
    cap: easeOut(ramp(t, 10.2, 10.65)),
    bolts: easeOut(ramp(t, 10.35, 10.75)),
    balloons: [
      { leader: ramp(t, 10.8, 10.92), mark: ramp(t, 10.88, 11.0) },
      { leader: ramp(t, 10.95, 11.07), mark: ramp(t, 11.03, 11.15) },
      { leader: ramp(t, 11.1, 11.22), mark: ramp(t, 11.18, 11.3) },
    ],
    table: ramp(t, 11.2, 11.6),
    rows: [11.45, 11.55, 11.65, 11.75].map((a) => ramp(t, a, a + 0.1)),
    tolerances: ramp(t, 11.9, 12.05),
    title: ramp(t, 12.05, 12.2),
  };
}

export function create({ THREE, tokens, fontFamily }) {
  // object: everything. body: the housing, which is the large model in beat
  // 01, the isometric view on the sheet, and the turning part in the
  // showcase. sheet: the drawing, which stays still.
  const object = new THREE.Group();
  const sheet = new THREE.Group();
  object.add(sheet);
  const body = new THREE.Group();
  object.add(body);
  const textures = new Map();
  const geometries = [];

  // Opacity of everything on the sheet, so the showcase can dim it.
  let ink = 1;

  // ---- Housing ----------------------------------------------------------
  const finish = () =>
    new THREE.MeshStandardMaterial({
      color: tokens.render,
      roughness: 0.32,
      metalness: 0.35,
      // A little self-light, so faces turned from the key light stay blue.
      emissive: tokens.render,
      emissiveIntensity: 0.12,
    });
  const bodySkin = finish();
  const capSkin = finish();
  const boltSkin = finish();
  capSkin.transparent = true;
  boltSkin.transparent = true;
  const parts = housingAssembly(THREE, bodySkin);
  parts.cap.material = capSkin;
  parts.bolts.children.forEach((bolt) => {
    bolt.material = boltSkin;
  });
  // Centre the assembly on the pivot, so it turns about its own middle.
  const assemblyHeight = HOUSING.height + HOUSING.capThickness;
  const pivot = new THREE.Group();
  pivot.position.y = -assemblyHeight / 2;
  pivot.add(parts.body, parts.cap, parts.bolts);
  body.add(pivot);
  const capSeat = parts.cap.position.y;

  // ---- Text -------------------------------------------------------------
  function cached(key, draw) {
    if (textures.has(key)) return textures.get(key);
    const c = document.createElement("canvas");
    const size = draw(null);
    c.width = Math.ceil(size.w * TEXT_RES);
    c.height = Math.ceil(size.h * TEXT_RES);
    const ctx = c.getContext("2d");
    ctx.scale(TEXT_RES, TEXT_RES);
    draw(ctx);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.userData.size = size;
    textures.set(key, texture);
    return texture;
  }

  const measurer = document.createElement("canvas").getContext("2d");
  const font = (em, weight) => `${weight} ${em}px ${fontFamily}`;
  // Width of text in mm at the given em (canvas measures in its own px, and
  // the drawing context is scaled to mm).
  const measure = (text, em, weight = 400) => {
    measurer.font = font(em * TEXT_RES, weight);
    return measurer.measureText(text).width / TEXT_RES;
  };

  // A flat quad on the sheet carrying a texture. Sized in mm.
  function quad(texture, { order = 3 } = {}) {
    const { w, h } = texture.userData.size;
    const geometry = new THREE.PlaneGeometry(w, h);
    geometries.push(geometry);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      })
    );
    mesh.renderOrder = order;
    mesh.userData.size = { w, h };
    sheet.add(mesh);
    return mesh;
  }

  // Place a quad: (x, y) is its centre unless anchor says otherwise.
  function place(mesh, x, y, { anchor = "centre", rotate = 0 } = {}) {
    const w = mesh.userData.size.w * mesh.scale.x;
    const dx = anchor === "left" ? w / 2 : anchor === "right" ? -w / 2 : 0;
    mesh.rotation.z = rotate;
    mesh.position.set(
      x + dx * Math.cos(rotate),
      y + dx * Math.sin(rotate),
      0.5
    );
    return mesh;
  }

  // Plain text, white unless given.
  function textTexture(text, em, { weight = 400, colour = tokens.ink } = {}) {
    return cached(`text-${text}-${em}-${weight}-${colour}`, (ctx) => {
      const w = measure(text, em, weight) + em * 0.3;
      const h = em * 1.3;
      if (!ctx) return { w, h };
      ctx.font = font(em, weight);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = colour;
      ctx.fillText(text, w / 2, h / 2 + em * 0.04);
      return { w, h };
    });
  }

  // Geometric tolerance symbols, drawn in a cell of side s centred at (cx, cy).
  function symbol(ctx, kind, cx, cy, s) {
    const k = s * 0.3;
    ctx.beginPath();
    if (kind === "perpendicularity") {
      ctx.moveTo(cx, cy - k);
      ctx.lineTo(cx, cy + k);
      ctx.moveTo(cx - k, cy + k);
      ctx.lineTo(cx + k, cy + k);
    } else if (kind === "flatness") {
      ctx.moveTo(cx - k, cy + k * 0.6);
      ctx.lineTo(cx + k * 0.45, cy + k * 0.6);
      ctx.lineTo(cx + k, cy - k * 0.6);
      ctx.lineTo(cx - k * 0.45, cy - k * 0.6);
      ctx.closePath();
    } else if (kind === "position") {
      ctx.arc(cx, cy, k * 0.7, 0, Math.PI * 2);
      ctx.moveTo(cx - k, cy);
      ctx.lineTo(cx + k, cy);
      ctx.moveTo(cx, cy - k);
      ctx.lineTo(cx, cy + k);
    }
    ctx.stroke();
  }

  // Feature control frame, datum letter box or boxed (basic) dimension: a row
  // of white boxed cells. Cells are text or { symbol }.
  function frameTexture(cells, { height = FRAME_H, em = FRAME_EM } = {}) {
    const key = `frame-${JSON.stringify(cells)}-${height}-${em}`;
    return cached(key, (ctx) => {
      const widths = cells.map((cell) =>
        typeof cell === "string"
          ? Math.max(height, measure(cell, em) + em * 0.9)
          : height
      );
      const pad = 0.4;
      const w = widths.reduce((a, b) => a + b, 0) + pad * 2;
      const h = height + pad * 2;
      if (!ctx) return { w, h };
      ctx.strokeStyle = tokens.ink;
      ctx.fillStyle = tokens.ink;
      ctx.lineWidth = 0.42;
      ctx.lineJoin = "round";
      ctx.strokeRect(pad, pad, w - pad * 2, height);
      let x = pad;
      cells.forEach((cell, i) => {
        if (i > 0) {
          ctx.beginPath();
          ctx.moveTo(x, pad);
          ctx.lineTo(x, pad + height);
          ctx.stroke();
        }
        const cx = x + widths[i] / 2;
        const cy = pad + height / 2;
        if (typeof cell === "string") {
          ctx.font = font(em, cell.length === 1 ? 600 : 400);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(cell, cx, cy + em * 0.04);
        } else {
          symbol(ctx, cell.symbol, cx, cy, height);
        }
        x += widths[i];
      });
      return { w, h };
    });
  }

  // Balloon: cyan circle, white item number.
  const BALLOON = 13;
  function balloonTexture(n) {
    return cached(`balloon-${n}`, (ctx) => {
      const w = BALLOON + 1;
      if (!ctx) return { w, h: w };
      ctx.strokeStyle = "#22d3ee";
      ctx.lineWidth = 0.5;
      ctx.fillStyle = "rgba(15, 23, 42, 1)";
      ctx.beginPath();
      ctx.arc(w / 2, w / 2, BALLOON / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = tokens.ink;
      ctx.font = font(8, 600);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(n), w / 2, w / 2 + 0.35);
      return { w, h: w };
    });
  }

  // ---- Line-work --------------------------------------------------------
  // A pen draws a list of paths on in order, by length, so line-work appears
  // the way a drawing is drawn rather than all at once. Every pen sits on
  // the sheet, so a solid in front of the sheet hides it.
  const pens = [];
  const at = (x, y, z = 0.3) => new THREE.Vector3(x, y, z);

  function pen(colour, width, { dashed = false, dash = 3, gap = 2 } = {}) {
    const line = stroke(colour, width, dashed, {
      dashSize: dash,
      gapSize: gap,
      depthTest: true,
      depthWrite: false,
    });
    line.renderOrder = 2;
    sheet.add(line);
    const paths = [];
    let lengths = null;
    let built = null;
    const self = {
      line,
      // A path is a list of points joined end to end.
      add(points) {
        paths.push(points);
        lengths = null;
        return self;
      },
      // Draw the first `fraction` of the total length, at this opacity.
      set(fraction, opacity = 1) {
        if (!lengths) {
          lengths = paths.map((points) =>
            points
              .slice(1)
              .reduce((sum, p, i) => sum + p.distanceTo(points[i]), 0)
          );
        }
        const key = fraction.toFixed(4);
        if (key !== built) {
          built = key;
          const total = lengths.reduce((a, b) => a + b, 0);
          let left = fraction * total;
          const segments = [];
          paths.forEach((points) => {
            for (let i = 1; i < points.length && left > 1e-6; i++) {
              const a = points[i - 1];
              const b = points[i];
              const length = a.distanceTo(b);
              const along = Math.min(1, left / length);
              segments.push(a, a.clone().lerp(b, along));
              left -= length;
            }
          });
          setSegments(line, segments);
        }
        line.material.opacity = opacity * ink;
        line.visible = fraction > 0.0001 && opacity * ink > 0.001;
      },
    };
    pens.push(self);
    return self;
  }

  // Arc as a run of points, angles in degrees, centre (cx, cy).
  const arc = (cx, cy, r, from, to, steps = 24) =>
    Array.from({ length: steps + 1 }, (_, i) => {
      const a = lerp(from, to, i / steps) * RAD;
      return at(cx + r * Math.cos(a), cy + r * Math.sin(a));
    });
  const circle = (cx, cy, r, start = 90) => arc(cx, cy, r, start, start + 360, 48);

  // Filled triangle (arrowhead or datum triangle).
  function triangle(colour) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(9), 3)
    );
    geometries.push(geometry);
    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: colour,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    mesh.renderOrder = 2;
    sheet.add(mesh);
    return {
      mesh,
      // Tip at (x, y), pointing along angle (degrees).
      set(x, y, angle, length = 3.6, half = 1.25) {
        const a = angle * RAD;
        const ux = Math.cos(a);
        const uy = Math.sin(a);
        const bx = x - ux * length;
        const by = y - uy * length;
        geometry.attributes.position.array.set([
          x,
          y,
          0.35,
          bx - uy * half,
          by + ux * half,
          0.35,
          bx + uy * half,
          by - ux * half,
          0.35,
        ]);
        geometry.attributes.position.needsUpdate = true;
        geometry.computeBoundingSphere();
      },
      show(opacity) {
        mesh.material.opacity = opacity * ink;
        mesh.visible = opacity * ink > 0.001;
      },
    };
  }

  const showQuad = (mesh, opacity) => {
    mesh.material.opacity = opacity * ink;
    mesh.visible = opacity * ink > 0.001;
  };

  // ---- Sheet ------------------------------------------------------------
  const fill = new THREE.Mesh(
    new THREE.PlaneGeometry(SHEET_W, SHEET_H),
    new THREE.MeshBasicMaterial({
      color: tokens.navy,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 2,
    })
  );
  geometries.push(fill.geometry);
  sheet.add(fill);

  const W = tokens.ink;
  const C = tokens.cyan;
  const corners = (x, y) => [
    at(-x, y),
    at(x, y),
    at(x, -y),
    at(-x, -y),
    at(-x, y),
  ];
  const outerBorder = pen(W, 1.6).add(corners(SHEET_W / 2, SHEET_H / 2));
  const innerBorder = pen(W, 1.6).add(corners(IN_X, IN_Y));

  // ---- Front view -------------------------------------------------------
  const H = HOUSING;
  const fx = (x) => FV.x + x;
  const fy = (y) => FV.y + y;
  const R = H.boss / 2;
  const r = H.bore / 2;
  const F = H.flange / 2;
  const T = H.flangeThickness;
  const top = H.height;
  const ch = H.chamfer;
  const hr = H.hole / 2;
  const P = H.pitch / 2;

  const front = pen(W, 1.8)
    .add([
      at(fx(-F), fy(0)),
      at(fx(F), fy(0)),
      at(fx(F), fy(T)),
      at(fx(-F), fy(T)),
      at(fx(-F), fy(0)),
    ])
    .add([
      at(fx(-R), fy(T)),
      at(fx(-R), fy(top - ch)),
      at(fx(-R + ch), fy(top)),
      at(fx(R - ch), fy(top)),
      at(fx(R), fy(top - ch)),
      at(fx(R), fy(T)),
    ])
    .add([at(fx(-R), fy(top - ch)), at(fx(R), fy(top - ch))]);

  const hidden = pen(W, 1.3, { dashed: true, dash: 3, gap: 2 });
  [-r, r].forEach((x) => hidden.add([at(fx(x), fy(top)), at(fx(x), fy(0))]));
  [-P - hr, -P + hr, P - hr, P + hr].forEach((x) =>
    hidden.add([at(fx(x), fy(T)), at(fx(x), fy(0))])
  );

  const chain = { dashed: true, dash: 7, gap: 2.5 };
  const frontCentre = pen(C, 1.2, chain).add([
    at(fx(0), fy(-5)),
    at(fx(0), fy(top + 6)),
  ]);

  // Projection lines: dropped from the front view to place the plan view.
  const projection = pen(C, 1.1, { dashed: true, dash: 2.5, gap: 2 });
  const pTop = FV.y - 2;
  const pBottom = PV.y + F + 2;
  [-F, -R, -r, r, R, F].forEach((x) =>
    projection.add([at(fx(x), pTop), at(fx(x), pBottom)])
  );

  // ---- Plan view --------------------------------------------------------
  const px = (x) => PV.x + x;
  const py = (y) => PV.y + y;
  const k = H.corner;
  const planOutline = pen(W, 1.8).add([
    ...arc(px(-F + k), py(F - k), k, 90, 180, 8),
    ...arc(px(-F + k), py(-F + k), k, 180, 270, 8),
    ...arc(px(F - k), py(-F + k), k, 270, 360, 8),
    ...arc(px(F - k), py(F - k), k, 0, 90, 8),
    at(px(-F + k), py(F)),
  ]);
  const planCircles = pen(W, 1.8)
    .add(circle(px(0), py(0), R))
    .add(circle(px(0), py(0), R - ch))
    .add(circle(px(0), py(0), r));
  const planHoles = pen(W, 1.8);
  holeCentres().forEach(([x, z]) => planHoles.add(circle(px(x), py(-z), hr)));
  const planCentres = pen(C, 1.2, chain)
    .add([at(px(-F - 7), py(0)), at(px(F + 7), py(0))])
    .add([at(px(0), py(-F - 7)), at(px(0), py(F + 7))]);
  holeCentres().forEach(([x, z]) => {
    planCentres.add([at(px(x - 10), py(-z)), at(px(x + 10), py(-z))]);
    planCentres.add([at(px(x), py(-z - 10)), at(px(x), py(-z + 10))]);
  });

  // ---- Dimensions -------------------------------------------------------
  // A linear dimension between two feature points a and b (sheet coords),
  // with the dimension line offset along `side` (a unit vector away from the
  // part) to `reach`. Extension lines grow from the feature outwards, then
  // the dimension line runs out from the middle to both arrows.
  function dimension({ a, b, side, reach, value, boxed = false, gap = 2 }) {
    const extension = pen(C, 1.1);
    const line = pen(C, 1.3);
    // Vertical dimensions (side along x) put the line at x = reach;
    // horizontal ones at y = reach.
    const vertical = Boolean(side.x);
    const onLine = (p, beyond) =>
      vertical
        ? at(reach + side.x * beyond, p.y)
        : at(p.x, reach + side.y * beyond);
    const ends = [a, b].map((p) => ({
      from: at(p.x + side.x * gap, p.y + side.y * gap),
      foot: onLine(p, 0),
      past: onLine(p, 3),
    }));
    ends.forEach((end) => extension.add([end.from, end.past]));
    const mid = ends[0].foot.clone().lerp(ends[1].foot, 0.5);
    line.add([mid, ends[0].foot]).add([mid, ends[1].foot]);
    const arrows = ends.map(() => triangle(C));
    const along = (i) => {
      const other = ends[1 - i].foot;
      const self_ = ends[i].foot;
      return (Math.atan2(self_.y - other.y, self_.x - other.x) * 180) / Math.PI;
    };
    const texture = boxed
      ? frameTexture([value], { height: DIM_EM * 1.15, em: DIM_EM * 0.85 })
      : textTexture(value, DIM_EM);
    const label = quad(texture);
    const offset = label.userData.size.h / 2;
    place(
      label,
      vertical ? reach + side.x * (offset + 0.5) : mid.x,
      vertical ? mid.y : reach + side.y * (offset - 0.6),
      { rotate: vertical ? Math.PI / 2 : 0 }
    );
    return {
      set({ extension: e, line: l, value: v }) {
        extension.set(e);
        line.set(l);
        arrows.forEach((arrow, i) => {
          arrow.set(ends[i].foot.x, ends[i].foot.y, along(i));
          arrow.show(l >= 0.98 ? 1 : 0);
        });
        showQuad(label, v);
      },
    };
  }

  const d110 = dimension({
    a: { x: px(-F), y: py(-F) },
    b: { x: px(F), y: py(-F) },
    side: { x: 0, y: -1 },
    reach: py(-F) - 13,
    value: "110",
  });
  const d55 = dimension({
    a: { x: fx(R - ch), y: fy(top) },
    b: { x: fx(F), y: fy(0) },
    side: { x: 1, y: 0 },
    reach: fx(F) + 12,
    value: "55",
  });
  const d80 = dimension({
    a: { x: px(-P), y: py(P) },
    b: { x: px(-P), y: py(-P) },
    side: { x: -1, y: 0 },
    reach: px(-F) - 13,
    value: "80",
    boxed: true,
    gap: 9,
  });
  const d42 = dimension({
    a: { x: fx(-r), y: fy(top) },
    b: { x: fx(r), y: fy(top) },
    side: { x: 0, y: 1 },
    reach: fy(top) + 12,
    value: "Ø42 H7",
  });

  // 4× Ø13: leader from the top right hole to the note, with the position
  // frame under it.
  const holeAt = { x: px(P), y: py(P) };
  const leaderDir = { x: Math.SQRT1_2, y: Math.SQRT1_2 };
  const noteX = px(F) + 8;
  const noteY = py(F) + 4;
  const d13Leader = pen(C, 1.3).add([
    at(noteX - 1, noteY),
    at(noteX - 6, noteY),
    at(holeAt.x + leaderDir.x * hr, holeAt.y + leaderDir.y * hr),
  ]);
  const d13Arrow = triangle(C);
  d13Arrow.set(
    holeAt.x + leaderDir.x * hr,
    holeAt.y + leaderDir.y * hr,
    (Math.atan2(
      holeAt.y + leaderDir.y * hr - noteY,
      holeAt.x + leaderDir.x * hr - (noteX - 6)
    ) *
      180) /
      Math.PI
  );
  const d13Note = place(quad(textTexture("4× Ø13", DIM_EM)), noteX, noteY, {
    anchor: "left",
  });
  const positionFrame = place(
    quad(
      frameTexture([{ symbol: "position" }, "Ø0.2", "A", "B"])
    ),
    noteX,
    noteY - FRAME_H - 2,
    { anchor: "left" }
  );

  // ---- Datums and frames ------------------------------------------------
  // Datum A: the flange underside. Triangle on the face, leader down to A.
  const aX = fx(-30);
  const datumALeader = pen(W, 1.3).add([at(aX, fy(0) - 3), at(aX, fy(-7))]);
  const datumATriangle = triangle(W);
  datumATriangle.set(aX, fy(0) - 3.2, -90, 3.2, 2);
  const datumABox = place(quad(frameTexture(["A"])), aX, fy(-7) - FRAME_H / 2 - 0.4);

  // Datum B: the bore, attached to the Ø42 dimension line.
  const bY = fy(top) + 12;
  const datumBLeader = pen(W, 1.3).add([
    at(fx(-r) - 3.2, bY),
    at(fx(-r) - 12, bY),
  ]);
  const datumBTriangle = triangle(W);
  datumBTriangle.set(fx(-r) - 3.2, bY, 180, 3.2, 2);
  const datumBBox = place(quad(frameTexture(["B"])), fx(-r) - 12, bY, {
    anchor: "right",
  });

  // Perpendicularity of the bore to A, on the end of the Ø42 dimension line.
  const perpLeader = pen(C, 1.3).add([at(fx(r) + 3, bY), at(fx(r) + 11, bY)]);
  const perpFrame = place(
    quad(frameTexture([{ symbol: "perpendicularity" }, "Ø0.05", "A"])),
    fx(r) + 11,
    bY,
    { anchor: "left" }
  );

  // Flatness of the flange underside.
  const flatX = fx(6);
  const flatY = fy(-9);
  const flatLeader = pen(C, 1.3).add([
    at(flatX + 14, flatY),
    at(flatX, flatY),
    at(flatX, fy(0) - 3.4),
  ]);
  const flatArrow = triangle(C);
  flatArrow.set(flatX, fy(0), 90);
  const flatFrame = place(
    quad(frameTexture([{ symbol: "flatness" }, "0.05"])),
    flatX + 14,
    flatY,
    { anchor: "left" }
  );

  // ---- Balloons ---------------------------------------------------------
  // Each balloon sits on the sheet; its leader runs to a point on the part,
  // which stands off the sheet, so the leader is drawn in 3D.
  // Each balloon's leader ends on the part point nearest the balloon as
  // seen on the sheet, picked from a set of candidates on that part (flange
  // edge, cap rim, bolt head corners), so it lands on the silhouette however
  // the part is turned.
  const flangeEdge = [];
  for (let i = 0; i < 40; i++) {
    const s_ = -F + (i / 39) * 2 * F;
    flangeEdge.push([s_, 0, F], [s_, 0, -F], [F, 0, s_], [-F, 0, s_]);
  }
  const capRim = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    return [(H.cap / 2) * Math.cos(a), H.capThickness * 0.45, (H.cap / 2) * Math.sin(a)];
  });
  const boltCorners = [];
  parts.bolts.children.forEach((bolt) => {
    const corner = H.boltAcrossFlats / Math.sqrt(3);
    for (let i = 0; i < 6; i++) {
      const a = bolt.rotation.y + (i * Math.PI) / 3;
      boltCorners.push([
        bolt.position.x + corner * Math.cos(a),
        bolt.position.y + H.boltHead * 0.6,
        bolt.position.z - corner * Math.sin(a),
      ]);
    }
  });
  const balloonSpecs = [
    { n: 1, x: 64, y: -7, owner: parts.body, points: flangeEdge },
    { n: 2, x: 66, y: 116, owner: parts.cap, points: capRim },
    { n: 3, x: 186, y: 100, owner: parts.bolts, points: boltCorners },
  ];
  const balloons = balloonSpecs.map((spec) => {
    const mark = place(quad(balloonTexture(spec.n), { order: 4 }), spec.x, spec.y);
    const leader = stroke(C, 1.3);
    leader.renderOrder = 3;
    object.add(leader);
    return { ...spec, mark, leader };
  });

  function setBalloons(state, show) {
    object.updateMatrixWorld(true);
    const toObject = new THREE.Matrix4().copy(object.matrixWorld).invert();
    const toSheet = new THREE.Matrix4().copy(sheet.matrixWorld).invert();
    const point = new THREE.Vector3();
    balloons.forEach((balloon, i) => {
      const { leader: l, mark: m } = show ? state[i] : { leader: 0, mark: 0 };
      showQuad(balloon.mark, m);
      if (l <= 0.001) {
        setSegments(balloon.leader, []);
        return;
      }
      let best = null;
      let bestDistance = Infinity;
      balloon.points.forEach(([x, y, z]) => {
        balloon.owner.localToWorld(point.set(x, y, z));
        const onSheet = point.clone().applyMatrix4(toSheet);
        const d = Math.hypot(onSheet.x - balloon.x, onSheet.y - balloon.y);
        if (d < bestDistance) {
          bestDistance = d;
          best = point.clone();
        }
      });
      const anchor = best.applyMatrix4(toObject);
      const end = sheet
        .localToWorld(new THREE.Vector3(balloon.x, balloon.y, 0.3))
        .applyMatrix4(toObject);
      // From the part out to the balloon's edge.
      const toward = end.sub(anchor);
      toward.setLength(Math.max(0, toward.length() - BALLOON / 2) * l);
      setSegments(balloon.leader, [anchor.clone(), anchor.clone().add(toward)]);
      balloon.leader.material.opacity = ink;
    });
  }

  // ---- Title block ------------------------------------------------------
  // Bottom right, inside the border: bill of materials over the tolerance
  // row and the title row.
  const TB = { right: IN_X, bottom: -IN_Y, width: 220 };
  const tbLeft = TB.right - TB.width;
  const ROW = 14.5; // bill of materials row height
  const TALL = 25; // tolerance and title rows
  const bomTop = TB.bottom + TALL * 2 + ROW * 4;
  const colItem = 24;
  const colQty = 24;
  const table = pen(W, 1.3);
  const hLine = (y) => table.add([at(tbLeft, y), at(TB.right, y)]);
  const vLine = (x, y1, y2) => table.add([at(x, y1), at(x, y2)]);
  // Outline first, then rows top to bottom, then the column rules.
  table.add([
    at(tbLeft, TB.bottom),
    at(tbLeft, bomTop),
    at(TB.right, bomTop),
  ]);
  for (let i = 1; i <= 4; i++) hLine(bomTop - ROW * i);
  hLine(TB.bottom + TALL);
  const bomBottom = bomTop - ROW * 4;
  vLine(tbLeft + colItem, bomTop, bomBottom);
  vLine(TB.right - colQty, bomTop, bomBottom);
  const tolSplit = [tbLeft + 84, tbLeft + 148];
  tolSplit.forEach((x) => vLine(x, bomBottom, TB.bottom + TALL));
  const titleSplit = [tbLeft + 96, TB.right - 38];
  titleSplit.forEach((x) => vLine(x, TB.bottom + TALL, TB.bottom));

  // Bill of materials rows: header at the bottom, items above it (item 1
  // nearest the header), as a SolidWorks BOM table sits on a title block.
  const bomRows = [
    { cells: ["ITEM", "DESCRIPTION", "QTY"], em: LABEL_EM, weight: 400 },
    { cells: ["1", "HOUSING BODY", "1"] },
    { cells: ["2", "CAP", "1"] },
    { cells: ["3", "BOLT M12 × 40", "4"] },
  ].map((row, i) => {
    const y = bomBottom + ROW * i + ROW / 2;
    const xs = [
      tbLeft + colItem / 2,
      (tbLeft + colItem + TB.right - colQty) / 2,
      TB.right - colQty / 2,
    ];
    const colour = i === 0 ? "#94a3b8" : tokens.ink;
    return row.cells.map((text, j) =>
      place(
        quad(
          textTexture(text, row.em ?? TABLE_EM, {
            weight: row.weight ?? 400,
            colour,
          })
        ),
        xs[j],
        y
      )
    );
  });

  // Labelled cells: small grey label at the top left, value below.
  // Shrink a quad that would overrun its cell.
  function fit(mesh, width) {
    const { w } = mesh.userData.size;
    if (w > width) mesh.scale.setScalar(width / w);
    return mesh;
  }

  function cell(label, value, left, bottom, height, width) {
    const labelQuad = place(
      quad(textTexture(label, LABEL_EM, { colour: "#94a3b8" })),
      left + 1.5,
      bottom + height - LABEL_EM * 0.75,
      { anchor: "left" }
    );
    const valueQuad = value
      ? place(
          fit(quad(textTexture(value, VALUE_EM, { weight: 600 })), width - 4),
          left + 2,
          bottom + height * 0.36,
          { anchor: "left" }
        )
      : null;
    return [labelQuad, valueQuad].filter(Boolean);
  }
  const tolY = TB.bottom + TALL;
  const projectionSymbol = (() => {
    const texture = cached("first-angle", (ctx) => {
      const w = 34;
      const h = 13;
      if (!ctx) return { w, h };
      ctx.strokeStyle = tokens.ink;
      ctx.lineWidth = 0.45;
      // First-angle: the cone's side view with its small end to the left,
      // and the end view (two circles) to its right.
      ctx.beginPath();
      ctx.moveTo(3, h / 2 - 2.4);
      ctx.lineTo(15, h / 2 - 5);
      ctx.lineTo(15, h / 2 + 5);
      ctx.lineTo(3, h / 2 + 2.4);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(25, h / 2, 5, 0, Math.PI * 2);
      ctx.moveTo(27.4, h / 2);
      ctx.arc(25, h / 2, 2.4, 0, Math.PI * 2);
      ctx.stroke();
      return { w, h };
    });
    return place(quad(texture), tolSplit[1] + 3, tolY + TALL * 0.38, {
      anchor: "left",
    });
  })();
  const tolerances = [
    ...cell("GENERAL TOLERANCES", "ISO 2768-m", tbLeft, tolY, TALL, tolSplit[0] - tbLeft),
    ...cell("TOLERANCING", "ISO 8015", tolSplit[0], tolY, TALL, tolSplit[1] - tolSplit[0]),
    ...cell("PROJECTION", null, tolSplit[1], tolY, TALL, TB.right - tolSplit[1]),
    projectionSymbol,
  ];
  const titleRow = [
    ...cell("TITLE", "FLANGED HOUSING", tbLeft, TB.bottom, TALL, titleSplit[0] - tbLeft),
    ...cell("SHEET", "A3 · 1:1 · REV A", titleSplit[0], TB.bottom, TALL, titleSplit[1] - titleSplit[0]),
    ...cell("NO.", "1 OF 1", titleSplit[1], TB.bottom, TALL, TB.right - titleSplit[1]),
  ];

  // ---- Apply ------------------------------------------------------------
  const target = new THREE.Vector3(0, 88, -60).multiplyScalar(SHOWCASE_ZOOM);
  const storyTarget = new THREE.Vector3(0, SHEET_Y, 0);
  let time = 0;
  let showcaseOn = false;
  let spin = 0;

  // The video's large model sits a little in front of the sheet's plane, so
  // it never cuts through the sheet as the sheet arrives.
  const bigAt = new THREE.Vector3(0, SHEET_Y - 6, 110);
  const isoAt = new THREE.Vector3(ISO.x, SHEET_Y + ISO.y, ISO.z);

  function apply() {
    const p = paramsAt(showcaseOn ? END : time);

    object.scale.setScalar(showcaseOn ? SHOWCASE_ZOOM : 1);

    // Housing.
    if (showcaseOn) {
      body.position.set(0, (assemblyHeight / 2) * SHOWCASE_SCALE + 0.2, 0);
      body.scale.setScalar(SHOWCASE_SCALE);
      body.rotation.set(0, spin, 0, "XYZ");
    } else {
      body.position.copy(bigAt).lerp(isoAt, p.move);
      body.scale.setScalar(lerp(BIG, ISO.scale, p.move));
      body.rotation.set(ISO_TIP, ISO_TURN + 0.1 * p.drift, 0, "XYZ");
    }
    const capIn = showcaseOn ? 1 : p.cap;
    const boltsIn = showcaseOn ? 1 : p.bolts;
    parts.cap.position.y = capSeat + 34 * (1 - capIn);
    capSkin.opacity = capIn;
    capSkin.depthWrite = capIn > 0.99;
    parts.cap.visible = capIn > 0.001;
    parts.bolts.position.y = 22 * (1 - boltsIn);
    boltSkin.opacity = boltsIn;
    boltSkin.depthWrite = boltsIn > 0.99;
    parts.bolts.visible = boltsIn > 0.001;

    // Sheet.
    if (showcaseOn) {
      sheet.position.set(0, SHOWCASE_SHEET.y, SHOWCASE_SHEET.z);
      sheet.rotation.x = SHOWCASE_SHEET.lean;
      sheet.scale.setScalar(SHOWCASE_SHEET.scale);
    } else {
      sheet.position.set(0, SHEET_Y, 0);
      sheet.rotation.x = 0;
      sheet.scale.setScalar(1);
    }
    ink = showcaseOn ? SHOWCASE_DIM : 1;
    fill.material.opacity = p.fill;
    fill.visible = p.fill > 0.001;

    outerBorder.set(p.outer);
    innerBorder.set(p.inner);
    front.set(p.front);
    hidden.set(p.hidden);
    frontCentre.set(p.frontCentre);
    projection.set(p.projection, p.projectionFade);
    planOutline.set(p.planOutline);
    planCircles.set(p.planCircles);
    planHoles.set(p.planHoles);
    planCentres.set(p.planCentres);

    d110.set(p.d110);
    d55.set(p.d55);
    d80.set(p.d80);
    d42.set(p.d42);
    d13Leader.set(p.d13.line);
    d13Arrow.show(p.d13.line >= 0.98 ? 1 : 0);
    showQuad(d13Note, p.d13.value);

    datumALeader.set(p.datumA.leader);
    datumATriangle.show(p.datumA.leader > 0 ? 1 : 0);
    showQuad(datumABox, p.datumA.box);
    datumBLeader.set(p.datumB.leader);
    datumBTriangle.show(p.datumB.leader > 0 ? 1 : 0);
    showQuad(datumBBox, p.datumB.box);
    perpLeader.set(p.perpendicularity.leader);
    showQuad(perpFrame, p.perpendicularity.box);
    flatLeader.set(p.flatness.leader);
    flatArrow.show(p.flatness.leader >= 0.98 ? 1 : 0);
    showQuad(flatFrame, p.flatness.box);
    showQuad(positionFrame, p.position);

    table.set(p.table);
    bomRows.forEach((row, i) =>
      row.forEach((mesh) => showQuad(mesh, p.rows[i]))
    );
    tolerances.forEach((mesh) => showQuad(mesh, p.tolerances));
    titleRow.forEach((mesh) => showQuad(mesh, p.title));

    // Balloons point at the isometric view, which the showcase takes away.
    setBalloons(p.balloons, !showcaseOn);
  }

  function update(t) {
    time = t;
    apply();
  }

  // Showcase view, independent of scene time: the story ends on the sheet,
  // so the showcase brings the finished assembly (body, cap and bolts) off
  // the sheet to stand at the origin, turning, with the completed sheet
  // fixed and dimmed behind it. No balloons: they belong to the iso view.
  function view({ spin: angle, showcase }) {
    const on = showcase > 0.5;
    spin = angle;
    if (on !== showcaseOn) {
      showcaseOn = on;
      apply();
    } else if (on) {
      body.rotation.set(0, spin, 0, "XYZ");
    }
  }

  return {
    object,
    update,
    view,
    camera: {
      target,
      distance: 780,
      elevation: 3 * RAD,
      // Near head-on, swinging ±7° over the video's 15 s period.
      swing: 7 * RAD,
      period: 15,
      at: () => ({ target: storyTarget }),
      // Showcase: a higher, isometric-style view; one full turn in 24 s.
      showcaseElevation: 30 * RAD,
      showcaseDistance: 900 * SHOWCASE_ZOOM,
      spinPeriod: 24,
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      pens.forEach((p) => p.line.geometry.dispose());
      balloons.forEach((b) => b.leader.geometry.dispose());
    },
  };
}
