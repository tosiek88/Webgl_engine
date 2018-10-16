import { mat4 } from "gl-matrix";

type Shader = (WebGLShader | null);

export default class ShaderCompiler {

    public get Program(): WebGLProgram {
        return this.program;
    }
    public name = "";

    private vertex: Shader;
    private fragment: Shader;
    private program: WebGLProgram;
    private ortho: WebGLUniformLocation;

    public constructor(private gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string) {
        this.vertex = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertexSrc);
        this.fragment = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentSrc);
        this.program = this.createProgram(this.gl, this.vertex, this.fragment);
    }

    public getAttributeLocation(attributeName: string): number {
        return this.gl.getAttribLocation(this.program, attributeName);
    }

    public getUnifromLocation(name: string): WebGLUniformLocation {
        return this.gl.getUniformLocation(this.program, name);
    }

    public setUniformVariable1f(value: number, name: string) {
        this.useProgram();
        const location = this.getUnifromLocation(name);
        this.gl.uniform1f(location, value);
    }

    public setUniformMatrix4(matrix: mat4, name: string) {
        const location = this.getUnifromLocation(name);
        this.gl.uniformMatrix4fv(location, false, matrix);
    }

    public useProgram() {
        this.gl.useProgram(this.program);
    }

    public setDefaultOrthoMatrix() {
        this.ortho = this.getUnifromLocation("u_ortho");

        const pOrtho: mat4 = mat4.create();
        const ratio = this.gl.canvas.width / this.gl.canvas.height;
        mat4.ortho(pOrtho, -ratio, ratio, -1, 1, 0.1, 100);

        this.setUniformMatrix4(pOrtho, "u_ortho");
    }

    private createProgram(gl: WebGLRenderingContext, vertexShader: Shader, fragmentShader: Shader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
    }

    private createShader(gl: WebGLRenderingContext, type: number, source: string) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        const error = gl.getShaderInfoLog(shader);
        // console.error(error);

        if (success) {
            return shader;
        }
        gl.deleteShader(shader);
    }
}
