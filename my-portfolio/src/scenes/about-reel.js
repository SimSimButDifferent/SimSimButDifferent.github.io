// About page landing loop: the five service subjects, finished and turning,
// shown one at a time. Each holds the frame for one slot of the showcase turn
// (5 s), then a short scale cut hands over to the next. The order follows the
// route from design to production.
//
// Each subject is the service scene's own landing loop, framed as it is on
// its own page: a service scene seen from its showcase distance is scaled by
// (reel distance / that distance) about its showcase target, which lands on
// the reel's target. Every showcase camera sits at 30°, so the view matches.
// The reel has no story: update(t) does nothing.
//
// The stage's own floor is off (showcaseFloor 0). Each subject that has a
// floor on its own page gets its own copy, inside its scaled group, so it
// stands on the grid at the same height as it does there.
import { reelSlot } from "@/lib/reelTimeline.mjs";
import { blueprintFloor } from "./stage";
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
const SLOT = TURN / SUBJECTS.length; // 72° of turn, 5 s at spinPeriod 25
const CUT = SLOT * (0.2 / 5); // 0.2 s scale cut at each end of a slot
const DISTANCE = 300;
const ELEVATION = 30 * RAD;

export function create({ THREE, tokens, fontFamily }) {
  const object = new THREE.Group();
  const target = new THREE.Vector3(0, 20, 0);

  const reel = SUBJECTS.map((build) => {
    const sub = build({ THREE, tokens, fontFamily });
    const cam = sub.camera;
    const reach = cam.showcaseDistance ?? cam.distance;
    const k = DISTANCE / reach;
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
    if ((cam.showcaseFloor ?? 1) > 0) {
      const floor = blueprintFloor();
      floor.userData.set(cam.showcaseFloor ?? 1, 1);
      inner.add(floor);
    }
    outer.add(inner);
    outer.position.copy(target);
    outer.visible = false;
    object.add(outer);
    return { sub, outer, startSpin };
  });

  function view({ spin, showcase }) {
    const { index, turn, scale } = reelSlot(spin, reel.length, SLOT, CUT);
    reel.forEach((entry, i) => {
      const on = i === index && scale > 0.001;
      entry.outer.visible = on;
      if (!on) return;
      entry.outer.scale.setScalar(scale);
      entry.sub.view({ spin: entry.startSpin + turn, showcase });
    });
  }

  return {
    object,
    update() {},
    view,
    camera: {
      target,
      distance: DISTANCE,
      elevation: ELEVATION,
      swing: 0,
      period: 15,
      showcaseElevation: ELEVATION,
      showcaseDistance: DISTANCE,
      // Five slots of 5 s each.
      spinPeriod: 25,
      // Start just past the first cut, so the still (posed here) hands over
      // to the canvas without a jump.
      showcaseSpin: CUT,
      showcaseFloor: 0,
    },
    dispose() {
      reel.forEach(({ sub }) => sub.dispose());
    },
  };
}
