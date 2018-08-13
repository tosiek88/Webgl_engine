import IBO from "../IBO";
import ShaderCompiler from "../ShaderCompiler";
import VAO from "../VAO";
import VBO from "../VBO";

export default abstract class Model {
    protected vao: VAO;
    protected vbo: VBO;
    protected ibo: IBO;
    protected compiler: ShaderCompiler;

    public bind() {
        this.vao.bind();
        this.vbo.bind();
    }

}
