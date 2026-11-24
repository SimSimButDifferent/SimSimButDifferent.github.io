import * as assembly from "./assembly";
import * as dfm from "./dfm";
import * as drawings from "./drawings";
import * as parametric from "./parametric";
import * as production from "./production";
import * as prototype from "./prototype";

// Stage `signature` key (src/data/designFlow.mjs) to its station overlay and
// optional text-side panel.
export const signatures = {
  parametric,
  assembly,
  drawings,
  dfm,
  prototype,
  production,
};
