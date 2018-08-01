import { mat4 } from "gl-matrix";

interface IUpdateable {
    update(): boolean;
}

interface IRenderable {
    render(): boolean;
}

interface IDrawable {
    readonly primitiveType: number;
    readonly countVertex: number;
    draw(): boolean;
}

export default class Core implements IUpdateable, IDrawable {

    public countVertex: number = 0;
    public primitiveType: number = 0;

    private readonly DEFAULT_CANVAS: string = "primary_canvas";
    private canvas: HTMLCanvasElement | null = null;
    private gl: WebGL2RenderingContext | null = null;

    public constructor(canvasID?: string) {

        this.selectCanvas(canvasID);
        this.gl = this.canvas.getContext("webgl2") as WebGL2RenderingContext;
        this.primitiveType = this.gl.TRIANGLES;
        this.countVertex = 6;
        this.resize(this.gl);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    }
    public clear() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public resize(glContext: WebGL2RenderingContext) {
        const realToCSSPixels = window.devicePixelRatio;

        // Lookup the size the browser is displaying the canvas in CSS pixels
        // and compute a size needed to make our drawingbuffer match it in
        // device pixels.
        const displayWidth = Math.floor(glContext.canvas.clientWidth * realToCSSPixels);
        const displayHeight = Math.floor(glContext.canvas.clientHeight * realToCSSPixels);

        // Check if the canvas is not the same size.
        if (glContext.canvas.width !== displayWidth ||
            glContext.canvas.height !== displayHeight) {

            // Make the canvas the same size
            glContext.canvas.width = displayWidth;
            glContext.canvas.height = displayHeight;
        }
    }

    public update(): boolean {
        return true;
    }

    public run() {
        this.clear();
        this.draw();
    }

    public draw(): boolean {
        this.gl.drawArrays(this.primitiveType, 0, this.countVertex);
        return true;
    }

    private selectCanvas(idCanvas: string) {
        if (idCanvas === undefined) {
            this.canvas = document.getElementById(this.DEFAULT_CANVAS) as HTMLCanvasElement;
        } else {
            this.canvas = document.getElementById(idCanvas) as HTMLCanvasElement;
        }
    }

    public get GL(): WebGL2RenderingContext {
        return this.gl;
    }

}
