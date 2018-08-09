export default abstract class Buffers {
    protected buffor: Float32Array | Uint16Array = new Float32Array([]);
    public constructor(protected gl: WebGL2RenderingContext) {

    }

    public abstract bind(): void;
    public abstract unbind(): void;

    protected setData(target: number, data: Uint16Array | Float32Array): void {

        this.buffor = data;
        this.bind();
        this.gl.bufferData(target, this.buffor, this.gl.STATIC_DRAW);
    }
}
