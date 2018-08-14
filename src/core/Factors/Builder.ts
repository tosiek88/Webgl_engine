import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import Model from "../Abstract/Model";
import IBO from "../IBO";
import IBulider from "../Interfaces/IBuilder";
import ShaderCompiler from "../ShaderCompiler";
import VAO from "../VAO";
import VBO from "../VBO";
import VertexBufferLayout from "../VertexBufferLayout";

export default class Builder<T extends Model> extends Model implements IBulider<T> {
    public build(gl: WebGL2RenderingContext): T {

        this.vao = new VAO(gl);
        this.vbo = new VBO(gl);
        this.ibo = new IBO(gl);
        const layout = new VertexBufferLayout();
        layout.Push(2);
        this.vao.addBuffor(this.vbo, layout);
        this.compiler = new ShaderCompiler(gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();
        return super.getModel() as T;
    }

}
