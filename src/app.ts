
import Compiler from "./core/Compiler";
import VAO from "./core/VAO";
import VBO from "./core/VBO";
import VertexBufferLayout from "./core/VertexBufferLayout";
import * as fragmentSrc from "./shaders/fragment.glsl";
import * as vertexSrc from "./shaders/vertex.glsl";

function resize(glContext: WebGL2RenderingContext) {
    const realToCSSPixels = window.devicePixelRatio;

    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    const displayWidth = Math.floor(glContext.canvas.clientWidth * realToCSSPixels);
    const displayHeight = Math.floor(glContext.canvas.clientHeight * realToCSSPixels);

    // Check if the canvas is not the same size.
    if (glContext.canvas.width !== displayWidth ||
        glContext.canvas.height !== displayHeight) {

        // Make the canvas the same size
        glContext.canvas.width = displayWidth;
        glContext.canvas.height = displayHeight;
    }
}

const canvas = document.getElementById("primary_canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
const compiler: Compiler = new Compiler(gl, vertexSrc.default, fragmentSrc.default);
compiler.useProgram();

const vao = new VAO(gl);
const layout = new VertexBufferLayout();
layout.Push(2); // 2 vertecies

const positions = [
    0, 0, // 1st vertices
    0.5, 0, // 2nd vertecies
    0.5, 0.5, // 3rd vertecies
    0.5, 0.5,
    0, 0.5,
    0, 0,
];

const vbo = new VBO(gl);
vbo.bind();
vbo.setData(positions);
vao.addBuffor(vbo, layout);
resize(gl);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

const primitiveType = gl.TRIANGLES;
const offset = 0;
const count = 6;
gl.drawArrays(primitiveType, offset, count);
