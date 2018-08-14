
import IBO from "../IBO";
import ShaderCompiler from "../ShaderCompiler";
import VAO from "../VAO";
import VBO from "../VBO";

export default abstract class Model {

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
