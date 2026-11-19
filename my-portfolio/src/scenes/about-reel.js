// About page service carousel: the five service subjects, finished and
// turning, shown one at a time. The page chooses which with select(index);
// a short scale cut hands over from one to the next. The order follows the
// route from design to production, and must match the slides in
// src/app/about/sceneConfig.js.
//
// Each subject is the service scene's own landing loop, framed as it is on
// its own page: a service scene seen from its showcase distance is scaled by
// (reel distance / that distance) about its showcase target, which lands on
// the reel's target. Every showcase camera sits at 30°, so the view matches.
// The reel has no story: update(t) does nothing.
//
// The page lays the service title and caption over the bottom of the canvas,
// so every subject is drawn at SIZE of its own-page size and lifted by LIFT
// of the frame height: it sits in the top 70% and the text gets the rest.
// No floors on this page: the stage floor is off (showcaseFloor 0) and the
// subjects' own floors are left out.
import { reelCut } from "@/lib/reelTimeline.mjs";
import { create as solidworksDesign } from "./solidworks-design";
import { create as dfmConsultancy } from "./dfm-consultancy";
import { create as constructionDrawings } from "./construction-drawings";
import { create as cadFileConversion } from "./cad-file-conversion";
import { create as reverseEngineering } from "./reverse-engineering";

const RAD = Math.PI / 180;
const TURN = Math.PI * 2;
const END = 12.5; // every service scene ends its story here
const SUBJECTS = [
  solidworksDesign,
  dfmConsultancy,
  constructionDrawings,
  cadFileConversion,
  reverseEngineering,
];
const SPIN_PERIOD = 24; // seconds per turn, as on the service pages
const CUT = TURN * (0.2 / SPIN_PERIOD); // 0.2 s each way for the scale cut
const DISTANCE = 300;
const ELEVATION = 30 * RAD;
const FOV = 28 * RAD; // the stage camera's vertical field of view
const SIZE = 0.7;
const LIFT = 0.15;
// World height that moves a subject up the frame by LIFT of its height: the
// frame spans 2·d·tan(fov/2) at the target, and a vertical offset shows at
// cos(elevation) of its length.
const LIFT_Y = (LIFT * 2 * DISTANCE * Math.tan(FOV / 2)) / Math.cos(ELEVATION);

export function create({ THREE, tokens, fontFamily }) {
  const object = new THREE.Group();
  const target = new THREE.Vector3(0, 20, 0);

  const reel = SUBJECTS.map((build) => {
    const sub = build({ THREE, tokens, fontFamily });
    const cam = sub.camera;
    const reach = cam.showcaseDistance ?? cam.distance;
    const k = (DISTANCE / reach) * SIZE;
    const startSpin = cam.showcaseSpin ?? 0;

    sub.update(END);
    sub.view({ spin: startSpin, showcase: 1 });

    // outer: sits on the reel target and carries the cut's scale.
    // inner: maps the subject's showcase target onto the outer origin.
    const outer = new THREE.Group();
    const inner = new THREE.Group();
    inner.scale.setScalar(k);
    inner.position.copy(cam.target).multiplyScalar(-k);
    inner.add(sub.object);
    outer.add(inner);
    outer.position.copy(target);
    outer.position.y += LIFT_Y;
    outer.visible = false;
    object.add(outer);
    return { sub, outer, startSpin };
  });

  let wanted = 0;
  let cut = null;

  // Always shows the subjects in showcase: the reel has no story to fall back
  // to, and the stage renders at weight 0 while the loop is stopped.
  function view({ spin }) {
    const frame = reelCut(cut, wanted, spin, CUT);
    cut = frame.state;
    const { index, turn, scale } = frame;
    reel.forEach((entry, i) => {
      const on = i === index && scale > 0.001;
      entry.outer.visible = on;
      if (!on) return;
      entry.outer.scale.setScalar(scale);
      entry.sub.view({ spin: entry.startSpin + turn, showcase: 1 });
    });
  }

  return {
    object,
    update() {},
    view,
    select(index) {
      const count = reel.length;
      wanted = ((index % count) + count) % count;
    },
    camera: {
      target,
      distance: DISTANCE,
      elevation: ELEVATION,
      swing: 0,
      period: 15,
      showcaseElevation: ELEVATION,
      showcaseDistance: DISTANCE,
      spinPeriod: SPIN_PERIOD,
      // Each subject starts from its own page's showcase pose, which is where
      // its still frame was taken, so the still hands over without a jump.
      showcaseSpin: 0,
      showcaseFloor: 0,
      // No floor outside the showcase either: the stage renders at weight 0
      // before the turn starts (mount, resize, off-screen).
      at: () => ({ floor: 0 }),
    },
    dispose() {
      reel.forEach(({ sub }) => sub.dispose());
    },
  };
}
