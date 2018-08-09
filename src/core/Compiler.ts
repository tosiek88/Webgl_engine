import { compilation } from "webpack";

type Shader = (WebGLShader | null);

export default class Compiler {

    private vertex: Shader;
    private fragment: Shader;
    private program: WebGLProgram;

    public constructor(private gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string) {

        this.vertex = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertexSrc) as Shader;
        this.fragment = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentSrc) as Shader;
        this.program = this.createProgram(this.gl, this.vertex, this.fragment) as WebGLProgram;
    }

    public getAttributeLocatio(attributeName: string): number {
        return this.gl.getAttribLocation(this.program, attributeName) as number;
    }

    public useProgram() {
        this.gl.useProgram(this.program);
    }

    public get Program(): WebGLProgram {
        return this.program;
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
        if (success) {
            return shader;
        }
        gl.deleteShader(shader);
    }
}
