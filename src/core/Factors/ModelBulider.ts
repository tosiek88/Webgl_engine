import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import Model from "../Abstract/Model";
import IBO from "../Buffers/IBO";
import VAO from "../Buffers/VAO";
import VBO from "../Buffers/VBO";
import VertexBufferLayout from "../Buffers/VertexBufferLayout";
import IBulider, { IBuliderModel } from "../Interfaces/IBuilder";
import ShaderCompiler from "../ShaderCompiler";

export default class Builder<T extends Model> extends Model implements IBulider<T, IBuliderModel> {

    public build(Type: new (obj: IBuliderModel) => T, gl: WebGL2RenderingContext): T {
        this.setupBasics(gl);
        const layout = new VertexBufferLayout();
        this.setupVBOLayout(layout);

        this.vao.addBuffor(this.vbo, layout);

        this.setupCompiler();

        return this.buildType(Type);

    }
    protected setupBasics(gl: WebGL2RenderingContext) {
        this.gl = gl;
        this.vao = new VAO(gl);
        this.vbo = new VBO(gl);
        this.ibo = new IBO(gl);
    }
    protected setupVBOLayout(layout: VertexBufferLayout) {
        layout.Push(2);
    }

    protected setupCompiler() {
        this.compiler = new ShaderCompiler(this.gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();
        this.compiler.setDefaultOrthoMatrix();
    }

    protected buildType(Type: new (obj: IBuliderModel) => T) {
        return new Type({
            compiler: this.compiler,
            gl: this.gl,
            ibo: this.ibo,
            vao: this.vao,
            vbo: this.vbo,
        });
    }

}
