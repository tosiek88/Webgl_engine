import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import IBO from "../IBO";
import IRenderable from "../Interfaces/IRenderable";
import IUpdateable from "../Interfaces/IUpdateable";
import ShaderCompiler from "../ShaderCompiler";
import VAO from "../VAO";
import VBO from "../VBO";
import VertexBufferLayout from "../VertexBufferLayout";

export default class Retangle implements IRenderable, IUpdateable {

    private VAO: VAO = null;
    private VBOs: VBO[] = [];
    private IBO: IBO = null;
    private layout: VertexBufferLayout = null;
    private compiler: ShaderCompiler = null;
    private positionAndSize: Float32Array = null;
    private readonly MAX_NUMBER_OF_QUAD = 20000; // 16384;
    private readonly VERTEX_PER_ONE_QUAD = 4;
    private readonly NUMBER_PER_VERTEX = 2;
    private readonly NUMBER_OF_INDICIES_PER_QUAD = 6;
    private readonly ELEMENTS_PER_QUAD = this.VERTEX_PER_ONE_QUAD * this.NUMBER_PER_VERTEX;
    private readonly SIZE_OF_DATA_TABLE = this.MAX_NUMBER_OF_QUAD * this.VERTEX_PER_ONE_QUAD * this.NUMBER_PER_VERTEX;
    // tslint:disable-next-line:member-ordering
    public readonly TOTAL_NUMBER_OF_INDIECIES = this.NUMBER_OF_INDICIES_PER_QUAD * this.MAX_NUMBER_OF_QUAD;

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
        this.positionAndSize = new Float32Array(this.SIZE_OF_DATA_TABLE);

    }

    public render(): boolean {
        this.VAO.bind();
        this.IBO.bind();
        return true;
    }

    public update(deltaTime: number): boolean {
        this.updateData(this.position, this.size, deltaTime %= 2 * Math.PI);
        return true;
    }

    private setData(position: number[], size: number[], phase: number) {
        const samples: number[] = [];
        const freq = 50;
        const omega = Math.PI * freq;
        for (let index = 0; index < this.SIZE_OF_DATA_TABLE; index += this.ELEMENTS_PER_QUAD) {
            const x = 1 / this.SIZE_OF_DATA_TABLE / 8 * index - 1 + position[0];
            const y = 0.9 * Math.sin(omega * x + phase) + position[1];
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase));
            samples.push(x + size[0]); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
            samples.push(x); samples.push(0.9 * Math.sin(Math.PI * x * freq + phase) + size[1]);
        }
        this.positionAndSize = new Float32Array(samples);

        this.VBOs[0].setBuffer(this.positionAndSize);

        const sampleIndicies: number[] = [];
        for (let index = 0; index < this.TOTAL_NUMBER_OF_INDIECIES; index += this.VERTEX_PER_ONE_QUAD) {
            sampleIndicies.push(index + 0);
            sampleIndicies.push(index + 1);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 2);
            sampleIndicies.push(index + 3);
            sampleIndicies.push(index + 0);
        }

        let indicies = new Uint16Array(sampleIndicies);
        this.IBO.setBuffor(indicies);
        indicies = null;

    }

    private updateData(position: number[], size: number[], phase: number) {

        const freq = 50;
        const omega = Math.PI * freq;
        phase = phase;

        for (let index = 0; index < this.SIZE_OF_DATA_TABLE; index += this.ELEMENTS_PER_QUAD) {
            const x = 1 / this.MAX_NUMBER_OF_QUAD * index * 0.3 - 1 + 0.015 + position[0];
            const y = 0.5 * Math.sin(omega * x + phase) + position[1];

            this.positionAndSize[index] = x;
            this.positionAndSize[index + 1] = y;

            this.positionAndSize[index + 2] = x + size[0];
            this.positionAndSize[index + 3] = y;

            this.positionAndSize[index + 4] = x + size[0];
            this.positionAndSize[index + 5] = y + size[1];

            this.positionAndSize[index + 6] = x;
            this.positionAndSize[index + 7] = y + size[1];

        }

        this.VBOs[0].upadate(this.positionAndSize);

    }

}
