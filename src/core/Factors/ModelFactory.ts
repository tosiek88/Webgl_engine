import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import Model from "../Abstract/Model";
import IBO from "../IBO";
import RawModel2D from "../RawModel2D";
import ShaderCompiler from "../ShaderCompiler";
import VAO from "../VAO";
import VBO from "../VBO";
import VertexBufferLayout from "../VertexBufferLayout";

function staticImplements<T>() {
    // tslint:disable-next-line:no-empty
    return (constructor: T) => { };
}

@staticImplements<ICreator<Model>>()
export default abstract class RawModelFactory {

    public static create(gl: WebGL2RenderingContext): Model {
        const vao = new VAO(gl);
        const vbo = new VBO(gl);
        const layout = new VertexBufferLayout();
        layout.Push(2);
        vao.addBuffor(vbo, layout);
        const ibo = new IBO(gl);

        const compiler = new ShaderCompiler(gl, vertexSrc.default, fragmentSrc.default);
        compiler.useProgram();
        return new RawModel2D();
    }

}
