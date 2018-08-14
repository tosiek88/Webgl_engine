// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Rectangle from "./core/Primitives/Rectangle";

const core = new Core();
const retangle2 = new Rectangle(core.GL, [0.001, 0.0], [0.2, 0.1]);
core.addObj(retangle2);

core.run();
