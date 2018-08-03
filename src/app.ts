import Compiler from "./core/Compiler";
import Core from "./core/Core";
import VAO from "./core/VAO";
import VBO from "./core/VBO";
import VertexBufferLayout from "./core/VertexBufferLayout";
import * as fragmentSrc from "./shaders/fragment.glsl";
import * as vertexSrc from "./shaders/vertex.glsl";

const core = new Core();
const compiler: Compiler = new Compiler(core.GL, vertexSrc.default, fragmentSrc.default);
compiler.useProgram();

const vao = new VAO(core.GL);
const bufferLayout = new VertexBufferLayout();
bufferLayout.Push(2); // 2 vertecies

const positions = [
    0, 0, // 1st vertices
    0.5, 0, // 2nd vertecies
    0.5, 0.5, // 3rd vertecies
    0.5, 0.5,
    0, 0.5,
    0, 0,
];

const vbo = new VBO(core.GL);
vbo.bind();
vbo.setData(positions);
vao.addBuffor(vbo, bufferLayout);
core.run();
