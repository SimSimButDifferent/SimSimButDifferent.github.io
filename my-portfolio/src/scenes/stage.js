// Shared stage for scroll-driven three.js scenes: renderer, camera, lights
// and the blueprint floor from the service videos. A scene is a pure function
// of time, so the page can scrub it with scroll instead of playing it.
//
// Loaded only on the client, on demand, by ScrollScene.
import * as THREE from "three";

export const tokens = {
  navy: 0x0f172a,
  line: 0x334155,
  found: 0x5f6f8a, // slate finish: starting point
  render: 0xa9d9ee, // satin ice-blue finish: delivered
  cut: 0x0891b2, // section faces
  cyan: 0x22d3ee, // construction geometry only
  ink: "#f8fafc",
};

const loaders = {
  "dfm-consultancy": () => import("./dfm-consultancy"),
};

function blueprintFloor() {
  const group = new THREE.Group();

  // Grid lines fade out with distance so the canvas has no visible edge.
  const size = 208;
  const fade = 100;
  const step = 13;
  const piece = 6.5;
  const positions = [];
  const colours = [];
  const line = new THREE.Color(tokens.line);
  const alphaAt = (x, z) => {
    const d = Math.hypot(x, z) / fade;
    return Math.max(0, 1 - d * d) * 0.7;
  };
  const push = (x1, z1, x2, z2) => {
    positions.push(x1, 0, z1, x2, 0, z2);
    colours.push(line.r, line.g, line.b, alphaAt(x1, z1));
    colours.push(line.r, line.g, line.b, alphaAt(x2, z2));
  };
  for (let a = -size; a <= size; a += step) {
    for (let b = -size; b < size; b += piece) {
      push(a, b, a, b + piece);
      push(b, a, b + piece, a);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colours, 4));
  const grid = new THREE.LineSegments(
    geometry,
    new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
    })
  );
  grid.position.y = -0.6;
  group.add(grid);

  // Cyan light pool under the subject.
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(34, 211, 238, 0.22)");
  g.addColorStop(0.5, "rgba(34, 211, 238, 0.07)");
  g.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const pool = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(c),
      transparent: true,
      depthWrite: false,
    })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -0.4;
  group.add(pool);

  return group;
}

function disposeTree(root) {
  root.traverse((node) => {
    node.geometry?.dispose();
    const materials = Array.isArray(node.material)
      ? node.material
      : node.material
        ? [node.material]
        : [];
    materials.forEach((material) => {
      material.map?.dispose();
      material.dispose();
    });
  });
}

// mountScene(canvas, slug) -> { seek(t), resize(width, height), dispose() }
// Throws if WebGL is unavailable; the caller falls back to still frames.
export async function mountScene(canvas, slug) {
  const load = loaders[slug];
  if (!load) throw new Error(`No scroll scene registered for "${slug}"`);
  const { create } = await load();

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xdbeafe, tokens.navy, 1.4));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(70, 130, 110);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x93c5fd, 0.7);
  fill.position.set(-110, 50, 60);
  scene.add(fill);
  scene.add(blueprintFloor());

  const fontFamily = getComputedStyle(canvas).fontFamily || "sans-serif";
  const part = create({ THREE, tokens, fontFamily });
  scene.add(part.object);

  const camera = new THREE.PerspectiveCamera(28, 4 / 3, 1, 1200);
  const {
    target,
    distance,
    elevation,
    swing,
    period,
    showcaseElevation = elevation,
    spinPeriod = 24,
  } = part.camera;
  let time = 0;

  // Showcase: the part turns continuously under a higher camera. `weight`
  // blends in and out over BLEND seconds; on the way out the part settles to
  // the nearest whole turn so the review view picks up where it expects.
  const BLEND = 0.9;
  const TURN = Math.PI * 2;
  const smooth = (x) => x * x * (3 - 2 * x);
  let spin = 0;
  let weight = 0;
  let showcaseOn = false;
  let settle = null;
  let frame = null;
  let last = 0;

  const render = () => {
    const w = smooth(weight);
    const azimuth = swing * (1 - w) * Math.sin((2 * Math.PI * time) / period);
    const el = elevation + (showcaseElevation - elevation) * w;
    camera.position.set(
      target.x + distance * Math.sin(azimuth) * Math.cos(el),
      target.y + distance * Math.sin(el),
      target.z + distance * Math.cos(azimuth) * Math.cos(el)
    );
    camera.lookAt(target);
    part.view?.({ spin, showcase: w });
    renderer.render(scene, camera);
  };

  const tick = (now) => {
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    if (showcaseOn) {
      weight = Math.min(1, weight + dt / BLEND);
      spin += (dt * TURN) / spinPeriod;
    } else {
      weight = Math.max(0, weight - dt / BLEND);
      if (settle) {
        settle.progress = Math.min(1, settle.progress + dt / BLEND);
        spin = settle.from + (settle.to - settle.from) * smooth(settle.progress);
      }
    }
    const busy = showcaseOn || weight > 0 || (settle && settle.progress < 1);
    if (busy) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = null;
      last = 0;
      spin = 0;
      settle = null;
    }
    render();
  };

  const run = () => {
    if (frame === null) frame = requestAnimationFrame(tick);
  };

  return {
    seek(t) {
      time = t;
      part.update(t);
      if (frame === null) render();
    },
    // Turn the showcase on or off; the change blends over BLEND seconds.
    setShowcase(on) {
      if (on === showcaseOn) return;
      showcaseOn = on;
      settle = on
        ? null
        : { from: spin, to: Math.round(spin / TURN) * TURN, progress: 0 };
      run();
    },
    // Fixed pose for rendering still frames.
    pose(t, spinAngle, showcase) {
      time = t;
      part.update(t);
      spin = spinAngle;
      weight = showcase;
      render();
    },
    resize(width, height) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    },
    dispose() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      part.dispose();
      disposeTree(scene);
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
