// SolidWorks design scroll scene: a sketch becomes a slotted bracket through
// named features, then one driving dimension (W) rebuilds it into a family of
// three. Mirrors the SolidWorks design service video: same part, same
// labels, same values. Every value is a function of t, so the scene can be
// scrubbed in either direction.
//
// Timeline (seconds, matching the video's beats at 0 / 3.0 / 6.8 / 10.6):
//   0.0  top-down on the sketch plane; profile draws, W = 60
//   3.0  view tilts to three-quarter; extrude, cut and fillet build while
//        the feature list ticks on
//   6.8  a copy slides back and W counts 60 -> 90; again for 90 -> 120
//  10.6  the three brackets turn ice-blue, front to back

// Bracket, in millimetres. The left end is fixed; W grows to the right.
const DEPTH = 40;
const THICKNESS = 8;
const FILLET = 8;
const HOLE_RADIUS = 3;
const HOLE_EDGE = 9; // hole centre to each end: fixed, whatever W is
const SLOT_RADIUS = 4;
const SLOT_EDGE = 22; // slot end centre to each end: the slot grows with W
const PITCH = 70; // row spacing, front to back
const SINK = 0.4; // a copy sits this far down while it slides out of its parent
const WIDTHS = [60, 90, 120];
const LEFT = -WIDTHS[2] / 2; // left ends line up; the family is centred on 0

// World units per millimetre. With the camera distances below, this keeps
// the family large in frame and the floor's fade inside the canvas.
const SCALE = 0.7;
const RAD = Math.PI / 180;

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ramp = (t, a, b) => clamp01((t - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, x) => a + (b - a) * x;

// Feature list: name and the time it ticks on.
const FEATURES = [
  ["Sketch1", 0.5],
  ["Boss-Extrude1", 3.6],
  ["Cut-Extrude1", 5.2],
  ["Fillet1", 5.9],
];

export function paramsAt(t) {
  const second = easeInOut(ramp(t, 7.5, 8.5));
  const third = easeInOut(ramp(t, 9.0, 10.0));
  return {
    // Corner rectangle: first corner placed at 0.5, dragged to the opposite
    // corner by 1.5. 0 to 1 along the diagonal.
    profile: easeInOut(ramp(t, 0.5, 1.5)),
    dimension: easeOut(ramp(t, 1.5, 2.0)),
    tilt: easeInOut(ramp(t, 3.0, 4.0)),
    extrude: easeOut(ramp(t, 3.4, 4.0)),
    solid: ramp(t, 3.7, 4.1),
    cutSketch: ramp(t, 4.6, 5.0) * (1 - ramp(t, 5.3, 5.6)),
    cut: easeInOut(ramp(t, 5.0, 5.5)),
    fillet: easeInOut(ramp(t, 5.8, 6.5)) * FILLET,
    // The video clears the list from 6.3; here it holds to the end of the
    // "How it works" pane (6.8) and clears as the family starts to form.
    list: 1 - ramp(t, 6.8, 7.2),
    family: easeInOut(ramp(t, 6.8, 7.6)), // view widens from one part to three
    brackets: [
      { on: 1, z: PITCH, width: 60, sink: 0 },
      {
        on: ramp(t, 6.8, 6.95),
        z: lerp(PITCH, 0, easeInOut(ramp(t, 6.8, 7.5))),
        width: lerp(60, 90, second),
        sink: SINK * (1 - ramp(t, 7.3, 7.5)),
      },
      {
        on: ramp(t, 8.5, 8.65),
        z: lerp(0, -PITCH, easeInOut(ramp(t, 8.5, 9.0))),
        width: lerp(90, 120, third),
        sink: SINK * (1 - ramp(t, 8.85, 9.0)),
      },
    ],
    finish: [0, 1, 2].map((i) =>
      easeInOut(ramp(t, 10.6 + i * 0.25, 11.2 + i * 0.25))
    ),
  };
}

// Camera for the story, in world units. Starts top-down on the sketch plane,
// tilts to three-quarter, then widens to take in the family.
function storyCamera(THREE, t) {
  const p = paramsAt(t);
  const first = new THREE.Vector3((LEFT + 30) * SCALE, 2, PITCH * SCALE);
  const family = new THREE.Vector3(-6, 2, 8);
  return {
    elevation: lerp(80, 27, p.tilt) * RAD,
    azimuth: lerp(0, 35, p.tilt) * RAD,
    target: first.lerp(family, p.family),
    distance: lerp(235, 280, p.family),
    // Top-down, the floor would fill the canvas; the sketch plane is the
    // surface there. The floor arrives as the view tilts.
    floor: p.tilt,
  };
}

export function create({ THREE, tokens, fontFamily }) {
  // object: everything. body: the brackets and their dimensions, which turn
  // together in the showcase. The feature list stays on object.
  const object = new THREE.Group();
  object.scale.setScalar(SCALE);
  const body = new THREE.Group();
  object.add(body);
  const textures = new Map();

  // Construction lines faded as a set in the showcase (see dfm-consultancy).
  const annotated = [];
  let annotationFade = 1;
  const annotate = (node, materials) => {
    const entry = { node, materials, base: 0 };
    annotated.push(entry);
    return entry;
  };
  const applyFade = () => {
    annotated.forEach((entry) => {
      const opacity = entry.base * annotationFade;
      entry.materials.forEach((material) => {
        material.opacity = opacity;
      });
      entry.node.visible = opacity > 0.001;
    });
  };

  const cyanLine = () =>
    new THREE.LineBasicMaterial({
      color: tokens.cyan,
      transparent: true,
      depthTest: false,
    });

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

  const listTexture = (text) =>
    cached(`list-${text}`, 360, 96, (ctx) => {
      ctx.font = `400 40px ${fontFamily}`;
      ctx.textBaseline = "middle";
      ctx.fillStyle = tokens.ink;
      ctx.fillText(text, 8, 50);
    });

  // Dimension value on a navy plate, so it reads over the part and the floor.
  const valueTexture = (text) =>
    cached(`value-${text}`, 256, 96, (ctx) => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.beginPath();
      ctx.roundRect(4, 8, 248, 80, 14);
      ctx.fill();
      ctx.font = `400 40px ${fontFamily}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = tokens.ink;
      ctx.fillText(text, 128, 50);
    });

  // ---- Bracket geometry -------------------------------------------------
  // Shapes are drawn in (x, s) and laid flat, so s runs towards the back.
  const half = DEPTH / 2;

  function outlineShape(width, fillet) {
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
  function cutPaths(width) {
    const circle = (x) => {
      const path = new THREE.Path();
      path.absarc(x, 0, HOLE_RADIUS, 0, Math.PI * 2, true);
      return path;
    };
    const slot = new THREE.Path();
    const x1 = SLOT_EDGE;
    const x2 = width - SLOT_EDGE;
    slot.moveTo(x1, SLOT_RADIUS);
    slot.lineTo(x2, SLOT_RADIUS);
    slot.absarc(x2, 0, SLOT_RADIUS, Math.PI / 2, -Math.PI / 2, true);
    slot.lineTo(x1, -SLOT_RADIUS);
    slot.absarc(x1, 0, SLOT_RADIUS, -Math.PI / 2, Math.PI / 2, true);
    return [circle(HOLE_EDGE), slot, circle(width - HOLE_EDGE)];
  }

  const flat = (geometry) => geometry.rotateX(-Math.PI / 2);
  const extrude = (shapes, depth) =>
    flat(
      new THREE.ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: false,
        curveSegments: 10,
      })
    );

  const found = new THREE.Color(tokens.found);
  const render = new THREE.Color(tokens.render);

  // A copy starts inside the bracket it is copied from, so for a moment
  // their faces coincide and would flicker (z-fighting). Each later copy is
  // pushed a step further back in depth, so the earlier bracket always wins,
  // and it sits a fraction lower while it slides out (see `sink`).
  function makeBracket(_, index) {
    const group = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({
      color: tokens.found,
      roughness: 0.7,
      metalness: 0.05,
      transparent: true,
      polygonOffset: true,
      polygonOffsetFactor: index * 2,
      polygonOffsetUnits: index * 2,
    });
    const solid = new THREE.Mesh(new THREE.BufferGeometry(), skin);
    // Material still filling the holes while the cut runs down through it.
    const plug = new THREE.Mesh(new THREE.BufferGeometry(), skin);
    const edges = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: tokens.ink, transparent: true })
    );
    group.add(solid, plug, edges);

    // Driving dimension: extension lines, dimension line with arrowheads,
    // and the live value.
    const dimension = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      cyanLine()
    );
    const value = new THREE.Sprite(
      new THREE.SpriteMaterial({ transparent: true, depthTest: false })
    );
    value.scale.set(24, 9, 1);
    value.renderOrder = 2;
    group.add(dimension, value);
    const dimensionFade = annotate(dimension, [dimension.material]);

    body.add(group);
    let built = "";
    let plugged = false;

    return {
      group,
      set({ width, extrudeBy, cut, fillet, solidOpacity, alpha, finish, drawn }) {
        const height = THICKNESS * extrudeBy;
        const key = [width, height, cut, fillet].map((n) => n.toFixed(3)).join();
        if (key !== built) {
          built = key;
          const shape = outlineShape(width, fillet);
          const paths = cutPaths(width);
          if (cut > 0) shape.holes = paths;
          solid.geometry.dispose();
          solid.geometry = extrude(shape, Math.max(height, 0.01));
          edges.geometry.dispose();
          edges.geometry = new THREE.EdgesGeometry(solid.geometry, 25);
          plug.geometry.dispose();
          plugged = cut > 0 && cut < 1;
          if (plugged) {
            plug.geometry = extrude(
              paths.map((path) => new THREE.Shape(path.getPoints(10))),
              Math.max(height * (1 - cut), 0.01)
            );
          }
        }

        group.visible = alpha > 0.001;
        skin.opacity = solidOpacity * alpha;
        solid.visible = skin.opacity > 0.001;
        plug.visible = plugged && solid.visible;
        edges.material.opacity = (extrudeBy > 0 ? 1 : 0) * alpha;
        edges.visible = edges.material.opacity > 0.001;

        skin.color.copy(found).lerp(render, finish);
        skin.roughness = lerp(0.7, 0.32, finish);
        skin.metalness = lerp(0.05, 0.35, finish);

        // Dimension in front of the part, at floor level, growing from the
        // fixed left end as it is drawn.
        const z = half + 12;
        const end = width * drawn;
        const a = 2.6;
        const points = [
          [0, half + 3, 0, half + 16],
          [width, half + 3, width, half + 16],
          [0, z, end, z],
          [0, z, a, z - 1.4],
          [0, z, a, z + 1.4],
          [end, z, end - a, z - 1.4],
          [end, z, end - a, z + 1.4],
        ].flatMap(([xa, za, xb, zb]) => [
          new THREE.Vector3(xa, 0.3, za),
          new THREE.Vector3(xb, 0.3, zb),
        ]);
        dimension.geometry.setFromPoints(points);
        dimensionFade.base = alpha * ramp(drawn, 0, 0.15);

        setMap(value.material, valueTexture(`W = ${Math.round(width)}`));
        value.position.set(width / 2, 0.3, z);
        value.material.opacity = alpha * ramp(drawn, 0.7, 1);
        value.visible = value.material.opacity > 0.001;
      },
    };
  }

  const brackets = WIDTHS.map(makeBracket);

  // ---- Sketch -----------------------------------------------------------
  // Sketch plane, profile and cut outlines belong to the first bracket.
  const first = brackets[0].group;

  const plane = new THREE.Mesh(
    flat(new THREE.PlaneGeometry(176, 118)),
    new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
  );
  const planeEdge = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(
      [
        [-88, -59],
        [88, -59],
        [88, 59],
        [-88, 59],
      ].map(([x, z]) => new THREE.Vector3(x, 0, z))
    ),
    cyanLine()
  );
  const sketchPlane = new THREE.Group();
  sketchPlane.add(plane, planeEdge);
  sketchPlane.position.set(30, 0.05, 0);
  first.add(sketchPlane);

  // Sketch profile, drawn the way SolidWorks draws a corner rectangle: the
  // first corner is placed (back left), then the opposite corner is dragged
  // out along the diagonal with all four sides following it.
  const profile = new THREE.LineLoop(new THREE.BufferGeometry(), cyanLine());
  const profileCorners = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
      color: tokens.cyan,
      size: 7,
      sizeAttenuation: false,
      transparent: true,
      depthTest: false,
    })
  );
  first.add(profile, profileCorners);

  function setProfile(fraction) {
    const x = 60 * fraction;
    const z = -half + DEPTH * fraction;
    const at = (px, pz) => new THREE.Vector3(px, 0.3, pz);
    profile.geometry.setFromPoints([
      at(0, -half),
      at(x, -half),
      at(x, z),
      at(0, z),
    ]);
    profileCorners.geometry.setFromPoints([at(0, -half), at(x, z)]);
  }

  const cutOutlines = new THREE.Group();
  cutPaths(60).forEach((path) => {
    const points = path
      .getPoints(16)
      .map((p) => new THREE.Vector3(p.x, 0, -p.y));
    cutOutlines.add(
      new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        cyanLine()
      )
    );
  });
  cutOutlines.position.y = THICKNESS + 0.2;
  first.add(cutOutlines);

  // ---- Feature list -----------------------------------------------------
  // Held in the camera's plane, top right of the view, so it stays put while
  // the view tilts.
  const list = FEATURES.map(([name]) => {
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: listTexture(name),
        transparent: true,
        depthTest: false,
      })
    );
    sprite.center.set(0, 0.5);
    sprite.scale.set(66, 17.6, 1);
    sprite.renderOrder = 2;
    object.add(sprite);
    return sprite;
  });

  function placeList(camera) {
    const { target, distance, elevation, azimuth } = camera;
    const right = new THREE.Vector3(Math.cos(azimuth), 0, -Math.sin(azimuth));
    const back = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(elevation),
      Math.sin(elevation),
      Math.cos(azimuth) * Math.cos(elevation)
    );
    const up = new THREE.Vector3().crossVectors(back, right);
    list.forEach((sprite, i) => {
      sprite.position
        .copy(target)
        .addScaledVector(right, distance * 0.13)
        .addScaledVector(up, distance * (0.2 - i * 0.04))
        .divideScalar(SCALE);
    });
  }

  // ---- Update -----------------------------------------------------------
  function update(t) {
    const p = paramsAt(t);

    brackets.forEach((bracket, i) => {
      const state = p.brackets[i];
      bracket.group.position.set(LEFT, -state.sink, state.z);
      bracket.set({
        width: state.width,
        extrudeBy: i === 0 ? p.extrude : 1,
        cut: i === 0 ? p.cut : 1,
        fillet: i === 0 ? p.fillet : FILLET,
        solidOpacity: i === 0 ? p.solid : 1,
        alpha: state.on,
        finish: p.finish[i],
        drawn: i === 0 ? p.dimension : 1,
      });
    });

    const planeOn = 1 - ramp(t, 3.0, 3.6);
    plane.material.opacity = 0.16 * planeOn;
    planeEdge.material.opacity = 0.5 * planeOn;
    sketchPlane.visible = planeOn > 0.001;

    setProfile(p.profile);
    profile.material.opacity = 1 - ramp(t, 3.5, 4.0);
    profile.visible = p.profile > 0 && profile.material.opacity > 0.001;
    // The corner points show from the first click until the dimension is on.
    profileCorners.material.opacity =
      ramp(t, 0.4, 0.5) * (1 - ramp(t, 2.0, 2.4));
    profileCorners.visible = profileCorners.material.opacity > 0.001;

    cutOutlines.children.forEach((line) => {
      line.material.opacity = p.cutSketch;
    });
    cutOutlines.visible = p.cutSketch > 0.001;

    placeList(storyCamera(THREE, t));
    list.forEach((sprite, i) => {
      sprite.userData.base = ramp(t, FEATURES[i][1], FEATURES[i][1] + 0.3) * p.list;
    });

    applyView();
  }

  // Showcase view, independent of scene time: `spin` turns the family about
  // its centre (radians); `showcase` (0 to 1) fades the dimension lines and
  // the feature list so the turning parts read cleanly. The W values stay.
  function applyView() {
    list.forEach((sprite) => {
      sprite.material.opacity = (sprite.userData.base ?? 0) * annotationFade;
      sprite.visible = sprite.material.opacity > 0.001;
    });
    applyFade();
  }

  function view({ spin, showcase }) {
    body.rotation.y = spin;
    annotationFade = 1 - showcase;
    applyView();
  }

  return {
    object,
    update,
    view,
    camera: {
      target: new THREE.Vector3(0, 2, 0),
      distance: 280,
      elevation: 27 * RAD,
      swing: 0,
      period: 15,
      // Story: top-down on the sketch, tilting to three-quarter. No pendulum.
      at: (t) => storyCamera(THREE, t),
      // Showcase: a higher, isometric-style view; one full turn in 24 s.
      showcaseElevation: 30 * RAD,
      showcaseDistance: 287,
      spinPeriod: 24,
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
    },
  };
}
