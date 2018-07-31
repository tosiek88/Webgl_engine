import VBO from './VBO';
import VertexBufferLayout from './VertexBufferLayout';


export default class VAO {
    private _VAO: WebGLVertexArrayObject;
    private _bufforMap: Map<VBO, VertexBufferLayout> = new Map<VBO, VertexBufferLayout>();
    private _currentAttrID: number = 0;

    public constructor(private _gl: WebGL2RenderingContext) {
        this._VAO = this._gl.createVertexArray() as WebGLVertexArrayObject;
    }

    public addBuffor(vbo: VBO, layout: VertexBufferLayout) {
        this.bind();
        vbo.bind();
        const elements = layout.GetElements();
        elements.forEach(el => {
            this._gl.vertexAttribPointer(
                this._currentAttrID,
                el.count,
                el.type,
                el.normalize,
                layout.Stride,
                el.offset
            )
            this._gl.enableVertexAttribArray(this._currentAttrID);
            this._currentAttrID++;
        });

        this._bufforMap.set(vbo, layout);
    }

    public bind() {
        this._gl.bindVertexArray(this._VAO);
        this._bufforMap.forEach((value, key) => {
            key.bind();
        });
    }

    public unbind() {
        this._gl.bindVertexArray(null);
    }

}