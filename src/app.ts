// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Rectangle from "./core/Primitives/Rectangle";
import Complex from "./vendors/helper/Complex";

const core = new Core();
const retangle2 = new Rectangle(core.GL, new Complex(0.001, 0.), new Complex(0.2, 0.1));
core.addObj(retangle2);

Complex.makePerpendicular(5, 5);

core.run();
