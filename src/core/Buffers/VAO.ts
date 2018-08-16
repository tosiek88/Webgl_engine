import VBO from "./VBO";
import VertexBufferLayout from "./VertexBufferLayout";

export default class VAO {
    private _VAO: WebGLVertexArrayObject;
    private bufforMap: Map<VBO, VertexBufferLayout> = new Map<VBO, VertexBufferLayout>();
    private currentAttID: number = 0;

    public constructor(private gl: WebGL2RenderingContext) {
        this._VAO = this.gl.createVertexArray() as WebGLVertexArrayObject;
    }

    public addBuffor(vbo: VBO, layout: VertexBufferLayout) {
        this.bind();
        vbo.bind();
        const elements = layout.GetElements();
        elements.forEach((el) => {
            this.gl.vertexAttribPointer(
                this.currentAttID,
                el.count,
                el.type,
                el.normalize,
                layout.Stride,
                el.offset,
            );
            this.gl.enableVertexAttribArray(this.currentAttID);
            this.currentAttID++;
        }, this);

        this.bufforMap.set(vbo, layout);
    }

    public GetLayout(vbo: VBO): VertexBufferLayout {
        return this.bufforMap.get(vbo);
    }

    public bind() {
        this.gl.bindVertexArray(this._VAO);
        // this.bufforMap.forEach((value, key) => {
        //     key.bind();
        // });

    }

    public unbind() {
        this.gl.bindVertexArray(null);
    }

}
