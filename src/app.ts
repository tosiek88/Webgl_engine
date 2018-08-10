// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Retangle from "./core/Primitives/Retangle";

const core = new Core();

const retangle = new Retangle(core.GL, [-0.75, 0], [0.005, 0.01]);
core.addObj(retangle);

core.run();
