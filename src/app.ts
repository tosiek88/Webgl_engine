// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Retangle from "./core/Primitives/Retangle";

const core = new Core();
const retangle2 = new Retangle(core.GL, [0.001, 0.5], [0.002, 0.01]);
core.addObj(retangle2);
const retangle = new Retangle(core.GL, [0.001, -0.25], [0.002, 0.01]);
core.addObj(retangle);

core.run();
