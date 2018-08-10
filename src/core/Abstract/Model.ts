import IBO from "../IBO";
import VAO from "../VAO";
import VBO from "../VBO";

export default abstract class Model {
    protected vao: VAO;
    protected vbo: VBO;
    protected ibo: IBO;
    protected shaderProgram: WebGLProgram;

}
