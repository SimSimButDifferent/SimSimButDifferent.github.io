// Shared stage for scroll-driven three.js scenes: renderer, camera, lights
// and the blueprint floor from the service videos. A scene is a pure function
// of time, so the page can scrub it with scroll instead of playing it.
//
// Loaded only on the client, on demand, by ScrollScene.
import * as THREE from "three";

// Lighting. The showcase (landing loop) is the brightest frame on a page:
// while it is on, the key and sky lights are raised and a second, tighter
// cyan glow is added under the subject. The glow is small on purpose: the
// showcase camera sits higher, and a brighter full-size pool would run off
// the bottom of the canvas as a visible edge.
const KEY_LIGHT = 2.4;
const KEY_LIGHT_SHOWCASE = 3.1;
const SKY_LIGHT = 1.4;
const SKY_LIGHT_SHOWCASE = 1.65;

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
  "solidworks-design": () => import("./solidworks-design"),
  "cad-file-conversion": () => import("./cad-file-conversion"),
  "construction-drawings": () => import("./construction-drawings"),
  "reverse-engineering": () => import("./reverse-engineering"),
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

  // Showcase glow: same texture, a little over half the size, off by default.
  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshBasicMaterial({
      map: pool.material.map,
      transparent: true,
      depthWrite: false,
      opacity: 0,
    })
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = -0.3;
  group.add(glow);

  // level: 0 hides the floor, 1 is normal. glow: 0 to 1, showcase only.
  group.userData.set = (level, glowLevel) => {
    grid.material.opacity = level;
    pool.material.opacity = level;
    glow.material.opacity = level * glowLevel;
    group.visible = level > 0.001;
  };

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
  const sky = new THREE.HemisphereLight(0xdbeafe, tokens.navy, SKY_LIGHT);
  scene.add(sky);
  const key = new THREE.DirectionalLight(0xffffff, KEY_LIGHT);
  key.position.set(70, 130, 110);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x93c5fd, 0.7);
  fill.position.set(-110, 50, 60);
  scene.add(fill);
  const floor = blueprintFloor();
  scene.add(floor);

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
    showcaseDistance = distance,
    spinPeriod = 24,
    // Angle (radians) the showcase turn starts from. Set it to the pose of the
    // scene's still frame so the still hands over to the canvas without a jump.
    showcaseSpin = 0,
    // Floor level (0 to 1) in the showcase; 0 hides the floor and its glow.
    showcaseFloor = 1,
    // Optional: at(t) -> { target?, distance?, elevation?, azimuth?, floor? }
    // for a story whose camera moves with scene time (it replaces the
    // pendulum). floor (0 to 1) fades the blueprint floor, for views such as
    // top-down where it would fill the canvas edge to edge.
    at,
  } = part.camera;
  let time = 0;

  // Showcase: a separate animation in which the finished part turns
  // continuously under a higher camera, with no callouts. It switches on and
  // off instantly; ScrollScene hides the canvas across the switch, so the
  // reader sees a quick fade rather than a blend between the two views.
  const TURN = Math.PI * 2;
  let spin = 0;
  let weight = 0;
  let showcaseOn = false;
  let frame = null;
  let last = 0;

  const mix = (a, b, x) => a + (b - a) * x;

  const render = () => {
    const story = at?.(time) ?? {};
    const storyAzimuth =
      story.azimuth ?? swing * Math.sin((2 * Math.PI * time) / period);
    const azimuth = storyAzimuth * (1 - weight);
    const el = mix(story.elevation ?? elevation, showcaseElevation, weight);
    const reach = mix(story.distance ?? distance, showcaseDistance, weight);
    const aim = weight > 0 || !story.target ? target : story.target;
    camera.position.set(
      aim.x + reach * Math.sin(azimuth) * Math.cos(el),
      aim.y + reach * Math.sin(el),
      aim.z + reach * Math.cos(azimuth) * Math.cos(el)
    );
    camera.lookAt(aim);
    key.intensity = mix(KEY_LIGHT, KEY_LIGHT_SHOWCASE, weight);
    sky.intensity = mix(SKY_LIGHT, SKY_LIGHT_SHOWCASE, weight);
    floor.userData.set(mix(story.floor ?? 1, showcaseFloor, weight), weight);
    part.view?.({ spin, showcase: weight });
    renderer.render(scene, camera);
  };

  const tick = (now) => {
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    spin += (dt * TURN) / spinPeriod;
    render();
    frame = showcaseOn ? requestAnimationFrame(tick) : null;
  };

  return {
    seek(t) {
      time = t;
      part.update(t);
      if (frame === null) render();
    },
    // Switch the showcase on or off, instantly, from the start of a turn
    // (showcaseSpin).
    setShowcase(on) {
      showcaseOn = on;
      weight = on ? 1 : 0;
      spin = showcaseSpin;
      last = 0;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = on ? requestAnimationFrame(tick) : null;
      render();
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
