
import * as vertex from './shaders/vertex.glsl';

import * as fragment from './shaders/fragment.glsl';

const canvas = document.getElementById("primary_canvas") as HTMLCanvasElement;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
}



const gl = canvas.getContext("webgl2") as WebGLRenderingContext;
console.log(gl);

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex.default) as WebGLShader;
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment.default) as WebGLShader;



