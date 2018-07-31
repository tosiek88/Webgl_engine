
import * as vertexSrc from './shaders/vertex.glsl';
import * as fragmentSrc from './shaders/fragment.glsl';
import Compiler from './core/Compiler'
import VAO from './core/VAO';
import VertexBufferLayout from './core/VertexBufferLayout';
import VBO from './core/VBO';




const canvas = document.getElementById("primary_canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
const compiler: Compiler = new Compiler(gl, vertexSrc.default, fragmentSrc.default);
compiler.useProgram();

const vao = new VAO(gl);
const layout = new VertexBufferLayout();
layout.Push(2); //2 vertecies

const positions = [
    0, 0, //1st vertices
    0.5, 0,//2nd vertecies
    0.5, 0.5, //3rd vertecies
    0.5, 0.5,
    0, 0.5,
    0, 0
];

const vbo = new VBO(gl);
vbo.bind();
vbo.setData(positions);
vao.addBuffor(vbo, layout);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);
