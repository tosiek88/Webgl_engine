// import { vec2 } from "gl-matrix";

import Core from "./core/Core";

import Line from "./core/Primitives/Line";
import Rectangle from "./core/Primitives/Rectangle";

import AntialiasedLine from "./core/Primitives/AntialiasedLine";
import Complex from "./vendors/helper/Complex";

const core = new Core();
const retangle1 = new Rectangle(core.GL, { pos: new Complex(0, 0), dim: new Complex(0.001, 1) });
const retangle2 = new Rectangle(core.GL, { pos: new Complex(0, 0), dim: new Complex(1.5, 0.001) });
const line: Line = new Line(core.GL, {
    begin: new Complex(0.0, 0.0),
    end: new Complex(0.5, 1),
    width: 0.006,
});

const line2: AntialiasedLine = new AntialiasedLine(core.GL, {
    begin: new Complex(0.0, 0.0),
    end: new Complex(0.5, 0.1),
    width: 0.005,
});

const line3: AntialiasedLine = new AntialiasedLine(core.GL, {
    begin: new Complex(0.0, 0.0),
    end: new Complex(-0.5, 0.1),
    width: 0.007,
});

const line4: AntialiasedLine = new AntialiasedLine(core.GL, {
    begin: new Complex(0.0, 0.0),
    end: new Complex(0.5, -0.1),
    width: 0.05,
});

document.addEventListener("keydown", (ev: KeyboardEvent) => {
    if (ev.code === "Space") {
        core.stopMainLoop();
        core.run();
    }
});

core.attach(retangle1);
core.attach(retangle2);
core.attach(line2);
core.attach(line3);

core.run();
