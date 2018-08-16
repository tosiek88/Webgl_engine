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

        this.vao = new VAO(gl);
        this.vbo = new VBO(gl);
        this.ibo = new IBO(gl);
        const layout = new VertexBufferLayout();
        layout.Push(2);
        this.vao.addBuffor(this.vbo, layout);
        this.compiler = new ShaderCompiler(gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();
        return new Type({ vao: this.vao, vbo: this.vbo, ibo: this.ibo, compiler: this.compiler });

    }

}
