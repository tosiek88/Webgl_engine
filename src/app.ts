// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Line from "./core/Primitives/Line";
import Rectangle from "./core/Primitives/Rectangle";

import Complex from "./vendors/helper/Complex";

const core = new Core();
const retangle1 = new Rectangle(core.GL, { pos: new Complex(0, 0), dim: new Complex(0.001, 1) });
const retangle2 = new Rectangle(core.GL, { pos: new Complex(0, 0), dim: new Complex(1.5, 0.001) });
const line: Line = new Line(core.GL, {
    begin: new Complex(0.0, 0.0),
    end: new Complex(1.5, 1),
    width: 0.005,
});
core.addObj(retangle1);
core.addObj(retangle2);
core.addObj(line);

core.run();
