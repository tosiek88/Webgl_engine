// import { vec2 } from "gl-matrix";
import Compiler from "./core/Compiler";
import Core from "./core/Core";
import IBO from "./core/IBO";
import Retangle from "./core/Primitives/Retangle";
import Renderer from "./core/Renderer";
import VAO from "./core/VAO";
import VBO from "./core/VBO";
import VertexBufferLayout from "./core/VertexBufferLayout";
import * as fragmentSrc from "./shaders/fragment.glsl";
import * as vertexSrc from "./shaders/vertex.glsl";

const core = new Core();
const compiler: Compiler = new Compiler(core.GL, vertexSrc.default, fragmentSrc.default);
compiler.useProgram();

// const vao = new VAO(core.GL);
// const bufferLayout = new VertexBufferLayout();
// bufferLayout.Push(2); // 2 vertecies

// const positions2 = new Float32Array([
//     0, 0, // 1st vertices
//     0.5, 0, // 2nd vertecies
//     0.5, 0.5, // 3rd vertecies
//     0, 0.5,
// ]);

// const indicies = new Uint16Array([
//     0, 1, 2,
//     2, 3, 0,
// ]);

// const vbo = new VBO(core.GL);
// vbo.bind();
// vbo.setBuffer(positions2);

// vao.addBuffor(vbo, bufferLayout);

// const ibo = new IBO(core.GL);
// ibo.setBuffor(indicies);
const retangle = new Retangle(core.GL, [0.0, 0.0], [0.7, 0.5]);
retangle.render();

core.run();
