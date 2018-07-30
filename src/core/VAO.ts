import VBO from './VBO';
import VertexBufferLayout from './VertexBufferLayout';


export default class VAO {
    private _VAO: WebGLVertexArrayObject;
    private _bufforMap: Map<VBO,VertexBufferLayout>=new Map<VBO, VertexBufferLayout>();


    public constructor(private _gl: WebGL2RenderingContext) {
        this._VAO = this._gl.createVertexArray() as WebGLVertexArrayObject;
    }

    public addBuffor(vbo:VBO, layout:VertexBufferLayout){
        this._bufforMap.set(vbo, layout);
    }

    public bind() {
        this._gl.bindVertexArray(this._VAO);
    }

    public unbind() {
        this._gl.bindVertexArray(null);
    }

}