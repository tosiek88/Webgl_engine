
import * as vertexSrc from './shaders/vertex.glsl';
import * as fragmentSrc from './shaders/fragment.glsl';
import Compiler from './core/Compiler'
import VAO from './core/VAO';
import VertexBufferLayout from './core/VertexBufferLayout';
import VBO from './core/VBO';


function resize(gl:WebGL2RenderingContext) {
    var realToCSSPixels = window.devicePixelRatio;
  
    // Lookup the size the browser is displaying the canvas in CSS pixels
    // and compute a size needed to make our drawingbuffer match it in
    // device pixels.
    var displayWidth  = Math.floor(gl.canvas.clientWidth  * realToCSSPixels);
    var displayHeight = Math.floor(gl.canvas.clientHeight * realToCSSPixels);
  
    // Check if the canvas is not the same size.
    if (gl.canvas.width  !== displayWidth ||
        gl.canvas.height !== displayHeight) {
  
      // Make the canvas the same size
      gl.canvas.width  = displayWidth;
      gl.canvas.height = displayHeight;
    }
  }

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
resize(gl);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count =6;
gl.drawArrays(primitiveType, offset, count);
