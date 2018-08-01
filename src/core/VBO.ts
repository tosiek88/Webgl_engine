export default class VBO {
    private vbo: WebGLBuffer | null;
    private buffor: Float32Array = new Float32Array([]);

    public constructor(private gl: WebGL2RenderingContext) {
        this.vbo = this.gl.createBuffer();
    }

    public setData(data: number[]) {
        this.buffor = new Float32Array(data);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.buffor, this.gl.STATIC_DRAW);
    }

    public bind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
    }

    public unbind() {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, 0);
    }
}
