
import * as vertexSrc from './shaders/vertex.glsl';
import * as fragmentSrc from './shaders/fragment.glsl';
import  Compiler from './core/Compiler'




const canvas = document.getElementById("primary_canvas") as HTMLCanvasElement;
const gl = canvas.getContext("webgl2") as WebGLRenderingContext;
const compiler:Compiler= new Compiler(gl, vertexSrc.default, fragmentSrc.default);




const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// three 2d points
const positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
gl.useProgram(compiler.Program);

gl.enableVertexAttribArray(compiler.getAttributeLocatio("a_position"));

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 components per iteration
var type = gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
gl.vertexAttribPointer(compiler.getAttributeLocatio("a_position"), size, type, normalize, stride, offset);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);