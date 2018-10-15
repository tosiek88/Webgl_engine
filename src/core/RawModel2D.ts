import { mat4 } from "gl-matrix";
import * as fragmentSrc from "../shaders/fragmentLine.glsl";
import * as vertexSrc from "../shaders/vertexLine.glsl";
import Model from "./Abstract/Model";
import { IBuliderModel } from "./Interfaces/IBuilder";
import ShaderCompiler from "./ShaderCompiler";

export default class RawModel2D extends Model {
    constructor(private obj?: IBuliderModel) {
        super();
        this.gl = obj.gl;
        this.vao = obj.vao;
        this.vbo = obj.vbo;
        this.ibo = obj.ibo;

        this.compiler = new ShaderCompiler(this.gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();
        this.compiler.getUnifromLocation("u_ortho");

        const pOrtho: mat4 = mat4.create();
        const ratio = this.gl.canvas.width / this.gl.canvas.height;
        mat4.ortho(pOrtho, -ratio, ratio, -1, 1, 0.1, 100);

        this.compiler.setUniformMatrix4(pOrtho, "u_ortho");

    }

    public generateIndicies() {
        const indicies: number[] = [];

        indicies.push(0);
        indicies.push(1);
        indicies.push(2);
        indicies.push(2);
        indicies.push(3);
        indicies.push(0);

        this.indicies = new Uint16Array(indicies);
        this.setIndicies(indicies);
    }

}
