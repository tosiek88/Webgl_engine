import { compilation } from "webpack";

type Shader = (WebGLShader | null);

export default class Compiler {

    private _vertex: Shader
    private _fragment: Shader
    private _program: WebGLProgram


    public constructor(private _gl: WebGLRenderingContext, vertexSrc: string, fragmentSrc: string) {

        this._vertex = this.createShader(this._gl, this._gl.VERTEX_SHADER, vertexSrc) as Shader;
        this._fragment = this.createShader(this._gl, this._gl.FRAGMENT_SHADER, fragmentSrc) as Shader;
        this._program = this.createProgram(this._gl, this._vertex, this._fragment) as WebGLProgram;
    }

    public get Program():WebGLProgram{
        return this._program; 
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
        console.log(gl.getShaderInfoLog(shader));
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }

    public getAttributeLocatio(attributeName: string): number {
        return this._gl.getAttribLocation(this._program, attributeName) as number;
    }

    public useProgram(){
        this._gl.useProgram(this._program);
    }


}