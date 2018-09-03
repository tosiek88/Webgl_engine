
import IBO from "../Buffers/IBO";
import VAO from "../Buffers/VAO";
import VBO from "../Buffers/VBO";
import ShaderCompiler from "../ShaderCompiler";

export default abstract class Model {
    protected gl: WebGL2RenderingContext;
    protected vao: VAO;
    protected vbo: VBO;
    protected ibo: IBO;
    protected vertex: Float32Array;
    protected indicies: Uint16Array;
    protected compiler: ShaderCompiler;

    public setData(data: Float32Array) {
        this.vertex = data;
        this.vbo.setBuffer(this.vertex);
    }

    public get Count(): number {
        return this.indicies.length;
    }

    public setIndicies(data: number[]) {
        this.indicies = new Uint16Array(data);
        this.ibo.setBuffor(this.indicies);
    }

    public getModel(): Model {
        return this;
    }

    public updateModel(data: Float32Array) {
        this.vbo.upadate(data);
    }

    public useProgram() {
        this.compiler.useProgram();
    }

    public bind() {
        this.vao.bind();
        this.ibo.bind();
    }

    public unbind() {
        this.vao.unbind();

    }
}
