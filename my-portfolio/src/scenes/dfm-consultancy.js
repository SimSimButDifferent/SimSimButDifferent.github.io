// DFM consultancy scroll scene: a moulded cup is opened as a quarter section,
// three issues are called out (wall, draft, corner), each is fixed in the
// model, and the written report arrives. Mirrors the DFM service video:
// same part, same callouts, same values. Every value is a function of t, so
// the scene can be scrubbed in either direction.
//
// Timeline (seconds, matching the video's beats at 0 / 3.0 / 6.8 / 10.6):
//   0.0  closed cup, slate finish
//   3.0  quarter section opens, callouts arrive one by one
//   6.8  wall 6.0 -> 2.5 mm, draft 0 -> 3 deg, corner sharp -> R2.0
//  10.6  finish turns ice-blue, report page lists the three findings

const RADIUS = 30;
const HEIGHT = 44;
const SEGMENTS = 96;

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ramp = (t, a, b) => clamp01((t - a) / (b - a));
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) => x * x * (3 - 2 * x);
const lerp = (a, b, x) => a + (b - a) * x;
const bump = (t, a, b) => ramp(t, a - 0.2, a) * (1 - ramp(t, b, b + 0.2));

export function paramsAt(t) {
  return {
    open: easeOut(ramp(t, 3.0, 4.4)) * (Math.PI / 2),
    wall: lerp(6, 2.5, easeInOut(ramp(t, 7.0, 8.0))),
    draft: lerp(0, 3, easeInOut(ramp(t, 8.2, 9.2))),
    corner: lerp(0, 2, easeInOut(ramp(t, 9.4, 10.4))),
    finish: easeInOut(ramp(t, 10.6, 11.4)),
  };
}

export function create({ THREE, tokens, fontFamily }) {
  const object = new THREE.Group();
  const textures = new Map();

  // ---- Part -------------------------------------------------------------
  const skin = new THREE.MeshStandardMaterial({
    color: tokens.found,
    roughness: 0.7,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });
  const cutFace = new THREE.MeshBasicMaterial({
    color: tokens.cut,
    side: THREE.DoubleSide,
  });
  const found = new THREE.Color(tokens.found);
  const render = new THREE.Color(tokens.render);

  const surfaces = Array.from({ length: 6 }, () => {
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), skin);
    object.add(mesh);
    return mesh;
  });
  const caps = [1, -1].map((side) => {
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), cutFace);
    mesh.userData.side = side;
    object.add(mesh);
    return mesh;
  });

  const v2 = (r, y) => new THREE.Vector2(r, y);

  function profile({ wall, draft, corner }) {
    const slope = Math.tan((draft * Math.PI) / 180);
    const outer = (y) => RADIUS - (HEIGHT - y) * slope;
    const inner = (y) => outer(y) - wall;
    const cornerR = inner(wall);
    const fillet = [];
    if (corner > 0.01) {
      for (let i = 0; i <= 8; i++) {
        const a = (-i / 8) * (Math.PI / 2);
        fillet.push(
          v2(
            cornerR - corner + corner * Math.cos(a),
            wall + corner + corner * Math.sin(a)
          )
        );
      }
    } else {
      fillet.push(v2(cornerR, wall));
    }
    const filletTop = fillet[0];
    const filletEnd = fillet[fillet.length - 1];
    return {
      outer,
      inner,
      pieces: [
        [v2(0, 0), v2(outer(0), 0)],
        [v2(outer(0), 0), v2(outer(HEIGHT), HEIGHT)],
        [v2(outer(HEIGHT), HEIGHT), v2(inner(HEIGHT), HEIGHT)],
        [v2(inner(HEIGHT), HEIGHT), filletTop],
        fillet.length > 1 ? fillet : null,
        [filletEnd, v2(0, wall)],
      ],
      outline: [
        v2(0, 0),
        v2(outer(0), 0),
        v2(outer(HEIGHT), HEIGHT),
        v2(inner(HEIGHT), HEIGHT),
        ...fillet,
        v2(0, wall),
      ],
    };
  }

  // A sprite compiled without a map ignores one assigned later unless the
  // material is flagged for recompilation.
  function setMap(material, texture) {
    if (material.map === texture) return;
    material.map = texture;
    material.needsUpdate = true;
  }

  // ---- Callouts ---------------------------------------------------------
  const lineMaterial = () =>
    new THREE.LineBasicMaterial({ color: tokens.cyan, transparent: true });

  function textTexture(text) {
    if (textures.has(text)) return textures.get(text);
    const c = document.createElement("canvas");
    c.width = 360;
    c.height = 96;
    const ctx = c.getContext("2d");
    ctx.font = `400 44px ${fontFamily}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = tokens.ink;
    ctx.fillText(text, 8, 50);
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.set(text, texture);
    return texture;
  }

  function ringTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(32, 32, 26, 0, Math.PI * 2);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
  const ring = ringTexture();

  function callout(labelAt, withRing) {
    const group = new THREE.Group();
    const leader = new THREE.Line(new THREE.BufferGeometry(), lineMaterial());
    const label = new THREE.Sprite(
      new THREE.SpriteMaterial({ transparent: true, depthTest: false })
    );
    label.center.set(0, 0.5);
    label.scale.set(25.5, 6.8, 1);
    label.position.copy(labelAt);
    group.add(leader, label);
    let marker = null;
    if (withRing) {
      marker = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: ring,
          transparent: true,
          depthTest: false,
        })
      );
      marker.scale.set(3.4, 3.4, 1);
      group.add(marker);
    }
    object.add(group);
    return {
      group,
      leader,
      label,
      marker,
      set(anchor, text, opacity) {
        group.visible = opacity > 0.001;
        const end = labelAt.clone().add(new THREE.Vector3(-1.5, 0, 0));
        leader.geometry.setFromPoints([anchor, end]);
        leader.material.opacity = opacity;
        setMap(label.material, textTexture(text));
        label.material.opacity = opacity;
        if (marker) {
          marker.position.copy(anchor);
          marker.material.opacity = opacity;
        }
      },
    };
  }

  const wallCallout = callout(new THREE.Vector3(44, HEIGHT * 0.55, 8), false);
  const draftCallout = callout(new THREE.Vector3(42, HEIGHT + 13, 8), true);
  const cornerCallout = callout(new THREE.Vector3(44, -3, 14), true);

  const wallTick = new THREE.Line(new THREE.BufferGeometry(), lineMaterial());
  const draftRef = new THREE.Line(
    new THREE.BufferGeometry(),
    new THREE.LineDashedMaterial({
      color: tokens.cyan,
      transparent: true,
      dashSize: 2.2,
      gapSize: 1.6,
      depthTest: false,
    })
  );
  object.add(wallTick, draftRef);

  // ---- Report page ------------------------------------------------------
  const findings = [
    ["Wall", "6.0 → 2.5 mm"],
    ["Draft", "0° → 3°"],
    ["Corner", "sharp → R2.0"],
  ];

  function reportTexture(ticked) {
    const key = `report-${ticked}`;
    if (textures.has(key)) return textures.get(key);
    const c = document.createElement("canvas");
    c.width = 480;
    c.height = 600;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.roundRect(0, 0, 480, 600, 16);
    ctx.fill();
    ctx.fillStyle = "#475569";
    ctx.font = `600 22px ${fontFamily}`;
    ctx.fillText("DFM REPORT", 40, 70);
    ctx.fillStyle = "#0f172a";
    ctx.font = `300 40px ${fontFamily}`;
    ctx.fillText("Findings", 40, 128);
    findings.forEach(([name, change], i) => {
      const y = 210 + i * 124;
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, y - 44);
      ctx.lineTo(440, y - 44);
      ctx.stroke();
      ctx.fillStyle = "#475569";
      ctx.font = `600 22px ${fontFamily}`;
      ctx.fillText(name.toUpperCase(), 40, y);
      ctx.fillStyle = "#0f172a";
      ctx.font = `400 32px ${fontFamily}`;
      ctx.fillText(change, 40, y + 44);
      if (i < ticked) {
        ctx.strokeStyle = "#0e7490";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(396, y + 20);
        ctx.lineTo(410, y + 34);
        ctx.lineTo(436, y + 4);
        ctx.stroke();
      }
    });
    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.set(key, texture);
    return texture;
  }

  const report = new THREE.Sprite(
    new THREE.SpriteMaterial({ transparent: true, depthTest: false })
  );
  report.scale.set(38, 47.5, 1);
  object.add(report);

  // ---- Update -----------------------------------------------------------
  function update(t) {
    const p = paramsAt(t);
    const { outer, inner, pieces, outline } = profile(p);

    const phiStart = p.open / 2;
    const phiLength = Math.PI * 2 - p.open;
    surfaces.forEach((mesh, i) => {
      mesh.geometry.dispose();
      mesh.visible = Boolean(pieces[i]);
      if (pieces[i]) {
        mesh.geometry = new THREE.LatheGeometry(
          pieces[i],
          SEGMENTS,
          phiStart,
          phiLength
        );
      }
    });

    const shape = new THREE.Shape(outline);
    caps.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.geometry = new THREE.ShapeGeometry(shape);
      mesh.visible = p.open > 0.001;
      mesh.rotation.y = (mesh.userData.side * p.open) / 2 - Math.PI / 2;
    });

    skin.color.copy(found).lerp(render, p.finish);
    skin.roughness = lerp(0.7, 0.32, p.finish);
    skin.metalness = lerp(0.05, 0.35, p.finish);

    // Callouts sit on the right-hand cut face.
    const phi = p.open / 2;
    const onFace = (r, y) =>
      new THREE.Vector3(r * Math.sin(phi), y, r * Math.cos(phi));
    // Nudge towards the camera so lines are not buried in the face.
    const lift = (v) => v.add(new THREE.Vector3(0.2, 0, 0.6));

    const wallOn = bump(t, 7.0, 8.0);
    const draftOn = bump(t, 8.2, 9.2);
    const cornerOn = bump(t, 9.4, 10.4);
    const dim = (others) => 1 - 0.6 * Math.max(...others);

    const wallA = ramp(t, 4.4, 5.0) * dim([draftOn, cornerOn]);
    const draftA = ramp(t, 5.2, 5.8) * dim([wallOn, cornerOn]);
    const cornerA = ramp(t, 6.0, 6.6) * dim([wallOn, draftOn]);

    const yw = HEIGHT * 0.58;
    const w1 = lift(onFace(inner(yw), yw));
    const w2 = lift(onFace(outer(yw), yw));
    wallTick.geometry.setFromPoints([w1, w2]);
    wallTick.material.opacity = wallA;
    wallTick.visible = wallA > 0.001;
    wallCallout.set(w2, `Wall ${p.wall.toFixed(1)} mm`, wallA);

    const d1 = lift(onFace(RADIUS, -5));
    const d2 = lift(onFace(RADIUS, HEIGHT + 6));
    draftRef.geometry.setFromPoints([d1, d2]);
    draftRef.computeLineDistances();
    draftRef.material.opacity = draftA;
    draftRef.visible = draftA > 0.001;
    draftCallout.set(
      lift(onFace(RADIUS, HEIGHT)),
      `Draft ${Math.round(p.draft)}°`,
      draftA
    );

    cornerCallout.set(
      lift(onFace(inner(p.wall), p.wall)),
      p.corner < 0.05 ? "Sharp corner" : `R${p.corner.toFixed(1)} corner`,
      cornerA
    );

    const reportIn = easeOut(ramp(t, 11.0, 11.6));
    const ticked = t >= 12.2 ? 3 : t >= 11.95 ? 2 : t >= 11.7 ? 1 : 0;
    report.visible = reportIn > 0.001;
    setMap(report.material, reportTexture(ticked));
    report.material.opacity = reportIn;
    report.position.set(lerp(-70, -62, reportIn), 26, 0);
  }

  return {
    object,
    update,
    camera: {
      target: new THREE.Vector3(-6, 22, 0),
      distance: 250,
      elevation: (22 * Math.PI) / 180,
      swing: (14 * Math.PI) / 180,
      period: 15,
    },
    dispose() {
      textures.forEach((texture) => texture.dispose());
      ring.dispose();
    },
  };
}
