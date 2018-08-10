import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import ShaderCompiler from "../Compiler";
import IBO from "../IBO";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import VAO from "../VAO";
import VBO from "../VBO";
import VertexBufferLayout from "../VertexBufferLayout";

export default class Retangle implements IRenderable, IUpdateable {

    private VAO: VAO = null;
    private VBOs: VBO[] = [];
    private IBO: IBO = null;
    private layout: VertexBufferLayout = null;
    private compiler: ShaderCompiler = null;

    constructor(private gl: WebGL2RenderingContext, private position: number[], private size: number[]) {
        this.compiler = new ShaderCompiler(gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();

        this.VAO = new VAO(gl);
        this.VBOs.push(new VBO(gl));
        this.layout = new VertexBufferLayout();
        this.layout.Push(2); // 2 vertecies
        this.VAO.addBuffor(this.VBOs[0], this.layout);
        this.IBO = new IBO(gl);
        this.setData(position, size, 0);
    }

    public render(): boolean {
        this.VAO.bind();
        this.IBO.bind();
        return true;
    }

    public update(deltaTime: number): boolean {
        this.setData(this.position, this.size, deltaTime %= 2 * Math.PI);
        return true;
    }

    private setData(position: number[], size: number[], phase: number) {
        const samples: number[] = [];

        for (let index = 0; index < 64000; index++) {
            const x = 0.0025 * index - 1;
            const freq = 50;
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
        }
        let positionAndSize = new Float32Array(samples);

        this.VBOs[0].setBuffer(positionAndSize);
        positionAndSize = null;

        const sampleIndicies: number[] = [];
        for (let index = 0; index < 256000; index += 4) {
            sampleIndicies.push(index + 0);
            sampleIndicies.push(index + 1);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 3);
            sampleIndicies.push(index + 0);
        }

        this.VAO.addBuffor(this.VBOs[0], this.layout);

        let indicies = new Uint16Array(sampleIndicies);
        this.IBO.setBuffor(indicies);
        indicies = null;

    }

}
