// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Retangle from "./core/Primitives/Retangle";

const core = new Core();

const retangle = new Retangle(core.GL, [0.0, 0.0], [0.7, 0.5]);

retangle.render();

core.run();
