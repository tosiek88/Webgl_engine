import * as fragmentSrc from "../../shaders/fragment.glsl";
import * as vertexSrc from "../../shaders/vertex.glsl";
import Compiler from "../Compiler";
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
    private compiler: Compiler = null;

    constructor(private gl: WebGL2RenderingContext, position: number[], size: number[]) {
        this.compiler = new Compiler(gl, vertexSrc.default, fragmentSrc.default);
        this.compiler.useProgram();

        this.VAO = new VAO(gl);
        this.VBOs.push(new VBO(gl));
        this.IBO = new IBO(gl);
        this.setData(position, size);
    }

    public render(): boolean {
        this.VAO.bind();
        this.IBO.bind();
        return true;
    }

    public update(deltaTime: number): boolean {
        return true;
    }

    private setData(position: number[], size: number[]) {
        // position[0]=x,
        // position[1]=y,
        const positionAndSize = new Float32Array([
            position[0], position[1],
            position[0] + size[0], position[1],
            position[0] + size[0], position[1] + size[1],
            position[0], position[1] + size[1],
        ]);

        this.VBOs[0].setBuffer(positionAndSize);

        this.layout = new VertexBufferLayout();
        this.layout.Push(2); // 2 vertecies

        this.VAO.addBuffor(this.VBOs[0], this.layout);

        const indicies = new Uint16Array([
            0, 1, 2,
            2, 3, 0,
        ]);

        this.IBO.setBuffor(indicies);
    }

}
