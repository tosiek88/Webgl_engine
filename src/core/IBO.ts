import Buffers from "./Abstract/Buffers";

export default class IBO extends Buffers {

    private ibo: WebGLBuffer | null = null;

    public constructor(gl: WebGL2RenderingContext) {
        super(gl);
        this.ibo = gl.createBuffer();
    }

    public setBuffor(data: Uint16Array) {
        super.setData(this.gl.ELEMENT_ARRAY_BUFFER, data);
    }

    public bind() {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ibo);

    }

    public unbind(): void {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, 0);
    }

}
