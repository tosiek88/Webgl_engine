import Buffers from "./Abstract/Buffers";

export default class VBO extends Buffers {

    public name: string;
    private vbo: WebGLBuffer | null;

    public constructor(gl: WebGL2RenderingContext) {
        super(gl);
        this.vbo = this.gl.createBuffer();
    }

    public upadate(data: Float32Array): any {
        super.updateData(data);
    }

    public setBuffer(data: Float32Array) {
        super.setData(this.gl.ARRAY_BUFFER, data);
    }

    public bind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    }

    public unbind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
    }
}
